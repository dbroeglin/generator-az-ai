"use strict";
import Generator from "yeoman-generator";

export default class BackendGenerator extends Generator {
  async prompting() {
    this.parent = this.options.parent;
    this.props = this.parent.props;
    const prompts = [
      {
        type: "confirm",
        name: "withBackend",
        message: "Do you want to configure your solution with a backend?",
        default: true,
        when: (answers) => !this.options.hasOwnProperty("withBackend"),
      },
    ];

    return this.prompt(prompts).then(answers => {
      this.parent.props = { ...this.parent.props, ...answers };
      this.parent.props.withBackend = ((answers.withBackend || this.parent.props.withBackend) + '').toLowerCase() === 'true'
    });
  }

  default() {
    this.props = this.parent.props;
  }

  writing() {
    if (!this.props.withBackend) {
      return;
    }
    this.log(`🛠️ Creating backend...`);

    this.fs.copyTpl(
      this.templatePath("src/backend"),
      this.destinationPath("src/backend"),
      this.props
    );
    this.fs.copy(
      this.templatePath("src/backend/.dockerignore"),
      this.destinationPath("src/backend/.dockerignore")
    );
    this.fs.write(
      this.destinationPath(`src/backend/.python-version`),
      this.props.pythonVersion
    );
  }

  end() {
    if (!this.props.withBackend) {
      return;
    }
    this.log(`Executing 'uv sync' in 'src/backend'...`);

    this.spawnSync("uv", ["sync"], {
      cwd: this.destinationPath('src/backend'),
    });
  }
};
