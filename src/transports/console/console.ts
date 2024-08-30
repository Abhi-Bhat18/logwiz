import { TransportOptions , LogEntry } from "../../types";
class ConsoleTransport {
    
  private options: TransportOptions;

  constructor(options: TransportOptions = {}) {
    this.options = {
      level: "info",
      format: (info) => `[${info.level}] ${info.message}`,
      ...options,
    };
  }

  log(info: LogEntry): void {
    if (this.options.format) {
      const message = this.options.format(info);

      switch (info.level) {
        case "error":
          console.error(message);
          break;
        case "warn":
          console.warn(message);
          break;
        case "info":
          console.info(message);
          break;
        case "debug":
          console.debug(message);
          break;
        default:
          console.log(message);
      }
    }
  }
}

export default ConsoleTransport;
