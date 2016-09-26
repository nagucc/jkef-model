(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('babel-runtime/helpers/typeof'), require('babel-runtime/helpers/defineProperty'), require('babel-runtime/core-js/object/assign'), require('babel-runtime/core-js/number/is-integer'), require('babel-runtime/regenerator'), require('babel-runtime/helpers/extends'), require('babel-runtime/core-js/promise'), require('babel-runtime/helpers/objectWithoutProperties'), require('babel-runtime/helpers/asyncToGenerator'), require('babel-runtime/core-js/object/get-prototype-of'), require('babel-runtime/helpers/classCallCheck'), require('babel-runtime/helpers/createClass'), require('babel-runtime/helpers/possibleConstructorReturn'), require('babel-runtime/helpers/get'), require('babel-runtime/helpers/inherits'), require('mongo-use-collection'), require('mongodb'), require('babel-runtime/core-js/json/stringify')) :
  typeof define === 'function' && define.amd ? define(['babel-runtime/helpers/typeof', 'babel-runtime/helpers/defineProperty', 'babel-runtime/core-js/object/assign', 'babel-runtime/core-js/number/is-integer', 'babel-runtime/regenerator', 'babel-runtime/helpers/extends', 'babel-runtime/core-js/promise', 'babel-runtime/helpers/objectWithoutProperties', 'babel-runtime/helpers/asyncToGenerator', 'babel-runtime/core-js/object/get-prototype-of', 'babel-runtime/helpers/classCallCheck', 'babel-runtime/helpers/createClass', 'babel-runtime/helpers/possibleConstructorReturn', 'babel-runtime/helpers/get', 'babel-runtime/helpers/inherits', 'mongo-use-collection', 'mongodb', 'babel-runtime/core-js/json/stringify'], factory) :
  (global.jkef-model = factory(global._typeof,global._defineProperty,global._Object$assign,global._Number$isInteger,global._regeneratorRuntime,global._extends,global._Promise,global._objectWithoutProperties,global._asyncToGenerator,global._Object$getPrototypeOf,global._classCallCheck,global._createClass,global._possibleConstructorReturn,global._get,global._inherits,global.mongoUseCollection,global.mongodb,global._JSON$stringify));
}(this, function (_typeof,_defineProperty,_Object$assign,_Number$isInteger,_regeneratorRuntime,_extends,_Promise,_objectWithoutProperties,_asyncToGenerator,_Object$getPrototypeOf,_classCallCheck,_createClass,_possibleConstructorReturn,_get,_inherits,mongoUseCollection,mongodb,_JSON$stringify) { 'use strict';

  _typeof = 'default' in _typeof ? _typeof['default'] : _typeof;
  _defineProperty = 'default' in _defineProperty ? _defineProperty['default'] : _defineProperty;
  _Object$assign = 'default' in _Object$assign ? _Object$assign['default'] : _Object$assign;
  _Number$isInteger = 'default' in _Number$isInteger ? _Number$isInteger['default'] : _Number$isInteger;
  _regeneratorRuntime = 'default' in _regeneratorRuntime ? _regeneratorRuntime['default'] : _regeneratorRuntime;
  _extends = 'default' in _extends ? _extends['default'] : _extends;
  _Promise = 'default' in _Promise ? _Promise['default'] : _Promise;
  _objectWithoutProperties = 'default' in _objectWithoutProperties ? _objectWithoutProperties['default'] : _objectWithoutProperties;
  _asyncToGenerator = 'default' in _asyncToGenerator ? _asyncToGenerator['default'] : _asyncToGenerator;
  _Object$getPrototypeOf = 'default' in _Object$getPrototypeOf ? _Object$getPrototypeOf['default'] : _Object$getPrototypeOf;
  _classCallCheck = 'default' in _classCallCheck ? _classCallCheck['default'] : _classCallCheck;
  _createClass = 'default' in _createClass ? _createClass['default'] : _createClass;
  _possibleConstructorReturn = 'default' in _possibleConstructorReturn ? _possibleConstructorReturn['default'] : _possibleConstructorReturn;
  _get = 'default' in _get ? _get['default'] : _get;
  _inherits = 'default' in _inherits ? _inherits['default'] : _inherits;
  _JSON$stringify = 'default' in _JSON$stringify ? _JSON$stringify['default'] : _JSON$stringify;

  // import { ObjectId } from 'mongodb';

  var EntityManager = function () {
    /**
     * 构造函数
     * @param  {String} collectionName Entity使用的集合的名称
     * @param  {String} mongoUrl       所使用的数据库的连接字符串
     */
    function EntityManager(collectionName, mongoUrl) {
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
      value: function find(_ref2) {
        var _this2 = this;

        var _ref2$query = _ref2.query;
        var query = _ref2$query === undefined ? {} : _ref2$query;
        var _ref2$limit = _ref2.limit;
        var limit = _ref2$limit === undefined ? 100 : _ref2$limit;
        var _ref2$skip = _ref2.skip;
        var skip = _ref2$skip === undefined ? 0 : _ref2$skip;

        console.log('[EntityManager find]query::', _JSON$stringify(query));
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
                      cursor = col.find(query).skip(skip).limit(limit);
                      _context2.next = 5;
                      return cursor.toArray();

                    case 5:
                      result = _context2.sent;

                      console.log('[EntityManager find]', col.collectionName, '::result.length::', result.length);
                      resolve(result);
                      _context2.next = 14;
                      break;

                    case 10:
                      _context2.prev = 10;
                      _context2.t0 = _context2['catch'](1);

                      console.log('[EntityManager find]Error: ', _context2.t0); // eslint-disable-line no-console
                      reject(_context2.t0);

                    case 14:
                    case 'end':
                      return _context2.stop();
                  }
                }
              }, _callee2, _this2, [[1, 10]]);
            }));

            return function (_x2) {
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

            return function (_x4) {
              return _ref4.apply(this, arguments);
            };
          }());
        });
      }
    }, {
      key: 'findById',
      value: function findById(_id) {
        var _this4 = this;

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
                      return col.findOne({ _id: _id });

                    case 3:
                      result = _context4.sent;

                      resolve(result);
                      _context4.next = 11;
                      break;

                    case 7:
                      _context4.prev = 7;
                      _context4.t0 = _context4['catch'](0);

                      console.log('[EntityManager findById]Error: ', _context4.t0); // eslint-disable-line no-console
                      reject(_context4.t0);

                    case 11:
                    case 'end':
                      return _context4.stop();
                  }
                }
              }, _callee4, _this4, [[0, 7]]);
            }));

            return function (_x5) {
              return _ref5.apply(this, arguments);
            };
          }());
        });
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

            return function (_x6) {
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

            return function (_x8) {
              return _ref8.apply(this, arguments);
            };
          }());
        });
      }
    }]);

    return EntityManager;
  }();

  var _this2 = this;

  var all = _Promise.all;


  var ACCEPTORS_COLLECTION = 'acceptors';
  var STAT_BY_PROJECT = 'stat_by_project';
  var STAT_BY_YEAR = 'stat_by_year';

  var AcceptorManager = function (_EntityManager) {
    _inherits(AcceptorManager, _EntityManager);

    function AcceptorManager(mongoUrl) {
      var collectionName = arguments.length <= 1 || arguments[1] === undefined ? ACCEPTORS_COLLECTION : arguments[1];

      _classCallCheck(this, AcceptorManager);

      return _possibleConstructorReturn(this, (AcceptorManager.__proto__ || _Object$getPrototypeOf(AcceptorManager)).call(this, collectionName, mongoUrl));
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

          var query, _ret2, result;

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
                  if (project) {
                    query = _Object$assign(query, {
                      'records.project': project
                    });
                  }

                  if (year) {
                    query = _Object$assign(query, {
                      records: {
                        $elemMatch: {
                          date: {
                            $gte: new Date(year, 0, 1),
                            $lt: new Date(year + 1, 0, 1)
                          }
                        }
                      }
                    });
                  }
                  _context7.prev = 7;
                  _context7.next = 10;
                  return _Promise.all([_get(AcceptorManager.prototype.__proto__ || _Object$getPrototypeOf(AcceptorManager.prototype), 'count', this).call(this, query), _get(AcceptorManager.prototype.__proto__ || _Object$getPrototypeOf(AcceptorManager.prototype), 'find', this).call(this, { query: query, skip: skip, limit: limit })]);

                case 10:
                  result = _context7.sent;
                  return _context7.abrupt('return', _Promise.resolve({
                    totalCount: result[0],
                    data: result[1]
                  }));

                case 14:
                  _context7.prev = 14;
                  _context7.t0 = _context7['catch'](7);
                  return _context7.abrupt('return', _Promise.reject(_context7.t0));

                case 17:
                case 'end':
                  return _context7.stop();
              }
            }
          }, _callee7, this, [[7, 14]]);
        }));

        function listByRecord(_x13) {
          return _ref15.apply(this, arguments);
        }

        return listByRecord;
      }()
    }]);

    return AcceptorManager;
  }(EntityManager);

  var useAcceptors = function useAcceptors(cb) {
    return mongoUseCollection.useCollection(mongoUrl, ACCEPTORS_COLLECTION, cb);
  };
  var computeStatByProject = function () {
    var _ref18 = _asyncToGenerator(_regeneratorRuntime.mark(function _callee9() {
      return _regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              return _context9.abrupt('return', new _Promise(function (resolve, reject) {
                return useAcceptors(function () {
                  var _ref19 = _asyncToGenerator(_regeneratorRuntime.mark(function _callee8(col) {
                    var map, reduce;
                    return _regeneratorRuntime.wrap(function _callee8$(_context8) {
                      while (1) {
                        switch (_context8.prev = _context8.next) {
                          case 0:
                            map = function map() {
                              // eslint-disable-line
                              if (this.records) {
                                this.records.forEach(function (record) {
                                  // eslint-disable-line
                                  if (record.isDeleted) return;
                                  emit(record.project, { // eslint-disable-line
                                    amount: record.amount / 1000,
                                    count: 1,
                                    lastUpdated: record.date
                                  });
                                });
                              }
                            };

                            reduce = function reduce(key, values) {
                              // eslint-disable-line
                              var amount = 0,
                                  count = 0,
                                  lastUpdated = 0; // eslint-disable-line
                              values.forEach(function (val) {
                                amount += val.amount;
                                count += val.count;
                                lastUpdated = Math.max(lastUpdated, +val.lastUpdated);
                              });
                              // mongodb 中不支持shorthand
                              return {
                                amount: amount, // eslint-disable-line object-shorthand
                                count: count, // eslint-disable-line object-shorthand
                                lastUpdated: lastUpdated };
                            };

                            _context8.prev = 2;
                            _context8.next = 5;
                            return col.mapReduce(map, reduce, {
                              out: {
                                replace: STAT_BY_PROJECT
                              }
                            });

                          case 5:
                            resolve();
                            _context8.next = 11;
                            break;

                          case 8:
                            _context8.prev = 8;
                            _context8.t0 = _context8['catch'](2);

                            reject(_context8.t0);

                          case 11:
                          case 'end':
                            return _context8.stop();
                        }
                      }
                    }, _callee8, _this2, [[2, 8]]);
                  }));

                  return function (_x15) {
                    return _ref19.apply(this, arguments);
                  };
                }());
              }));

            case 1:
            case 'end':
              return _context9.stop();
          }
        }
      }, _callee9, _this2);
    }));

    return function computeStatByProject() {
      return _ref18.apply(this, arguments);
    };
  }();

  var computeStatByYear = function () {
    var _ref20 = _asyncToGenerator(_regeneratorRuntime.mark(function _callee11() {
      return _regeneratorRuntime.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              return _context11.abrupt('return', new _Promise(function (resolve, reject) {
                useAcceptors(function () {
                  var _ref21 = _asyncToGenerator(_regeneratorRuntime.mark(function _callee10(col) {
                    var map, reduce;
                    return _regeneratorRuntime.wrap(function _callee10$(_context10) {
                      while (1) {
                        switch (_context10.prev = _context10.next) {
                          case 0:
                            map = function map() {
                              // eslint-disable-line
                              if (this.records) {
                                this.records.forEach(function (record) {
                                  // eslint-disable-line
                                  if (record.isDeleted) return;
                                  emit(record.date.getYear() + 1900, { // eslint-disable-line
                                    amount: record.amount / 1000,
                                    count: 1,
                                    lastUpdated: record.date
                                  });
                                });
                              }
                            };

                            reduce = function reduce(key, values) {
                              // eslint-disable-line
                              var amount = 0,
                                  count = 0,
                                  lastUpdated = 0; // eslint-disable-line
                              values.forEach(function (val) {
                                amount += val.amount;
                                count += val.count;
                                lastUpdated = Math.max(lastUpdated, +val.lastUpdated);
                              });
                              // mongodb 中不支持shorthand
                              return {
                                amount: amount, // eslint-disable-line object-shorthand
                                count: count, // eslint-disable-line object-shorthand
                                lastUpdated: lastUpdated };
                            };

                            _context10.prev = 2;
                            _context10.next = 5;
                            return col.mapReduce(map, reduce, {
                              out: {
                                replace: STAT_BY_YEAR
                              }
                            });

                          case 5:
                            resolve();
                            _context10.next = 11;
                            break;

                          case 8:
                            _context10.prev = 8;
                            _context10.t0 = _context10['catch'](2);

                            reject(_context10.t0);

                          case 11:
                          case 'end':
                            return _context10.stop();
                        }
                      }
                    }, _callee10, _this2, [[2, 8]]);
                  }));

                  return function (_x16) {
                    return _ref21.apply(this, arguments);
                  };
                }());
              }));

            case 1:
            case 'end':
              return _context11.stop();
          }
        }
      }, _callee11, _this2);
    }));

    return function computeStatByYear() {
      return _ref20.apply(this, arguments);
    };
  }();

  var findAcceptors = function () {
    var _ref24 = _asyncToGenerator(_regeneratorRuntime.mark(function _callee14() {
      var _ref25 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      var text = _ref25.text;
      var year = _ref25.year;
      var project = _ref25.project;
      var projections = _ref25.projections;
      var _ref25$skip = _ref25.skip;
      var skip = _ref25$skip === undefined ? 0 : _ref25$skip;
      var _ref25$limit = _ref25.limit;
      var limit = _ref25$limit === undefined ? 20 : _ref25$limit;

      var condition, reg, _profileManager, find, count, result;

      return _regeneratorRuntime.wrap(function _callee14$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              showLog && console.time('findAcceptors from Profiles');
              condition = { isAcceptor: true };

              if (text) {
                reg = new RegExp(text);

                condition = _Object$assign(condition, {
                  $or: [{ name: reg }, { phone: reg }]
                });
              }
              if (project) {
                condition = _Object$assign(condition, {
                  'records.project': project
                });
              }

              if (year) {
                year = parseInt(year, 10); // eslint-disable-line
                condition = _Object$assign(condition, {
                  records: {
                    $elemMatch: {
                      date: {
                        $gte: new Date(year, 0, 1),
                        $lt: new Date(year + 1, 0, 1)
                      }
                    }
                  }
                });
              }

              _profileManager = profileManager;
              find = _profileManager.find;
              count = _profileManager.count;
              _context14.prev = 8;
              _context14.next = 11;
              return all([count(condition), find(condition)]);

            case 11:
              result = _context14.sent;

              console.log('result::::::::', result);
              return _context14.abrupt('return', _Promise.resolve({
                totalCount: result[0],
                data: result[1]
              }));

            case 16:
              _context14.prev = 16;
              _context14.t0 = _context14['catch'](8);
              return _context14.abrupt('return', _Promise.reject(_context14.t0));

            case 19:
            case 'end':
              return _context14.stop();
          }
        }
      }, _callee14, _this2, [[8, 16]]);
    }));

    return function findAcceptors(_x19) {
      return _ref24.apply(this, arguments);
    };
  }();

  /*
  通过idCard.number找到相应的acceptor
   */
  var findByIdCardNumber = function () {
    var _ref26 = _asyncToGenerator(_regeneratorRuntime.mark(function _callee16(idCardNumber) {
      return _regeneratorRuntime.wrap(function _callee16$(_context16) {
        while (1) {
          switch (_context16.prev = _context16.next) {
            case 0:
              return _context16.abrupt('return', new _Promise(function (resolve, reject) {
                useAcceptors(function () {
                  var _ref27 = _asyncToGenerator(_regeneratorRuntime.mark(function _callee15(col) {
                    var doc;
                    return _regeneratorRuntime.wrap(function _callee15$(_context15) {
                      while (1) {
                        switch (_context15.prev = _context15.next) {
                          case 0:
                            _context15.prev = 0;
                            _context15.next = 3;
                            return col.findOne({ 'idCard.number': idCardNumber });

                          case 3:
                            doc = _context15.sent;

                            resolve(doc);
                            _context15.next = 10;
                            break;

                          case 7:
                            _context15.prev = 7;
                            _context15.t0 = _context15['catch'](0);

                            reject(_context15.t0);

                          case 10:
                          case 'end':
                            return _context15.stop();
                        }
                      }
                    }, _callee15, _this2, [[0, 7]]);
                  }));

                  return function (_x22) {
                    return _ref27.apply(this, arguments);
                  };
                }());
              }));

            case 1:
            case 'end':
              return _context16.stop();
          }
        }
      }, _callee16, _this2);
    }));

    return function findByIdCardNumber(_x21) {
      return _ref26.apply(this, arguments);
    };
  }();

  var remove = function () {
    var _ref29 = _asyncToGenerator(_regeneratorRuntime.mark(function _callee19(_id) {
      return _regeneratorRuntime.wrap(function _callee19$(_context19) {
        while (1) {
          switch (_context19.prev = _context19.next) {
            case 0:
              return _context19.abrupt('return', new _Promise(function (resolve, reject) {
                return useAcceptors(function () {
                  var _ref30 = _asyncToGenerator(_regeneratorRuntime.mark(function _callee18(col) {
                    return _regeneratorRuntime.wrap(function _callee18$(_context18) {
                      while (1) {
                        switch (_context18.prev = _context18.next) {
                          case 0:
                            _context18.prev = 0;
                            _context18.next = 3;
                            return col.remove({ _id: _id });

                          case 3:
                            _context18.t0 = _context18.sent;
                            resolve(_context18.t0);
                            _context18.next = 10;
                            break;

                          case 7:
                            _context18.prev = 7;
                            _context18.t1 = _context18['catch'](0);

                            reject(_context18.t1);

                          case 10:
                          case 'end':
                            return _context18.stop();
                        }
                      }
                    }, _callee18, _this2, [[0, 7]]);
                  }));

                  return function (_x25) {
                    return _ref30.apply(this, arguments);
                  };
                }());
              }));

            case 1:
            case 'end':
              return _context19.stop();
          }
        }
      }, _callee19, _this2);
    }));

    return function remove(_x24) {
      return _ref29.apply(this, arguments);
    };
  }();

  return AcceptorManager;

}));
//# sourceMappingURL=index.umd.js.map