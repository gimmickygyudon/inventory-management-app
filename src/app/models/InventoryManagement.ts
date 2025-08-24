import type { Item, ItemLocation } from './Item';

export class InventoryManagement {
  private items: Item[] = [];

  setItemLocation(id: string, location: ItemLocation): boolean {
    const item = this.items.find(item => item.id === id);
    if (item) {
      item.location = location;
      return true;
    }
    return false;
  }

  addItem(item: Item): void {
    this.items.push(item);
  }

  addTagToItem(id: string, tag: string): boolean {
    const item = this.items.find(item => item.id === id);
    if (item) {
      if (!item.tags) item.tags = [];
      if (!item.tags.includes(tag)) {
        item.tags.push(tag);
      }
      return true;
    }
    return false;
  }

  removeTagFromItem(id: string, tag: string): boolean {
    const item = this.items.find(item => item.id === id);
    if (item && item.tags) {
      const index = item.tags.indexOf(tag);
      if (index !== -1) {
        item.tags.splice(index, 1);
        return true;
      }
    }
    return false;
  }

  removeItem(id: string): boolean {
    const index = this.items.findIndex(item => item.id === id);
    if (index !== -1) {
      this.items.splice(index, 1);
      return true;
    }
    return false;
  }

  updateItem(id: string, updated: Partial<Item>): boolean {
    const item = this.items.find(item => item.id === id);
    if (item) {
      Object.assign(item, updated);
      return true;
    }
    return false;
  }

  getItem(id: string): Item | undefined {
    return this.items.find(item => item.id === id);
  }

  getAllItems(): Item[] {
    return [...this.items];
  }
}