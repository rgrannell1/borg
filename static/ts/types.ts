
export type Database = {
  alias: string;
  url: string;
  topic: string;
  username: string;
  password: string;
};

export type DatabaseRecord = Record<string, Database>;
