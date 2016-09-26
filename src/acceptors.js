/*
eslint-disable no-underscore-dangle
 */
import { useCollection } from 'mongo-use-collection';
import { ObjectId } from 'mongodb';
import EntityManager from './entity';

const { all } = Promise;

export const ACCEPTORS_COLLECTION = 'acceptors';
export const STAT_BY_PROJECT = 'stat_by_project';
export const STAT_BY_YEAR = 'stat_by_year';
export default class AcceptorManager extends EntityManager {
  constructor(mongoUrl, collectionName = ACCEPTORS_COLLECTION) {
    super(collectionName, mongoUrl);
  }
  async insert({ idCard: { type, number }, ...other }) {
    if (!type || !number) {
      return Promise.reject('证件类型和号码不能为空');
    }
    try {
      const result = await super.insert({ idCard: { type, number }, ...other });
      return Promise.resolve(result.insertedId);
    } catch (e) {
      return Promise.reject(e);
    }
  }
  updateById(acceptor) {
    // _id, eduHistory, careerHistory, records 这几个字段不能更新
    const { eduHistory, careerHistory, records, // eslint-disable-line no-unused-vars
      ...other } = acceptor;
    return super.updateById(other);
  }
  addEdu(_id, { name, year, ...other }) {
    if (!name || !year) return Promise.reject('name和year不能为空');
    if (!Number.isInteger(year)) return Promise.reject('year必须是整数');
    return super.update({ _id }, { $addToSet: {
      eduHistory: { name, year, ...other },
    } });
  }
  async removeEdu(_id, { name, year }) {
    if (!name || !year) return Promise.reject('name和year不能为空');
    if (!Number.isInteger(year)) return Promise.reject('year必须是整数');
    try {
      const oldDoc = await super.findById(_id);
      const filtered = oldDoc.eduHistory.filter(edu =>
        !(edu.name === name && edu.year === year));
      await super.update({ _id }, {
        $set: {
          eduHistory: filtered,
        },
      });
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  }
  addCareer(_id, { name, year, ...other }) {
    if (!name || !year) return Promise.reject('name和year不能为空');
    if (!Number.isInteger(year)) return Promise.reject('year必须是整数');
    return super.update({ _id }, { $addToSet: {
      careerHistory: { name, year, ...other },
    } });
  }
  async removeCareer(_id, { name, year }) {
    if (!name || !year) return Promise.reject('name和year不能为空');
    if (!Number.isInteger(year)) return Promise.reject('year必须是整数');
    try {
      const oldDoc = await super.findById(_id);
      const filtered = oldDoc.careerHistory.filter(car =>
        !(car.name === name && car.year === year));
      await super.update({ _id }, {
        $set: {
          careerHistory: filtered,
        },
      });
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  }
  async addRecord(_id, { id, project, amount, date, ...other }) {
    if (!project || !amount || !date) return Promise.reject('project、amount和date不能为空');
    if (!Number.isInteger(amount)) return Promise.reject('amount必须是整数');
    if (!date.getFullYear) return Promise.reject('date必须是Date类型');
    if (!id) id = new ObjectId(); // eslint-disable-line no-param-reassign
    try {
      await super.update({ _id }, {
        $addToSet: {
          records: {
            _id: id,
            project,
            amount,
            date,
            ...other,
          },
        },
      });
      return Promise.resolve(id);
    } catch (e) {
      return Promise.reject(e);
    }
  }
  async removeRecord(_id, recordId) {
    try {
      const oldDoc = await super.findById(_id);
      const records = oldDoc.records.filter(record => !record._id.equals(recordId));
      await super.update({ _id }, {
        $set: { records },
      });
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async list({ text, skip = 0, limit = 100, fieldsForFilter = ['name', 'phone'] } = {
    skip: 0, limit: 100, fieldsForFilter: ['name', 'phone']
  }) {
    let query = {};
    if (text) {
      if (!fieldsForFilter || !fieldsForFilter.length) {
        return Promise.reject('当text有值时，fieldsForFilter字段不能为空');
      }
      const reg = new RegExp(text);
      query = Object.assign(query, {
        $or: fieldsForFilter.map(field => ({ [field]: reg })),
      });
    }
    try {
      const result = await Promise.all([
        super.count(query),
        super.find({ query, skip, limit }),
      ]);
      return Promise.resolve({
        totalCount: result[0],
        data: result[1],
      });
    } catch (e) {
      return Promise.reject(e);
    }
  }
  async listByRecord({ project, year, text,
    skip = 0, limit = 100, fieldsForFilter = ['name', 'phone'] } = {}) {
    let query = {};
    if (text) {
      if (!fieldsForFilter || !fieldsForFilter.length) {
        return Promise.reject('当text有值时，fieldsForFilter字段不能为空');
      }
      const reg = new RegExp(text);
      query = Object.assign(query, {
        $or: fieldsForFilter.map(field => ({ [field]: reg })),
      });
    }
    if (project) {
      query = Object.assign(query, {
        'records.project': project,
      });
    }

    if (year) {
      query = Object.assign(query, {
        records: {
          $elemMatch: {
            date: {
              $gte: new Date(year, 0, 1),
              $lt: new Date(year + 1, 0, 1),
            },
          },
        },
      });
    }
    try {
      const result = await Promise.all([
        super.count(query),
        super.find({ query, skip, limit }),
      ]);
      return Promise.resolve({
        totalCount: result[0],
        data: result[1],
      });
    } catch (e) {
      return Promise.reject(e);
    }
  }
}

export const useAcceptors = cb => useCollection(mongoUrl, ACCEPTORS_COLLECTION, cb);
export const useStatByProject = cb => useCollection(mongoUrl, STAT_BY_PROJECT, cb);
export const useStatByYear = cb => useCollection(mongoUrl, STAT_BY_YEAR, cb);
const useProfiles = cb => useCollection(mongoUrl, profileCollection, cb);

export const computeStatByProject = async () =>
  new Promise((resolve, reject) => useAcceptors(async col => {
    const map = function () { // eslint-disable-line
      if (this.records) {
        this.records.forEach(function (record) { // eslint-disable-line
          if (record.isDeleted) return;
          emit(record.project, { // eslint-disable-line
            amount: record.amount / 1000,
            count: 1,
            lastUpdated: record.date,
          });
        });
      }
    };
    const reduce = function (key, values) { // eslint-disable-line
      var amount = 0, count = 0, lastUpdated = 0; // eslint-disable-line
      values.forEach(val => {
        amount += val.amount;
        count += val.count;
        lastUpdated = Math.max(lastUpdated, +val.lastUpdated);
      });
      // mongodb 中不支持shorthand
      return {
        amount: amount, // eslint-disable-line object-shorthand
        count: count, // eslint-disable-line object-shorthand
        lastUpdated: lastUpdated, // eslint-disable-line object-shorthand
      };
    };

    try {
      await col.mapReduce(map, reduce, {
        out: {
          replace: STAT_BY_PROJECT,
        },
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  }));

export const computeStatByYear = async () =>
  new Promise((resolve, reject) => {
    useAcceptors(async col => {
      const map = function () { // eslint-disable-line
        if (this.records) {
          this.records.forEach(function (record) { // eslint-disable-line
            if (record.isDeleted) return;
            emit(record.date.getYear() + 1900, { // eslint-disable-line
              amount: record.amount / 1000,
              count: 1,
              lastUpdated: record.date,
            });
          });
        }
      };
      const reduce = function (key, values) { // eslint-disable-line
        var amount = 0, count = 0, lastUpdated = 0; // eslint-disable-line
        values.forEach((val) => {
          amount += val.amount;
          count += val.count;
          lastUpdated = Math.max(lastUpdated, +val.lastUpdated);
        });
        // mongodb 中不支持shorthand
        return {
          amount: amount, // eslint-disable-line object-shorthand
          count: count, // eslint-disable-line object-shorthand
          lastUpdated: lastUpdated, // eslint-disable-line object-shorthand
        };
      };
      try {
        await col.mapReduce(map, reduce, {
          out: {
            replace: STAT_BY_YEAR,
          },
        });
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  });

export const getStatByProject = () =>
  new Promise(resolve => {
    useStatByProject(async col => {
      const result = await col.find().toArray();
      resolve(result);
    });
  });

export const getStatByYear = () =>
  new Promise(resolve => {
    useStatByYear(async col => {
      const result = await col.find().toArray();
      resolve(result);
    });
  });

export const findAcceptors = async ({ text, year, project, projections, skip = 0, limit = 20 } = {}) => {
  showLog && console.time('findAcceptors from Profiles');
  let condition = { isAcceptor: true };
  if (text) {
    const reg = new RegExp(text);
    condition = Object.assign(condition, {
      $or: [{ name: reg }, { phone: reg }],
    });
  }
  if (project) {
    condition = Object.assign(condition, {
      'records.project': project,
    });
  }

  if (year) {
    year = parseInt(year, 10); // eslint-disable-line
    condition = Object.assign(condition, {
      records: {
        $elemMatch: {
          date: {
            $gte: new Date(year, 0, 1),
            $lt: new Date(year + 1, 0, 1),
          },
        },
      },
    });
  }

  const { find, count } = profileManager;
  try {
    const result = await all([count(condition), find(condition)]);
    console.log('result::::::::', result);
    return Promise.resolve({
      totalCount: result[0],
      data: result[1],
    });
  } catch (e) {
    return Promise.reject(e);
  }
};

/*
通过idCard.number找到相应的acceptor
 */
export const findByIdCardNumber = async idCardNumber =>
  new Promise((resolve, reject) => {
    useAcceptors(async col => {
      try {
        const doc = await col.findOne({ 'idCard.number': idCardNumber });
        resolve(doc);
      } catch (e) {
        reject(e);
      }
    });
  });

/*
将数据标记为已删除（isDeleted)
 */
export const trash = _id => new Promise((resolve, reject) =>
  useAcceptors(async col => {
    try {
      const result = await col.updateOne({ _id }, {
        $set: { isDeleted: true },
      });
      resolve(result);
    } catch (e) {
      reject(e);
    }
  }));

export const remove = async _id =>
  new Promise((resolve, reject) => useAcceptors(async col => {
    try {
      resolve(await col.remove({ _id }));
    } catch (e) {
      reject(e);
    }
  }));
