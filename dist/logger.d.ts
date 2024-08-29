export declare class Logger {
    private level;
    private transports;
    private readonly logOrder;
    constructor(options: logwiz.LoggerOptions);
    log(level: logwiz.LogLevel, message: string, meta?: object): void;
    info(message: string, meta?: object): void;
    warn(message: string, meta?: object): void;
    error(message: string, meta?: object): void;
    debug(message: string, meta?: object): void;
}
