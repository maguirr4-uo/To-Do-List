# To-Do-List

## About
I created this app as part of the Complete Full Stack Development Bootcamp on Udemy, taught by Angela Yu.

This application allows you to create one or more "to-do lists", to which you can add or delete tasks as you please.

You can access it here: https://to-do-list-node-c26d94940792.herokuapp.com/

## Usage
In the basic state of this application, you are able to make a new list simply by typing a new title in the URL. You are then able to add and delete tasks as text to the list.

After creating a new list, a new object in the MongoDB database is created, and an endpoint is created that looks like this:

<img width="395" alt="image" src="https://github.com/maguirr4-uo/To-Do-List/assets/72330081/002be6af-8138-4b5f-ba96-f5a42485ba1e">

You can type a new item, and after pressing the plus button, it is added to the databse, and the screen will look like this:

<img width="351" alt="image" src="https://github.com/maguirr4-uo/To-Do-List/assets/72330081/834d6a8a-d853-4e25-8f8b-2288ad98a955">

After checking the checkbox beside the To-Do item, it will be striked through as such:

![image](https://github.com/maguirr4-uo/To-Do-List/assets/72330081/3f96a9c4-55dd-424f-a7e0-3e57007ed241)

In a modification from the original project, I have made it so that the item is then removed from the list. This also removes it from the MongoDB database.

## Updates
7/10/2024: Fixed bug that would prevent the deletion of list items if the list was titled "Today."

6/14/2024: First app deployment.

## Notes
Planned expansions:
- Add button to delete list.
- List active lists in the home page
- Add authentication and save information per user
- Host on a service like Azure, AWS, Google Cloud, etc.
- Allow the option to personalize look of the site.
