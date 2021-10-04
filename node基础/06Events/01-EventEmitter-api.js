const EventEmitter = require('events')

const ev = new EventEmitter()

// on
// ev.on('event1', () => {
//   console.log('事件1')
// })

// ev.on('event1', () => {
//   console.log('事件2')
// })

// // emit
// ev.emit('event1')
// ev.emit('event1')


// once
// ev.once('event', () =>{
//   console.log('事件1')
// })
// ev.once('event', () =>{
//   console.log('事件1---2')
// })
// ev.emit('event')
// ev.emit('event')


// off
const cb = () => {
  console.log('事件')
}
ev.on('event', cb)
ev.emit('event')
ev.off('event', cb)
ev.emit('event')

