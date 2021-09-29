'use strict';

module.exports = options => {
  return async (ctx, next) => {
    const url = ctx.request.url;
    const token = ctx.request.token;
    const tokenCache = await ctx.app.redis.get(ctx.username);
    if (tokenCache !== token && !options.exclude.includes(url.split('?')[0])) {
      ctx.body = {
        code: 1001,
        message: '用户未登录',
      };
    } else {
      await next();
    }
  };
};
