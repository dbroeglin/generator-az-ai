'use strict';
import Generator from "yeoman-generator";
import chalk from "chalk";
import yosay from "yosay";
import us from "underscore.string";
import DevContainerGenerator from "../devcontainer/index.js";

//import tmp from "tmp";

export default class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.argument("destination", {
      type: String,
      required: true,
      description: "Destination directory where the demo will be generated"
    });
    this.destinationRoot(this.options.destination);

    this.composeWith({Generator: DevContainerGenerator.default, path: '../devcontainer/index.js'}, {
      destination: this.options.destination
    });
  }

  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the fine ${chalk.red('AI GBB')} generator!`
      )
    );

    const prompts = [
      {
        type: 'string',
        name: 'solutionName',
        message: 'What is the human readable name of your solution?'
      },
      {
        type: 'string',
        name: 'solutionSlug',
        message: 'What is the solution\'s slug?',
        default: function(answers) {
          return us.slugify(answers.solutionName);
        }
      },
      {
        type: 'string',
        name: 'solutionDescription',
        message: 'What is the description of your solution?'
      },
      {
        type: 'confirm',
        name: 'withGitHub',
        message: 'Do you want to push to GitHub?',
        default: true
      }
    ];
    return this.prompt(prompts).then(props => {
      this.props = props;
      const prompts2 = this.props.withGitHub ? [
          {
            type: 'string',
            name: 'gitHubOrg',
            message: 'What GitHub organization do you want to push to?',
            default: this.github.username
          },
          {
            type: 'string',
            name: 'gitHubRepo',
            message: 'What is the GitHub repository you want to push to?',
            default: function(answers) {
              return props.solutionSlug;
            }
          },
          {
            type: 'confirm',
            name: 'withGitHubPush',
            message: 'Do you want to create the remote repository and push to GitHub?',
            default: false
          }
        ] : [];
      return this.prompt(prompts2).then(props => {
        this.props = { ...this.props, ...props };
      });
    });
  }

  writing() {
    this.log(`Scaffolding repeatable IP in '${this.options.destination}'...`);
    this.log(`Props: ${JSON.stringify(this.props)}`);

    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath('azure.yaml'),
      this.destinationPath('azure.yaml'),
      this.props
    );

    this.fs.copy(
      this.templatePath('infra'),
      this.destinationPath('infra')
    );
  }

  install() {
    this.spawnSync('git', ['init'], );
    this.spawnSync("git", ["add", "."]);
    this.spawnSync("git", ["commit", "-m", "Initial commit"]);
    if (this.props.withGitHub) {
      if (this.props.withGitHubPush) {
        this.spawnSync("gh", ["repo", "create",
          `${this.props.gitHubOrg}/${this.props.gitHubRepo}`,
          "--private", "--source=.", "--remote=origin"]);
      }
    }
  }
};
