// frontend-logger.ts
import { Logger, LoggerOptions } from 'logwiz';

class FrontendLogger extends Logger {
  constructor(options: LoggerOptions) {
    super(options);
    this.setupErrorHandling();
  }

  private setupErrorHandling() {
    window.addEventListener('error', (event: ErrorEvent) => {
      this.error('Unhandled error', {
        message: event.error.message,
        stack: event.error.stack,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno
      });
    });

    window.addEventListener('unhandledrejection', (event: PromiseRejectionEvent) => {
      this.error('Unhandled promise rejection', {
        reason: event.reason
      });
    });
  }
}

// Usage
const logger = new FrontendLogger({
  level: 'info',
  transports: ['console', 'cloudwatch'],
  cloudWatchOptions: {
    logGroupName: 'your-app-logs',
    logStreamName: 'frontend',
    region: 'us-west-2'
  }
});

// Your application code
try {
  // Some operation that might throw an error
} catch (error) {
  logger.error('An error occurred', { error });
}