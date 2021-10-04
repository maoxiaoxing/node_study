const EventEmitter = require('events')

const ev = new EventEmitter()

// on
ev.on('event1', () => {
  console.log('事件1')
})

ev.on('event1', () => {
  console.log('事件2')
})

// emit
ev.emit('event1')
