const gulp = require('gulp');

exports.watchJS = () => {
    gulp.watch(src + '/*.js', { ignoreInitial: false }, (cb) => {
        defaultTask();
        cb();
    });
};