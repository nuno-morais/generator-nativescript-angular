'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  constructor(args, opts)
  {
    super(args, opts);

    this.argument('name', { type: String, required: true });
    this.log(this.options.appname);
  }
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the riveting ' + chalk.red('generator-ng-nativescript') + ' generator!'
    ));

    const prompts = [];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    const componentName = this.options.name;
    this.fs.copy(
      this.templatePath('AngularModule.txt'),
      this.destinationPath(`${componentName}Module.ts`),
      { process: (content) => { return this.replaceComponent(content, componentName) }});
    this.fs.copy(
      this.templatePath('AngularRoutingModule.txt'),
      this.destinationPath(`${componentName}RoutingModule.ts`),
      { process: (content) => { return this.replaceComponent(content, componentName) }});
  }

  replaceComponent(content, componentName)
  {
    var regEx = new RegExp('<%= ComponentName %>', 'g');
    var newContent = content.toString().replace(regEx, componentName);
    return newContent;
  }

  install() {
    this.installDependencies();
  }
};
