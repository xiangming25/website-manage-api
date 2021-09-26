/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1632649013302_6558';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.mysql = {
    app: true, // 挂载到 app 下面
    agent: false,
    client: {
      host: '127.0.0.1',
      port: 3306,
      user: 'root',
      password: 'root123456',
      database: 'website-manage',
    },
  };

  config.sequelize = {
    dialect: 'mysql', // 指定方言
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: 'root123456',
    database: 'website-manage',
    define: {
      timestamps: false,
      freezeTableName: true, // 冻结表名称，使用原始的表名称，不会因为使用了 sequelize 就发生变化
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};