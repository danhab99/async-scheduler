const { dest, series, src, task } = require('gulp');
const ts = require('gulp-typescript');
const fs = require('fs');

task('build', function () {
    const tsProject = ts.createProject('tsconfig.json');
    return src('src/**/*.ts')
        .pipe(tsProject())
        .pipe(dest('dist/lib'));
});

task('package_json', function(cb) {
    const packageJsonContent = fs.readFileSync('package.json', { encoding: 'utf8' });
    let packageJson = JSON.parse(packageJsonContent);
    delete packageJson.scripts;
    delete packageJson.devDependencies;
    packageJson.main = 'lib/index.js';
    packageJson.typings = 'lib/index.d.ts';
    fs.writeFileSync('dist/package.json', JSON.stringify(packageJson, null, 2), { encoding: 'utf8' });
    cb();
});

task('default', series(['build', 'package_json']));