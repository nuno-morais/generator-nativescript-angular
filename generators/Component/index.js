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
      this.templatePath('AngularComponent.txt'),
      this.destinationPath(`${componentName}Component.ts`),
      { process: (content) => { return this.replaceComponent(content, componentName) }});
    this.fs.copy(
      this.templatePath('AngularView.txt'),
      this.destinationPath(`${componentName}View.html`),
      { process: (content) => { return this.replaceComponent(content, componentName) }});
    this.fs.copy(
      this.templatePath('AngularViewModel.txt'),
      this.destinationPath(`${componentName}ViewModel.ts`),
      { process: (content) => { return this.replaceComponent(content, componentName) }});
    this.fs.copy(
      this.templatePath('AngularViewStyles.txt'),
      this.destinationPath(`${componentName}ViewStyles.less`),
      { process: (content) => { return this.replaceComponent(content, componentName) }});
  }

  CopyTo(origin, target, name)
  {
    
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
