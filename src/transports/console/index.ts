import { LogEntry , TransportConfig} from "../../types";
import { Transport } from "../transport";

export class ConsoleTransport extends Transport {

  constructor(config: TransportConfig) {
    super(config)
  }

  log(logs: LogEntry[], callback: () => void): void {

   logs.forEach( logEntry => { 
     const message = logEntry.message;

     switch (logEntry.level) {
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
   })

   if (callback) {
     callback();
   }
  } 
}

