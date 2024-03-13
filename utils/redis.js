#!/usr/bin/node

const { createClient } = require('redis');
const { promisify } = require('util');

class RedisClient {
  constructor() {
    this.client = createClient();
    this.client.on('error', (err) => console.log(err));
    this.connected = false;
    this.client.on('connect', () => {
      this.connected = true;
    });
  }

// Check connection status of redis client.
  isAlive() {
    return this.connected;
  }

// Search for value associated with given key.
  async get(key) {
    const getAsync = promisify(this.client.get).bind(this.client);
    const val = await getAsync(key);
    return val;
  }

// Adds a value with given key to redis.
  async set(key, val, dur) {
    const setAsync = promisify(this.client.set).bind(this.client);
    await setAsync(key, val, 'EX', dur);
  }

// Deletes a value associated with given key from redis.
  async del(key) {
    const delAsync = promisify(this.client.del).bind(this.client);
    await delAsync(key);
  }
}

const redisClient = new RedisClient();

module.exports = redisClient;
