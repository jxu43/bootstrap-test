'use strict'

module.exports = function(grunt){
	
	require('time-grunt')(grunt);
	
	require('jit-grunt')(grunt, {
		useminPrepare: 'grunt-usemin'
	});
	
	grunt.initConfig({
		sass: {
			dist: {
				files: {
					'css/styles.css': 'css/styles.scss'
				}
			}
		},
		
		watch: {
			files: 'css/*.scss', 
			tasks: ['sass']
		},
		
		browserSync: {
			dev: {
				bsFiles: {
					src: [
						'css/*.css',
						'*.html',
						'js/*.js'
					]
				},
				options: {
					watchTask: true,
					server: {
						baseDir: './'
					}
				}
			}
		},
		
		copy: {
			html: {
				files:[{
					expand: true,
					dot: true,
					cwd: './',
					src: ['*.html'],
					dest: 'dist'
				}]
			},
			font: {
				files: [{
					expand: true,
					dot: true,
					cwd: 'node_modules/font-awesome',
					src: ['fonts/*.*'],
					dest: 'dist'
				}]
			}
		},
		
		clean: {
			build: {
				src: ['dist/']
			}
		},
		
		imagemin: {
			dynamic: {
				files: [{
					expand: true,			// Enable dynamic expansion
					cwd: './',				// Src matches are relative to
					src: ['img/*.{png, jpg, gif}'],		// Actual patterns to match
					dest: 'dist/'						// Destination path prefix
				}]
			}
		},
		
		useminPrepare: {
			foo: {
				dest: 'dist',
				src: ['contactus.html', 'aboutus.html', 'index.html']
			},
			options: {
				flow: {
					steps: {
						css: ['cssmin'],
						js: ['uglify']
					},
					post: {
						css: [{
							name: 'cssmin',
							createConfig: function(context, block) {
								var generated = context.options.generated;
								generated.option = {
									keepSpecialComments: 0,
									rebase: false
								};
							}
						}]
					}
				}
			}
		},
		
		//concat
		concat: {
			options: {
				separator: ';'
			},
			
			dist: {}
		},
		
		 // Uglify
        uglify: {
            // dist configuration is provided by useminPrepare
            dist: {}
        },

        cssmin: {
            dist: {}
        },
		
		//FileRev
		filerev: {
			options: {
				encoding: 'utf8',
				algorithm: 'md5',
				length: 20
			},
			
			release: {
				files: [{
					src: [
						'dist/js/*.js',
						'dist/css/*.css'
					]
				}]
			}
		},
		
		usemin: {
			html: ['dist/contactus.html','dist/aboutus.html','dist/index.html'],
			options: {
                assetsDirs: ['dist', 'dist/css','dist/js']
            }
		}
	});
	
	grunt.registerTask('css', ['sass']);
	grunt.registerTask('default', ['browserSync', 'watch']);
	grunt.registerTask('build', [
		'clean',
		'copy',
		'imagemin',
		'useminPrepare',
        'concat',
        'cssmin',
        'uglify',
        'filerev',
        'usemin'
	]);
}