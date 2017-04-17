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
const gulpSync = require('gulp-sync')(gulp)

/****************** CONST ******************/

const file_front_app = './src/server/front/app.js'
const file_back_app = './src/server/back/app.js'
const file_env = 'env.properties'

const dir_env = '.'
const dir_client_translation = './src/client/locales/translations'

const nodemon_common_ignore = [
    'doc', '.git', '.gitignore', 'gulpfile.js', 'LICENSE', 'node-modules', 'log',
    'npm-debug.log', 'package.json', 'public', 'README.md', 'todo', 'env.properties'
]
const files_front_nodemon_ignore = nodemon_common_ignore.concat([
    dir_client_translation,
    'src/back/'
])
const files_back_nodemon_ignore = nodemon_common_ignore.concat([
    'src/client/'
])

const setEnvFn = (server, env) => {
    return gulp.src('./env/'+server+'-'+env+'.properties')
        .pipe(rename(file_env))
        .pipe(gulp.dest(dir_env))
} 

/****************** BACK PROD ******************/

gulp.task('back-set-env-prod', () => {
    return setEnvFn('back','prod')
})

gulp.task('back-run-forever', () => {
    return new (forever.Monitor)(file_back_app, {
            'env': { NODE_ENV : 'production' },
            'killTree': true, //kills the entire child process tree on `exit`
        })
        .start()
})

gulp.task('start-back-prod', gulpSync.sync([ 
    'back-set-env-prod',
    'back-run-forever'
]))

/****************** FRONT PROD ******************/

gulp.task('front-set-env-prod', () => {
    return setEnvFn('front','prod')
})

gulp.task('front-run-forever', () => {
    return new (forever.Monitor)(file_front_app, {
            'env': { NODE_ENV : 'production' },
            'killTree': true, //kills the entire child process tree on `exit`
            //'max': 2 //remove it, for testing purpose
        })
        .start()
})

gulp.task('start-front-prod', gulpSync.sync([
    'front-translations',
    //'front-concat-app',
    'front-concat-lib',
    'front-set-env-prod',
    'front-run-forever'
]))

/****************** BACK DEV ******************/

gulp.task('back-set-env-dev', () => {
    return setEnvFn('back','dev')
})

gulp.task('back-run-nodemon', () => {
    return nodemon({
            exec : 'node --debug', //node-inspector & node --inspect
            script : file_back_app,
            ext : 'js',
            env : { 'NODE_ENV': 'development' },
            ignore : files_back_nodemon_ignore
        })
})

gulp.task('start-back-dev', gulpSync.sync([ 
    'back-set-env-dev',
    'back-run-nodemon'
]))

/****************** FRONT DEV ******************/

gulp.task('front-set-env-dev', () => {
    return setEnvFn('front','dev')
})

gulp.task('front-run-nodemon', () => {
    return nodemon({
            exec : 'node --debug',
            script : file_front_app,
            ext : 'js',
            env : { 'NODE_ENV': 'development' },
            tasks : [ 
                'front-translations', 
                //'front-concat-app' 
            ],
            ignore : files_front_nodemon_ignore
        })
})

gulp.task('start-front-dev', gulpSync.sync([ 
    'front-translations',
    //'front-concat-app',
    'front-concat-lib',
    'front-set-env-dev',
    'front-run-nodemon'
]))

/****************** CONCAT FRONT LIB ******************/

gulp.task('front-concat-lib', () => {
    return gulp.src([
            './node_modules/vue/dist/vue.js',
            './node_modules/vue-router/dist/vue-router.js',
            './node_modules/vuex/dist/vuex.js'
        ])
        .pipe(concat('lib.js'))
        .pipe(gulp.dest('./public/js/lib'))
})

/****************** CONCAT APP ******************/

gulp.task('front-concat-app', () => {
    return gulp.src([
            dir_client_translation+'/*',
            './src/client/locales/app-locales.js',
            './src/client/app-check-params.js',
            './src/client/components/Error404Cmp.js',
            './src/client/components/ErrorCmp.js',
            './src/client/components/HomeCmp.js',
            './src/client/components/ContactCmp.js',
            './src/client/app-router.js',
            './src/client/app-store.js',
            './src/client/app.js'
        ])
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(concat('app.js'))
        .pipe(gulp.dest('./public/js/app'))
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
            const path = file.path
            const fileName = path.substr(path.lastIndexOf('/')+1, path.length).replace(".json", "")
            return 'const translation_map_'+fileName+' = '+contents+'\r\n'
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