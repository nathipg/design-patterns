import { User } from './user';

interface LogData {
  user: User;
  resource: string;
  content: string;
  dateTime: string;
}

class Log {
  private static instance: Log;
  private data: LogData[];

  private constructor() {
    this.data = [];
  }

  public static getInstance(): Log {
    if(!Log.instance) {
      Log.instance = new Log();
    }

    return Log.instance;
  }

  public register(data: LogData) {
    this.data.push(data);
  }

  public list(): LogData[] {
    return this.data;
  }
}

const log = Log.getInstance();

export { log };