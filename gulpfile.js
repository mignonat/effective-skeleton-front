const gulp = require('gulp')
const babel = require('gulp-babel')
const concat = require('gulp-concat')
const nodemon = require('gulp-nodemon')

gulp.task('start-dev', function () {
    nodemon({
        script: 'server/server.js',
        ext: 'js html',
        env: { 'NODE_ENV': 'development' },
        tasks: [ 'concat-app'],
        ignore: [ 
            'doc', '.git', '.gitignore', 'gulpfile.js', 
            'LICENSE', 'node-modules', 'npm-debug.log', 'package.json', 'public',
            'README.md', 'todo'
        ]
    })
})

gulp.task('concat-lib', function() {
    return gulp.src([
        './node_modules/vue/dist/vue.js',
        './node_modules/vue-router/dist/vue-router.js',
        './node_modules/vuex/dist/vuex.js'
    ])
    .pipe(concat('lib.js'))
    .pipe(gulp.dest('./public/js/lib'))
})

gulp.task('concat-app', function() {
    return gulp.src([
	    './shared/locales.js',
        './client/app.js'
    ])
    .pipe(babel({
        presets: ['es2015']
    }))
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./public/js/app'))
})
