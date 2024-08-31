import { LogEntry } from "../../types";
import { Transport, TransportConfig } from "../transport";

class ConsoleTransport extends Transport {

  constructor(config: TransportConfig) {
    super(config)
  }

  log(log: LogEntry, callback: () => void): void {

    const message = log.message

    switch (log.level) {
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

    if(callback) { 
      callback()
    }

  }
}

export default ConsoleTransport;
