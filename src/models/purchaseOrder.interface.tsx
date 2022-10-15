import { Product } from './product.interface';

export interface PurchaseOrderFilter {
  date_initial?: string;
  date_final?: string;
  status?: string;
  product_id?: string;
  product_name?: string;
  category?: number;
  brand?: number;
}

export interface PurchaseOrderPayload extends PurchaseOrderFilter {
  _limit: number;
  _start: number;
  q: string;
}

export interface PurchaseOrder {
  id?: number;
  name: string;
  vendor: string;
  quantity: number;
  amount: number;
  created_at?: string;
  status: string;
  open_at?: string;
  sent_at?: string;
  received_at?: string;
  voided_at?: string;
  purchaseItems: PurchaseItem[];
}

export const PurchaseOrderModel = () => ({
  id: 0,
  created_at: '',
  open_at: '',
  name: '',
  vendor: '',
  quantity: 0,
  amount: 0,
  status: 'open',
  purchaseItems: [],
});

export interface PurchaseItem {
  id: number;
  product: Product;
  quantity: number;
  delivered: boolean;
}
