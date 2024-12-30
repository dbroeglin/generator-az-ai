"use strict";
import Generator from "yeoman-generator";
import prompting from "./prompting.js";
import BackendGenerator from "../backend/index.js";
import FrontendGenerator from "../frontend/index.js";
import PackageGenerator from "../package/index.js";

import chalk from "chalk";
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

    this.composeWith(
      {
        Generator: BackendGenerator,
        path: '../backend/index.js'
      },
      {
        parent: this,
        ...this.options
      }
    );
    this.composeWith(
      {
        Generator: FrontendGenerator,
        path: '../frontend/index.js'
      },
      {
        parent: this,
        ...this.options
      }
    );
    this.composeWith(
      {
        Generator: PackageGenerator,
        path: '../package/index.js'
      },
      {
        parent: this,
        ...this.options
      }
    );
  }

  async prompting() {
    return prompting.call(this);
  }

  writing() {
    this.log(`🚀 Scaffolding repeatable IP in '${this.options.destination}'...`);

    this.fs.copyTpl(
      this.templatePath("README.md"),
      this.destinationPath("README.md"),
      this.props
    );

    this.fs.copy(
      this.templatePath(".devcontainer"),
      this.destinationPath(".devcontainer")
    );

    if (this.props.solutionLevel >= 300) {
      this.fs.copyTpl(
        this.templatePath("pyproject.toml"),
        this.destinationPath("pyproject.toml"),
        this.props
      )
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
  }

  end() {
    this.spawnSync("git", ["init"]);
    this.log(chalk.green("Git repository initialized."));
    if (this.spawnSync("git", ["status", "--porcelain"], {
      stdio: 'pipe'
    }).stdout.length > 0) {
      this.spawnSync("git", ["add", "."]);
      this.spawnSync("git", ["commit", "-m", "Initial commit"]);
    } else {
      this.log(chalk.yellow("No changes to commit."));
    }
    if (this.props.withGitHub) {
      if (this.props.withGitHubPush) {
        this.spawnSync("gh", [
          "repo",
          "create",
          `${this.props.gitHubOrg}/${this.props.gitHubRepo}`,
          "--private",
          "--source=.",
          "--remote=origin",
          "--push",
          "--description",
          `${this.props.solutionName} - ${this.props.solutionDescription}`,
          "--homepage", this.props.gitHubRepoUrl
        ]);
      }
    }
    return false;
  }
}
