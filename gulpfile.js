var gulp = require('gulp');
var babel = require('gulp-babel');
var nodemon = require('gulp-nodemon');
var sequence = require('run-sequence');

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
    gulp.watch('src/**/*.js',gulp.series('compile'));
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

gulp.task('default', gulp.parallel('compile', 'watch', 'start'));
