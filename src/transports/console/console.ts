
// class ConsoleTransport {
//   private options: logwiz.TransportOptions;

//   constructor(options: logwiz.TransportOptions = {}) {
//     this.options = {
//       level: "info",
//       format: (info) => `[${info.level}] ${info.message}`,
//       ...options,
//     };
//   }

//   log(info: logwiz.LogEntry): void {
//     if (this.shouldLog(info.level)) {
//       if(this.options.format) { 
//         const message = this.options.format(info);

//         switch (info.level) {
//           case "error":
//             console.error(message);
//             break;
//           case "warn":
//             console.warn(message);
//             break;
//           case "info":
//             console.info(message);
//             break;
//           case "debug":
//             console.debug(message);
//             break;
//           default:
//             console.log(message);
//         }
//       } 
//     }
//   }

//   private shouldLog(level: string): boolean {
//     const levels = ["error", "warn", "info", "debug"];
//     if(this.options.level) { 
//         const configuredLevelIndex = levels.indexOf(this.options.level);
//         const currentLevelIndex = levels.indexOf(level);
//         return currentLevelIndex <= configuredLevelIndex;
//     }
//     return false
//   }
// }

// export default ConsoleTransport;
