'use strict';

module.exports = app => {
  const { STRING, INTEGER, TEXT, DATE } = app.Sequelize;

  const User = app.model.define('user', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    username: STRING,
    password: STRING,
    avatar: TEXT('long'),
    phone: STRING,
    sign: STRING,
    createTime: DATE,
    updateTime: DATE,
  });

  return User;
};
