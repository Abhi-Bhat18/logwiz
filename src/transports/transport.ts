import { LogEntry } from "../types"
import { TransportConfig } from "../types"

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

    abstract log(logs: LogEntry[], callback ?: () => void): void;

}


export { Transport };
