const EventEmitter = require('events')

const myEvent = new EventEmitter()

myEvent.on('event', () => {
  console.log('事件执行了')
})

myEvent.emit('event')
