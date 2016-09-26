# jkef-model
jkef项目服务器端模型定义。

## Install
`npm install jkef-model --save`

## Example
默认使用mongodb存储数据。
```javascript
import AcceptorManager from 'jkef-model';

const manager = new AcceptorManager('mongodb://localhost/jkef', 'acceptors');

const acceptors = await manager.list();
```

## API

### constructor(mongoUrl, collectionName ='acceptors')
构造函数。

#### 参数
- `mongoUrl` 数据库连接字符串；
- `collectionName` 存储数据的集合名称，默认为`acceptors`。

### insert({ idCard: { type, number }, ...other }): Promise
插入一条acceptor记录

#### 参数
- type: 证件类型，必须；
- number: 证件号码，必须；
- other: 其他数据。

#### 返回值
Promise
- resolve: 刚刚添加的数据的_id
- reject: 错误信息

### updateById(acceptor)

### addEdu(_id, { name, year, ...other })

### removeEdu(_id, { name, year })

### addCareer(_id, { name, year, ...other })

### removeCareer(_id, { name, year })

### addRecord(_id, { id, project, amount, date, ...other })

### removeRecord(_id, recordId)

### list({ text, skip = 0, limit = 100, fieldsForFilter = ['name', 'phone'] } = { skip: 0, limit: 100, fieldsForFilter: ['name', 'phone'] })

### listByRecord({ project, year, text, skip = 0, limit = 100, fieldsForFilter = ['name', 'phone'] } = {})

### findById(_id)

### removeById(_id)

### findOneByIdCardNumber(number)
