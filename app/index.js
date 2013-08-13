'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var StarttterGenerator = module.exports = function StarttterGenerator(args, options) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(StarttterGenerator, yeoman.generators.Base);

StarttterGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [{
    'name': 'websiteName',
    'message': 'What is the name of your website?',
    'default': ""
  }];

  this.prompt(prompts, function (props) {
    this.websiteName = props.websiteName;

    cb();
  }.bind(this));
};

StarttterGenerator.prototype.app = function app() {
  this.mkdir('app');
  this.directory('app', 'app');
  this.copy('html/_index.html', 'app/public/index.html');

  this.template('README.md');
  this.copy('_package.json', 'package.json');
  this.copy('_bower.json', 'bower.json');
  this.copy('Gruntfile.js');
  this.copy('karma.conf.js');

  this.mkdir('test');
  this.directory('test', 'test');
};

StarttterGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('.bowerrc', '.bowerrc');
  this.copy('.travis.yml', '.travis.yml');
  this.copy('gitignore', '.gitignore');
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};
