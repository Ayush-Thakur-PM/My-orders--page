export type OrderStatus = 
  | "placed" 
  | "on_hold"
  | "unheld"
  | "packed" 
  | "shipped" 
  | "out_for_delivery" 
  | "rescheduled"
  | "delivered" 
  | "return_pickup"
  | "cancelled";

export type ShipmentStatus = 
  | "processing" 
  | "in_transit" 
  | "out_for_delivery" 
  | "delivered" 
  | "cancelled";

export type OrderType = "normal" | "return" | "exchange" | "replacement";

export type ActionStatus = "none" | "return_requested" | "return_in_progress" | "returned" | "replacement_in_progress" | "replaced" | "exchange_scheduled" | "exchanged";

// Metro cities eligible for exchange (simultaneous pickup & delivery)
export const EXCHANGE_ELIGIBLE_CITIES = [
  "Bangalore", "Bengaluru",
  "Hyderabad",
  "Delhi", "Delhi NCR", "New Delhi",
  "Mumbai",
  "Pune",
  "Kolkata",
  "Chennai"
];

export const isExchangeEligible = (city: string): boolean => {
  return EXCHANGE_ELIGIBLE_CITIES.some(c => 
    city.toLowerCase().includes(c.toLowerCase())
  );
};

export interface OrderItem {
  id: string;
  sku?: string;
  name: string;
  variant: string;
  configuration?: string;
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
  isOptional?: boolean;
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
  actionStatus?: ActionStatus;
  parentOrderId?: string; // Reference to parent order for replacement/exchange orders
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
  orderType?: OrderType;
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
}
