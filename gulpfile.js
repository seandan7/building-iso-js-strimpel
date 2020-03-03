var gulp = require('gulp');
var babel = require('gulp-babel');
var nodemon = require('gulp-nodemon');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

gulp.task('bundle', (done) => {
    var b = browserify({
        entries: 'src/index.js',
        debug: true
    })
    .transform('babelify', {
        presets: ['@babel/preset-env']
    });
    return b.bundle()
            .pipe(source('build/application.js'))
            .pipe(gulp.dest('dist'));
});

gulp.task('compile', (done) => {
    gulp.src('src/**/*.js')
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(gulp.dest('dist'));
    done();
});

gulp.task('copy', (done)=> {
    gulp.src('src/**/*.html')
        .pipe(gulp.dest('dist'));
    done();
}); 

gulp.task('watch', function(done) {
    gulp.watch('src/**/*.js',gulp.series('compile', 'bundle'));
    gulp.watch('src/**/*.html',gulp.series('copy'));
    done();
});

gulp.task('start', function(done) {
    nodemon({
        watch: 'dist',
        script: 'dist/index.js',
        ext: 'js',
        env: {'NODE_ENV': 'development'}
    });
    done();
});

gulp.task('default', gulp.parallel('compile', 'watch', 'start','bundle'));
