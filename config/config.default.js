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
    salt: 'website-manage-salt',
    redisExpire: 60 * 60 * 24,
  };

  config.security = {
    csrf: {
      enable: false,
    },
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

  config.jwt = {
    secret: 'website',
  };

  config.redis = {
    client: {
      port: 6379,
      host: '127.0.0.1',
      password: 'redis123456',
      db: 0, // 选择默认的数据库 0
    },
  };

  // 授权
  config.auth = {
    exclude: [ '/api/user/login', '/api/user/register' ],
  };

  // 请求限流
  config.requestLimit = {
    maxCount: 10, // 请求接口的数量
    time: 3 * 1000, // 间隔时间
    waitTime: 10 * 1000, // 报请求频繁后，需要间隔多久才能再次请求
  };

  config.allowHosts = [ 'localhost:8001', '127.0.0.1:8001' ];

  config.interfaceCache = {
    expire: 60 * 60 * 24, // 设置缓存时间(秒)
    include: [ '/api/user/detail' ], // 设置缓存的接口
  };

  return {
    ...config,
    ...userConfig,
  };
};
