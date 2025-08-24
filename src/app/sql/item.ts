import type { Item } from '../models/Item';
import { DB } from './db';

const db = new DB({ type: 'sqlite', name: 'item.db' });

/**
 * Stores an Item in the database (insert or replace)
 * @param db Instance of DB
 * @param item Item to store
 */
export async function storeItem(item: Item): Promise<void> {
  // Ensure table exists (idempotent)
  await db.execute(
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
  await db.execute(
    `INSERT OR REPLACE INTO items (id, name, quantity, price, description, tags, location)
     VALUES ($1, $2, $3, $4, $5, $6, $7)`,
    [
      item.id,
      item.name,
      item.quantity,
      item.price,
      item.description ?? null,
      item.tags ? JSON.stringify(item.tags) : null,
      item.location ? JSON.stringify(item.location) : null
    ]
  );
}


/**
 * Deletes an item from the database by id
 * @param db Instance of DB
 * @param id Item id to delete
 */
export async function deleteItem(item: Item): Promise<void> {
  await db.execute(
    `DELETE FROM items WHERE id = $1`,
    [item.id]
  );
}
