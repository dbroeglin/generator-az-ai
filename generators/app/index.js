'use strict';
import Generator from "yeoman-generator";
import chalk from "chalk";
import yosay from "yosay";
import us from "underscore.string";

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
            message: 'What GitHub organization do you want to push to?'
          },
          {
            type: 'string',
            name: 'gitHubRepo',
            message: 'What is the GitHub repository you want to push to?',
            default: function(answers) {
              return props.solutionSlug;
            }
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

    this.fs.copy(
      this.templatePath('.devcontainer'),
      this.destinationPath('.devcontainer')
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
  }
};
