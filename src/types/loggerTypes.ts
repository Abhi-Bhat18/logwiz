import { Transport } from "../transports/transport";

export type LogLevel = "info" | "warn" | "error" | "debug";

export interface LoggerOptions {
  level: LogLevel;
  transports: Transport[]
}

export interface TransportOptions {
  level?: string;
  format?: (info: LogEntry) => string;
}

export interface LogEntry {
  level: string;
  message: string;
}
