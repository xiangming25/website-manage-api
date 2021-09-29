'use strict';

/**
 * 3 秒内最多允许3个接口请求
 * 1. 设置计数器，每次请求加1；保存起始时间
 * 2. 超过 3 秒，计数器大于 3, 则提示请求频繁，计数器清零，起始时间修改为当前时间
 * 3. 超过 3 秒，计数器小于 3， 计数器清零，起始时间修改为当前时间
 * @param {*} options
 * @returns
 */

module.exports = options => {
  let count = 0;
  let firstTime = Date.now();
  let timer = null;
  return async (ctx, next) => {
    if (Date.now() - firstTime >= options.time) {
      if (count >= options.maxCount) {
        ctx.body = {
          code: 1002,
          message: '请求频繁，请稍后再试！',
        };
        timer && clearTimeout(timer);
        timer = setTimeout(() => {
          count = 0;
          firstTime = Date.now();
        }, options.waitTime);
        return;
      }
      count = 0;
      firstTime = Date.now();
      await next();
    } else {
      count++;
      await next();
    }
  };
};
