'use strict';

const path = require('path');

exports.mysql = {
  enable: true,
  package: 'egg-mysql',
};

exports.sequelize = {
  enable: true,
  package: 'egg-sequelize',
};

exports.jwt = {
  enable: true,
  package: 'egg-jwt',
};

exports.redis = {
  enable: true,
  package: 'egg-redis',
};

exports.auth = {
  enable: true,
  path: path.join(__dirname, '../lib/plugin/egg-auth'),
};

exports.requestLimit = {
  enable: true,
  path: path.join(__dirname, '../lib/plugin/egg-request-limit'),
};

exports.allowHosts = {
  enable: true,
  path: path.join(__dirname, '../lib/plugin/egg-allow-hosts'),
};
