// Change the content of the header
document.getElementById('header').innerText = "DOM Manipulation is fun!";

// change the description text
document.getElementById('description').innerHTML = "Now you can dynamically <b>change</b> your page.";

// Add an event listener to the button
document.getElementById("changeButton").addEventListener("click", function() {
    document.getElementById("description").style.color = "red"; // change text color
    document.getElementById("description").style.fontSize = "20px"; // change font size
});

// Add a new item to the list
let newItem = document.createElement("li");
newItem.innerText = "Master DOM Manipulation";
document.getElementById("list").appendChild(newItem);