"use strict";
import Generator from "yeoman-generator";

export default class extends Generator {
  async prompting() {
    const { parent } = this.options;
    const prompts = [
    ];

    this.parent = parent;

    return this.prompt(prompts).then(props => {
      this.props = { ...this.parent.props, ...props };
    })
  }

  default() {
    this.props = this.parent.props;
  }

  writing() {
    if (this.props.withBackend) {
      this.fs.copyTpl(
        this.templatePath("src/backend"),
        this.destinationPath("src/backend"),
        this.props
      );
    }
  }
};
