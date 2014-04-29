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
      'config/karma.conf.js',
      'Procfile',
      'README.md',

      'app/public/index.html',
      'app/public/js/app.js',
      'app/public/vendor/modernizr-2.6.2-respond-1.1.0.min.js',
      'app/public/css/main.css',

      'app/views/sass/main.scss',

      'bin/server.js'
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
