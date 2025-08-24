import Database, { type QueryResult } from '@tauri-apps/plugin-sql';

export type DatabaseDesktopType = 'sqlite';

export interface DatabaseDesktopOptions {
  type: DatabaseDesktopType;
  name: string;
}

export class DatabaseDesktop {
  private db: Database | null = null;
  private readonly type: DatabaseDesktopType;
  private readonly name: string;

  constructor(options: DatabaseDesktopOptions) {
    this.type = options.type;
    this.name = options.name;
  }

  /**
   * Loads the database connection (creates if not exists)
   */
  async connect(): Promise<Database> {
    if (!this.db) {
      let connStr = '';
      switch (this.type) {
        case 'sqlite':
          connStr = `sqlite:${this.name}`;
          break;
        default:
          throw new Error('Unsupported database type');
      }
      this.db = await Database.load(connStr);
    }
    return this.db;
  }

  /**
   * Execute a SQL statement (INSERT, UPDATE, DELETE, etc.)
   * @param sql SQL string with placeholders ($1, $2, ...)
   * @param params Parameters for the placeholders
   */
  async execute(sql: string, params: unknown[] = []): Promise<QueryResult> {
    const database = await this.connect();
    return database.execute(sql, params);
  }

  /**
   * Run a SELECT query and return all rows
   * @param sql SQL string with placeholders ($1, $2, ...)
   * @param params Parameters for the placeholders
   */
  async select<T = unknown>(sql: string, params: unknown[] = []): Promise<T[]> {
    const database = await this.connect();
    return database.select<T[]>(sql, params);
  }
}
