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

// Funtion to ask if you want to add more Employees to the page
function team() {
    inquirer.prompt([
        {
            type: "list",
            name: "memberChoice",
            message: "Which type of member would you like to add?",
            choices: [
                "Engineer",
                "Intern",
                "I don't want to add any more team members"
            ]
        }
    ]).then(function (data) {
        if (data.memberChoice === "Engineer") {
            engineer();
        } else if (data.memberChoice === "Intern") {
            intern();
        } else (outputTeam());
    });
};

// Funtion to create a engineer to be put on the page
function engineer() {
    inquirer.prompt([
        {
            type: "input",
            name: "engineerName",
            message: "What is the engineer's name?"
        },
        {
            type: "input",
            name: "engineerId",
            message: "What is the engineer's ID?"
        },
        {
            type: "input",
            name: "engineerEmail",
            message: "What is the engineer's email?"
        },
        {
            type: "input",
            name: "engineerGithub",
            message: "What is the engineer's GitHub username?"
        }
    ]).then(function (data) {
        const engineer = new Engineer(data.engineerName, data.engineerId, data.engineerEmail, data.engineerGithub);
        teamBuild.push(engineer);
        blankId.push(data.engineerId);
        team();
    });
};

// Funtion to create a intern to be put on the page
function intern() {
    inquirer.prompt([
        {
            type: "input",
            name: "internName",
            message: "What is the intern's name?"
        },
        {
            type: "input",
            name: "internId",
            message: "What is the intern's ID?"
        },
        {
            type: "input",
            name: "internEmail",
            message: "What is the intern's email?"
        },
        {
            type: "input",
            name: "internSchool",
            message: "What is the intern's school?"
        }
    ]).then(function (data) {
        const intern = new Intern(data.internName, data.internId, data.internEmail, data.internSchool);
        teamBuild.push(intern);
        blankId.push(data.internId);
        team();
    });
};