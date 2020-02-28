var gulp = require('gulp');
var babel = require('gulp-babel');

gulp.task('compile', () => {
    gulp.src('src/**/*.js')
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('default', (done) => {
    gulp.parallel('compile');
    console.log("COMPILED");
    done();
});