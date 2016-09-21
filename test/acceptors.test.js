/*
eslint-env mocha
 */
/*
eslint-disable no-unused-expressions
 */
import { expect } from 'chai';
import 'babel-polyfill';
import AcceptorManager from '../src/acceptors';

const manager = new AcceptorManager('mongodb://localhost/jkef');

describe('AcceptorManager 类', () => {
  const docId = Math.random();
  const rawDoc = {
    _id: docId,
    idCard: {
      type: 'type',
      number: Math.random(),
    },
    otherInfo: 'some',
  };

  const updatedDoc = {
    _id: docId,
    idCard: {
      type: 'typeUpdated',
      number: Math.random(),
    },
    anotherInfo: 'some',
  };

  describe('添加Acceptor', () => {
    [{},
      { idCard: {} },
      { idCard: { type: 'type' } },
      { idCard: { number: 'number' } },
    ].map(acceptor =>
      it('acceptor对象必须有 idCard{type, number} 字段', async () => {
        try {
          await manager.insert(acceptor);
          throw new Error('test failed');
        } catch (e) {
          expect(e).ok;
        }
      }));
    it('正确添加', async () => {
      const result = await manager.insert(rawDoc);
      expect(result.insertedId).to.eql(docId);
    });
  });

  describe('根据Id查找Acceptor', () => {
    it('Id不存在时，返回null', async () => {
      const wrongId = Math.random();
      const result = await manager.findById(wrongId);
      expect(result).to.be.null;
    });
    it('Id正确时发挥正确的结果', async () => {
      const result = await manager.findById(docId);
      expect(result).to.eql(rawDoc);
    });
  });

  describe('根据Id更新Acceptor', () => {
    it('正常更新', async () => {
      await manager.updateById({
        ...rawDoc, ...updatedDoc,
      });
      const updated = await manager.findById(docId);
      expect(updated.otherInfo).to.eql('some');
      expect(updated.anotherInfo).to.eql('some');
    });
  });

  describe('添加教育经历', () => {
    describe('name和year不能为空, year必须是整数', () => {
      [
        { name: null, year: null },
        { name: 'test', year: null },
        { name: null, year: 2011 },
        { name: 'test', year: '2011.1' },
      ].map(edu =>
        it(JSON.stringify(edu), async () => {
          try {
            await manager.addEdu(docId, edu);
            throw new Error('It should not go here');
          } catch (e) {
            expect(e).is.ok;
          }
        }));
    });
    it('正常添加', async () => {
      const edu = { name: '本科', year: 2013, other: 'some' };
      await manager.addEdu(docId, edu);

      const result = await manager.findById(docId);
      expect(result.eduHistory.some(his =>
        his.name === edu.name && his.year === edu.year && his.other === edu.other
      )).to.be.true;
    });
  });

  describe('添加工作经历', () => {
    describe('name和year不能为空, year必须是整数', () => {
      [
        { name: null, year: null },
        { name: 'test', year: null },
        { name: null, year: 2011 },
        { name: 'test', year: '2011.1' },
      ].map(career =>
        it(JSON.stringify(career), async () => {
          try {
            await manager.addCareer(docId, career);
            throw new Error('It should not go here');
          } catch (e) {
            expect(e).is.ok;
          }
        }));
    });
    it('正常添加', async () => {
      const career = { name: 'xx公司', year: 2013, other: 'some' };
      await manager.addCareer(docId, career);

      const result = await manager.findById(docId);
      expect(result.careerHistory.some(his =>
        his.name === career.name && his.year === career.year && his.other === career.other
      )).to.be.true;
    });
  });

  describe('添加奖助记录', () => {
    describe('project、amount和date不能为空, amount必须是整数,date必须是Date类型', () =>
      [
        { project: '测试', amount: 342222, date: null },
        { project: 'test', amount: null, date: new Date() },
        { project: null, amount: 4332, date: new Date() },
        { project: 'test', amount: '3443', date: new Date() },
        { project: 'test', amount: 3443, date: 1443333000 },
      ].map(record =>
        it(JSON.stringify(record), async () => {
          try {
            await manager.addRecord(docId, record);
            throw new Error('It should not go here');
          } catch (e) {
            expect(e).is.ok;
          }
        })));
    it('正常添加', async () => {
      const record = {
        project: 'test',
        amount: 98700,
        date: new Date(),
        other: 'some',
      };
      await manager.addRecord(docId, record);

      const result = await manager.findById(docId);
      expect(result.records.some(his =>
        his.project === record.project
        && his.amount === record.amount
        && his.date.valueOf() === record.date.valueOf()
        && his.other === record.other
      )).to.be.true;
    });
  });

  // it('findByIdCardNumber 可根据idCard.number找到数据', async () => {
  //   const gettedDoc = await findByIdCardNumber(rawDoc.idCard.number);
  //   const { eduHistory, careerHistory, ...data } = gettedDoc;
  //   expect(eduHistory).eql([edu]);
  //   expect(careerHistory).eql([career]);
  //   expect(data).to.eql(rawDoc);
  // });
  //
  // it('addAcceptor 当保存相同idCard.number的acceptor时，添加失败', async () => {
  //   const newDoc = {
  //     ...rawDoc,
  //     _id: Math.random(),
  //   };
  //   try {
  //     await addAcceptor(newDoc);
  //     throw new Error('不应该运行到这里');
  //   } catch (e) {
  //     expect(e).to.be.ok;
  //   }
  // });
  //
  // it('update 可根据_id更新数据，但不会更新_id字段', async () => {
  //   await update(docId, { _id: docId, ...updatedDoc });
  //   const { eduHistory, careerHistory, ...gettedDoc } = // eslint-disable-line no-unused-vars
  //     await findByIdCardNumber(updatedDoc.idCard.number);
  //   expect(gettedDoc).to.eql({ _id: docId, ...updatedDoc });
  // });
  //
  // it('findAcceptors 不使用参数能查出不超过20条记录', async () => {
  //   try {
  //     const { data, totalCount } = await findAcceptors();
  //     expect(totalCount).to.above(0);
  //     expect(data.length).to.below(21);
  //     expect(data[0].name).to.be.not.null; // eslint-disable-line no-unused-expressions
  //   } catch (e) {
  //     throw e;
  //   }
  // });
  //
  // it('findAcceptors 使用limit参数限制取出的数目', async () => {
  //   try {
  //     const { data, totalCount } = await findAcceptors({ limit: 1 });
  //     expect(totalCount).to.above(0);
  //     expect(data.length).to.eql(1);
  //     expect(data[0].name).to.be.not.null; // eslint-disable-line no-unused-expressions
  //   } catch (e) {
  //     throw e;
  //   }
  // });
  //
  // it('findAcceptors 使用skip跳过前面的内容', async () => {
  //   try {
  //     const { data, totalCount } = await findAcceptors({ skip: 99999999 });
  //     expect(totalCount).to.above(0);
  //     expect(data.length).to.eql(0);
  //   } catch (e) {
  //     throw e;
  //   }
  // });
  //
  // it('findAcceptors 无参数查询', async () => {
  //   const list = await findAcceptors();
  //   expect(list.data.length).to.above(0);
  // });
  //
  // it('findAcceptors 根据project查询，找出所有包含指定项目记录的人', async () => {
  //   const list = await findAcceptors({ project: '奖学金', limit: 500 });
  //   if (list.data.totalCount >= 500) expect(list.data.length).to.above(499);
  //   expect(list.data.length).to.above(0);
  //   list.data.forEach(doc => {
  //     if (doc.records) {
  //       expect(doc.records.some.bind(doc.records, rec => rec.project === '奖学金'));
  //     }
  //   });
  // });
  //
  // it('按项目统计数据', async () => {
  //   try {
  //     await computeStatByProject();
  //     const result = await getStatByProject();
  //     expect(result.length).to.be.above(0);
  //     expect(result.find(item => item._id === '其他').value.amount).to.be.above(0);
  //   } catch (e) {
  //     throw e;
  //   }
  // });
  //
  // it('按年度统计数据', async () => {
  //   try {
  //     await computeStatByYear();
  //     const result = await getStatByYear();
  //     expect(result.length).to.above(0);
  //     expect(result.find(item => item._id === 2008).value.amount).to.above(0);
  //   } catch (e) {
  //     throw e;
  //   }
  // });
  //
  // it('trash 将数据标识为删除状态，但暂不从数据库中删除', async () => {
  //   await trash(docId);
  //   const gettedDoc = await findById(docId);
  //   const { isDeleted, eduHistory, careerHistory, ...data } // eslint-disable-line no-unused-vars
  //     = gettedDoc;
  //   expect(isDeleted).to.be.true;
  //   expect(data).eql({ _id: docId, ...updatedDoc });
  // });

  // it('removeEdu 正常删除教育经历', async () => {
  //   await removeEdu(docId, edu);
  //   const gettedDoc = findById(docId);
  //   expect(gettedDoc.eduHistory).to.be.undefined;
  //   await removeEdu(docId, edu);
  // });
  //
  // it('removeCareer 正常删除教育经历', async () => {
  //   await removeCareer(docId, career);
  //   const gettedDoc = findById(docId);
  //   expect(gettedDoc.careerHistory).to.be.undefined;
  //   await removeCareer(docId, edu);
  // });
  //
  // it('remove 彻底删除数据', async () => {
  //   await remove(docId);
  //   const gettedDoc = await findById(docId);
  //   expect(gettedDoc).to.be.null;
  // });
});
