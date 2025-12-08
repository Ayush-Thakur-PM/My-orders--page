import { Order, Shipment } from "@/types/order";

export const mockShipments: Shipment[] = [
  {
    id: "SHP001",
    orderId: "20551926",
    status: "out_for_delivery",
    currentStep: 3,
    expectedDelivery: "Today, by 6:00 PM",
    trackingNumber: "DTDC1234567890",
    carrier: "DTDC",
    items: [
      {
        id: "TSCSMS002",
        name: "SmartGRID Luxe Mattress",
        variant: "King Size / 8 inch",
        image: "https://cdn.shopify.com/s/files/1/0635/6929/7637/files/Baby-Mattress_01.webp?v=1754644949",
        quantity: 1,
        price: 34999,
      },
      {
        id: "TSCPILLOW01",
        name: "SmartGRID Pillow",
        variant: "Standard",
        image: "https://cdn.shopify.com/s/files/1/0635/6929/7637/files/1_42041cdc-de2c-4d7c-be95-58d3ef1d838e.webp?v=1754645146",
        quantity: 2,
        price: 2499,
      },
    ],
    shippingAddress: {
      name: "Rahul Sharma",
      line1: "B-42, Sector 15",
      line2: "Near City Mall",
      city: "Noida",
      state: "Uttar Pradesh",
      pincode: "201301",
      phone: "+91 98278 74262",
    },
    milestones: [
      {
        status: "confirmed",
        label: "Order Confirmed",
        timestamp: "Dec 5, 2024 at 10:30 AM",
        description: "Your order has been placed successfully",
        isComplete: true,
        isCurrent: false,
      },
      {
        status: "packed",
        label: "Packed",
        timestamp: "Dec 6, 2024 at 2:15 PM",
        description: "Your items are packed and ready for dispatch",
        isComplete: true,
        isCurrent: false,
      },
      {
        status: "shipped",
        label: "Shipped",
        timestamp: "Dec 6, 2024 at 6:45 PM",
        description: "Package picked up by DTDC courier",
        isComplete: true,
        isCurrent: false,
      },
      {
        status: "out_for_delivery",
        label: "Out for Delivery",
        timestamp: "Dec 8, 2024 at 9:00 AM",
        description: "Your package is with the delivery executive",
        isComplete: false,
        isCurrent: true,
      },
      {
        status: "delivered",
        label: "Delivered",
        isComplete: false,
        isCurrent: false,
      },
    ],
  },
  {
    id: "SHP002",
    orderId: "20553743",
    status: "in_transit",
    currentStep: 2,
    expectedDelivery: "Dec 10 - Dec 12",
    trackingNumber: "BLUEDART9876543",
    carrier: "Blue Dart",
    items: [
      {
        id: "TSCBED01",
        name: "SmartGRID Ortho Bed Frame",
        variant: "King Size / Walnut",
        image: "https://cdn.shopify.com/s/files/1/0635/6929/7637/files/01_2.webp?v=1754644948",
        quantity: 1,
        price: 45999,
      },
    ],
    shippingAddress: {
      name: "Rahul Sharma",
      line1: "B-42, Sector 15",
      line2: "Near City Mall",
      city: "Noida",
      state: "Uttar Pradesh",
      pincode: "201301",
      phone: "+91 98278 74262",
    },
    milestones: [
      {
        status: "confirmed",
        label: "Order Confirmed",
        timestamp: "Dec 4, 2024 at 3:20 PM",
        isComplete: true,
        isCurrent: false,
      },
      {
        status: "packed",
        label: "Packed",
        timestamp: "Dec 5, 2024 at 11:00 AM",
        isComplete: true,
        isCurrent: false,
      },
      {
        status: "shipped",
        label: "Shipped",
        timestamp: "Dec 6, 2024 at 8:30 AM",
        description: "In transit - Gurgaon Hub",
        isComplete: false,
        isCurrent: true,
      },
      {
        status: "out_for_delivery",
        label: "Out for Delivery",
        isComplete: false,
        isCurrent: false,
      },
      {
        status: "delivered",
        label: "Delivered",
        isComplete: false,
        isCurrent: false,
      },
    ],
  },
  {
    id: "SHP003",
    orderId: "20546974",
    status: "delivered",
    currentStep: 4,
    expectedDelivery: "Nov 25, 2024",
    deliveredDate: "Nov 24, 2024",
    trackingNumber: "DELHIVERY111222",
    carrier: "Delhivery",
    items: [
      {
        id: "TSCDESK01",
        name: "SmartGRID Adjustable Desk",
        variant: "Standard / Oak",
        image: "https://cdn.shopify.com/s/files/1/0635/6929/7637/files/01_2.webp?v=1754644948",
        quantity: 1,
        price: 28999,
      },
    ],
    shippingAddress: {
      name: "Rahul Sharma",
      line1: "B-42, Sector 15",
      city: "Noida",
      state: "Uttar Pradesh",
      pincode: "201301",
      phone: "+91 98278 74262",
    },
    milestones: [
      {
        status: "confirmed",
        label: "Order Confirmed",
        timestamp: "Nov 20, 2024 at 10:00 AM",
        isComplete: true,
        isCurrent: false,
      },
      {
        status: "packed",
        label: "Packed",
        timestamp: "Nov 21, 2024 at 4:00 PM",
        isComplete: true,
        isCurrent: false,
      },
      {
        status: "shipped",
        label: "Shipped",
        timestamp: "Nov 22, 2024 at 9:00 AM",
        isComplete: true,
        isCurrent: false,
      },
      {
        status: "out_for_delivery",
        label: "Out for Delivery",
        timestamp: "Nov 24, 2024 at 8:00 AM",
        isComplete: true,
        isCurrent: false,
      },
      {
        status: "delivered",
        label: "Delivered",
        timestamp: "Nov 24, 2024 at 2:30 PM",
        description: "Delivered - Signed by Rahul",
        isComplete: true,
        isCurrent: true,
      },
    ],
  },
  {
    id: "SHP004",
    orderId: "20543687",
    status: "cancelled",
    currentStep: 0,
    expectedDelivery: "Cancelled",
    items: [
      {
        id: "TSCCHAIR01",
        name: "SmartGRID Ergo Chair",
        variant: "Premium / Black",
        image: "https://cdn.shopify.com/s/files/1/0635/6929/7637/files/1_42041cdc-de2c-4d7c-be95-58d3ef1d838e.webp?v=1754645146",
        quantity: 1,
        price: 18999,
      },
    ],
    shippingAddress: {
      name: "Rahul Sharma",
      line1: "B-42, Sector 15",
      city: "Noida",
      state: "Uttar Pradesh",
      pincode: "201301",
      phone: "+91 98278 74262",
    },
    milestones: [
      {
        status: "confirmed",
        label: "Order Confirmed",
        timestamp: "Nov 8, 2024 at 5:00 PM",
        isComplete: true,
        isCurrent: false,
      },
      {
        status: "cancelled",
        label: "Cancelled",
        timestamp: "Nov 10, 2024 at 11:00 AM",
        description: "Order cancelled by customer",
        isComplete: true,
        isCurrent: true,
      },
    ],
  },
];

export const mockOrders: Order[] = [
  {
    id: "20551926",
    orderNumber: "#20551926",
    orderDate: "Dec 5, 2024",
    shipments: [mockShipments[0]],
    billingAddress: {
      name: "Rahul Sharma",
      line1: "B-42, Sector 15",
      line2: "Near City Mall",
      city: "Noida",
      state: "Uttar Pradesh",
      pincode: "201301",
    },
    payment: {
      method: "Credit Card (HDFC ****4523)",
      status: "Paid",
      total: 39997,
      subtotal: 37497,
      shipping: 0,
      discount: 2500,
    },
    installation: {
      scheduled: true,
      date: "Dec 9, 2024",
      timeSlot: "10:00 AM - 2:00 PM",
    },
  },
  {
    id: "20553743",
    orderNumber: "#20553743",
    orderDate: "Dec 4, 2024",
    shipments: [mockShipments[1]],
    billingAddress: {
      name: "Rahul Sharma",
      line1: "B-42, Sector 15",
      city: "Noida",
      state: "Uttar Pradesh",
      pincode: "201301",
    },
    payment: {
      method: "UPI (PhonePe)",
      status: "Paid",
      total: 45999,
      subtotal: 45999,
      shipping: 0,
    },
    installation: {
      scheduled: true,
      date: "Dec 13, 2024",
      timeSlot: "2:00 PM - 6:00 PM",
    },
  },
  {
    id: "20546974",
    orderNumber: "#20546974",
    orderDate: "Nov 20, 2024",
    shipments: [mockShipments[2]],
    billingAddress: {
      name: "Rahul Sharma",
      line1: "B-42, Sector 15",
      city: "Noida",
      state: "Uttar Pradesh",
      pincode: "201301",
    },
    payment: {
      method: "Net Banking",
      status: "Paid",
      total: 28999,
      subtotal: 28999,
      shipping: 0,
    },
  },
  {
    id: "20543687",
    orderNumber: "#20543687",
    orderDate: "Nov 8, 2024",
    shipments: [mockShipments[3]],
    billingAddress: {
      name: "Rahul Sharma",
      line1: "B-42, Sector 15",
      city: "Noida",
      state: "Uttar Pradesh",
      pincode: "201301",
    },
    payment: {
      method: "Credit Card",
      status: "Refunded",
      total: 18999,
      subtotal: 18999,
      shipping: 0,
    },
  },
];

export const getShipmentById = (id: string): Shipment | undefined => {
  return mockShipments.find((s) => s.id === id);
};

export const getOrderById = (id: string): Order | undefined => {
  return mockOrders.find((o) => o.id === id);
};

export const getShipmentByOrderId = (orderId: string): Shipment | undefined => {
  return mockShipments.find((s) => s.orderId === orderId);
};
