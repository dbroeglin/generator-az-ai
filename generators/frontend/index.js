"use strict";
import Generator from "yeoman-generator";

export default class FrontendGenerator extends Generator {
  async prompting() {
    this.parent = this.options.parent;
    this.props = this.parent.props;
    const prompts = [
      {
        type: "confirm",
        name: "withFrontend",
        message: "Do you want to configure your solution with a frontend?",
        default: true,
        when: (answers) => !this.options.hasOwnProperty("withFrontend"),
      },
    ];

    return this.prompt(prompts).then(answers => {
      this.parent.props = { ...this.parent.props, ...answers };
      this.parent.props.withFrontend = ((answers.withFrontend || this.parent.props.withFrontend) + '').toLowerCase() === 'true'

    });
  }

  default() {
    this.props = this.parent.props;
  }

  writing() {
    if (!this.props.withFrontend) {
      return;
    }
    this.log(`🎨 Creating frontend...`);

    this.fs.copyTpl(
      this.templatePath("src/frontend"),
      this.destinationPath("src/frontend"),
      this.props
    );
  }
};
