import { Brand } from './brand.interface';
import { Category } from './category.interface';

export interface InventoryFilter {
  date?: string;
  category?: number;
  brand?: number;
}

export interface InventoryPayload extends InventoryFilter {
  _limit: number;
  _start: number;
  q: string;
}

export interface Inventory {
  name: string;
  stock: number;
  unit_cost: number;
  wholesale: number;
  retail: number;
  profit: number;
  margin: number;
  category: Category;
  brand: Brand;
}
