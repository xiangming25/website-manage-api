'use strict';

module.exports = app => {
  const mids = app.config.coreMiddleware;
  app.config.coreMiddleware = [
    ...mids,
    'auth',
  ];
};