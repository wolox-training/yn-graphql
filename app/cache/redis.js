const { RedisCache } = require('apollo-server-cache-redis'),
  config = require('../../config'),
  { port, host } = config.common.cacheRedis;

exports.redis = new RedisCache({
  host,
  port
});
