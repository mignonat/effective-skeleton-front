const gulp = require('gulp')
const babel = require('gulp-babel')
const concat = require('gulp-concat')
const nodemon = require('gulp-nodemon')
const forever = require('forever-monitor')

/****************** ENVIRONMENTS ******************/

const prod_env =  { 
    'NODE_ENV': 'production',
    'LOG_DIR': 'log',
    'LOG_APP_FILE': 'app.log',
    'LOG_APP_LEVEL': 'info',
    'LOG_CUSTOM_FILE': 'user.log',
    'LOG_CUSTOM_LEVEL': 'info'
}

const front_prod_env = Object.assign({}, prod_env, {
    'PORT': 8080
})

const back_prod_env = Object.assign({}, prod_env, {
    'PORT': 5151
})

const dev_env =  {
    'NODE_ENV': 'development', 
    'LOG_LEVEL': 'debug'
}

const front_dev_env = Object.assign({}, dev_env, {
    'PORT': 8080
})

const back_dev_env = Object.assign({}, dev_env, {
    'PORT': 5151
})

/****************** TASKS ******************/

gulp.task('start-back-prod', () => {
    const child = new (forever.Monitor)('./server/back/app.js', {
        'env': back_prod_env,
        'killTree': true, //kills the entire child process tree on `exit`
    })
    child.start()
})

gulp.task('start-front-prod', () => {
    const child = new (forever.Monitor)('./server/front/app.js', {
        'env': front_prod_env,
        'killTree': true, //kills the entire child process tree on `exit`
        //'max': 2 //remove it, for testing purpose
    })
    child.start()
})

gulp.task('start-back-dev', () => {
    return nodemon({
        exec: 'node-inspector & node --debug',
        script: 'server/back/app.js',
        ext: 'js',
        env: back_dev_env,
        ignore: [
            'doc', '.git', '.gitignore', 'gulpfile.js', 'LICENSE', 'node-modules', 
            'npm-debug.log', 'package.json', 'public', 'README.md', 'todo'
        ],
        debug: true
    })
})

gulp.task('start-front-dev', () => {
    return nodemon({
        exec: 'node-inspector & node --debug',
        script: 'server/front/app.js',
        ext: 'js',
        env: front_dev_env,
        tasks: [ 'concat-app'],
        ignore: [
            'doc', '.git', '.gitignore', 'gulpfile.js', 'LICENSE', 'node-modules', 
            'npm-debug.log', 'package.json', 'public', 'README.md', 'todo'
        ],
        debug: true
    })
})

gulp.task('concat-lib', () => {
    return gulp.src([
        './node_modules/vue/dist/vue.js',
        './node_modules/vue-router/dist/vue-router.js',
        './node_modules/vuex/dist/vuex.js'
    ])
    .pipe(concat('lib.js'))
    .pipe(gulp.dest('./public/js/lib'))
})

gulp.task('concat-app', () => {
    return gulp.src([
	    './client/app-locales.js',
        './client/app-check-params.js',
        './client/components/Error404Cmp.js',
        './client/components/ErrorCmp.js',
        './client/components/HomeCmp.js',
        './client/components/ContactCmp.js',
        './client/app-router.js',
        './client/app-store.js',
        './client/app.js'
    ])
    .pipe(babel({
        presets: ['es2015']
    }))
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./public/js/app'))
})
