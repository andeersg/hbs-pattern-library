'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    assemble: {
      options: {
        flatten: true,
        layout: 'src/layouts/default.hbs',
        assets: 'dist/assets',
        helpers: 'src/helpers/helper-*.js'
      },
      root: {
        src: 'src/*.hbs',
        dest: 'dist/'
      }
    },
    clean: {
      example: ['dist/*.html', 'dist/assets/js/*.js', 'dist/assets/css/*.css']
    },
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['src/assets/js/*.js'],
        dest: 'dist/assets/js/patterns.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> ' +
          '<%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'dist/assets/js/patterns.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'dev/js/*.js'],
      options: {
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        },
        jshintrc: '.jshintrc'
      }
    },
    compass: {
      dist: {
        options: {
          sassDir: 'src/assets/scss',
          cssDir: 'dist/assets/css',
          outputStyle: 'expanded'
        }
      }
    },
  });

  // Load npm plugins to provide necessary tasks.
  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-compass');

  // Default tasks to be run.
  grunt.registerTask('default', ['clean', 'compass', 'concat', 'assemble']);
};
