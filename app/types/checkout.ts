export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface ShippingInfo {
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  phone?: string;
}

export interface PaymentInfo {
  method: 'crypto' | 'card';
  cryptoAddress?: string;
  cardDetails?: {
    number: string;
    expiryDate: string;
    cvv: string;
    name: string;
  };
}

export interface OrderData {
  orderId: string;
  transactionId: string;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered';
  items: CartItem[];
  shipping: ShippingInfo;
  payment: PaymentInfo;
  totalAmount: number;
  createdAt: string;
}