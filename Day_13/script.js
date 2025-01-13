// Get references to DOM elements
const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskButton");
const todoList = document.getElementById("todoList");

// Function to add a new task
addTaskButton.addEventListener("click", function() {
    const taskText = taskInput.value.trim(); // Get input value and trim whitespace
    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    // Create a new list item
    const listItem = document.createElement("li");
    listItem.innerText = taskText;

    // Add a "Mark as Done" button
    const doneButton = document.createElement("button");
    doneButton.innerText = "Done";
    doneButton.style.marginLeft = "10px";

    // Add a "Delete" button
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.style.marginLeft = "5px";

    // Append buttons to the list item
    listItem.appendChild(doneButton);
    listItem.appendChild(deleteButton);

    // Add the list item to the to-do list
    todoList.appendChild(listItem);

    // Clear the input field
    taskInput.value = "";

    // Mark task as done
    doneButton.addEventListener("click", function() {
        listItem.classList.toggle("done");
    });

    // Delete task
    deleteButton.addEventListener("click", function() {
        todoList.removeChild(listItem);
    });
});
