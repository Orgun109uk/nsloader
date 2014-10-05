module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // jsHint configuration.
        jshint: {
            files: [ 'Gruntfile.js', 'index.js', 'lib/*.js', 'tests/*.js' ],
            options: {
                maxlen: 80,
                quotmark: 'single'
            }
        },

        // Simple Mocha configuration.
        simplemocha: {
            options: {
                globals: [ 'expect' ],
                timeout: 3000,
                ignoreLeaks: false,
                ui: 'bdd',
                reporter: 'tap'
            },
            all: {
                src: [ 'tests/*.js' ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-simple-mocha');

    grunt.registerTask('default', [ 'jshint', 'simplemocha' ]);
};