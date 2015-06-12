var gulp = require("gulp");
var watch = require("gulp-watch");
var exec = require('child_process').exec;
var uglify = require("gulp-uglify");

gulp.task("bundle", function (cb) {
    exec("aurelia bundle", function (err) {
        cb(err);
    });
});

gulp.task("uglify", ["bundle"], function () {
    return gulp.src("wwwroot/appbundle.js")
               .pipe(uglify())
               .pipe(gulp.dest("wwwroot/"));
});

gulp.task("watch", function () {
    gulp.watch(["wwwroot/**/*.js", "wwwroot/**/*.html",
                "!wwwroot/*bundle*"], ["uglify"]);
});

gulp.task("default", ["uglify"]);


