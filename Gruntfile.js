/*global require:true, module:false*/
module.exports = function (grunt) {
  'use strict';

  // Load Grunt tasks declared in the package.json file
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      gruntfile: {
        src: ['Gruntfile.js']
      },
      app: {
        src: ['app/*.js', 'app/js/*.js']
      },
      test: {
        src: ['test/*.js']
      }
    },

    simplemocha: {
      options: {
        timeout: 3000
      },

      all: { src: ['test/test-*.js'] }
    },

    watch: {
      jshintrc: {
        files: '.jshintrc',
        tasks: ['jshint:jshintrc']
      },
      gruntfile: {
        files: 'Gruntfile.js',
        tasks: ['jshint:gruntfile']
      },
      scripts: {
        files: ['app/**/*'],
        tasks: ['simplemocha', 'jshint']
      },
      test: {
        files: '<%= jshint.test.src %>',
        tasks: ['simplemocha', 'jshint']
      }
    }
  });

  grunt.registerTask('default', ['watch']);

};
