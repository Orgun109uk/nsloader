module.exports = function (grunt) {

  'use strict';

  var jsFiles = ['Gruntfile.js', 'index.js', 'src/*.js'];

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // jsHint configuration.
    jshint: {
      files: jsFiles
    },

    eslint: {
      target: jsFiles
    },

    // Simple Mocha configuration.
    simplemocha: {
      options: {
        globals: ['expect'],
        timeout: 3000,
        ignoreLeaks: false
      },
      all: {
        src: ['tests/*.js']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-simple-mocha');

  grunt.registerTask('default', ['jshint', 'eslint', 'simplemocha']);
};
