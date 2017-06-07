const gulp = require('gulp')
const babel = require('gulp-babel')
const concat = require('gulp-concat')
const nodemon = require('gulp-nodemon')
const forever = require('forever-monitor')
const rename = require('gulp-rename')
const props2json = require('gulp-props2json')
const insert = require('gulp-insert')
const clean = require('gulp-clean')
const extReplace = require('gulp-ext-replace')
const webpack = require('webpack-stream')
const gulpSync = require('gulp-sync')(gulp)

/****************** CONST ******************/

const dir_client_translation = './src/client/vuex/modules/locale/translations'
const dir_asset_src = './src/client/resource/*'
const dir_asset_dest = './public'
const file_front_app = './src/server/front/app.js'
const file_back_app = './src/server/back/app.js'

const nodemon_common_ignore = [
    // nodemon is only listening for .js and .vue files
    'gulpfile.js', 'node-modules', 'public', 'src/test', '.git', 'src/client/', 'package.json'
]
const files_front_nodemon_ignore = nodemon_common_ignore.concat([
    'src/server/back/'
])
const files_back_nodemon_ignore = nodemon_common_ignore.concat([
    'src/server/front/'
])

/****************** BACK PROD ******************/

gulp.task('back-run-forever', () => {
    return new (forever.Monitor)(file_back_app, {
            'env': {
                NODE_ENV : 'production', 
                APP_TYPE : 'back'
            },
            'killTree': true, //kills the entire child process tree on `exit`
        })
        .start()
})

gulp.task('start-back-prod', gulpSync.sync([
    'back-run-forever'
]))

/****************** FRONT PROD ******************/

gulp.task('front-run-forever', () => {
    return new (forever.Monitor)(file_front_app, {
            'env': { 
                NODE_ENV : 'production', 
                APP_TYPE : 'front'
            },
            'killTree': true, //kills the entire child process tree on `exit`
            //'max': 2 //remove it, for testing purpose
        })
        .start()
})

gulp.task('start-front-prod', gulpSync.sync([
    'front-translations',
    'webpack-prod',
    'front-run-forever'
]))

/****************** BACK DEV ******************/

gulp.task('back-run-nodemon', () => {
    return nodemon({
            exec : 'node --debug', //node-inspector & node --inspect
            script : file_back_app,
            ext : 'js',
            env : { 
                'NODE_ENV': 'development', 
                'APP_TYPE': 'back' 
            },
            ignore : files_back_nodemon_ignore
        })
})

gulp.task('start-back-dev', gulpSync.sync([ 
    'back-run-nodemon'
]))

/****************** FRONT DEV ******************/

gulp.task('front-run-nodemon', () => {
    return nodemon({
            exec : 'node --debug',
            verbose: true,
            script : file_front_app,
            ext : 'js vue css html',
            env : { 
                'NODE_ENV': 'development', 
                'APP_TYPE': 'front' 
            },
            tasks : [ /* 'webpack' */ ],
            ignore : files_front_nodemon_ignore
        })
})

gulp.task('start-front-dev', gulpSync.sync([ 
    'front-translations',
    'webpack-dev',
    'front-run-nodemon'
]))

/****************** BACK & FRONT PROD ******************/

gulp.task('start-both-prod', gulpSync.sync([
    'start-back-prod',
    'start-front-prod'
]))

/****************** WEBPACK ******************/

gulp.task('webpack-dev', () => {
    const webpackConfig = require('./webpack/dev.js')
    return gulp.src('src/client/app.js')
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest('public/assets'));
})

gulp.task('webpack-prod', () => {
    const webpackConfig = require('./webpack/prod.js')
    return gulp.src('src/client/app.js')
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest('public/assets'));
})

/****************** FRONT TRANSLATIONS ******************/

gulp.task('front-translations', gulpSync.sync([
    'front-translation-prop-to-json',
    'front-translation-add-js-variable',
    'front-translation-rename-json-to-js',
    'front-translation-remove-temp-files'
]))

gulp.task('front-translation-remove-temp-files', () => {
    return gulp.src([
            dir_client_translation+'/json',
            dir_client_translation+'/*.json'
        ], {read: false})
        .pipe(clean())
})

gulp.task('front-translation-rename-json-to-js', () => {
    return gulp.src(dir_client_translation+'/*.json')
        .pipe(extReplace('js'))
        .pipe(gulp.dest(dir_client_translation))
})

gulp.task('front-translation-add-js-variable', () => {
    return gulp.src(dir_client_translation+'/json/*')
        .pipe(insert.transform(function(contents, file) {
            return 'export default '+contents+'\r\n'
        }))
        .pipe(gulp.dest(dir_client_translation))
})

gulp.task('front-translation-prop-to-json', () => {
    return gulp.src('./translations/client/*.properties')
        .pipe(props2json({ minify : false }))
        .pipe(gulp.dest(dir_client_translation+'/json'))
})

/****************** BACK TRANSLATIONS ******************/

gulp.task('back-translations', gulpSync.sync([ '' ]))