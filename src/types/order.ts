export type OrderStatus = 
  | "confirmed" 
  | "packed" 
  | "shipped" 
  | "out_for_delivery" 
  | "delivered" 
  | "cancelled";

export type ShipmentStatus = 
  | "processing" 
  | "in_transit" 
  | "out_for_delivery" 
  | "delivered" 
  | "cancelled";

export interface OrderItem {
  id: string;
  name: string;
  variant: string;
  image: string;
  quantity: number;
  price: number;
}

export interface TrackingMilestone {
  status: OrderStatus;
  label: string;
  timestamp?: string;
  description?: string;
  isComplete: boolean;
  isCurrent: boolean;
}

export interface Shipment {
  id: string;
  orderId: string;
  items: OrderItem[];
  status: ShipmentStatus;
  currentStep: number;
  expectedDelivery: string;
  deliveredDate?: string;
  trackingNumber?: string;
  carrier?: string;
  shippingAddress: {
    name: string;
    line1: string;
    line2?: string;
    city: string;
    state: string;
    pincode: string;
    phone: string;
  };
  milestones: TrackingMilestone[];
}

export interface Order {
  id: string;
  orderNumber: string;
  orderDate: string;
  shipments: Shipment[];
  billingAddress: {
    name: string;
    line1: string;
    line2?: string;
    city: string;
    state: string;
    pincode: string;
  };
  payment: {
    method: string;
    status: string;
    total: number;
    subtotal: number;
    shipping: number;
    discount?: number;
  };
  installation?: {
    scheduled: boolean;
    date?: string;
    timeSlot?: string;
  };
}
