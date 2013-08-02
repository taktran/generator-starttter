/*global describe, beforeEach, it*/
'use strict';

var path    = require('path');
var helpers = require('yeoman-generator').test;


describe('starttter generator', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('starttter:app', [
        '../../app'
      ]);
      done();
    }.bind(this));
  });

  it('creates expected project files', function (done) {
    var expected = [
      // add files you expect to exist here.
      '.bowerrc',
      '.editorconfig',
      '.gitignore',
      '.jshintrc',
      '.travis.yml'
    ];

    helpers.mockPrompt(this.app, {
      'websiteName': 'Some website'
    });
    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFiles(expected);
      done();
    });
  });

  it('creates expected app files', function (done) {
    var expected = [
      'bower.json',
      'package.json',
      'Gruntfile.js',
      'karma.conf.js',
      'README.md',

      'app/index.html'
    ];

    helpers.mockPrompt(this.app, {
      'websiteName': 'Some website'
    });
    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFiles(expected);
      done();
    });
  });
});
