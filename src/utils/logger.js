const LEVELS = {
  ALL: 0,
  DEBUG: 1,
  INFO: 2,
  WARNING: 3,
  ERROR: 4,
  OFF: Infinity
}

function defineLevel (name, value) {
  LEVELS[name] = value
}

class LogEntry {
  constructor (level, msg, args, time = new Date()) {
    this.level = level
    this.message = msg
    this.args = args
    this.time = time
  }
}

/**
 * @typedef {Object} LoggerOptions
 * @property {boolean} [forceNew]
 * @property {string | number} [level]
 * @property {string} [namespace]
 * @property {function} [save]
 * @property {function} [dateformat]
 *//**
 * Logger class
 */
class Logger {
  /**
   * @param {string} name
   * @param {LoggerOptions} options
   */
  constructor (name, options = {}) {
    const regName = `${name}${options.namespace ? '.' + options.namespace : ''}`
    if (!options.forceNew && Logger.loggers[regName]) {
      return Logger.loggers[regName]
    }

    this.name = name
    this.logo = '🚀'
    this.loggerStyle = 'color:yellow;font-size:bold;background:green;'
    this.entryStyle = 'color:blue'

    this._level = this.setLevel(options.level)
    this._nsp = options.namespace
    this._cbs = {
      save: options.save,
      dateformat: options.dateformat
    }

    Logger.loggers[regName] = this
  }

  namespace (namespace) {
    return new Logger(this.name, {
      namespace,
      dateformat: this._cbs.dateformat,
      save: this._cbs.save,
      forceNew: true,
      level: this.level
    })
  }

  save (entry) {
    if (typeof this._cbs.save === 'function') {
      return this._cbs.save(entry)
    }
  }

  dateformat (date) {
    if (typeof this._cbs.dateformat === 'function') {
      return this._cbs.dateformat(date)
    }

    const yyyy = date.getFullYear()
    const mm = `${date.getMonth() + 1}`.padStart(2, '0')
    const dd = `${date.getDate()}`.padStart(2, '0')
    const hh = `${date.getHours()}`.padStart(2, '0')
    const MM = `${date.getMinutes()}`.padStart(2, '0')
    const ss = `${date.getSeconds()}`.padStart(2, '0')
    const sss = `${date.getMilliseconds()}`.padStart(3, '0')
    return `${yyyy}.${mm}.${dd} ${hh}:${MM}:${ss}.${sss}`
  }

  _log (msgLevel, msg, ...args) {
    const entry = new LogEntry(msgLevel, msg, args)
    if (msgLevel >= this._level) {
      this.save(entry)
    }

    const tpl = (this.logo ? this.logo + ' ' : '') + '%c %s %c [%s] %s%c' + entry.message
    const namespacePrefix = this._nsp ? this._nsp + ': ' : ''
    const dateStr = this.dateformat(entry.time, 'yyyy.mm.dd hh:MM:ss')
    const loggerArgs = [
      tpl,
      this.loggerStyle,
      this.name,
      this.entryStyle,
      dateStr,
      namespacePrefix
    ]
    switch (msgLevel) {
      case LEVELS.DEBUG:
        console.debug(...loggerArgs, 'color:grey', ...entry.args)
        break
      case LEVELS.INFO:
        console.info(...loggerArgs, 'color:black', ...entry.args)
        break
      case LEVELS.WARNING:
        console.warn(...loggerArgs, 'color:yellow', ...entry.args)
        break
      case LEVELS.ERROR:
        console.error(...loggerArgs, 'color:red', ...entry.args)
        break
      default:
        console.log(...loggerArgs, 'color:black', ...entry.args)
    }
  }

  debug (msg, ...args) {
    return this._log(LEVELS.DEBUG, msg, ...args)
  }

  info (msg, ...args) {
    return this._log(LEVELS.INFO, msg, ...args)
  }

  warn (msg, ...args) {
    return this._log(LEVELS.WARNING, msg, ...args)
  }

  error (msg, ...args) {
    return this._log(LEVELS.ERROR, msg, ...args)
  }

  setLevel (level = LEVELS.INFO) {
    if (typeof level === 'string') {
      this._level = LEVELS[level.toUpperCase()]
      return this._level
    } else if (typeof level === 'number' && Object.values(LEVELS).includes(level)) {
      this._level = level
      return this._level
    }
    throw new Error('invalid log level')
  }

  get level () {
    for (const [lvl, val] of Object.entries(LEVELS)) {
      if (val === this._level) {
        return lvl
      }
    }
    throw new Error('invalid log level')
  }

  set level (val) {
    this.setLevel(val)
  }
}

Logger.LEVELS = LEVELS
Logger.defineLevel = defineLevel
Logger.loggers = {}

module.exports = {
  Logger
}
