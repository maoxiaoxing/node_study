const { MongoClient } = require('mongodb')

const client = new MongoClient('mongodb://127.0.0.1:27017')

async function run () {
  try {
    await client.connect()
    const testDb = client.db('test')
    const inventtoryCollection = testDb.collection('inventory')
    // inventtoryCollection.insertOne({"name": 'jack', "age": 18})
    // inventtoryCollection.insertMany([{"name": 'king', "age": 21}, {"name": 'ben', "age": 19}])
    // const ret = await inventtoryCollection.find()
    // const ret = await inventtoryCollection.find({
    //   name: 'ben'
    // })
    // const ret = await inventtoryCollection.find({
    //   age: {
    //     $lt: 19
    //   }
    // })
    const arrRet = await ret.toArray()
    console.log(arrRet)
  } catch (err) {
    console.log('连接失败', err)
  } finally {
    await client.close()
  }
}

run()
