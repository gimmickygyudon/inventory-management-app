import type { Item } from '../../models/Item';
import { DatabaseDesktop } from './db';

export class DatabaseDesktopItem {
  private db: DatabaseDesktop;
  private item: Item;

  constructor(item: Item) {
    this.db = new DatabaseDesktop({ type: 'sqlite', name: 'item.db' });
    this.item = item;
  }

  /**
   * Stores an Item in the database (insert or replace)
   * @param item Item to store
   */
  async store(): Promise<void> {
    // Ensure table exists (idempotent)
    await this.db.execute(
      `CREATE TABLE IF NOT EXISTS items (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        quantity INTEGER NOT NULL,
        price REAL NOT NULL,
        description TEXT,
        tags TEXT,
        location TEXT
      )`
    );

    // Insert or replace item
    await this.db.execute(
      `INSERT OR REPLACE INTO items (id, name, quantity, price, description, tags, location)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        this.item.id,
        this.item.name,
        this.item.quantity,
        this.item.price,
        this.item.description ?? null,
        this.item.tags ? JSON.stringify(this.item.tags) : null,
        this.item.location ? JSON.stringify(this.item.location) : null
      ]
    );
  }

  /**
   * Deletes an item from the database by id
   * @param item Item to delete
   */
  async delete(): Promise<void> {
    await this.db.execute(
      `DELETE FROM items WHERE id = $1`,
      [this.item.id]
    );
  }
}
