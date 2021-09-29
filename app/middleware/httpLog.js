'use strict';

const dayjs = require('dayjs');
const fs = require('fs');

module.exports = () => {
  return async (ctx, next) => {
    const sTime = Date.now();
    const startTime = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    const req = ctx.request;
    await next();
    const log = {
      method: req.method,
      url: req.url,
      data: req.body,
      startTime,
      endTime: dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
      timeLength: Date.now() - sTime,
    };
    const data = `${dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss')} - ${JSON.stringify(log)}\r\n`;
    const logDir = 'httpLogs';
    fs.readdir(ctx.app.baseDir, (err, files) => {
      // 读取是否有 logDir,如果没有,就创建一个文件夹
      if (!files.includes(logDir)) {
        fs.mkdir(`${ctx.app.baseDir}/${logDir}`, () => {});
      }
      fs.appendFileSync(`${ctx.app.baseDir}/${logDir}/${dayjs(Date.now()).format('YYYY-MM-DD')}.log`, data);
    });
  };
};
