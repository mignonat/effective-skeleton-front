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

const envFileName = 'env.properties'
const envDir = '.'

/****************** TASKS ******************/

gulp.task('start-back-prod', () => {
    
    return gulp.src('./env/back-prod.properties')
        .pipe(rename(envFileName))
        .pipe(gulp.dest(envDir))
        .on('end', () => {

            new (forever.Monitor)('./server/back/app.js', {
                'env': { 'NODE_ENV': 'production' },
                'killTree': true, //kills the entire child process tree on `exit`
            }).start()
        })
})

gulp.task('start-front-prod', () => {

    return gulp.src('./env/front-prod.properties')
        .pipe(rename(envFileName))
        .pipe(gulp.dest(envDir))
        .on('end', () => {
            new (forever.Monitor)('./server/front/app.js', {
                'env': { 'NODE_ENV': 'production' },
                'killTree': true, //kills the entire child process tree on `exit`
                //'max': 2 //remove it, for testing purpose
            }).start()
        })
})

gulp.task('start-back-dev', () => {

    return gulp.src('./env/back-dev.properties')
        .pipe(rename(envFileName))
        .pipe(gulp.dest(envDir))
        .on('end', () => {

            nodemon({
                exec: 'node --inspect', //node-inspector & node --inspect
                script: 'server/back/app.js',
                ext: 'js',
                env: { 'NODE_ENV': 'development' },
                ignore: [
                    'doc', '.git', '.gitignore', 'gulpfile.js', 'LICENSE', 'node-modules', 
                    'npm-debug.log', 'package.json', 'public', 'README.md', 'todo'
                ]
            })
        })
})

gulp.task('start-front-dev', () => {

    return gulp.src('./env/front-dev.properties')
        .pipe(rename(envFileName))
        .pipe(gulp.dest(envDir))
        .on('end', () => {

            nodemon({
                exec: 'node --inspect',
                script: 'server/front/app.js',
                ext: 'js',
                env: { 'NODE_ENV': 'development' },
                tasks: [ 'concat-app-translations', 'concat-app' ],
                ignore: [
                    'doc', '.git', '.gitignore', 'gulpfile.js', 'LICENSE', 'node-modules', 
                    'npm-debug.log', 'package.json', 'public', 'README.md', 'todo'
                ]
            })
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
            './client/locales/translations/*',
            './client/locales/app-locales.js',
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

gulp.task('concat-app-translations', () => {
    
    return gulp.src('./translations/client/*.properties')
        .pipe(props2json({ minify : false }))
        .pipe(gulp.dest('./client/locales/translations/json'))
        .on('end', () => {
            
            gulp.src('./client/locales/translations/json/*')
            .pipe(insert.transform(function(contents, file) {
                const path = file.path
                const fileName = path.substr(path.lastIndexOf('/')+1, path.length).replace(".json", "")
                return 'const translation_map_'+fileName+' = '+contents+'\r\n'
            }))
            .pipe(gulp.dest('./client/locales/translations'))
            .on('end', () => {

                gulp.src('./client/locales/translations/*.json')
                    .pipe(extReplace('js'))
                    .pipe(gulp.dest('./client/locales/translations'))
                    .on('end', () => {

                        gulp.src([
                            './client/locales/translations/json',
                            './client/locales/translations/*.json'
                        ], {read: false})
                        .pipe(clean())
                    })
            })
    })
})

