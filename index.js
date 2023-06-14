// TO DO:
// ""a notice is added to the section of the README entitled License that explains which license the application is covered under"

// packages needed for application
const inquirer = require("inquirer");
const fs = require("fs");

// generates README file
const generateREADME = ({
  title,
  description,
  tableOfContents,
  installation,
  usage,
  credits,
  tests,
  questions,
  contributing,
  contributingGuidelines,
  license,
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
- [Questions](#questions)
- [Contributing](#contributing)`;
    if (license !== "No license") {
      readmeContent += "\n- [License](#license)";
    } else {
      readmeContent += "\n\n";
    }
  }

  readmeContent += `\n\n## Installation
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

  readmeContent += `## Questions
${questions}

`;

  if (contributing === "yes") {
    readmeContent += `## Contributing
${contributingGuidelines}

`;
  } else if (contributing === "no") {
    readmeContent += `## Contributing
Contributions are not allowed for the project at this time. For more information or inquiries, 

`;
  }

  if (license !== "No license") {
    readmeContent += `## License
${getLicenseBadge(license)}

`;
  }

  return readmeContent;
};

const getLicenseBadge = (license) => {
  const licenseBadges = {
    Apache:
      "[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)]",
    "BSD 3":
      "[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)]",
    GNU: "[![License: GPL v2](https://img.shields.io/badge/License-GPL%20v2-blue.svg)]",
    MIT: "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)]",
    Mozilla:
      "[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)]",
  };

  return licenseBadges[license] || "";
};

const generateReadmeFile = (answers) => {
  const readmePageContent = generateREADME(answers);

  fs.writeFile("README.md", readmePageContent, (err) => {
    if (err) {
      console.log("❌ Error - please try again ❌");
    } else {
      console.log("✔️ Successfully created README ✔️");
    }
  });
};

// creates an array of questions for user input
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
      type: "input",
      name: "questions",
      message:
        "Add your Github, email, and instructions for additional questions",
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
    {
      type: "list",
      name: "license",
      message: "Choose a license for your project",
      choices: ["Apache", "BSD 3", "GNU", "MIT", "Mozilla", "No license"],
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
