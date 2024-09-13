import { Transport } from "./transports/transport";
import { LogLevel, LoggerOptions, LogEntry, LoggerConfig } from "./types";

export class Logger {
  private level: LogLevel;
  private transports: Transport[];
  private metadata : object
  private config : LoggerConfig
  private logs : LogEntry[]

  private readonly logOrder = {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
  };

  constructor(options: LoggerOptions) {
    this.level = options.level || this.logOrder.debug; // by default debug is added
    this.transports = options.transports || []; 

    // set the metadata to browser/OS/screen details
    this.metadata = this.getBrowserOSAndScreenDetails();

    this.logs = []

    this.config = { 
      batchSize : 5,
      bactchTime : 5
    }

    Object.assign(this.config, options.config)
  }

  log(level: LogLevel, message: string, meta?: object) {

    if (this.logOrder[this.level] > this.logOrder[level]) {
      return;
    }

    let formattedMsg = `[${level.toUpperCase()}] - ${message}`;

    let errorStack: string | undefined;

    if (meta && typeof meta === "object") {

      // Check if meta is an instance of Error to capture stack trace
      if (meta instanceof Error) {
        errorStack = meta.stack;
        formattedMsg += ` ${meta.message}`;
      } else {
        formattedMsg += ` ${JSON.stringify(meta)}`;
      }
    }

    const logEntry: LogEntry = {
      level,
      message: formattedMsg,
      timestamp: new Date().toISOString(),
      stack: errorStack,
      meta: { ...meta, ...this.metadata }, // Include metadata (browser/OS/screen)
    };

    this.batchLogs(logEntry)
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

  // New method to get browser, OS, and screen details
  private getBrowserOSAndScreenDetails(): object {
    const userAgent = navigator.userAgent;
    const platform = navigator.platform;

    // Browser Detection
    let browserName = "Unknown";
    let browserVersion = "Unknown";

    if (userAgent.indexOf("Firefox") > -1) {
      browserName = "Mozilla Firefox";
      browserVersion = userAgent.match(/Firefox\/(\d+\.\d+)/)?.[1] || "Unknown";
    } else if (
      userAgent.indexOf("Chrome") > -1 &&
      userAgent.indexOf("Edg") === -1
    ) {
      browserName = "Google Chrome";
      browserVersion = userAgent.match(/Chrome\/(\d+\.\d+)/)?.[1] || "Unknown";
    } else if (
      userAgent.indexOf("Safari") > -1 &&
      userAgent.indexOf("Chrome") === -1
    ) {
      browserName = "Safari";
      browserVersion = userAgent.match(/Version\/(\d+\.\d+)/)?.[1] || "Unknown";
    } else if (userAgent.indexOf("Edg") > -1) {
      browserName = "Microsoft Edge";
      browserVersion = userAgent.match(/Edg\/(\d+\.\d+)/)?.[1] || "Unknown";
    }

    // OS Detection
    let osName = "Unknown";
    if (platform.startsWith("Win")) {
      osName = "Windows";
    } else if (platform.startsWith("Mac")) {
      osName = "macOS";
    } else if (/Android/.test(userAgent)) {
      osName = "Android";
    } else if (/Linux/.test(platform)) {
      osName = "Linux";
    } else if (/iPhone|iPad|iPod/.test(userAgent)) {
      osName = "iOS";
    }

    // Screen Size Detection
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;

    return {
      browserName,
      browserVersion,
      osName,
      screenWidth,
      screenHeight,
      url: window.location.href,
    };
  }

  private batchLogs = (log : LogEntry) => { 
    this.logs = [ ...this.logs, log]

    if(this.logs.length >= this.config.batchSize) { 
      this.shipLogs()
    }
  }

  private shipLogs = async () =>{ 
    try {

      this.transports.forEach((transport) => {
        transport.log(this.logs);
      });

      this.logs = []
      
    } catch (error) {
      console.log("Error", error);
    }
  }

}
