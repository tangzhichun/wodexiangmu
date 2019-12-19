'use strict';
const gulp = require('gulp');
const less = require('gulp-less');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const webpackMerge = require('webpack-merge');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const jshint = require('gulp-jshint');
const named = require('vinyl-named');
const del = require('del');
const runSequence = require('run-sequence');
const argv = require('yargs').argv;
const path = require('path');
const fs = require('fs');
const plumber = require('gulp-plumber');
const through = require('through2');

require('./lib/common')();

/**
 * 开发环境为true，生产环境为false，默认为true
 * 控制台输入 gulp [task] -p 或者 gulp [task] -d
 */
const dev = argv.d || !argv.p;
console.log('执行' + (dev ? '开发环境' : '生产环境') + '编译');


let retrievalEntry = function (folder, files) {
    let entry = {};
    if (files) {
        let items = [].concat(files);
        items.forEach(file => {
            entry[file.replace(folder + '/', '').replace('.js', '')] = file;
        });
        return entry;
    }

    let modules = fs.readdirSync(folder).filter(dir => {
        return fs.statSync(path.join(folder, dir)).isDirectory();
    });
    modules = modules.map(dir => {
        let file = path.join(folder, dir, '/scripts');
        return fs.existsSync(file) ? {module: dir, file: file} : null;
    }).filter(dir => {
        return dir
    });

    let retrievalJs = function (module) {
        let entry = {};
        let subs = fs.readdirSync(module.file) || [];
        subs.forEach(function (key) {
            let matchs = key.match(/(.+)\.js$/);
            if (matchs) {
                entry[module.module + '/' + matchs[1]] = path.join(module.file, key);
            } else if (fs.statSync(module.file + '/' + key).isDirectory()) {
                let subEntry = retrievalJs({module: module.module + '/' + key, file: module.file + '/' + key});
                Object.keys(subEntry).forEach(k => {
                    entry[k] = subEntry[k];
                });
            }
        });

        return entry;
    };

    modules.forEach(function (module) {

        // let subEntry = fs.readdirSync(item.file) || [];
        // subEntry.forEach(function(key) {
        //     let matchs = key.match(/(.+)\.js$/);
        //     if (matchs) {
        //         entry[item.module + '/' + matchs[1]] = path.join(item.file, key);
        //     }
        // });

        let moduleEntry = retrievalJs(module);
        Object.keys(moduleEntry).forEach(k => {
            entry[k] = moduleEntry[k];
        });
    });

    return entry;
};

let webpackConfig = {
    entry: retrievalEntry(path.resolve(__dirname, 'modules/')),
    output: {
        // filename: "[name].bundle.[chunkhash:6].js"
        filename: "[name].bundle.js"
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': path.join(__dirname, 'modules/global')
        }
    },
    module: {
        rules: [
            {test: /\.vue$/, loader: 'vue-loader'},
            {test: /\.js$/, loader: 'babel-loader?cacheDirectory=true', exclude: /node_modules/}
        ]

    }
};

let compileJavascript = function (jsFile) {
    if (!dev) {
        webpackConfig = webpackMerge(webpackConfig, {
            plugins: [
                // 自动注入引入文件
                // new HtmlWebpackPlugin({
                //     filename: 'aaa.html',
                //     template: resolve('views/pages/aaa.html'),
                //     inject: true
                // }),
                // 分析包的大小构成
                // new BundleAnalyzerPlugin(),
                // 压缩JS
                new webpack.optimize.UglifyJsPlugin({
                    compress: {
                        warnings: false
                    }
                }),
            ]
        });
    }

    if (jsFile) {
        webpackConfig.entry = retrievalEntry(path.resolve(__dirname, 'global/scripts'), jsFile);
    } else {
        webpackConfig.entry = retrievalEntry(path.resolve(__dirname, 'modules/'));
    }

    let source = jsFile || ['modules/**/scripts/**/*.js'];
    return gulp.src(source)
        .pipe(plumber())
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(named())
        .pipe(webpackStream(webpackConfig, webpack))
        .pipe(through.obj(function (file, enc, cb) {
            file.path = file.path.replace('/scripts', '').replace('\\scripts', '').replace('/modules', '').replace('\\modules', '');
            this.push(file);
            return cb();
        }))
        .pipe(gulp.dest('public/js/'))
        .pipe(through.obj(function (file, enc, cb) {
            // console.log('[' + new Date().format('hh:mm:ss') + '] Output: ' + file.path);
            return cb();
        }));
};

let autoPrefixerConfig = {
    browsers: [
        'ie >= 10',
        'ie_mob >= 10',
        'ff >= 30',
        'chrome >= 34',
        'safari >= 7',
        'opera >= 23',
        'ios >= 7',
        'android >= 4.0',
        'bb >= 10'
    ],
    cascade: true,      //是否格式化属性值 默认：true
    remove: true        //是否去掉不必要的前缀 默认：true
};


let compileLess = function (lessFile) {
    let source = lessFile || ['modules/**/styles/**/*.less'];
    let result = gulp.src(source, {base: process.cwd()})
        .pipe(plumber())
        .pipe(less())
        .pipe(rename({suffix: '.min'}))
        .pipe(autoprefixer(autoPrefixerConfig));

    if (!dev) {
        console.log('[' + new Date().format('hh:mm:ss') + '] Compressing css...');
        result = result.pipe(cleanCSS({
            advanced: false,        //类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
            compatibility: 'ie10',  //保留ie10及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
            keepBreaks: true,       //类型：Boolean 默认：false [是否保留换行]
            keepSpecialComments: '*'//保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
        }));
        // .pipe(sourcemaps.write('.'));
    }

    //去掉路径中的/styles

    return result
        .pipe(through.obj(function (file, enc, cb) {
            // console.log('compiling file: ' + file.path);
            file.path = file.path.replace('/styles', '').replace('\\styles', '').replace('/modules', '').replace('\\modules', '');
            this.push(file);

            // console.log('rename file to: ' + file.path);
            return cb();
        }))
        .pipe(gulp.dest('public/css/'))
        .pipe(through.obj(function (file, enc, cb) {
            // console.log('[' + new Date().format('hh:mm:ss') + '] Output: ' + file.path);
            return cb();
        }));
};

gulp.task('js', function () {
    return compileJavascript();
});

gulp.task('less', function () {
    return compileLess();
});

gulp.task('copy-element', function () {
    gulp.src(['node_modules/element-ui/lib/theme-chalk/fonts/**/*.*'])
        .pipe(plumber())
        .pipe(gulp.dest('public/vendor/fonts/'));

    return gulp.src(['node_modules/element-ui/lib/theme-chalk/index.css', 'node_modules/element-ui/lib/index.js'])
        .pipe(plumber())
        .pipe(rename({basename: 'element', suffix: '.min'}))
        .pipe(gulp.dest('public/vendor/'));
});

gulp.task('copy-laydate', function () {
    return gulp.src(['node_modules/layui-laydate/dist/**/*.*'])
        .pipe(plumber())
        // .pipe(rename({basename: 'laydate', suffix: '.min'}))
        .pipe(gulp.dest('public/vendor/laydate/'));
});

gulp.task('copy-vue', function () {
    return gulp.src(['node_modules/vue/dist/vue.min.js'])
        .pipe(plumber())
        .pipe(gulp.dest('public/vendor/'));
});

gulp.task('copy-echarts', function () {
    //TODO
    return gulp.src(['node_modules/echarts/dist/echarts.js'])
        .pipe(plumber())
        .pipe(gulp.dest('public/vendor/'));
});

gulp.task('copy-assets', function () {
    return gulp.src(['modules/global/assets/*/*'])
        .pipe(plumber())
        .pipe(gulp.dest('public/'));
});

gulp.task('copy', ['copy-vue', 'copy-element', 'copy-assets', 'copy-laydate', 'copy-echarts']);

gulp.task('clean', function () {
    return del(['public/*'], {dot: true});
});

gulp.task('default', function (cb) {
    runSequence(
        'clean',
        'copy',
        'less',
        'js',
        cb
    );
});

gulp.task('watch', function () {
    //less文件变化后自动编译
    gulp.watch('modules/*/styles/*.less', function (event) {
        console.log('less file changed, compiling: %s', event.path);
        compileLess(event.path);
    });

    //js文件变化后自动编译
    gulp.watch('modules/*/scripts/**/*.js', function (event) {
        console.log('javascript file changed, compiling: %s', event.path);
        //一般文件变动
        compileJavascript(event.path);
    });

    //vue文件变化后自动编译
    gulp.watch('modules/**/*.vue', function (event) {

        console.log('vue file changed, compiling: %s', event.path);

        let parent = path.join(event.path, '../');
        let jsFile = parent.slice(0, parent.length - 1) + '.js';

        let exists = fs.existsSync(jsFile);
        if (exists) {
            compileJavascript(jsFile);
        } else {
            let pp = path.join(parent, '../');
            let index = pp.indexOf("scripts");
            if (index >= 0) {
                //截取scripts文件夹所在位置
                pp = pp.substring(0, index + "scripts".length + 1);
                //循环遍历所有/scripts文件夹下的js文件重新编译
                let jsFiles = getCompileJsFiles(pp);
                compileJavascript(jsFiles);
            } else {
                //编译所有的js
                runSequence(
                    'js',
                );
            }
        }
    });

    // 自动复制到发布目录
    //资源文件变化后，
    gulp.watch('modules/global/assets/**/*.*', ['copy-assets']);


});

function getCompileJsFiles(file) {
    let result = [];
    let jsFiles = fs.readdirSync(file) || [];
    for (let jsFile of jsFiles) {
        let filePath;
        if (file.endsWith("\\") || file.endsWith("/")) {
            filePath = file + jsFile;
        } else {
            filePath = file + "/" + jsFile;
        }

        if (fs.lstatSync(filePath).isDirectory()) {
            result = result.concat(getCompileJsFiles(filePath));
        } else {
            if (jsFile.endsWith('.js')) {
                result.push(filePath);
            }
        }
    }
    return result;
}
