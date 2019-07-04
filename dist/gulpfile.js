"use strict";
const gulp = require('gulp');
const eslint = require('gulp-eslint');
const $ = require('gulp-load-plugins')();
gulp.task('default', () => {
    return gulp.src(addDefSrcIgnore(['**/*.js', '**/*.json']), { dot: true })
        .pipe($.eslint({ dotfiles: true }))
        .pipe($.eslint.format())
        .pipe($.eslint.failAfterError());
});
function addDefSrcIgnore(srcArr) {
    return srcArr.concat([
        '!**/REMOVE{,/**}',
        '!node_modules{,/**}',
        '!private{,/**}',
        '!dist{,/**}',
        '!.git{,/**}',
        '!**/.DS_Store'
    ]);
}
