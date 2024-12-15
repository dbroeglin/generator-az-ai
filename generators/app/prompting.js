import yosay from "yosay";
import chalk from "chalk";
import us from "underscore.string";

const prompting = async function() {
  this.log(yosay(`Welcome to the fine ${chalk.red("AI GBB")} generator!`));

  const prompts = [
    {
      type: "string",
      name: "solutionName",
      message: "What is the human readable name of your solution?",
      store: true,
    },
    {
      type: "string",
      name: "solutionDescription",
      message: "What is the description of your solution?",
      store: true,
    },
    {
      type: "string",
      name: "solutionSlug",
      message: "What is the solution's slug? (KebabCase, no spaces)",
      default: function(answers) {
        return us.slugify(answers.solutionName);
      },
      validate: function(input) {
        return us.slugify(input) === input;
      },
      store: true,
    },
    {
      type: "string",
      name: "solutionVersion",
      message: "What is the solution's initial version?",
      default: "0.1.0"
    },
    {
      type: "string",
      name: "creatorName",
      message: "What is the name of the solution creator?",
      default: await this.git.name(),
      store: true,
    },
    {
      type: "string",
      name: "creatorEmail",
      message: "What is the email of the solution creator?",
      default: await this.git.email(),
      store: true,
    },
    {
      type: "confirm",
      name: "withGitHub",
      message: "Do you want to configure your project for GitHub?",
      default: true,
      store: true,
    }
  ];
  return this.prompt(prompts).then(promptingGitHub.bind(this));
};

async function promptingGitHub(props) {
  this.props = { ...this.props, ...props };
  const prompts = this.props.withGitHub
    ? [
        {
          type: "string",
          name: "gitHubOrg",
          message: "What GitHub organization do you want to push to?",
          default: await this.github.username,
          store: true,
        },
        {
          type: "string",
          name: "gitHubRepo",
          message: "What is the GitHub repository you want to push to?",
          default: function() {
            return props.solutionSlug;
          },
          store: true,
        },
        {
          type: "confirm",
          name: "withGitHubPush",
          message:
            "Do you want to create the remote repository and push to GitHub (requires GitHub CLI)?",
          default: false,
        }
      ]
    : [];
  return this.prompt(prompts).then(props => {
    this.props = { ...this.props, ...props };
    this.props.solutionPythonName = us.camelize(this.props.solutionSlug);
    this.props.gitHubRepoUrl = `https://github.com/${this.props.gitHubOrg}/${this.props.gitHubRepo}`;
  });
};

export default prompting;
