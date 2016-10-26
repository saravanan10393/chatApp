module.exports = function (grunt) {
    grunt.initConfig({
        compass: {
            div: {
                options: {
                    basePath: "public",
                    sassDir: 'sass',
                    cssDir: 'css',
                    specify: './public/sass/main.scss',
                }
            }
        },
        watch: {
            files: ['./public/sass/*.scss','./public/sass/**/*.scss'],
            tasks: ['compass'],
            options: {
                livereload: true,
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-watch');


    grunt.registerTask('default', ['compass','watch']);
}