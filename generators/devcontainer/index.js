'use strict';
import Generator from "yeoman-generator";
import chalk from "chalk";
import yosay from "yosay";
import us from "underscore.string";

//import tmp from "tmp";

export default class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.destinationRoot(this.options.destination);
  }

  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the fine ${chalk.red('AI GBB')} generator!`
      )
    );
  }

  writing() {
    this.log(`Generating DevContainer/Codespace configuration in '${this.options.destination}'...`);

    this.fs.copy(
      this.templatePath('.devcontainer'),
      this.destinationPath('.devcontainer')
    );
  }
};
