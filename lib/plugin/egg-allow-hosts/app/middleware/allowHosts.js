'use strict';

module.exports = options => {
  return async (ctx, next) => {
    const { referer } = ctx.request.header;
    if (referer) {
      const url = new URL(referer);
      if (options.includes(url.host)) {
        await next();
      } else {
        ctx.body = {
          code: 1003,
          message: `host ${url.host} 被禁止`,
        };
      }
    } else {
      await next();
      // ctx.body = {
      //   code: 1003,
      //   message: '不允许直接访问接口',
      // };
    }
  };
};
