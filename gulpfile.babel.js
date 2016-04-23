/**
 * Created by Witt on 2016/4/2.
 */
import gulp from 'gulp'
import browserify from 'browserify'
import babelify from 'babelify'
import source from 'vinyl-source-stream'
import buffer from 'vinyl-buffer'

import maps from  'gulp-sourcemaps'
import rubySass from 'gulp-ruby-sass'

gulp.task('es6', () => {
    return browserify({
        entries: ['./src/js/index.js'],
        debug: true
    })
    .transform("babelify", {presets: ['es2015', 'stage-2']})
    .bundle()
    .pipe(source('./dist/js/bundle.js'))
    .pipe(buffer())
    .pipe(maps.init({loadMaps: true}))
    .pipe(maps.write('.'))
    .pipe(gulp.dest('.'))
})

gulp.task('ngTips', () => {
    return browserify({
        entries: ['./src/js/ngTips.js'],
        debug: true
    })
        .transform("babelify", {presets: ['es2015', 'stage-2']})
        .bundle()
        .pipe(source('./dist/js/ngTips.js'))
        .pipe(buffer())
        .pipe(maps.init({loadMaps: true}))
        .pipe(maps.write('.'))
        .pipe(gulp.dest('.'))
})
gulp.task('sass', () => {
    return rubySass('./src/sass/scss/*.scss',{sourcemap: true})
        .on('error', rubySass.logError)
        .pipe(maps.write('.',{
            includeContent: false,
            sourceRoot: 'source'
        }))
        .pipe(gulp.dest('./dist/css'))
})

gulp.task('watch-sass', () => {
    gulp.run('sass')
    gulp.watch(['./src/sass/scss/*.scss','./src/sass/components/*.scss'], () => gulp.run('sass'))
})
gulp.task('watch-es6', () => {
    gulp.run('es6')
    gulp.watch(['./src/js/*.js','./src/js/controllers/*.js','./src/js/services/*.js','./src/js/directives/*.js'], () => gulp.run('es6'))
})