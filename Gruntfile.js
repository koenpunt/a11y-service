module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %> */\n',

    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: ['app/assets/javascripts/main.js'],
        dest: 'public/assets/app.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: '<%= concat.dist.dest.replace(/\.js$/, ".min.js") %>'
      }
    },

    sass: {
      options: {
        sourceMap: false,
        outputStyle: 'compressed'
      },
      dist: {
        files: {
          'public/assets/app.css': 'app/assets/stylesheets/main.scss'
        }
      }
    },

    watch: {
      assets: {
        files: 'app/assets/**/*',
        tasks: ['build']
      },
      gruntfile: {
        files: 'Gruntfile.js',
        tasks: ['build']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sass');

  grunt.registerTask('build', ['sass', 'concat', 'uglify']);

  grunt.registerTask('default', ['build']);

};
