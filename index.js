const inquirer = require("inquirer");
const fs = require("fs");

const generateREADME = ({
  title,
  description,
  installation,
  usage,
  credits,
  tests,
}) => {
  let readmeContent = `# ${title}

## Description
${description}

## Installation
${installation}

## Usage
${usage}

## Credits
${credits}

## Tests
${tests}

`;

  return readmeContent;
};

inquirer
  .prompt([
    {
      type: "input",
      name: "title",
      message: "What is the title of your project?",
    },
    {
      type: "input",
      name: "description",
      message:
        "Provide a description of your project. What is its purpose? How can it serve users?",
    },
    {
      type: "input",
      name: "installation",
      message: "Provide setup instructions for your application",
    },
    {
      type: "input",
      name: "usage",
      message: "Provide examples and guidance for usage",
    },
    {
      type: "input",
      name: "credits",
      message:
        "Cite the project's collaborators and include third-party resources used",
    },
    {
      type: "input",
      name: "tests",
      message:
        "If applicable, provide examples and instructions for how to run tests for this application",
    },
  ])
  .then((answers) => {
    const readmePageContent = generateREADME(answers);

    fs.writeFile("README.md", readmePageContent, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Successfully generated README!");
      }
    });
  });
