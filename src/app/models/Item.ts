import { DatabaseDesktopItem } from "~/sql/desktop/item";
import type { Coordinate, Place } from "./Location";

export class Item {
  id: string;
  name: string;
  quantity: number;
  price: number;
  description?: string;
  tags?: string[];
  location?: ItemLocation;

  constructor(params: {
    id: string;
    name: string;
    quantity: number;
    price: number;
    description?: string;
    tags?: string[];
    location?: ItemLocation;
  }) {
    this.id = params.id;
    this.name = params.name;
    this.quantity = params.quantity;
    this.price = params.price;
    this.description = params.description;
    this.tags = params.tags;
    this.location = params.location;
  }

  static fromJson(json: Record<string, unknown>): Item {
    return new Item({
      id: String(json.id),
      name: String(json.name),
      quantity: Number(json.quantity),
      price: Number(json.price),
      description: json.description ? String(json.description) : undefined,
      tags: Array.isArray(json.tags) ? json.tags.map(String) : undefined,
      location: json.location as ItemLocation,
    });
  }

  toMap(): Record<string, unknown> {
    return {
      id: this.id,
      name: this.name,
      quantity: this.quantity,
      price: this.price,
      description: this.description,
      tags: this.tags,
      location: this.location ? (typeof this.location["toMap"] === "function" ? this.location.toMap() : this.location) : undefined,
    };
  }

  toJson(): string {
    return JSON.stringify(this.toMap());
  }

  async save(): Promise<void> {
    // Placeholder for save logic, e.g., saving to a database
    console.log(`Saving item: ${this.toJson()}`);
    return await new DatabaseDesktopItem(this).store();
  }
}


export class ItemLocation {
  id: string;
  itemId: string;
  place: Place;
  lastStored: Date;
  lastUpdated: Date;
  brandName: string;
  coordinate: Coordinate;

  constructor(params: {
    id: string;
    itemId: string;
    place: Place;
    lastStored: Date;
    lastUpdated: Date;
    brandName: string;
    coordinates: Coordinate;
  }) {
    this.id = params.id;
    this.itemId = params.itemId;
    this.place = params.place;
    this.lastStored = params.lastStored;
    this.lastUpdated = params.lastUpdated;
    this.brandName = params.brandName;
    this.coordinate = params.coordinates;
  }

  updateLocation(newPlace: Place, date: Date) {
    this.place = newPlace;
    this.lastUpdated = date;
  }

  updateBrand(newBrand: string) {
    this.brandName = newBrand;
    this.lastUpdated = new Date();
  }

  static fromJson(json: Record<string, unknown>): ItemLocation {
    return new ItemLocation({
      id: String(json.id),
      itemId: String(json.itemId),
      place: json.place as Place,
      lastStored: new Date(String(json.lastStored)),
      lastUpdated: new Date(String(json.lastUpdated)),
      brandName: String(json.brandName),
      coordinates: {
        x: Number(json.x),
        y: Number(json.y),
        z: Number(json.z),
      },
    });
  }

  toMap(): Record<string, unknown> {
    return {
      id: this.id,
      itemId: this.itemId,
      place: this.place,
      lastStored: this.lastStored.toISOString(),
      lastUpdated: this.lastUpdated.toISOString(),
      brandName: this.brandName,
      x: this.coordinate.x,
      y: this.coordinate.y,
      z: this.coordinate.z,
    };
  }
}
