'use strict';

module.exports = () => {
  return async (ctx, next) => {
    const flag = ctx.app.router.stack.find(item => {
      return item.regexp.test(ctx.request.url.split('?')[0]);
    });
    if (!flag) {
      ctx.body = {
        code: 404,
        message: `接口 ${ctx.request.url} 不存在!`,
      };
    } else {
      await next();
    }
  };
};
