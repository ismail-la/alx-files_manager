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

  isAlive() {
    return this.connected;
  }

  async get(key) {
    const Async_get = promisify(this.client.get).bind(this.client);
    const value = await Async_get(key);
    return value;
  }

  async set(key, value, dur) {
    const Async_set = promisify(this.client.set).bind(this.client);
    await Async_set(key, value, 'EX', dur);
  }

  async del(key) {
    const Async_del = promisify(this.client.del).bind(this.client);
    await Async_del(key);
  }
}

const redisClient = new RedisClient();

module.exports = redisClient;
