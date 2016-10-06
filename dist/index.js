'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _typeof = _interopDefault(require('babel-runtime/helpers/typeof'));
var _defineProperty = _interopDefault(require('babel-runtime/helpers/defineProperty'));
var _Object$assign = _interopDefault(require('babel-runtime/core-js/object/assign'));
var _Number$isInteger = _interopDefault(require('babel-runtime/core-js/number/is-integer'));
var _regeneratorRuntime = _interopDefault(require('babel-runtime/regenerator'));
var _extends = _interopDefault(require('babel-runtime/helpers/extends'));
var _Promise = _interopDefault(require('babel-runtime/core-js/promise'));
var _objectWithoutProperties = _interopDefault(require('babel-runtime/helpers/objectWithoutProperties'));
var _asyncToGenerator = _interopDefault(require('babel-runtime/helpers/asyncToGenerator'));
var _Object$getPrototypeOf = _interopDefault(require('babel-runtime/core-js/object/get-prototype-of'));
var _classCallCheck = _interopDefault(require('babel-runtime/helpers/classCallCheck'));
var _createClass = _interopDefault(require('babel-runtime/helpers/createClass'));
var _possibleConstructorReturn = _interopDefault(require('babel-runtime/helpers/possibleConstructorReturn'));
var _get = _interopDefault(require('babel-runtime/helpers/get'));
var _inherits = _interopDefault(require('babel-runtime/helpers/inherits'));
var mongodb = require('mongodb');
var _JSON$stringify = _interopDefault(require('babel-runtime/core-js/json/stringify'));
var mongoUseCollection = require('mongo-use-collection');

// import { ObjectId } from 'mongodb';

var EntityManager = function () {
  /**
   * 构造函数
   * @param  {String} collectionName Entity使用的集合的名称
   * @param  {String} mongoUrl       所使用的数据库的连接字符串
   */
  function EntityManager(mongoUrl, collectionName) {
    _classCallCheck(this, EntityManager);

    this.collectionName = collectionName;
    this.mongoUrl = mongoUrl;
    this.useEntity = function (cb) {
      return mongoUseCollection.useCollection(mongoUrl, collectionName, cb);
    };
  }

  /**
   *
   * 插入实体对象到数据库中
   * @param  {Object} entityData 实体对象数据
   * @return {Promise}            操作结果
   */


  _createClass(EntityManager, [{
    key: 'insert',
    value: function insert(entityData) {
      var _this = this;

      return new _Promise(function (resolve, reject) {
        return _this.useEntity(function () {
          var _ref = _asyncToGenerator(_regeneratorRuntime.mark(function _callee(col) {
            var result;
            return _regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    result = void 0;
                    _context.prev = 1;
                    _context.next = 4;
                    return col.insertOne(entityData);

                  case 4:
                    result = _context.sent;

                    resolve(result);
                    _context.next = 12;
                    break;

                  case 8:
                    _context.prev = 8;
                    _context.t0 = _context['catch'](1);

                    console.log('EntityManager Error: ', _context.t0); // eslint-disable-line no-console
                    reject(_context.t0);

                  case 12:
                  case 'end':
                    return _context.stop();
                }
              }
            }, _callee, _this, [[1, 8]]);
          }));

          return function (_x) {
            return _ref.apply(this, arguments);
          };
        }());
      });
    }

    /**
     * 查询实体对象
     * @param  {Object} query =             {}  查询条件
     * @param  {Number} limit =             100 查询结果限制
     * @param  {number} skip  =             0   跳过开头的结果
     * @return {Promise}       操作结果
     */

  }, {
    key: 'find',
    value: function find() {
      var _this2 = this;

      var _ref2 = arguments.length <= 0 || arguments[0] === undefined ? { query: {}, limit: 100, skip: 0 } : arguments[0];

      var _ref2$query = _ref2.query;
      var query = _ref2$query === undefined ? {} : _ref2$query;
      var _ref2$limit = _ref2.limit;
      var limit = _ref2$limit === undefined ? 100 : _ref2$limit;
      var _ref2$skip = _ref2.skip;
      var skip = _ref2$skip === undefined ? 0 : _ref2$skip;

      return new _Promise(function (resolve, reject) {
        return _this2.useEntity(function () {
          var _ref3 = _asyncToGenerator(_regeneratorRuntime.mark(function _callee2(col) {
            var result, cursor;
            return _regeneratorRuntime.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    result = void 0;
                    _context2.prev = 1;

                    console.log('[EntityManager find][' + col.collectionName + ']query::', _JSON$stringify(query));
                    cursor = col.find(query).skip(skip).limit(limit);
                    _context2.next = 6;
                    return cursor.toArray();

                  case 6:
                    result = _context2.sent;

                    console.log('[EntityManager find]', col.collectionName, '::result.length::', result.length);
                    resolve(result);
                    _context2.next = 15;
                    break;

                  case 11:
                    _context2.prev = 11;
                    _context2.t0 = _context2['catch'](1);

                    console.log('[EntityManager find]Error: ', _context2.t0); // eslint-disable-line no-console
                    reject(_context2.t0);

                  case 15:
                  case 'end':
                    return _context2.stop();
                }
              }
            }, _callee2, _this2, [[1, 11]]);
          }));

          return function (_x3) {
            return _ref3.apply(this, arguments);
          };
        }());
      });
    }
  }, {
    key: 'count',
    value: function count() {
      var _this3 = this;

      var query = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      console.log('[EntityManager count]query::', _JSON$stringify(query));
      return new _Promise(function (resolve, reject) {
        return _this3.useEntity(function () {
          var _ref4 = _asyncToGenerator(_regeneratorRuntime.mark(function _callee3(col) {
            var result;
            return _regeneratorRuntime.wrap(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    _context3.prev = 0;
                    _context3.next = 3;
                    return col.count(query);

                  case 3:
                    result = _context3.sent;

                    console.log('[EntityManager count]result::', result);
                    resolve(result);
                    _context3.next = 12;
                    break;

                  case 8:
                    _context3.prev = 8;
                    _context3.t0 = _context3['catch'](0);

                    console.log('[EntityManager count]Error: ', _context3.t0); // eslint-disable-line no-console
                    reject(_context3.t0);

                  case 12:
                  case 'end':
                    return _context3.stop();
                }
              }
            }, _callee3, _this3, [[0, 8]]);
          }));

          return function (_x5) {
            return _ref4.apply(this, arguments);
          };
        }());
      });
    }
  }, {
    key: 'findOne',
    value: function findOne() {
      var _this4 = this;

      var query = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      return new _Promise(function (resolve, reject) {
        return _this4.useEntity(function () {
          var _ref5 = _asyncToGenerator(_regeneratorRuntime.mark(function _callee4(col) {
            var result;
            return _regeneratorRuntime.wrap(function _callee4$(_context4) {
              while (1) {
                switch (_context4.prev = _context4.next) {
                  case 0:
                    _context4.prev = 0;
                    _context4.next = 3;
                    return col.findOne(query);

                  case 3:
                    result = _context4.sent;

                    resolve(result);
                    _context4.next = 11;
                    break;

                  case 7:
                    _context4.prev = 7;
                    _context4.t0 = _context4['catch'](0);

                    console.log('[EntityManager findOne]Error: ', _context4.t0); // eslint-disable-line no-console
                    reject(_context4.t0);

                  case 11:
                  case 'end':
                    return _context4.stop();
                }
              }
            }, _callee4, _this4, [[0, 7]]);
          }));

          return function (_x7) {
            return _ref5.apply(this, arguments);
          };
        }());
      });
    }
  }, {
    key: 'findById',
    value: function findById(_id) {
      return this.findOne({ _id: _id });
    }
  }, {
    key: 'removeById',
    value: function removeById(_id) {
      var _this5 = this;

      return new _Promise(function (resolve, reject) {
        return _this5.useEntity(function () {
          var _ref6 = _asyncToGenerator(_regeneratorRuntime.mark(function _callee5(col) {
            return _regeneratorRuntime.wrap(function _callee5$(_context5) {
              while (1) {
                switch (_context5.prev = _context5.next) {
                  case 0:
                    _context5.prev = 0;
                    _context5.next = 3;
                    return col.remove({ _id: _id }, { single: true });

                  case 3:
                    resolve();
                    _context5.next = 10;
                    break;

                  case 6:
                    _context5.prev = 6;
                    _context5.t0 = _context5['catch'](0);

                    console.log('[EntityManager findById]Error: ', _context5.t0); // eslint-disable-line no-console
                    reject(_context5.t0);

                  case 10:
                  case 'end':
                    return _context5.stop();
                }
              }
            }, _callee5, _this5, [[0, 6]]);
          }));

          return function (_x8) {
            return _ref6.apply(this, arguments);
          };
        }());
      });
    }
  }, {
    key: 'updateById',
    value: function updateById(_ref7) {
      var _id = _ref7._id;

      var other = _objectWithoutProperties(_ref7, ['_id']);

      return this.update({ _id: _id }, { $set: other });
    }
  }, {
    key: 'update',
    value: function update(condition, updateQuery) {
      var _this6 = this;

      var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

      return new _Promise(function (resolve, reject) {
        return _this6.useEntity(function () {
          var _ref8 = _asyncToGenerator(_regeneratorRuntime.mark(function _callee6(col) {
            var result;
            return _regeneratorRuntime.wrap(function _callee6$(_context6) {
              while (1) {
                switch (_context6.prev = _context6.next) {
                  case 0:
                    _context6.prev = 0;
                    _context6.next = 3;
                    return col.update(condition, updateQuery, options);

                  case 3:
                    result = _context6.sent;

                    resolve(result);
                    _context6.next = 11;
                    break;

                  case 7:
                    _context6.prev = 7;
                    _context6.t0 = _context6['catch'](0);

                    console.log('[EntityManager update]Error: ', _context6.t0); // eslint-disable-line no-console
                    reject(_context6.t0);

                  case 11:
                  case 'end':
                    return _context6.stop();
                }
              }
            }, _callee6, _this6, [[0, 7]]);
          }));

          return function (_x10) {
            return _ref8.apply(this, arguments);
          };
        }());
      });
    }
  }, {
    key: 'mapReduce',
    value: function mapReduce(map, reduce, options) {
      var _this7 = this;

      return new _Promise(function (resolve, reject) {
        return _this7.useEntity(function () {
          var _ref9 = _asyncToGenerator(_regeneratorRuntime.mark(function _callee7(col) {
            var result;
            return _regeneratorRuntime.wrap(function _callee7$(_context7) {
              while (1) {
                switch (_context7.prev = _context7.next) {
                  case 0:
                    _context7.prev = 0;
                    _context7.next = 3;
                    return col.mapReduce(map, reduce, options);

                  case 3:
                    result = _context7.sent;

                    resolve(result);
                    _context7.next = 10;
                    break;

                  case 7:
                    _context7.prev = 7;
                    _context7.t0 = _context7['catch'](0);

                    reject(_context7.t0);

                  case 10:
                  case 'end':
                    return _context7.stop();
                }
              }
            }, _callee7, _this7, [[0, 7]]);
          }));

          return function (_x11) {
            return _ref9.apply(this, arguments);
          };
        }());
      });
    }
  }]);

  return EntityManager;
}();

var ACCEPTORS_COLLECTION = 'acceptors';
var STAT_BY_PROJECT = 'stat_by_project';
var STAT_BY_YEAR = 'stat_by_year';

var AcceptorManager = function (_EntityManager) {
  _inherits(AcceptorManager, _EntityManager);

  function AcceptorManager(mongoUrl) {
    var collectionName = arguments.length <= 1 || arguments[1] === undefined ? ACCEPTORS_COLLECTION : arguments[1];

    _classCallCheck(this, AcceptorManager);

    var _this = _possibleConstructorReturn(this, (AcceptorManager.__proto__ || _Object$getPrototypeOf(AcceptorManager)).call(this, mongoUrl, collectionName));

    _this.statByProjectCollectionName = collectionName + '.' + STAT_BY_PROJECT;
    _this.statByYearCollectionName = collectionName + '.' + STAT_BY_YEAR;
    return _this;
  }

  _createClass(AcceptorManager, [{
    key: 'insert',
    value: function () {
      var _ref = _asyncToGenerator(_regeneratorRuntime.mark(function _callee(_ref2) {
        var _ref2$idCard = _ref2.idCard;
        var type = _ref2$idCard.type;
        var number = _ref2$idCard.number;

        var other = _objectWithoutProperties(_ref2, ['idCard']);

        var result;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(!type || !number)) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt('return', _Promise.reject('证件类型和号码不能为空'));

              case 2:
                _context.prev = 2;
                _context.next = 5;
                return _get(AcceptorManager.prototype.__proto__ || _Object$getPrototypeOf(AcceptorManager.prototype), 'insert', this).call(this, _extends({ idCard: { type: type, number: number } }, other));

              case 5:
                result = _context.sent;
                return _context.abrupt('return', _Promise.resolve(result.insertedId));

              case 9:
                _context.prev = 9;
                _context.t0 = _context['catch'](2);
                return _context.abrupt('return', _Promise.reject(_context.t0));

              case 12:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[2, 9]]);
      }));

      function insert(_x2) {
        return _ref.apply(this, arguments);
      }

      return insert;
    }()
  }, {
    key: 'updateById',
    value: function updateById(acceptor) {
      // _id, eduHistory, careerHistory, records 这几个字段不能更新
      var eduHistory = acceptor.eduHistory;
      var careerHistory = acceptor.careerHistory;
      var records = acceptor.records;

      var other = _objectWithoutProperties(acceptor, ['eduHistory', 'careerHistory', 'records']);

      return _get(AcceptorManager.prototype.__proto__ || _Object$getPrototypeOf(AcceptorManager.prototype), 'updateById', this).call(this, other);
    }
  }, {
    key: 'addEdu',
    value: function addEdu(_id, _ref3) {
      var name = _ref3.name;
      var year = _ref3.year;

      var other = _objectWithoutProperties(_ref3, ['name', 'year']);

      if (!name || !year) return _Promise.reject('name和year不能为空');
      if (!_Number$isInteger(year)) return _Promise.reject('year必须是整数');
      return _get(AcceptorManager.prototype.__proto__ || _Object$getPrototypeOf(AcceptorManager.prototype), 'update', this).call(this, { _id: _id }, { $addToSet: {
          eduHistory: _extends({ name: name, year: year }, other)
        } });
    }
  }, {
    key: 'removeEdu',
    value: function () {
      var _ref4 = _asyncToGenerator(_regeneratorRuntime.mark(function _callee2(_id, _ref5) {
        var name = _ref5.name;
        var year = _ref5.year;
        var oldDoc, filtered;
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(!name || !year)) {
                  _context2.next = 2;
                  break;
                }

                return _context2.abrupt('return', _Promise.reject('name和year不能为空'));

              case 2:
                if (_Number$isInteger(year)) {
                  _context2.next = 4;
                  break;
                }

                return _context2.abrupt('return', _Promise.reject('year必须是整数'));

              case 4:
                _context2.prev = 4;
                _context2.next = 7;
                return _get(AcceptorManager.prototype.__proto__ || _Object$getPrototypeOf(AcceptorManager.prototype), 'findById', this).call(this, _id);

              case 7:
                oldDoc = _context2.sent;
                filtered = oldDoc.eduHistory.filter(function (edu) {
                  return !(edu.name === name && edu.year === year);
                });
                _context2.next = 11;
                return _get(AcceptorManager.prototype.__proto__ || _Object$getPrototypeOf(AcceptorManager.prototype), 'update', this).call(this, { _id: _id }, {
                  $set: {
                    eduHistory: filtered
                  }
                });

              case 11:
                return _context2.abrupt('return', _Promise.resolve());

              case 14:
                _context2.prev = 14;
                _context2.t0 = _context2['catch'](4);
                return _context2.abrupt('return', _Promise.reject(_context2.t0));

              case 17:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[4, 14]]);
      }));

      function removeEdu(_x3, _x4) {
        return _ref4.apply(this, arguments);
      }

      return removeEdu;
    }()
  }, {
    key: 'addCareer',
    value: function addCareer(_id, _ref6) {
      var name = _ref6.name;
      var year = _ref6.year;

      var other = _objectWithoutProperties(_ref6, ['name', 'year']);

      if (!name || !year) return _Promise.reject('name和year不能为空');
      if (!_Number$isInteger(year)) return _Promise.reject('year必须是整数');
      return _get(AcceptorManager.prototype.__proto__ || _Object$getPrototypeOf(AcceptorManager.prototype), 'update', this).call(this, { _id: _id }, { $addToSet: {
          careerHistory: _extends({ name: name, year: year }, other)
        } });
    }
  }, {
    key: 'removeCareer',
    value: function () {
      var _ref7 = _asyncToGenerator(_regeneratorRuntime.mark(function _callee3(_id, _ref8) {
        var name = _ref8.name;
        var year = _ref8.year;
        var oldDoc, filtered;
        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!(!name || !year)) {
                  _context3.next = 2;
                  break;
                }

                return _context3.abrupt('return', _Promise.reject('name和year不能为空'));

              case 2:
                if (_Number$isInteger(year)) {
                  _context3.next = 4;
                  break;
                }

                return _context3.abrupt('return', _Promise.reject('year必须是整数'));

              case 4:
                _context3.prev = 4;
                _context3.next = 7;
                return _get(AcceptorManager.prototype.__proto__ || _Object$getPrototypeOf(AcceptorManager.prototype), 'findById', this).call(this, _id);

              case 7:
                oldDoc = _context3.sent;
                filtered = oldDoc.careerHistory.filter(function (car) {
                  return !(car.name === name && car.year === year);
                });
                _context3.next = 11;
                return _get(AcceptorManager.prototype.__proto__ || _Object$getPrototypeOf(AcceptorManager.prototype), 'update', this).call(this, { _id: _id }, {
                  $set: {
                    careerHistory: filtered
                  }
                });

              case 11:
                return _context3.abrupt('return', _Promise.resolve());

              case 14:
                _context3.prev = 14;
                _context3.t0 = _context3['catch'](4);
                return _context3.abrupt('return', _Promise.reject(_context3.t0));

              case 17:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[4, 14]]);
      }));

      function removeCareer(_x5, _x6) {
        return _ref7.apply(this, arguments);
      }

      return removeCareer;
    }()
  }, {
    key: 'addRecord',
    value: function () {
      var _ref9 = _asyncToGenerator(_regeneratorRuntime.mark(function _callee4(_id, _ref10) {
        var id = _ref10.id;
        var project = _ref10.project;
        var amount = _ref10.amount;
        var date = _ref10.date;

        var other = _objectWithoutProperties(_ref10, ['id', 'project', 'amount', 'date']);

        return _regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!(!project || !amount || !date)) {
                  _context4.next = 2;
                  break;
                }

                return _context4.abrupt('return', _Promise.reject('project、amount和date不能为空'));

              case 2:
                if (_Number$isInteger(amount)) {
                  _context4.next = 4;
                  break;
                }

                return _context4.abrupt('return', _Promise.reject('amount必须是整数'));

              case 4:
                if (date.getFullYear) {
                  _context4.next = 6;
                  break;
                }

                return _context4.abrupt('return', _Promise.reject('date必须是Date类型'));

              case 6:
                if (!id) id = new mongodb.ObjectId(); // eslint-disable-line no-param-reassign
                _context4.prev = 7;
                _context4.next = 10;
                return _get(AcceptorManager.prototype.__proto__ || _Object$getPrototypeOf(AcceptorManager.prototype), 'update', this).call(this, { _id: _id }, {
                  $addToSet: {
                    records: _extends({
                      _id: id,
                      project: project,
                      amount: amount,
                      date: date
                    }, other)
                  }
                });

              case 10:
                return _context4.abrupt('return', _Promise.resolve(id));

              case 13:
                _context4.prev = 13;
                _context4.t0 = _context4['catch'](7);
                return _context4.abrupt('return', _Promise.reject(_context4.t0));

              case 16:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this, [[7, 13]]);
      }));

      function addRecord(_x7, _x8) {
        return _ref9.apply(this, arguments);
      }

      return addRecord;
    }()
  }, {
    key: 'removeRecord',
    value: function () {
      var _ref11 = _asyncToGenerator(_regeneratorRuntime.mark(function _callee5(_id, recordId) {
        var oldDoc, records;
        return _regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                _context5.next = 3;
                return _get(AcceptorManager.prototype.__proto__ || _Object$getPrototypeOf(AcceptorManager.prototype), 'findById', this).call(this, _id);

              case 3:
                oldDoc = _context5.sent;
                records = oldDoc.records.filter(function (record) {
                  return !record._id.equals(recordId);
                });
                _context5.next = 7;
                return _get(AcceptorManager.prototype.__proto__ || _Object$getPrototypeOf(AcceptorManager.prototype), 'update', this).call(this, { _id: _id }, {
                  $set: { records: records }
                });

              case 7:
                return _context5.abrupt('return', _Promise.resolve());

              case 10:
                _context5.prev = 10;
                _context5.t0 = _context5['catch'](0);
                return _context5.abrupt('return', _Promise.reject(_context5.t0));

              case 13:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this, [[0, 10]]);
      }));

      function removeRecord(_x9, _x10) {
        return _ref11.apply(this, arguments);
      }

      return removeRecord;
    }()
  }, {
    key: 'findOneByIdCardNumber',
    value: function findOneByIdCardNumber(number) {
      return _get(AcceptorManager.prototype.__proto__ || _Object$getPrototypeOf(AcceptorManager.prototype), 'findOne', this).call(this, { 'idCard.number': number });
    }
  }, {
    key: 'list',
    value: function () {
      var _ref12 = _asyncToGenerator(_regeneratorRuntime.mark(function _callee6() {
        var _ref13 = arguments.length <= 0 || arguments[0] === undefined ? {
          skip: 0, limit: 100, fieldsForFilter: ['name', 'phone']
        } : arguments[0];

        var text = _ref13.text;
        var _ref13$skip = _ref13.skip;
        var skip = _ref13$skip === undefined ? 0 : _ref13$skip;
        var _ref13$limit = _ref13.limit;
        var limit = _ref13$limit === undefined ? 100 : _ref13$limit;
        var _ref13$fieldsForFilte = _ref13.fieldsForFilter;
        var fieldsForFilter = _ref13$fieldsForFilte === undefined ? ['name', 'phone'] : _ref13$fieldsForFilte;

        var query, _ret, result;

        return _regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                query = {};

                if (!text) {
                  _context6.next = 5;
                  break;
                }

                _ret = function () {
                  if (!fieldsForFilter || !fieldsForFilter.length) {
                    return {
                      v: _Promise.reject('当text有值时，fieldsForFilter字段不能为空')
                    };
                  }
                  var reg = new RegExp(text);
                  query = _Object$assign(query, {
                    $or: fieldsForFilter.map(function (field) {
                      return _defineProperty({}, field, reg);
                    })
                  });
                }();

                if (!((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object")) {
                  _context6.next = 5;
                  break;
                }

                return _context6.abrupt('return', _ret.v);

              case 5:
                _context6.prev = 5;
                _context6.next = 8;
                return _Promise.all([_get(AcceptorManager.prototype.__proto__ || _Object$getPrototypeOf(AcceptorManager.prototype), 'count', this).call(this, query), _get(AcceptorManager.prototype.__proto__ || _Object$getPrototypeOf(AcceptorManager.prototype), 'find', this).call(this, { query: query, skip: skip, limit: limit })]);

              case 8:
                result = _context6.sent;
                return _context6.abrupt('return', _Promise.resolve({
                  totalCount: result[0],
                  data: result[1]
                }));

              case 12:
                _context6.prev = 12;
                _context6.t0 = _context6['catch'](5);
                return _context6.abrupt('return', _Promise.reject(_context6.t0));

              case 15:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this, [[5, 12]]);
      }));

      function list(_x11) {
        return _ref12.apply(this, arguments);
      }

      return list;
    }()
  }, {
    key: 'listByRecord',
    value: function () {
      var _ref15 = _asyncToGenerator(_regeneratorRuntime.mark(function _callee7() {
        var _ref16 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        var project = _ref16.project;
        var year = _ref16.year;
        var text = _ref16.text;
        var _ref16$skip = _ref16.skip;
        var skip = _ref16$skip === undefined ? 0 : _ref16$skip;
        var _ref16$limit = _ref16.limit;
        var limit = _ref16$limit === undefined ? 100 : _ref16$limit;
        var _ref16$fieldsForFilte = _ref16.fieldsForFilter;
        var fieldsForFilter = _ref16$fieldsForFilte === undefined ? ['name', 'phone'] : _ref16$fieldsForFilte;

        var query, _ret2, elemMatch, result;

        return _regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                query = {};

                if (!text) {
                  _context7.next = 5;
                  break;
                }

                _ret2 = function () {
                  if (!fieldsForFilter || !fieldsForFilter.length) {
                    return {
                      v: _Promise.reject('当text有值时，fieldsForFilter字段不能为空')
                    };
                  }
                  var reg = new RegExp(text);
                  query = _Object$assign(query, {
                    $or: fieldsForFilter.map(function (field) {
                      return _defineProperty({}, field, reg);
                    })
                  });
                }();

                if (!((typeof _ret2 === 'undefined' ? 'undefined' : _typeof(_ret2)) === "object")) {
                  _context7.next = 5;
                  break;
                }

                return _context7.abrupt('return', _ret2.v);

              case 5:
                if (project || year) {
                  elemMatch = {};

                  if (project) {
                    elemMatch = _extends({}, elemMatch, { project: project });
                  }
                  if (year) {
                    elemMatch = _extends({}, elemMatch, {
                      date: {
                        $gte: new Date(year, 0, 1),
                        $lt: new Date(year + 1, 0, 1)
                      }
                    });
                  }
                  query = _Object$assign(query, {
                    records: {
                      $elemMatch: elemMatch
                    }
                  });
                }
                _context7.prev = 6;
                _context7.next = 9;
                return _Promise.all([_get(AcceptorManager.prototype.__proto__ || _Object$getPrototypeOf(AcceptorManager.prototype), 'count', this).call(this, query), _get(AcceptorManager.prototype.__proto__ || _Object$getPrototypeOf(AcceptorManager.prototype), 'find', this).call(this, { query: query, skip: skip, limit: limit })]);

              case 9:
                result = _context7.sent;
                return _context7.abrupt('return', _Promise.resolve({
                  totalCount: result[0],
                  data: result[1]
                }));

              case 13:
                _context7.prev = 13;
                _context7.t0 = _context7['catch'](6);
                return _context7.abrupt('return', _Promise.reject(_context7.t0));

              case 16:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this, [[6, 13]]);
      }));

      function listByRecord(_x13) {
        return _ref15.apply(this, arguments);
      }

      return listByRecord;
    }()
  }, {
    key: 'computeStatByProject',
    value: function computeStatByProject() {
      var map = function map() {
        // eslint-disable-line
        if (this.records) {
          this.records.forEach(function (record) {
            if (record.isDeleted) return;
            emit(record.project, { // eslint-disable-line
              amount: record.amount / 1000,
              count: 1,
              lastUpdated: record.date
            });
          });
        }
      };
      var reduce = function reduce(key, values) {
        var amount = 0;
        var count = 0;
        var lastUpdated = 0;
        values.forEach(function (val) {
          amount += val.amount;
          count += val.count;
          lastUpdated = Math.max(lastUpdated, +val.lastUpdated);
        });
        return { amount: amount, count: count, lastUpdated: lastUpdated };
      };

      return _get(AcceptorManager.prototype.__proto__ || _Object$getPrototypeOf(AcceptorManager.prototype), 'mapReduce', this).call(this, map, reduce, {
        out: {
          replace: this.statByProjectCollectionName
        }
      });
    }
  }, {
    key: 'getStatByProject',
    value: function getStatByProject() {
      var manager = new EntityManager(this.mongoUrl, this.statByProjectCollectionName);
      return manager.find();
    }
  }, {
    key: 'computeStatByYear',
    value: function computeStatByYear() {
      var map = function map() {
        // eslint-disable-line
        if (this.records) {
          this.records.forEach(function (record) {
            if (record.isDeleted) return;
            emit(record.date.getYear() + 1900, { // eslint-disable-line
              amount: record.amount / 1000,
              count: 1,
              lastUpdated: record.date
            });
          });
        }
      };
      var reduce = function reduce(key, values) {
        var amount = 0;
        var count = 0;
        var lastUpdated = 0;
        values.forEach(function (val) {
          amount += val.amount;
          count += val.count;
          lastUpdated = Math.max(lastUpdated, val.lastUpdated);
        });
        return { amount: amount, count: count, lastUpdated: lastUpdated };
      };

      return _get(AcceptorManager.prototype.__proto__ || _Object$getPrototypeOf(AcceptorManager.prototype), 'mapReduce', this).call(this, map, reduce, {
        out: {
          replace: this.statByYearCollectionName
        }
      });
    }
  }, {
    key: 'getStatByYear',
    value: function getStatByYear() {
      var manager = new EntityManager(this.mongoUrl, this.statByYearCollectionName);
      return manager.find();
    }
  }]);

  return AcceptorManager;
}(EntityManager);

module.exports = AcceptorManager;
//# sourceMappingURL=index.js.map