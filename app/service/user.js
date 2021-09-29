'use strict';

const BaseService = require('./base');
const md5 = require('md5');

class UserService extends BaseService {
  // 获取用户信息
  async getUser(username, password) {
    return this.run(async (ctx, app) => {
      const _where = password ? { username, password: md5(password, app.config.salt) } : { username };
      return await ctx.model.User.findOne({
        where: _where,
      });
    });
  }

  async add(params) {
    return this.run(async ctx => await ctx.model.User.create(params));
  }

  async edit(params) {
    return this.run(async ctx => {
      return await ctx.model.User.update(params, {
        where: {
          username: ctx.username,
        },
      });
    });
  }
}

module.exports = UserService;
