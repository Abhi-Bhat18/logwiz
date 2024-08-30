export type LogLevel = "info" | "warn" | "error" | "debug";

export interface LoggerOptions {
  level: LogLevel;
  transports: ("console" | "cloudwatch")[];
}

export interface TransportOptions {
  level?: string;
  format?: (info: LogEntry) => string;
}

export interface LogEntry {
  level: string;
  message: string;
}
