// Display a message in the console
console.log("Hello, JavaScript!");

// Change the content of the paragraph with id "demo"
document.getElementById("demo").innerText = "Hello, JavaScript is awesome!";
// Declaring variables
let name = "James"; // A string
const age = 25; // A number
var isLearning = true; // A boolean

// Displaying values in the console
console.log("Name:", name);
console.log("Age:", age);
console.log("Learning JavaScript:", isLearning);

// Reassigning a variable declared with let
name = "James Ngugi";
console.log("Updated Name:", name);

// Trying to change a const (this will throw an error)
// age = 26;
// Strings
let greeting = "Hello, World!";
console.log(greeting);

// Numbers
let price = 99.99;
console.log("Price:", price);

// Arrays
let colors = ["red", "blue", "green"];
console.log("Colors:", colors);
console.log("First Color:", colors[0]);

// Objects
let person = {
    firstName: "James",
    lastName: "Ngugi",
    age: 25,
    isDeveloper: true
};
console.log("Person:", person);
console.log("First Name:", person.firstName);