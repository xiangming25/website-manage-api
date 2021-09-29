'use strict';

module.exports = app => {
  const mids = app.config.coreMiddleware;
  app.config.coreMiddleware = [
    ...mids,
    'requestLimit',
    'allowHosts',
    'notFound',
    'auth',
    'interfaceCache',
  ];
};
