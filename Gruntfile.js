module.exports = function(grunt) {
  'use strict';
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
      all: ['dist/*.html', 'dist/assets/js/*.js', 'dist/assets/css/*.css'],
      main: ['dist/*.html']
    },
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['src/assets/js/*.js', 'src/assets/js/lib/*.js'],
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
      files: ['Gruntfile.js', 'src/assets/js/*.js'],
      options: {
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
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
    watch: {
      options: {
        atBegin: true
      },
      css: {
        files: ['src/assets/scss/**/*.scss'],
        tasks: ['compass'],
      },
      js: {
        files: ['<%= jshint.files %>'],
        tasks: ['jshint', 'concat']
      },
      assemble: {
        files: ['src/layouts/*.hbs', 'src/helpers/*.js', 'src/patterns/*', 'src/*.hbs'],
        tasks: ['clean:main', 'assemble']
      }
    }
  });

  // Load npm plugins to provide necessary tasks.
  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default tasks to be run.
  grunt.registerTask('default', ['clean:all', 'compass', 'concat', 'assemble']);
};
