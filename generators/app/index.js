"use strict";
import Generator from "yeoman-generator";
import prompting from "./prompting.js";

// Import tmp from "tmp";

export default class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.argument("destination", {
      type: String,
      required: true,
      description: "Destination directory where the demo will be generated"
    });
    this.destinationRoot(this.options.destination);

    this.skipInstall = true
    this.props = {}
  }

  async prompting() {
    return prompting.call(this);
  }

  writing() {
    this.log(`Scaffolding repeatable IP in '${this.options.destination}'...`);

    this.fs.copyTpl(
      this.templatePath("README.md"),
      this.destinationPath("README.md"),
      this.props
    );

    this.fs.copy(
      this.templatePath(".devcontainer"),
      this.destinationPath(".devcontainer")
    );

    this.fs.copyTpl(
      this.templatePath("pyproject.toml"),
      this.destinationPath("pyproject.toml"),
      this.props
    )

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

    this.fs.copy(this.templatePath("infra"), this.destinationPath("infra"));

    if (this.props.withFrontend) {
      this.fs.copyTpl(
        this.templatePath("src/frontend"),
        this.destinationPath("src/frontend"),
        this.props
      );
    }
    if (this.props.withBackend  ) {
      this.fs.copyTpl(
        this.templatePath("src/backend"),
        this.destinationPath("src/backend"),
        this.props
      );
    }
  }

  install() {
    this.spawnSync("git", ["init"]);
    this.spawnSync("git", ["add", "."]);
    this.spawnSync("git", ["commit", "-m", "Initial commit"]);
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
  }
}
