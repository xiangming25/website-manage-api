'use strict';

const Controller = require('egg').Controller;

class BaseController extends Controller {
  success(data) {
    this.ctx.body = {
      code: 200,
      data,
      success: true,
      message: '',
    };
  }

  error(message, code = 500) {
    this.ctx.body = {
      code,
      message,
      success: false,
    };
  }
}

module.exports = BaseController;
