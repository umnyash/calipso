import gulp from 'gulp';

// Configuration
import paths from './gulp/paths.js';
import mode from './gulp/mode.js';

// Plugins
import browser from 'browser-sync';

// Tasks
import processStyles from './gulp/tasks/processStyles.js';
import copyAssets from './gulp/tasks/copyAssets.js';
import createVectorStack from './gulp/tasks/createVectorStack.js';
import createWebp from './gulp/tasks/createWebp.js';
import deleteBuild from './gulp/tasks/deleteBuild.js';
import optimizeVector from './gulp/tasks/optimizeVector.js';
import processMarkup from './gulp/tasks/processMarkup.js';
import processScripts from './gulp/tasks/processScripts.js';

export function startServer (done) {
  browser.init({
    server: {
      baseDir: paths.root,
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

function watchFiles () {
  gulp.watch(paths.copyAssets.watch, copyAssets);
  gulp.watch(paths.createVectorStack.watch, createVectorStack);
  gulp.watch(paths.createWebp.watch, createWebp);
  gulp.watch(paths.optimizeVector.watch, optimizeVector);
  gulp.watch(paths.processMarkup.watch, processMarkup);
  gulp.watch(paths.processScripts.watch, processScripts);
  gulp.watch(paths.processStyles.watch, processStyles);
}

function compileProject (done) {
  gulp.parallel(
    copyAssets,
    createVectorStack,
    createWebp,
    optimizeVector,
    processMarkup,
    processScripts,
    processStyles,
  )(done);
}

function build (done) {
  gulp.series(
    deleteBuild,
    compileProject
  )(done);
}

function runDev (done) {
  gulp.series(
    build,
    startServer,
    watchFiles
  )(done);
}

export default mode.isProd ? build : runDev;
