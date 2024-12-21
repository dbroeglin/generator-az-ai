"use strict";
import Generator from "yeoman-generator";

export default class extends Generator {
  async prompting() {
    const { parent } = this.options;
    const prompts = [
    ];

    this.parent = parent;

    return this.prompt(prompts).then(props => {
      parent.props = { ...parent.props, ...props };    })
  }

  default() {
    this.props = this.parent.props;
  }

  writing() {
    if (this.props.withFrontend) {
      this.fs.copyTpl(
        this.templatePath("src/frontend"),
        this.destinationPath("src/frontend"),
        this.props
      );
    }
  }
};
