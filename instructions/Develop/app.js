const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Empty arrays
const teamBuild = [];
const blankId = [];

// Variable for intials questions
const mainQuestions = [
    {
        type: "input",
        name: "nameManager",
        message: "What is the manager's name?"
    },
    {
        type: "input",
        name: "managerId",
        message: "What is the manager's ID?"
    },
    {
        type: "input",
        name: "emailManager",
        message: "What is the manager's email?"
    },
    {
        type: "input",
        name: "officeNumber",
        message: "What is the manager's office number?"
    }
];

// Function to write intial information to the empty array's
function manager() {
    console.log("Let's build your team");
    inquirer.prompt(mainQuestions).then(function (data) {
        const manager = new Manager(data.nameManager, data.managerId, data.emailManager, data.officeNumber);
        teamBuild.push(manager);
        blankId.push(data.managerId);
        team();
    });
};