import { LogLevel, LoggerOptions, LokiTransport } from "./types";
import { ConsoleTransport , CloudWatchTransport } from "./types";

export class Logger {
  private level: LogLevel;

  private transports: (ConsoleTransport | CloudWatchTransport | LokiTransport)[];

  private readonly logOrder = {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
  };

  constructor (options: LoggerOptions) {
    this.level = options.level;
    this.transports = [];
  }

  configure = (options : LoggerOptions) => { 

  }

  log(level: LogLevel, message: string, meta?: object) {
    if (this.logOrder[this.level] > this.logOrder[level]) {
      return;
    }

    let formattedMsg = level.toUpperCase() + '-' + message

    if(meta && typeof(meta) =='object') { 
      formattedMsg += JSON.stringify(meta);
    } 

    this.transports.forEach( transport => { 

    })
    
    console.log(`${level.toUpperCase()} - ${message}`);
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
