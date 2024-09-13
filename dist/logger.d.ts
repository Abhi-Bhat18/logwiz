import { LogLevel, LoggerOptions } from "./types";
export declare class Logger {
    private level;
    private transports;
    private metadata;
    private config;
    private logs;
    private readonly logOrder;
    constructor(options: LoggerOptions);
    log(level: LogLevel, message: string, meta?: object): void;
    info(message: string, meta?: object): void;
    warn(message: string, meta?: object): void;
    error(message: string, meta?: object): void;
    debug(message: string, meta?: object): void;
    private getBrowserOSAndScreenDetails;
    private batchLogs;
    private shipLogs;
}
