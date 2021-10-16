const http = require('http')

function mergeConfig(config) {
  return {
    port: 3000,
    directory: process.cwd(),
    ...config
  }
}
class Server {
  constructor(config) {
    this.config = mergeConfig(config)
    console.log(this.config)
  }

  start() {
    const server = http.createServer(this.serverHandle.bind(this))
    server.listen(this.config.port, () => {
      console.log('服务已经启动了...')
    })
  }

  serverHandle(req, res) {
    
  }
}

module.exports = Server
