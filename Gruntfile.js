module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        concat: {
            "options": { "separator": ";" },
            "build": {
                "src": ["/app/js/app.js"],
                "dest": "/app/js/app.js"
            }
        }
    });

    // Load required modules
    grunt.loadNpmTasks('grunt-serve');

    // Task definitions
    grunt.registerTask('default', ['concat']);
};