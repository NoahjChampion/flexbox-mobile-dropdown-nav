module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        sass: {
            options: {
                sourceMap: true
            },
            dist: {
                options: {
                    outputStyle: 'nested'
                },
                files: {
                    'css/navigation.<%= grunt.template.today("mm-dd-yyyy") %>.unprefixed.css': 'scss/navigation.scss',
                    'dist/css/nav-flexbox-only.<%= grunt.template.today("mm-dd-yyyy") %>.css' : 'scss/flex-only.scss',
                    'css/demo.<%= grunt.template.today("mm-dd-yyyy") %>.css' : 'scss/demo.scss'
                }
            }
        },

        watch: {
            grunt: { files: ['Gruntfile.js'] },

            sass: {
                files: 'scss/**/**/*.scss',
                tasks: ['sass']
            }
        },
        browserSync: {
            dev: {
                bsFiles: {
                    src: 'css/navigation.<%= grunt.template.today("mm-dd-yyyy") %>.css'
                },
                options: {
                    watchTask: true, // < VERY important
                    proxy: "localhost",
                    files: ["css/*.css", "*.html", "/js/**/*.js"]
                }
            }
        },

        cssmin: {
            options: {
                shorthandCompacting: true,
                roundingPrecision: -1,
                report: 'gzip'
            },
            dev: {
                files: {
                    'css/navigation.<%= grunt.template.today("mm-dd-yyyy") %>.min.css': ['css/dist/navigation.<%= grunt.template.today("mm-dd-yyyy") %>.min.css'],
                    'css/demo.<%= grunt.template.today("mm-dd-yyyy") %>.mininfied.css' : ['css/demo.<%= grunt.template.today("mm-dd-yyyy") %>.css']
                }
            },
            dist: {
                files: {
                    //'dist/css/navigation.<%= grunt.template.today("mm-dd-yyyy") %>.min.css': ['css/navigation.<%= grunt.template.today("mm-dd-yyyy") %>.min.css'],
                    'dist/css/nav-flexbox-only.<%= grunt.template.today("mm-dd-yyyy") %>.min.css' : ['dist/css/nav-flexbox-only.<%= grunt.template.today("mm-dd-yyyy") %>.css']
                }
            }
        },

        uglify: {
            my_target: {
                files: {
                    'js/navigation.min.js': ['js/navigation.js'],
                    'js/navigation.android-2.3.min.js' : ['js/classList.poly.js', 'js/navigation.js']
                }
            },
            dist: {
                files: {
                    'dist/js/navigation.min.js': ['js/navigation.js'],
                    'dist/js/navigation.android-ie8.min.js' : ['js/classList.poly.js', 'js/navigation.js']
                }
            }
        },

        pleeease: {
            custom: {
                options: {
                    autoprefixer: {'browsers': ['last 4 versions', 'ios 5', 'Android <= 4.4']},
                    filters: {'oldIE': true},
                    rem: ['16px', {'replace': false, 'atrules': true}],
                    minifier: true,
                    mqpacker: true,
                    pseudoElements: true,
                    opacity: true
                },
                files: {
                    'css/navigation.<%= grunt.template.today("mm-dd-yyyy") %>.min.css': 'css/navigation.<%= grunt.template.today("mm-dd-yyyy") %>.unprefixed.css',
                    'css/demo.<%= grunt.template.today("mm-dd-yyyy") %>.min.css' : 'css/demo.<%= grunt.template.today("mm-dd-yyyy") %>.css'
                }
            },
            dist: {
                options: {
                    autoprefixer: {'browsers': ['last 4 versions', 'ios 5', 'Android <= 4.4']},
                    filters: {'oldIE': true},
                    rem: ['16px', {'replace': false, 'atrules': true}],
                    minifier: true,
                    mqpacker: true,
                    pseudoElements: true,
                    opacity: true
                },
                files: {
                    'dist/css/navigation.<%= grunt.template.today("mm-dd-yyyy") %>.min.css': 'css/navigation.<%= grunt.template.today("mm-dd-yyyy") %>.unprefixed.css'
                }
            }

        }


    });

    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-pleeease');

    grunt.registerTask('build', ['sass', 'uglify:dist', 'pleeease:dist', 'cssmin:dist']);
    grunt.registerTask('dev', ['sass', 'browserSync', 'watch']);
    grunt.registerTask('default', ['build','browserSync','watch']);
};
