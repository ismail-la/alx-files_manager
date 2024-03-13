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
    const AsyncGet = promisify(this.client.get).bind(this.client);
    const value = await AsyncGet(key);
    return value;
  }

  async set(key, value, dur) {
    const AsyncSet = promisify(this.client.set).bind(this.client);
    await AsyncSet(key, value, 'EX', dur);
  }

  async del(key) {
    const AsyncDel = promisify(this.client.del).bind(this.client);
    await AsyncDel(key);
  }
}

const redisClient = new RedisClient();

module.exports = redisClient;
