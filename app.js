
import os

// Requires
const dotenv = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const date = require(__dirname + "/date.js");
const _ = require("lodash");

// Configure environment
dotenv.config();

// Initialize Express
const app = express();

// Initialize EJS
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// Initialize Mongoose
mongoose.connect(process.env.DB_URI, {useNewURLParser: true});

const itemsSchema = {
    name: String
};

const listSchema = {
    name: String,
    items: [itemsSchema]
};

const Item = mongoose.model("Item", itemsSchema);
const List = mongoose.model("List", listSchema);

// App route requests
app.get("/", function(req, res) {

    res.redirect("/about");
});

app.post("/", function(req, res) {

    const itemName = req.body.newItem;
    const listName = req.body.list;

    const item = new Item({
        name: itemName
    })

    List.findOne({name: listName}).then(function(foundList) {
        if(foundList) {
            foundList.items.push(item);
            
            async function s() {await foundList.save();}
            s();
            
           setTimeout(function() {res.redirect("/" + listName)}, 100); // Give some additional time to Mongo
        }
        else {throw "Unable to find list."}
    })
    .catch(function(err) {
        console.log(err);
    })
})

app.get("/about", function(req, res) {
    res.render("about");
})

app.get("/:customListName", function(req, res) {
    
    const customListName = _.capitalize(req.params.customListName);

    // Handle cases when we do not want to make a list
    if (customListName === "Favicon.ico" ||
        customListName === "About")
        { return }

    List.findOne({name: customListName}).then(function(foundList) {
        if(!foundList) {
            console.log("Creating new list '" + customListName + "'");
            const list = new List({
                name: customListName,
                items: []   // Empty list
            })
    
            async function s() {await list.save();}
            s();
            setTimeout(function(){res.redirect("/" + customListName)}, 100);    // Give some additional time to Mongo
        }
        else {
            console.log("Redirecting to '" + customListName + "'");
            res.render("list", {listTitle: foundList.name, newListItems: foundList.items});
        }
    })
    .catch(function(err) {
        console.log(err);
    })
})

app.post("/delete", function(req, res) {

    const checkedItemId = req.body.checkbox;
    const listName = req.body.listName;

    if(listName === "Today") {
        Item.findByIdAndRemove(checkedItemId).then(function(foundItem) {
            if(foundItem) {
                console.log("Succesfully removed item.")
                res.redirect("/");
            }
            else {
                console.log("Could not find and remove item.");
            }
        }).catch(function(err) {
            console.log(err);
        })
    }
    else {
        List.findOneAndUpdate({name: listName}, {$pull: {items: {_id: checkedItemId}}})
        .then(function() {
            console.log("Succesfully removed item.")
            res.redirect("/" + listName);
        })
        .catch(function(err) {
            console.log(err);
        })
    }
})

// Select port
let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}

app.listen(port, function() {
    console.log("Server started successfully.");
});
