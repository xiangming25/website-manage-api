'use strict';

/**
 * 缓存接口
 * 1. 接口的地址作为 Redis 中的 key
 * 2. 查询 Redis，有缓存，返回接口
 * 3. 没有缓存，将接口返回结果保存到 Redis 中
 */


module.exports = options => {
  return async (ctx, next) => {
    const { url } = ctx.request;
    const cache = await ctx.app.redis.get(url);
    if (options.include.includes(url.split('?')[0])) {
      if (cache) {
        ctx.body = JSON.parse(cache);
        return;
      }
      await next();
      await ctx.app.redis.set(url, JSON.stringify(ctx.response.body), 'EX', options.expire);
    } else {
      await next();
    }
  };
};
