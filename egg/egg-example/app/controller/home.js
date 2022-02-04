const Controller = require('egg').Controller

class HomeController extends Controller {
  async index () {
    await this.ctx.render('index.tpl', {
      message: 'Hello Egg'
    })
    // this.ctx.body = 'Hello Egg'
  }

  async foo () {
    this.ctx.body = 'bar'
  }
}

module.exports = HomeController
