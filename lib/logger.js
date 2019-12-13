var log4js = require('log4js');
var mkdirp = require('mkdirp');
var config = require('config');

const app = require('express')();

const LOG_PATH = config.logPath || '.log';

//创建日志目录
mkdirp(LOG_PATH, function(err) {
    if(err){
        console.log(err);
    }
});

log4js.configure({
    appenders: [
        {   type: 'console' }, //控制台输出
        {
            type: "dateFile",
            filename: LOG_PATH,
            pattern: "yyyyMMddhh.log",
            absolute: true,
            alwaysIncludePattern: true,
            // maxLogSize: 20480,
            // backups: 3,
            category: 'normal'
        }//日期文件格式
    ],
    replaceConsole: true,
    levels:{
        normal: 'DEBUG',
        console: 'DEBUG'
    }
});

var logger = log4js.getLogger(process.env.LOGGER_APPENDER == 'console' ? 'console' : 'normal');
app.use(log4js.connectLogger(logger, {level:'AUTO', format:':method :url'}));
module.exports = logger;