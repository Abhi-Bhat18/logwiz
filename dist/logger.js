"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
class Logger {
    constructor(options) {
        this.logOrder = {
            debug: 0,
            info: 1,
            warn: 2,
            error: 3,
        };
        this.level = options.level;
        this.transports = [];
    }
    log(level, message, meta) {
        if (this.logOrder[this.level] > this.logOrder[level]) {
            return;
        }
        console.log(`${level} ${message}`);
    }
    info(message, meta) {
        this.log("info", message, meta);
    }
    warn(message, meta) {
        this.log("warn", message, meta);
    }
    error(message, meta) {
        this.log("error", message, meta);
    }
    debug(message, meta) {
        this.log("debug", message, meta);
    }
}
exports.Logger = Logger;
