/*
EntityManager 类，用于生成一个通用的管理Entity的类。
 */
/*
eslint-disable no-console
 */
import { useCollection } from 'mongo-use-collection'; // eslint-disable-line import/no-unresolved
// import { ObjectId } from 'mongodb';

export default class EntityManager {
  /**
   * 构造函数
   * @param  {String} collectionName Entity使用的集合的名称
   * @param  {String} mongoUrl       所使用的数据库的连接字符串
   */
  constructor(mongoUrl, collectionName) {
    this.collectionName = collectionName;
    this.mongoUrl = mongoUrl;
    this.useEntity = cb => useCollection(mongoUrl, collectionName, cb);
  }

  /**
   *
   * 插入实体对象到数据库中
   * @param  {Object} entityData 实体对象数据
   * @return {Promise}            操作结果
   */
  insert(entityData) {
    return new Promise((resolve, reject) => this.useEntity(async col => {
      let result;
      try {
        result = await col.insertOne(entityData);
        resolve(result);
      } catch (e) {
        console.log('EntityManager Error: ', e); // eslint-disable-line no-console
        reject(e);
      }
    }));
  }

/**
 * 查询实体对象
 * @param  {Object} query =             {}  查询条件
 * @param  {Number} limit =             100 查询结果限制
 * @param  {number} skip  =             0   跳过开头的结果
 * @return {Promise}       操作结果
 */
  find({ query = {}, limit = 100, skip = 0 } = { query: {}, limit: 100, skip: 0 }) {
    return new Promise((resolve, reject) => this.useEntity(async col => {
      let result;
      try {
        console.log(`[EntityManager find][${col.collectionName}]query::`, JSON.stringify(query));
        const cursor = col.find(query).skip(skip).limit(limit);
        result = await cursor.toArray();
        console.log('[EntityManager find]', col.collectionName, '::result.length::', result.length);
        resolve(result);
      } catch (e) {
        console.log('[EntityManager find]Error: ', e); // eslint-disable-line no-console
        reject(e);
      }
    }));
  }

  count(query = {}) {
    console.log('[EntityManager count]query::', JSON.stringify(query));
    return new Promise((resolve, reject) => this.useEntity(async col => {
      try {
        const result = await col.count(query);
        console.log('[EntityManager count]result::', result);
        resolve(result);
      } catch (e) {
        console.log('[EntityManager count]Error: ', e); // eslint-disable-line no-console
        reject(e);
      }
    }));
  }

  findOne(query = {}) {
    return new Promise((resolve, reject) => this.useEntity(async col => {
      try {
        const result = await col.findOne(query);
        resolve(result);
      } catch (e) {
        console.log('[EntityManager findOne]Error: ', e); // eslint-disable-line no-console
        reject(e);
      }
    }));
  }

  findById(_id) {
    return this.findOne({ _id });
  }

  removeById(_id) {
    return new Promise((resolve, reject) => this.useEntity(async col => {
      try {
        await col.remove({ _id }, { single: true });
        resolve();
      } catch (e) {
        console.log('[EntityManager findById]Error: ', e); // eslint-disable-line no-console
        reject(e);
      }
    }));
  }

  updateById({ _id, ...other }) {
    return this.update({ _id }, { $set: other });
  }

  update(condition, updateQuery, options = {}) {
    return new Promise((resolve, reject) => this.useEntity(async col => {
      try {
        const result = await col.update(condition, updateQuery, options);
        resolve(result);
      } catch (error) {
        reject({
          error,
          condition,
          updateQuery,
          options,
        });
      }
    }));
  }

  mapReduce(map, reduce, options) {
    return new Promise((resolve, reject) => this.useEntity(async col => {
      try {
        const result = await col.mapReduce(map, reduce, options);
        resolve(result);
      } catch (e) {
        reject(e);
      }
    }));
  }
}
