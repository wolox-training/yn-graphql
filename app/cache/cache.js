const { redis } = require('../cache/redis');

exports.searchCache = (resolve, root, args, file) => {
  let keyValue = null;
  if (file === 'albums') {
    keyValue = args.offset + args.limit + args.orderBy + args.filter;
  }
  keyValue = `album${args.id}`;
  return redis.get(keyValue).then(cache => {
    if (cache) {
      const convertCache = JSON.parse(cache);
      return convertCache;
    }
    return resolve(root, args).then(result => {
      redis.set(keyValue, JSON.stringify(result));
      return result;
    });
  });
};
