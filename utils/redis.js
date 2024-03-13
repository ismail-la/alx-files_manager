#!/usr/bin/node

//  Represents a Redis utils client
const { promisify } = require('util');
const { createClient } = require('redis');


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
    const AsyncGet = promisify(this.client.get).bind(this.client);
    const value = await AsyncGet(key);
    return value;
  }

// Adds a value with given key to redis.
  async set(key, value, dur) {
    const AsyncSet = promisify(this.client.set).bind(this.client);
    await AsyncSet(key, value, 'EX', dur);
  }

// Deletes a value associated with given key from redis.
  async del(key) {
    const AsyncDel = promisify(this.client.del).bind(this.client);
    await AsynDel(key);
  }
}

const redisClient = new RedisClient();

module.exports = redisClient;
