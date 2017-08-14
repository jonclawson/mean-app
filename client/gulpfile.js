var es = require('event-stream');
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var gulpif = require('gulp-if');
var cleanCSS = require('gulp-clean-css');

var source = {
    js: {
        main: 'app/main.js',
        src: [
            // application config
            'app.config.js',

            // application bootstrap file
            'app/main.js',

            // main module
            'app/app.js',

            // module files
            'app/**/*.js',

        ],
        tpl: 'app/**/*.html'
    },
    styles:['styles/less/app.less'],
    fonts: ['node_modules/bootstrap/fonts/**/*'],
//    img: 'styles/img/**/*',
};


var enviroment =  'default';

var destinations = {
    js: 'app',
    css:'styles',
    img:'img',
    fonts: 'fonts',
};

var isEnv = function(env){
    return enviroment == env;
};

gulp.task('less', function(){
    return gulp.src(source.styles)
        .pipe(gulpif(isEnv('dev'), sourcemaps.init()))
        .pipe(less().on('error',swallowError))
        .pipe(concat('app.css'))
        .pipe(gulpif(isEnv('prod'),cleanCSS()))
        .pipe(gulpif(isEnv('dev'),sourcemaps.write('.', {
            includeContent: false,
            sourceRoot: '/styles/'
        })))
        .pipe(gulp.dest(destinations.css));
       // .pipe(gulpif(isEnv('dev'),browserSync.stream()));
});



gulp.task('copy-images',function(){
    return gulp.src(source.img)
                .pipe(gulp.dest(destinations.img));
});

gulp.task('copy-fonts',function(){
    return gulp.src(source.fonts)
        .pipe(gulp.dest(destinations.fonts));
});




gulp.task('js', function(){
    var config= gulp.src('config.'+enviroment+'.json')
        .pipe(ngConstant({name:'app.constants'})
        .on('error', swallowError));


    return es.merge(gulp.src(source.js.src), config, getTemplateStream())
        .pipe(gulpif(isEnv('dev'), sourcemaps.init()))
        .pipe(concat('app.js'))
        //.pipe(ngAnnotate())
        .on('error', swallowError)
        .pipe(gulpif(!isEnv('dev'),uglify({ mangle: false })))
        .pipe(gulpif(isEnv('dev'),sourcemaps.write('.', {
            sourceRoot: '/app/'
        })))
        .pipe(gulp.dest(destinations.js));
});







/*clean is Too slow -- needs to be syncronous*/
gulp.task('clean', function () {
    return gulp.src(destinations.js+'/**/*', {read: false})
        .pipe(clean());
});


gulp.task('watch', function(){
//    gulp.watch(source.js.src, ['jshint','js']);
//    gulp.watch(source.js.tpl, ['js']);
    gulp.watch(['styles/less/**/*'], ['less']);
//    gulp.watch([source.lang], ['copy-lang']);
//    gulp.watch([source.external], ['copy-external']);
    //gulp.watch(['build/app.js','build/css/smartadmin-production.css', 'build/i18n/**/*'], ['livereload']);
});

gulp.task('dev', [ 'less', 'copy-fonts', 'watch']);
gulp.task('default', ['dev']);

function swallowError(error){
    //console.error('' + error);
    console.log(error.toString());
    this.emit('end')
};

