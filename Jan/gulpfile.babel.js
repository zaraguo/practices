/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */

import gulp from 'gulp';
import babel from 'gulp-babel';
import del from 'del';
import eslint from 'gulp-eslint';
import webpack from 'webpack-stream';
import mocha from 'gulp-mocha';
import flow from 'gulp-flowtype';
import webpackConfig from './webpack.config.babel';

const paths = {
    allSrcJs: 'src/**/*.js?(x)',
    gulpFile: 'gulpfile.babel.js',
    serverSrcJs: 'src/server/**/*.js?(x)',
    sharedSrcJs: 'src/shared/**/*.js?(x)',
    clientEntryPoint: 'src/client/app.jsx',
    webpackFile: 'webpack.config.babel.js',
    clientBundle: 'dist/client-bundle.js?(.map)',
    libDir: 'lib',
    distDir: 'dist',
    allLibTest: 'src/test/**/*.js',
};

gulp.task('clean', () => del([
    paths.libDir,
    paths.clientBundle,
]));

gulp.task('build', ['clean', 'lint'], () =>
    gulp.src(paths.allSrcJs)
        .pipe(babel())
        .pipe(gulp.dest(paths.libDir))
);

gulp.task('test', ['build'], () =>
    gulp.src(paths.allLibTest)
        .pipe(mocha())
);

gulp.task('main', ['test'], () =>
    gulp.src(paths.clientEntryPoint)
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest(paths.distDir))
);

gulp.task('watch', () =>
    gulp.watch(paths.allSrcJs, ['main'])
);

gulp.task('default', ['watch', 'main']);

gulp.task('lint', () =>
    gulp.src([
        paths.allSrcJs,
        paths.gulpFile,
        paths.webpackFile,
    ])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
        .pipe(flow({ abort: true }))
);
