var gulp = require("gulp");
var mocha = require("gulp-mocha");
var ts = require("gulp-typescript");
var merge = require('merge2');
var gutil = require('gulp-util');

gulp.task("ts", () =>{
    var project = ts.createProject("src/tsconfig.json");

    var tsResult = gulp.src("src/**/*.ts")
        .pipe(ts(project));

    return merge([ // Merge the two output streams, so this task is finished when the IO of both operations are done. 
        tsResult.dts.pipe(gulp.dest('dist')),
        tsResult.js.pipe(gulp.dest('dist'))
    ]);
})

gulp.task('test', function() {
    return gulp.src(['tests/*.js'], { read: false })
        .pipe(mocha({ reporter: 'list' }))
        .on('error', gutil.log);
});

gulp.task("default", () =>{

})