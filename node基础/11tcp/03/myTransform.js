class MyTransfromCode {
  constructor() {
    this.packageHeaderLen = 4
    this.serialNum = 0
    this.serialLen = 2
  }

  // 编码
  encode(data, serialNum) {
    const body = Buffer.from(data)

    const headerBuf = Buffer.alloc(this.packageHeaderLen)
    headerBuf.writeInt16BE(serialNum || this.serialNum)
    headerBuf.writeInt16BE(body.length, this.serialLen)

    if (serialNum == undefined) {
      serialNum++
    }

    return Buffer.concat([headerBuf, body])
  }
}