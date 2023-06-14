const inquirer = require("inquirer");
const fs = require("fs");

const generateREADME = ({
  title,
  description,
  tableOfContents,
  contributing,
  installation,
  usage,
  credits,
  tests,
  contributingGuidelines,
}) => {
  let readmeContent = `# ${title}

## Description
${description}

`;

  if (tableOfContents === "yes") {
    readmeContent += `## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [Tests](#tests)

`;
  }

  if (contributing === "yes") {
    readmeContent += `## Contributing
${contributingGuidelines}

`;
  } else if (contributing === "no") {
    readmeContent += `## Contributing
Contributions are not allowed for the project at this time. For more information or inquiries, 

`;
  }

  readmeContent += `## Installation
${installation}

`;
  readmeContent += `## Usage
${usage}

`;
  readmeContent += `## Credits
${credits}

`;
  readmeContent += `## Tests
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
    {
      type: "list",
      name: "tableOfContents",
      message: "Include a Table of Contents section in your README?",
      choices: [
        { name: "Yes", value: "yes" },
        { name: "No", value: "no" },
      ],
    },
    {
      type: "list",
      name: "contributing",
      message: "Allow contributions?",
      choices: [
        { name: "Yes", value: "yes" },
        { name: "No", value: "no" },
      ],
    },
  ])
  .then((answers) => {
    if (answers.contributing === "yes") {
      inquirer
        .prompt([
          {
            type: "input",
            name: "contributingGuidelines",
            message:
              "Please provide guidelines for contributing to the project:",
          },
        ])
        .then((contributingAnswers) => {
          answers = { ...answers, ...contributingAnswers };
          generateReadmeFile(answers);
        });
    } else {
      generateReadmeFile(answers);
    }
  });

const generateReadmeFile = (answers) => {
  const readmePageContent = generateREADME(answers);

  fs.writeFile("README.md", readmePageContent, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Successfully generated README!");
    }
  });
};
