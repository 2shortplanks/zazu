const cuid = require('cuid')

const globalEmitter = require('../lib/globalEmitter')

class Block {
  constructor (data) {
    this.pluginId = data.pluginId
    this.type = data.type
    this.id = data.id || cuid()
    this.connections = data.connections || []
  }

  log (message, data) {
    globalEmitter.emit('pluginLog', {
      type: 'log',
      pluginId: this.pluginId,
      blockId: this.id,
      message,
      data,
    })
  }

  warn (message, data) {
    globalEmitter.emit('pluginLog', {
      type: 'warn',
      pluginId: this.pluginId,
      blockId: this.id,
      message,
      data,
    })
  }

  error (message, data) {
    globalEmitter.emit('pluginLog', {
      type: 'error',
      pluginId: this.pluginId,
      blockId: this.id,
      message,
      data,
    })
  }

  call (state) {
    state.next()
  }
}

module.exports = Block
