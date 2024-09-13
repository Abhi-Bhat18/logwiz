import {
  CloudWatchLogsClient,
  ListAnomaliesCommand,
} from "@aws-sdk/client-cloudwatch-logs";

import { LogEntry } from "../../types";
import { Transport } from "../transport";
import { TransportConfig } from "../../types";
 
export class CloudWatchTransport extends Transport {
  constructor(options: TransportConfig) {
    super(options);
  }

  log(log: LogEntry[], callback?: () => void): void {
    try {
    } catch (error) {}
  }
}
