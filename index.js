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
Contributions are not allowed for the project at this time.

`;
  }

  if (license !== "No license") {
    const licenseData = getLicenseBadge(license);
    readmeContent += `## License
${licenseData.badge}
${licenseData.description}

`;
  }

  return readmeContent;
};

const getLicenseBadge = (license) => {
  const licenseBadges = {
    Apache: {
      badge:
        "![License: Apache](https://img.shields.io/badge/License-Apache_2.0-pink.svg)\n",
      description:
        "This project is licensed under the Apache license. To learn more about the Apache license, please visit: https://www.apache.org/licenses",
    },
    "BSD 3": {
      badge:
        "![License: BSD 3](https://img.shields.io/badge/License-BSD%203--Clause-red.svg)\n",
      description:
        "This project is licensed under the 3-Clause BSD license. To learn more about BSD licenses, please visit: https://en.wikipedia.org/wiki/BSD_licenses.",
    },
    "GPL v3": {
      badge:
        "![License: GPL v3](https://img.shields.io/badge/License-GPLv3-green.svg)\n",
      description:
        "This project is licensed under the GNU General Public License (version 3). To learn more about GNU licenses, please visit: https://www.gnu.org/licenses/gpl-3.0.en.html",
    },
    MIT: {
      badge:
        "![License: MIT](https://img.shields.io/badge/License-MIT-red.svg)\n",
      description:
        "This project is licensed under the MIT License. To learn more about MIT licenses, please visit: https://en.wikipedia.org/wiki/MIT_License",
    },
    Mozilla: {
      badge:
        "![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-red.svg)\n",
      description:
        "This project is licensed under the Mozilla Public License. To learn more about the Mozilla license, please visit: https://www.mozilla.org/en-US/MPL/",
    },
  };

  return licenseBadges[license] || { badge: "", description: "" };
};

const generateReadmeFile = (answers) => {
  const readmePageContent = generateREADME(answers);

  fs.writeFile("README.md", readmePageContent, (err) => {
    if (err) {
      console.log("❌ ㅤError - please try again ❌");
    } else {
      console.log("✔️ ㅤYour README has been created ✔️");
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
      message: "Provide a description of your project",
    },
    {
      type: "input",
      name: "installation",
      message: "Provide setup instructions for your application",
    },
    {
      type: "input",
      name: "usage",
      message: "Provide applicable examples and guidance for usage",
    },
    {
      type: "input",
      name: "credits",
      message:
        "Cite collaborators and any third-party resources used for the project",
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
        "Add your Github profile and email address for questions or feedback",
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
      name: "license",
      message: "Choose a license for your project",
      choices: ["Apache", "BSD 3", "GPL v3", "MIT", "Mozilla", "No license"],
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
