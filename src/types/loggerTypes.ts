import { Transport } from "../transports/transport";

export interface TransportConfig {
    exceptionHandler?: () => void,
    rejectionHandler?: () => void,
    options: object,
};

export type LogLevel = "info" | "warn" | "error" | "debug";

export interface LoggerConfig { 
  batchSize : number , 
  bactchTime : number // in seconds
}

export interface LoggerOptions {
  level: LogLevel;
  transports: Transport[];
  config?: LoggerConfig
}


export interface TransportOptions {
  level?: string;
  format?: (info: LogEntry) => string;
}


export interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  stack?: string;
  meta?: object;
}

export interface CloudwatchConfig { 

}