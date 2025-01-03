"use strict";
import Generator from "yeoman-generator";
import prompting from "./prompting.js";
import BackendGenerator from "../backend/index.js";
import FrontendGenerator from "../frontend/index.js";
import PackageGenerator from "../package/index.js";
import GitHubGenerator from "../git-hub/index.js";

import chalk from "chalk";
import us from "underscore.string";
import pkg from '../../package.json' with { type: "json" };

export default class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.argument("destination", {
      type: String,
      required: true,
      description: "Destination directory where the demo will be generated"
    });
    this.destinationRoot(this.options.destination);
    this.props = this.options;
    this.props.generatorVersion = pkg.version;
    this.props.pythonVersion = '3.12';

    [
      BackendGenerator,
      FrontendGenerator,
      PackageGenerator,
      GitHubGenerator,
    ].forEach((subgen) => {
      if (subgen.name === 'default') {
        throw new Error('Make sure you named your subgenerator class.');
      }
      const moduleName = us.dasherize(us.decapitalize(subgen.name.replace('Generator', '')))
      this.composeWith(
        { Generator: subgen, path: `../${moduleName}/index.js` },
        { parent: this, ...this.options }
      );
    });
  }

  async prompting() {
    return prompting.call(this);
  }

  writing() {
    this.log(`🚀 Scaffolding solution in '${this.options.destination}'...`);

    this.fs.copyTpl(
      this.templatePath("README.md"),
      this.destinationPath("README.md"),
      this.props
    );

    this.fs.copy(
      this.templatePath("TIPS_AND_TRICKS.md"),
      this.destinationPath("TIPS_AND_TRICKS.md")
    );

    this.fs.copyTpl(
      this.templatePath(".devcontainer"),
      this.destinationPath(".devcontainer"),
      this.props
    );

    if (this.props.solutionLevel >= 300) {
      // only create UV workspaces if solution level is 300 or higher
      this.fs.copyTpl(
        this.templatePath("pyproject.toml"),
        this.destinationPath("pyproject.toml"),
        this.props
      )

      this.fs.write(
        this.destinationPath(".python-version"),
        this.props.pythonVersion
      );
    }

    this.fs.copyTpl(
      this.templatePath("azure.yaml"),
      this.destinationPath("azure.yaml"),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath("scripts"),
      this.destinationPath("scripts"),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath("infra"),
      this.destinationPath("infra"),
      this.props
    );

    if (this.props.solutionLevel > 100) {
      this.fs.copy(
        this.templatePath(".dockerignore"),
        this.destinationPath(".dockerignore")
      );
    }

    return false;
  }

  end() {
    this.log(chalk.green(`🎉 '${this.props.solutionName}' has been successfully scaffolded in  '${this.options.destination}'.`));
  }
}

