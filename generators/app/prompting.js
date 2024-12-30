import yosay from "yosay";
import chalk from "chalk";
import us from "underscore.string";
import path from "path";

const prompting = async function () {
  this.log(yosay(`Welcome to the fine ${chalk.red("AI GBB")} generator v${this.props.generatorVersion}!`));
  const solutionBasename = path.basename(path.resolve(this.options.destination));
  const solutionName = us.titleize(us.humanize(solutionBasename));
  const prompts = [
    {
      type: "string",
      name: "solutionName",
      message: "What is the human readable name of your solution?",
      default: solutionName,
      when: (answers) => !this.options.hasOwnProperty("solutionName"),
    },
    {
      type: "list",
      name: "solutionLevel",
      message: "What is the level of your solution?",
      choices: [
        {
          name: 'Level 100',
          value: 100,

          description: 'Basic configuration to start a simple AI application',
        },
        {
          name: 'Level 300',
          value: 300,
          description: 'Advanced scaffolding for a complex AI application (python packages, linting, coverage, etc.)',
        }
      ],
      default: 100,
      when: (answers) => !this.options.hasOwnProperty("solutionLevel"),
    },
    {
      type: "string",
      name: "solutionDescription",
      message: "What is the description of your solution?",
      default: (answers) => `Description of ${answers.solutionName || this.props.solutionName}`,
      when: (answers) => !this.options.hasOwnProperty("solutionDescription"),
    },
    {
      type: "string",
      name: "solutionSlug",
      message: "What is the solution's slug? (KebabCase, no spaces)",
      default: (answers) => us.slugify(answers.solutionName || this.props.solutionName),
      validate: (input) => us.slugify(input) === input,
      when: (answers) => !this.options.hasOwnProperty("solutionSlug"),
    },
    {
      type: "string",
      name: "solutionVersion",
      message: "What is the solution's initial version?",
      default: "0.1.0",
      when: (answers) => !this.options.hasOwnProperty("solutionVersion"),
    },
    {
      type: "string",
      name: "creatorName",
      message: "What is the name of the solution creator?",
      default: await this.git.name(),
      when: (answers) => !this.options.hasOwnProperty("creatorName"),
    },
    {
      type: "string",
      name: "creatorEmail",
      message: "What is the email of the solution creator?",
      default: await this.git.email(),
      when: (answers) => !this.options.hasOwnProperty("creatorEmail"),
    },
    {
      type: "confirm",
      name: "withFrontend",
      message: "Do you want to configure your solution with a frontend?",
      default: true,
      when: (answers) => !this.options.hasOwnProperty("withFrontend"),
    },
    {
      type: "confirm",
      name: "withBackend",
      message: "Do you want to configure your solution with a backend?",
      default: true,
      when: (answers) => !this.options.hasOwnProperty("withBackend"),
    },
    {
      type: "confirm",
      name: "withGitHub",
      message: "Do you want to configure your solution for GitHub?",
      default: true,
      when: (answers) => !this.options.hasOwnProperty("withGitHub"),
    },
  ];
  return this.prompt(prompts).then(promptingGitHub.bind(this)).then((_) => {
    this.props.solutionLevel = parseInt(this.props.solutionLevel);
  });
};

async function promptingGitHub(props) {
  this.props = { ...this.props, ...props };

  this.props.authorContact = `${this.props.creatorName} <${this.props.creatorEmail}>`;
  const prompts = this.props.withGitHub
    ? [
      {
        type: "string",
        name: "gitHubOrg",
        message: "What GitHub organization do you want to push to?",
        default: await this.github.username,
        when: (answers) => !this.options.hasOwnProperty("gitHubOrg"),
      },
      {
        type: "string",
        name: "gitHubRepo",
        message: "What is the GitHub repository you want to push to?",
        default: function () {
          return props.solutionSlug;
        },
        when: (answers) => !this.options.hasOwnProperty("gitHubRepo"),
      },
      {
        type: "confirm",
        name: "withGitHubPush",
        message:
          "Do you want to create the remote repository and push to GitHub (requires GitHub CLI)?",
        default: false,
        when: (answers) => !this.options.hasOwnProperty("withGitHubPush"),
      }
    ]
    : [];
  return this.prompt(prompts).then(props => {
    this.props = { ...this.props, ...props };
    this.props.solutionPythonName = us.underscored(this.props.solutionSlug);
    this.props.gitHubRepoUrl = `https://github.com/${this.props.gitHubOrg}/${this.props.gitHubRepo}`;
  });
};

export default prompting;
