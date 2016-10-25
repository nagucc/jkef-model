/*
eslint-disable no-unused-expressions, no-underscore-dangle
eslint-env mocha
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
    name: 'myname',
    phone: 'myphone',
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
      expect(result).to.eql(docId);
    });
  });

  describe('查找Acceptor', () => {
    it('Id不存在时，返回null', async () => {
      const wrongId = Math.random();
      const result = await manager.findById(wrongId);
      expect(result).to.be.null;
    });
    it('Id正确时返回正确的结果', async () => {
      const result = await manager.findById(docId);
      expect(result).to.eql(rawDoc);
    });

    it('根据IdCard.number查找Acceptor', async () => {
      const result = await manager.findOneByIdCardNumber(rawDoc.idCard.number);
      expect(result).to.be.ok;
      expect(result._id).to.eql(rawDoc._id); // eslint-disable-line
    });
  });

  describe('根据Id更新Acceptor', async () => {
    it('正常更新', async () => {
      await manager.updateById({
        ...rawDoc, ...updatedDoc,
      });
      const updated = await manager.findById(docId);
      expect(updated.otherInfo).to.eql('some');
      expect(updated.anotherInfo).to.eql('some');
    });
  });

  describe('教育经历', () => {
    const edu = { name: 'xx大学', year: 2013, other: 'some' };
    const edu2 = { name: 'xx大学2', year: 2018, other: 'some' };
    describe('添加', () => {
      describe('name和year不能为空, year必须是整数', () => {
        [
          { name: null, year: null },
          { name: 'test', year: null },
          { name: null, year: 2011 },
          { name: 'test', year: '2011.1' },
        ].map(ed =>
          it(JSON.stringify(ed), async () => {
            try {
              await manager.addEdu(docId, ed);
              throw new Error('It should not go here');
            } catch (e) {
              expect(e).is.ok;
            }
          }));
      });
      it('正常添加', async () => {
        await manager.addEdu(docId, edu);

        const result = await manager.findById(docId);
        expect(result.eduHistory.length).to.eql(1);
        expect(result.eduHistory.some(his =>
          his.name === edu.name && his.year === edu.year && his.other === edu.other
        )).to.be.true;
      });
    });
    describe('删除', () => {
      describe('name和year不能为空, year必须是整数', () =>
        [
          { name: 'test', year: null },
          { name: null, year: 2011 },
          { name: 'test', year: '2011.1' },
        ].map(ed =>
          it(JSON.stringify(ed), async () => {
            try {
              await manager.removeEdu(docId, ed);
              throw new Error('It should not go here');
            } catch (e) {
              expect(e).is.ok;
            }
          })));
      it('正常删除', async () => {
        await manager.addEdu(docId, edu2);

        let result = await manager.findById(docId);
        expect(result.eduHistory.length).to.eql(2);

        await manager.removeEdu(docId, { name: edu2.name, year: edu2.year });
        result = await manager.findById(docId);
        expect(result.eduHistory.length).to.eql(1);
        expect(result.eduHistory.some(his =>
          his.name === edu.name && his.year === edu.year && his.other === edu.other
        )).to.be.true;
      });
    });
  });

  describe('工作经历', () => {
    const career = { name: 'xx公司', year: 2013, other: 'some' };
    const career2 = { name: 'xx公司2', year: 2015, other: 'some2' };
    describe('添加', () => {
      describe('name和year不能为空, year必须是整数', () => {
        [
          { name: null, year: null },
          { name: 'test', year: null },
          { name: null, year: 2011 },
          { name: 'test', year: '2011.1' },
        ].map(car =>
          it(JSON.stringify(car), async () => {
            try {
              await manager.addCareer(docId, car);
              throw new Error('It should not go here');
            } catch (e) {
              expect(e).is.ok;
            }
          }));
      });
      it('正常添加', async () => {
        await manager.addCareer(docId, career);

        const result = await manager.findById(docId);
        expect(result.careerHistory.some(his =>
          his.name === career.name && his.year === career.year && his.other === career.other
        )).to.be.true;
      });
    });
    describe('删除', () => {
      describe('name和year不能为空, year必须是整数', () =>
        [
          { name: 'test', year: null },
          { name: null, year: 2011 },
          { name: 'test', year: '2011.1' },
        ].map(car =>
          it(JSON.stringify(car), async () => {
            try {
              await manager.removeCareer(docId, car);
              throw new Error('It should not go here');
            } catch (e) {
              expect(e).is.ok;
            }
          })));
      it('正常删除', async () => {
        await manager.addCareer(docId, career2);

        let result = await manager.findById(docId);
        expect(result.careerHistory.length).to.eql(2);

        await manager.removeCareer(docId, { name: career2.name, year: career2.year });
        result = await manager.findById(docId);
        expect(result.careerHistory.length).to.eql(1);
        expect(result.careerHistory.some(his =>
          his.name === career.name && his.year === career.year && his.other === career.other
        )).to.be.true;
      });
    });
  });

  describe('奖助记录', () => {
    const record = {
      project: 'test',
      amount: 98700,
      date: new Date(1934, 4, 4),
      other: 'some',
    };
    const record2 = {
      project: 'test2',
      amount: 987400,
      date: new Date(1937, 2, 2),
      other: 'some2',
    };
    describe('添加', () => {
      describe('project、amount和date不能为空, amount必须是整数,date必须是Date类型', () =>
        [
          { project: '测试', amount: 342222, date: null },
          { project: 'test', amount: null, date: new Date() },
          { project: null, amount: 4332, date: new Date() },
          { project: 'test', amount: '3443', date: new Date() },
          { project: 'test', amount: 3443, date: 1443333000 },
        ].map(rec =>
          it(JSON.stringify(rec), async () => {
            try {
              await manager.addRecord(docId, rec);
              throw new Error('It should not go here');
            } catch (e) {
              expect(e).is.ok;
            }
          })));
      it('正常添加', async () => {
        record._id = await manager.addRecord(docId, record); // eslint-disable-line
        expect(record._id).to.be.ok; // eslint-disable-line

        const result = await manager.findById(docId);
        expect(result.records.some(his =>
          his.project === record.project
          && his.amount === record.amount
          && his.date.valueOf() === record.date.valueOf()
          && his.other === record.other
        )).to.be.true;
      });
    });
    // 如何通过覆盖测试
    describe.skip('统计', () => {
      it('按项目名称统计', async () => {
        await manager.computeStatByProject();
        const result = await manager.getStatByProject();
        expect(result.length).to.be.above(0);
        expect(result.find(
         item => item._id === 'test' // eslint-disable-line no-underscore-dangle
        ).value.amount).to.be.above(0);
      });
      it('按年份统计', async () => {
        await manager.computeStatByYear();
        const result = await manager.getStatByYear();
        expect(result.length).to.be.above(0);
        expect(result.find(
         item => item._id === 1934 // eslint-disable-line no-underscore-dangle
        ).value.amount).to.be.above(0);
      });
    });
    describe('删除', () => {
      it('正常删除', async () => {
        const idNeedRemove = await manager.addRecord(docId, record2);

        let result = await manager.findById(docId);
        expect(result.records.length).to.eql(2);

        await manager.removeRecord(docId, idNeedRemove);
        result = await manager.findById(docId);
        expect(result.records.length).to.eql(1);
      });
    });
  });

  describe('列出Acceptors', () => {
    describe('按分页列出', () => {
      it('默认列出开头100个数据', async () => {
        const result = await manager.list();
        expect(result.totalCount).to.above(0);
        expect(result.data.length).to.above(0);
      });
      it('跳过开头数据', async () => {
        const result = await manager.list({ skip: 100 });
        expect(result.totalCount).to.above(0);
        expect(result.data.length).to.eql(0);
      });
      it('根据姓名和电话筛选', async () => {
        const result = await manager.list({ text: 'my' });
        expect(result.totalCount).to.above(0);
      });
    });
    describe('根据奖助记录信息筛选', () => {
      it('根据年份和项目名称筛选', async () => {
        const result = await manager.listByRecord({
          project: 'test',
          year: 1934,
        });
        expect(result.data.length).to.above(0);
        expect(result.totalCount).to.above(0);
      });
    });
  });

  // describe('根据Id删除Acceptor', () => {
  //   it('正常删除', async () => {
  //     await manager.removeById(docId);
  //   });
  // });

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
