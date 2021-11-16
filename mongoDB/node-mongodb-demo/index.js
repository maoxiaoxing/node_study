const { MongoClient } = require('mongodb')

const client = new MongoClient('mongodb://127.0.0.1:27017')

async function run () {
  try {
    await client.connect()
    const testDb = client.db('test')
    const inventtoryCollection = testDb.collection('inventory')
    inventtoryCollection.insertOne({"name": 'jack', "age": 18})
    const ret = await inventtoryCollection.find()
    const arrRet = await ret.toArray()
    console.log(arrRet)
  } catch (err) {
    console.log('连接失败', err)
  } finally {
    await client.close()
  }
}

run()
