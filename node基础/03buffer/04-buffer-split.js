Buffer.prototype.split = function (sep) {
  const len = Buffer.from(sep).length
  const ret = []
  let start = 0
  let offset = 0

  while((offset = this.indexOf(sep, start)) !== -1) {
    console.log(offset, 'offset')
    ret.push(this.slice(start, offset))
    start = offset + len
  }
  ret.push(this.slice(start))
  return ret
}

const buf = Buffer.from('123123123')
const bufArr = buf.split('1').map((item) => item.toString())
console.log(bufArr)
