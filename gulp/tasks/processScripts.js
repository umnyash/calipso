import gulp from 'gulp';

// Configuration
import mode from '../mode.js';
import paths from '../paths.js';

// Plugins
import browser from 'browser-sync';
import gulpIf from 'gulp-if';
import rename from 'gulp-rename';
import webpack from 'webpack-stream';

export default function processScripts() {
  return gulp.src(paths.processScripts.src, { sourcemaps: mode.isDev })
    .pipe(webpack({ mode: mode.isProd ? 'production' : 'development' }))
    .pipe(rename('script.min.js'))
    .pipe(gulp.dest(paths.processScripts.dest, { sourcemaps: mode.isDev }))
    .pipe(gulpIf(mode.isDev, browser.stream()));
}
