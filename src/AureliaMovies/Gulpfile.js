var gulp = require("gulp");
var watch = require("gulp-watch");
var bundler = require("aurelia-bundler");
var del = require("del");

var config = {
    force: true,
    baseURL: "./wwwroot",        
    configPath: "./wwwroot/config.js", 
    bundles: {
        "app/app-bundle": {
            includes: [
                "[*.js]",
                "*.html!text",
                "*.css!text"
            ],
            options: {
                inject: true,
                minify: true
            }
        },
        "app/vendor-build": {
            includes: [
                "aurelia-bootstrapper",
                "aurelia-framework",
                "aurelia-loader-default",
                "aurelia-logging-console",
                "aurelia-router",
                "aurelia-templating",
                "aurelia-templating-binding",
                "aurelia-templating-router",
                "aurelia-templating-resources",
                "aurelia-history-browser",
                "aurelia-http-client",
                "aurelia-validation"
            ],
            options: {
                inject: true,
                minify: true
            }
        }
    }
};

gulp.task("clean", () => {
    return del(["wwwroot/app-bundle.js"]);
});

gulp.task('bundle', ['unbundle'], function () {
    return bundler.bundle(config);
});

gulp.task('unbundle', function () {
    return bundler.unbundle(config);
});

gulp.task("watch", function () {
    gulp.watch(["wwwroot/**/*.js", "wwwroot/**/*.html",
                "!wwwroot/*bundle*"], ["bundle"]);
});

gulp.task("default", ["bundle"]);


