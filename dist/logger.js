"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
        this.batchLogs = (log) => {
            this.logs = [...this.logs, log];
            if (this.logs.length >= this.config.batchSize) {
                this.shipLogs();
            }
        };
        this.shipLogs = () => __awaiter(this, void 0, void 0, function* () {
            try {
                this.transports.forEach((transport) => {
                    transport.log(this.logs);
                });
                this.logs = [];
            }
            catch (error) {
                console.log("Error", error);
            }
        });
        this.level = options.level || this.logOrder.debug; // by default debug is added
        this.transports = options.transports || [];
        // set the metadata to browser/OS/screen details
        this.metadata = this.getBrowserOSAndScreenDetails();
        this.logs = [];
        this.config = {
            batchSize: 5,
            bactchTime: 5
        };
        Object.assign(this.config, options.config);
    }
    log(level, message, meta) {
        if (this.logOrder[this.level] > this.logOrder[level]) {
            return;
        }
        let formattedMsg = `[${level.toUpperCase()}] - ${message}`;
        let errorStack;
        if (meta && typeof meta === "object") {
            // Check if meta is an instance of Error to capture stack trace
            if (meta instanceof Error) {
                errorStack = meta.stack;
                formattedMsg += ` ${meta.message}`;
            }
            else {
                formattedMsg += ` ${JSON.stringify(meta)}`;
            }
        }
        const logEntry = {
            level,
            message: formattedMsg,
            timestamp: new Date().toISOString(),
            stack: errorStack,
            meta: Object.assign(Object.assign({}, meta), this.metadata), // Include metadata (browser/OS/screen)
        };
        this.batchLogs(logEntry);
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
    // New method to get browser, OS, and screen details
    getBrowserOSAndScreenDetails() {
        var _a, _b, _c, _d;
        const userAgent = navigator.userAgent;
        const platform = navigator.platform;
        // Browser Detection
        let browserName = "Unknown";
        let browserVersion = "Unknown";
        if (userAgent.indexOf("Firefox") > -1) {
            browserName = "Mozilla Firefox";
            browserVersion = ((_a = userAgent.match(/Firefox\/(\d+\.\d+)/)) === null || _a === void 0 ? void 0 : _a[1]) || "Unknown";
        }
        else if (userAgent.indexOf("Chrome") > -1 &&
            userAgent.indexOf("Edg") === -1) {
            browserName = "Google Chrome";
            browserVersion = ((_b = userAgent.match(/Chrome\/(\d+\.\d+)/)) === null || _b === void 0 ? void 0 : _b[1]) || "Unknown";
        }
        else if (userAgent.indexOf("Safari") > -1 &&
            userAgent.indexOf("Chrome") === -1) {
            browserName = "Safari";
            browserVersion = ((_c = userAgent.match(/Version\/(\d+\.\d+)/)) === null || _c === void 0 ? void 0 : _c[1]) || "Unknown";
        }
        else if (userAgent.indexOf("Edg") > -1) {
            browserName = "Microsoft Edge";
            browserVersion = ((_d = userAgent.match(/Edg\/(\d+\.\d+)/)) === null || _d === void 0 ? void 0 : _d[1]) || "Unknown";
        }
        // OS Detection
        let osName = "Unknown";
        if (platform.startsWith("Win")) {
            osName = "Windows";
        }
        else if (platform.startsWith("Mac")) {
            osName = "macOS";
        }
        else if (/Android/.test(userAgent)) {
            osName = "Android";
        }
        else if (/Linux/.test(platform)) {
            osName = "Linux";
        }
        else if (/iPhone|iPad|iPod/.test(userAgent)) {
            osName = "iOS";
        }
        // Screen Size Detection
        const screenWidth = window.screen.width;
        const screenHeight = window.screen.height;
        return {
            browserName,
            browserVersion,
            osName,
            screenWidth,
            screenHeight,
            url: window.location.href,
        };
    }
}
exports.Logger = Logger;
