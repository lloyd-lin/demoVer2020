// require('./tools/scripts/clean');
// require('./tools/scripts/compile');
const siteTasks = require('./site/tools/gulp-site');
// const gulpLib = require('./build/gulp-lib');

// exports['compile-lib'] = gulpLib.default;
exports = Object.assign(exports, siteTasks);
