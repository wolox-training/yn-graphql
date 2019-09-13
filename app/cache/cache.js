const { redis } = require('../cache/redis');

exports.searchCache = (resolve, root, args, keyValue) =>
  redis.get(keyValue).then(cache => {
    if (cache) {
      const convertCache = JSON.parse(cache);
      return convertCache;
    }
    return resolve(root, args).then(result => {
      redis.set(keyValue, JSON.stringify(result));
      return result;
    });
  });
