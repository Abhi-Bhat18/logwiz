
# LogWiz


**LogWiz** is a lightweight, flexible, and powerful logging library for frontend applications. Inspired by the simplicity and extensibility of Winston, LogWiz provides an easy-to-use API for logging messages with various levels of severity. Designed for modern JavaScript and TypeScript applications, LogWiz can be seamlessly integrated into any frontend project.

## Features

- **Multiple Log Levels**: Support for `info`, `warn`, `error`, and `debug` log levels.
- **Customizable Transports**: Log to the console, external services like AWS CloudWatch, or any custom transport you define.
- **TypeScript Support**: Full TypeScript support with type definitions.
- **Lightweight**: Minimal footprint, ideal for performance-sensitive applications.
- **Open Source**: MIT licensed and open for contributions.

## Installation

Install LogWiz via npm:

\`\`\`bash
npm install logwiz
\`\`\`

## Getting Started

Here's a quick example to get you up and running with LogWiz:

### TypeScript

\`\`\`typescript
import { SimpleLogger, logwiz } from 'logwiz';

const loggerOptions: logwiz.LoggerOptions = {
  level: "info",
  transports: ["console", "cloudwatch"],
};

const logger = new SimpleLogger(loggerOptions);

logger.info("This is an info message");
logger.warn("This is a warning message");
logger.error("This is an error message");
logger.debug("This is a debug message");
\`\`\`

### JavaScript

\`\`\`javascript
const { SimpleLogger } = require('logwiz');

const loggerOptions = {
  level: "info",
  transports: ["console", "cloudwatch"],
};

const logger = new SimpleLogger(loggerOptions);

logger.info("This is an info message");
logger.warn("This is a warning message");
logger.error("This is an error message");
logger.debug("This is a debug message");
\`\`\`

## API Reference

### LoggerOptions

\`\`\`typescript
interface LoggerOptions {
  level: "info" | "warn" | "error" | "debug";
  transports: ("console" | "cloudwatch")[];
}
\`\`\`

- \`level\`: The minimum level of logs that should be processed.
- \`transports\`: An array of transports where the logs should be sent.

### SimpleLogger

The core class for logging. Provides methods for logging at different levels.

#### Methods

- \`log(level: string, message: string, meta?: any): void\`
- \`info(message: string, meta?: any): void\`
- \`warn(message: string, meta?: any): void\`
- \`error(message: string, meta?: any): void\`
- \`debug(message: string, meta?: any): void\`

## Custom Transports

LogWiz allows you to define custom transports for logging. Here's a simple example of creating a custom transport:

\`\`\`typescript
class CustomTransport {
  log(level: string, message: string, meta?: any): void {
    // Custom logic to handle log messages
  }
}

const customTransport = new CustomTransport();
\`\`\`

## Contributing

Contributions are welcome! If you'd like to contribute, please fork the repository and use a feature branch. Pull requests are warmly welcome.

1. Fork the repository.
2. Create your feature branch (\`git checkout -b feature/AmazingFeature\`).
3. Commit your changes (\`git commit -m 'Add some AmazingFeature'\`).
4. Push to the branch (\`git push origin feature/AmazingFeature\`).
5. Open a pull request.

## License

LogWiz is [MIT licensed](LICENSE).

## Acknowledgements

LogWiz is inspired by Winston, a versatile logging library for Node.js. We extend our gratitude to the developers and maintainers of Winston for their contributions to the open-source community.
