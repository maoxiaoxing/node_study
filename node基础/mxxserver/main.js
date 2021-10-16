const http = require('http')

class Server {
  constructor(config) {
    this.config = config
  }

  start() {
    console.log('服务已经运行了')
  }
}

module.exports = Server
