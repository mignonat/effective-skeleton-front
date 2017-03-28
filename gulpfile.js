const gulp = require('gulp')
const babel = require('gulp-babel')
const concat = require('gulp-concat')
 
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
	//add cmponents here
        './client/app.js'
    ])
    .pipe(babel({
        presets: ['es2015']
    }))
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./public/js/lib'))
})
