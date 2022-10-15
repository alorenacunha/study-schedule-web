import { Brand } from './brand.interface';
import { Category } from './category.interface';

export interface ProductPayload {
  _limit: number;
  _start: number;
}

export interface Product {
  id?: number;
  external_id?: number;
  name?: string;
  margin?: number;
  price?: number;
  category?: Category;
  brand?: Brand;
}
