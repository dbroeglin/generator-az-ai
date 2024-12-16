import yosay from "yosay";
import chalk from "chalk";
import us from "underscore.string";
import path from "path";

const prompting = async function() {
  this.log(yosay(`Welcome to the fine ${chalk.red("AI GBB")} generator!`));
  const solutionBasename = path.basename(path.resolve(this.options.destination));
  const solutionName = us.titleize(us.humanize(solutionBasename));

  const prompts = [
    {
      type: "string",
      name: "solutionName",
      message: "What is the human readable name of your solution?",
      default: solutionName,
    },
    {
      type: "string",
      name: "solutionDescription",
      message: "What is the description of your solution?",
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
    },
    {
      type: "string",
      name: "creatorEmail",
      message: "What is the email of the solution creator?",
      default: await this.git.email(),
    },
    {
      type: "confirm",
      name: "withGitHub",
      message: "Do you want to configure your solution for GitHub?",
      default: true,
    },
    {
      type: "confirm",
      name: "withFrontend",
      message: "Do you want to configure your solution with a frontend?",
      default: true,
    },
    {
      type: "confirm",
      name: "withBackend",
      message: "Do you want to configure your solution with a backend?",
      default: true,
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
        },
        {
          type: "string",
          name: "gitHubRepo",
          message: "What is the GitHub repository you want to push to?",
          default: function() {
            return props.solutionSlug;
          },
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
    this.props.solutionPythonName = us.underscored(this.props.solutionSlug);
    this.props.gitHubRepoUrl = `https://github.com/${this.props.gitHubOrg}/${this.props.gitHubRepo}`;
  });
};

export default prompting;
