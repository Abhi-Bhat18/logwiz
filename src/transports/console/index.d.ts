declare namespace logwiz { 

  type ConsoleTransport = 'console'
  
  interface LogEntry {
    level: string;
    message: string;
    [key: string]: any;
  }
}
