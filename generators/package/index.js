"use strict";
import Generator from "yeoman-generator";
import us from "underscore.string";

export default class extends Generator {
  async prompting() {
    const { parent } = this.options;
    this.parent = parent;
    this.props = parent.props;
    const prompts = [
      {
        type: "confirm",
        name: "withPackage",
        message: "Do you want to configure your solution with a package?",
        default: true,
        when: (answers) => !this.options.hasOwnProperty("withPackage") && this.props.solutionLevel >= 300,
      },
    ];
    async function promptingPackage(answers) {
      this.props.withPackage = ((answers.withPackage || this.props.withPackage) + '').toLowerCase() === 'true'
      const prompts = this.props.withPackage
        ? [
          {
            type: "string",
            name: "packageName",
            message: "What is your package's slug?",
            default: (_) => `${this.props.solutionName} Core`,
            when: (answers) => !this.options.hasOwnProperty("packageName"),
          },
          {
            type: "string",
            name: "packageDescription",
            message: "What is the description of your package?",
            default: (answers) => `Description of ${answers.packageName || this.props.packageName}`,
            when: (answers) => !this.options.hasOwnProperty("packageDescription"),
          },
          {
            type: "string",
            name: "packageSlug",
            message: "What is your package's slug?",
            default: (answers) => us.slugify(answers.packageName || this.props.packageName),
            validate: (input) => us.slugify(input) === input,
            when: (answers) => !this.options.hasOwnProperty("packageSlug"),
          },
        ]
        : [];
        return this.prompt(prompts).then(answers => {
          parent.props = { ...this.props, ...answers };
          parent.props.packagePythonName = us.underscored(parent.props.packageSlug);
          console.log(`Finished Prompting package:`, this.parent.props);
        });
    };

    return this.prompt(prompts).then(promptingPackage.bind(this));
  }

  default() {
    this.props = this.parent.props;
  }

  writing() {
    if (this.props.withPackage) {
      this.log(`📦 Creating package ${this.props.packageName} (${this.props.packageSlug})...`);
      this.fs.copyTpl(
        this.templatePath("src/package_slug/pyproject.toml"),
        this.destinationPath(`src/${this.props.packageSlug}/pyproject.toml`),
        this.props
      );
      this.fs.copyTpl(
        this.templatePath("src/package_slug/README.md"),
        this.destinationPath(`src/${this.props.packageSlug}/README.md`),
        this.props
      );
      this.fs.copyTpl(
        this.templatePath("src/package_slug/src/package_name/__init__.py"),
        this.destinationPath(`src/${this.props.packageSlug}/src/${this.props.packagePythonName}/__init__.py`),
        this.props
      );
      this.fs.copyTpl(
        this.templatePath("src/package_slug/src/tests/test_hello.py"),
        this.destinationPath(`src/${this.props.packageSlug}/tests/test_hello.py`),
        this.props
      );
    }
  }
};
