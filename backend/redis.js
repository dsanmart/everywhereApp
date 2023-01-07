const Redis = require('ioredis');

const redisClient = new Redis(); // Create a new instance of the Redis client with empty constructor (uses default values)

module.exports = redisClient; // Export the redisClient