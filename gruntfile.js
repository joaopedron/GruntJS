module.exports = function(grunt) {
	'use strict';
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		//Instalação de plugins
		connect: {
			server: {
				options: {
					protocol: 'http',
					hostname: 'localhost',
					port: '9000',
					open: true,
					livereload: true,
					base: "."
				}
			}
		},
		less: {
			dev: {
				files: {"css/style.css": "less/main.less" }
			},
			dist: {
				files: {"css/style.min.css": "less/main.less" },
				options: { yuicompress: true}
			}
		},
		csslint: {
			dev: {
				csslintrc: '.csslintrc'
			},
			strict: {
					src: ['css/*']
				}
		},
		watch: {
			all: {
				files: 'index.html',
				options: {
					livereload: true
				}
			},
			css: {
				files: ['less/**/*'],
				tasks: ['buildcss']
			}
		}
	});
	//Load Plugins
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-csslint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	//RegisterTasks
	grunt.registerTask('createserver', ['connect:server']);
	grunt.registerTask('buildcss', ['less:dev', 'csslint:strict']);
	grunt.registerTask('run', ['createserver', 'watch']);
};