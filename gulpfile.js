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
const app_index = './src/server/app.js'

/****************** FOREVER ******************/

gulp.task('run-forever', () => {
    return new (forever.Monitor)(app_index, {
            'env': { 
                NODE_ENV : 'production'
            },
            'killTree': true, //kills the entire child process tree on `exit`
            //'max': 2 //remove it, for testing purpose
        })
        .start()
})

/****************** NODEMON ******************/

gulp.task('front-run-nodemon', () => {
    return nodemon({
            exec : 'node --debug',
            verbose: true,
            script : app_index,
            ext : 'js vue css html',
            env : { 
                'NODE_ENV': 'development', 
                'APP_TYPE': 'front' 
            },
            tasks : [ /* 'webpack' */ ],
            ignore : [ // nodemon is only listening for .js and .vue files
                'gulpfile.js', 'node-modules', 'public', 'src/test', '.git', 'src/client/', 'package.json'
            ]
        })
})

/****************** BUILD ******************/

gulp.task('build-prod', gulpSync.sync([
    'front-translations',
    'webpack-prod',
]))

gulp.task('build-dev', gulpSync.sync([
    'front-translations',
    'webpack-dev',
]))

/****************** START ******************/

gulp.task('start-prod', gulpSync.sync([
    'front-run-forever'
]))

gulp.task('start-dev', gulpSync.sync([
    'front-run-nodemon'
]))

/****************** BUILD AND START ******************/

gulp.task('build-and-start-dev', gulpSync.sync([ 
    'build-dev',
    'start-dev'
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