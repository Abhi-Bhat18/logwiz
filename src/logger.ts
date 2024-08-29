
export class Logger {
  private level: logwiz.LogLevel;
  private transports: (logwiz.ConsoleTransport | logwiz.CloudWatchTransport)[];

  private readonly logOrder = {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
  };

  constructor(options: logwiz.LoggerOptions) {
    this.level = options.level;
    this.transports = [];
  }

  log(level: logwiz.LogLevel, message: string, meta?: object) {
    if (this.logOrder[this.level] > this.logOrder[level]) {
      return;
    }
    
    console.log(`${level} ${message}`);
  }

  info(message: string, meta?: object) {
    this.log("info", message, meta);
  }

  warn(message: string, meta?: object) {
    this.log("warn", message, meta);
  }

  error(message: string, meta?: object) {
    this.log("error", message, meta);
  }

  debug(message: string, meta?: object) {
    this.log("debug", message, meta);
  }
}
