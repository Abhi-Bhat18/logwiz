import { LogEntry } from "../types"

export interface TransportConfig {
    exceptionHandler?: () => void,
    rejectionHandler?: () => void,
    options: object,
};

abstract class Transport {
    private options
    private exceptionHandler
    private rejectionHandler

    constructor(config: TransportConfig) {
        this.options = config.options
        if (config.exceptionHandler) {
            this.exceptionHandler = config.exceptionHandler
        }
        if (config.rejectionHandler) {
            this.rejectionHandler = config.rejectionHandler
        }
    }

    abstract log(log: LogEntry, callback ?: () => void): void;

}


export { Transport };
