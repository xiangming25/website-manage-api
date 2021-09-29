'use strict';

const BaseController = require('./base');
const md5 = require('md5');

class UserController extends BaseController {
  async jwtSign({ id, username }) {
    const { app } = this;
    const token = app.jwt.sign({
      id,
      username,
    }, app.config.jwt.secret);

    await app.redis.set(username, token, 'EX', app.config.redisExpire);
    return token;
  }

  parseResult(ctx, result) {
    return {
      ...ctx.helper.unPick(result.dataValues, [ 'password' ]),
      createTime: ctx.helper.timestamp(result.createTime),
    };
  }

  async register() {
    const { ctx, app } = this;
    const params = ctx.params();
    const user = await ctx.service.user.getUser(params.username);
    if (user) {
      this.error('用户已经存在');
      return;
    }
    const result = await ctx.service.user.add({
      ...params,
      password: md5(params.password, app.config.salt),
      createTime: ctx.helper.time(),
    });

    if (result) {
      const token = await this.jwtSign({
        id: result.id,
        username: result.username,
      });
      this.success({
        ...this.parseResult(ctx, result),
        token,
      });
    } else {
      this.error('用户注册失败！');
    }
  }

  async login() {
    const { ctx } = this;
    const { username, password } = ctx.params();
    const user = await ctx.service.user.getUser(username, password);
    if (user) {
      const token = await this.jwtSign({
        id: user.id,
        username: user.username,
      });
      this.success({
        ...this.parseResult(ctx, user),
        token,
      });
    } else {
      this.error('该用户不存在');
    }
  }
}

module.exports = UserController;
