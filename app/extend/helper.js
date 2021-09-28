'use strict';

const dayjs = require('dayjs');

module.exports = {
  base64Encode(str = '') {
    return new Buffer(str).toString('base64');
  },
  time() {
    return dayjs().format('YYYY-MM-DD HH:mm:ss');
  },
  timestamp(data) {
    return new Date(data).getTime();
  },
  // 从一个对象中排除一些值
  unPick(source, arr) {
    if (Array.isArray(arr)) {
      const obj = {};
      for (const i in source) {
        if (!arr.includes(i)) {
          obj[i] = source[i];
        }
      }
      return obj;
    }
  },
};
