const { MongoClient, ObjectId } = require('mongodb')

const client = new MongoClient('mongodb://127.0.0.1:27017')

async function run () {
  try {
    await client.connect()
    const testDb = client.db('test')
    const inventtoryCollection = testDb.collection('inventory')
    // 插入
    // inventtoryCollection.insertOne({"name": 'jack', "age": 18})
    // inventtoryCollection.insertMany([{"name": 'king', "age": 21}, {"name": 'ben', "age": 19}])

    // 查找
    // const ret = await inventtoryCollection.find({
    //   name: 'ben'
    // })
    // const ret = await inventtoryCollection.find({
    //   age: {
    //     $lt: 19
    //   }
    // })

    // 删除
    // const res = await inventtoryCollection.deleteOne({
    //   _id: ObjectId('6193b55ff8783c9a5f4262a3')
    // })
    // console.log(res)

    // 更新
    

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
