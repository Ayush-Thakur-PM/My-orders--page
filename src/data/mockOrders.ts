import { Order, Shipment, OrderItem, ItemActionStatus, InstallationStatus } from "@/types/order";

// ============================================
// MULTI-ITEM SHIPMENT MOCK DATA
// ============================================
// This file contains comprehensive mock data demonstrating:
// - Multi-item shipments (3-5 items per shipment)
// - Item-level post-delivery statuses
// - Installation flows (furniture requires installation, mattress doesn't)
// - Return, replacement, and exchange journeys
// ============================================

export const mockShipments: Shipment[] = [
  // ============================================
  // SHIPMENT 1: Active Delivery (Out for Delivery)
  // 2 items, no post-delivery actions yet
  // ============================================
  {
    id: "SHP001",
    orderId: "20551926",
    status: "out_for_delivery",
    currentStep: 3,
    expectedDelivery: "Today, 9 am to 8 pm",
    trackingNumber: "DTDC1234567890",
    carrier: "DTDC",
    actionStatus: "none",
    items: [
      {
        id: "TSCSMS002",
        sku: "TSCSMS002",
        name: "SmartGRID Luxe Mattress",
        variant: "King Size / 8 inch",
        configuration: "Medium Firm",
        image: "https://cdn.shopify.com/s/files/1/0635/6929/7637/files/Baby-Mattress_01.webp?v=1754644949",
        quantity: 1,
        price: 34999,
        installationRequired: false,
        installationStatus: "not_required",
        actionStatus: "none",
      },
      {
        id: "TSCPILLOW01",
        sku: "TSCPILLOW01",
        name: "SmartGRID Pillow",
        variant: "Standard",
        image: "https://cdn.shopify.com/s/files/1/0635/6929/7637/files/1_42041cdc-de2c-4d7c-be95-58d3ef1d838e.webp?v=1754645146",
        quantity: 2,
        price: 2499,
        installationRequired: false,
        installationStatus: "not_required",
        actionStatus: "none",
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
        status: "placed",
        label: "Order Placed",
        timestamp: "Dec 5, 2024",
        description: "Your order has been placed successfully",
        isComplete: true,
        isCurrent: false,
      },
      {
        status: "packed",
        label: "Packed",
        timestamp: "Dec 6, 2024",
        description: "Your items are packed and ready for dispatch",
        isComplete: true,
        isCurrent: false,
      },
      {
        status: "shipped",
        label: "Shipped",
        timestamp: "Dec 6, 2024",
        description: "Package picked up by DTDC courier",
        isComplete: true,
        isCurrent: false,
      },
      {
        status: "out_for_delivery",
        label: "Out for Delivery",
        timestamp: "Dec 8, 2024",
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

  // ============================================
  // SHIPMENT 1B: Second shipment for order 20551926
  // Ships separately from SHP001
  // ============================================
  {
    id: "SHP001B",
    orderId: "20551926",
    status: "delivered",
    currentStep: 4,
    expectedDelivery: "Dec 9, 2024",
    deliveredDate: "Dec 8, 2024",
    trackingNumber: "BLUEDART1112223",
    carrier: "Blue Dart",
    actionStatus: "none",
    items: [
      {
        id: "TSCTOPPER01",
        sku: "TSCTOPPER01",
        name: "SmartGRID Mattress Topper",
        variant: "King Size / 2 inch",
        configuration: "Medium Soft",
        image: "https://cdn.shopify.com/s/files/1/0635/6929/7637/files/Baby-Mattress_01.webp?v=1754644949",
        quantity: 1,
        price: 9999,
        installationRequired: false,
        installationStatus: "not_required",
        actionStatus: "none",
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
        status: "placed",
        label: "Order Placed",
        timestamp: "Dec 5, 2024",
        isComplete: true,
        isCurrent: false,
      },
      {
        status: "packed",
        label: "Packed",
        timestamp: "Dec 6, 2024",
        isComplete: true,
        isCurrent: false,
      },
      {
        status: "shipped",
        label: "Shipped",
        timestamp: "Dec 6, 2024",
        description: "Package picked up by Blue Dart",
        isComplete: true,
        isCurrent: false,
      },
      {
        status: "out_for_delivery",
        label: "Out for Delivery",
        timestamp: "Dec 8, 2024",
        isComplete: true,
        isCurrent: false,
      },
      {
        status: "delivered",
        label: "Delivered",
        timestamp: "Dec 8, 2024",
        description: "Delivered - Signed by Rahul",
        isComplete: true,
        isCurrent: true,
      },
    ],
  },

  // ============================================
  // SHIPMENT 2: In Transit with furniture item
  // 1 item requiring installation
  // ============================================
  {
    id: "SHP002",
    orderId: "20553743",
    status: "in_transit",
    currentStep: 2,
    expectedDelivery: "Dec 10 - Dec 12",
    trackingNumber: "BLUEDART9876543",
    carrier: "Blue Dart",
    actionStatus: "none",
    items: [
      {
        id: "TSCBED01",
        sku: "TSCBED01",
        name: "SmartGRID Ortho Bed Frame",
        variant: "King Size / Walnut",
        configuration: "With Storage",
        image: "https://cdn.shopify.com/s/files/1/0635/6929/7637/files/01_2.webp?v=1754644948",
        quantity: 1,
        price: 45999,
        installationRequired: true,
        installationStatus: "not_required", // Will change to job_created after delivery
        actionStatus: "none",
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
        status: "placed",
        label: "Order Placed",
        timestamp: "Dec 4, 2024",
        isComplete: true,
        isCurrent: false,
      },
      {
        status: "on_hold",
        label: "Order on Hold",
        timestamp: "Dec 4, 2024",
        description: "Payment verification in progress",
        isComplete: true,
        isCurrent: false,
        isOptional: true,
      },
      {
        status: "unheld",
        label: "Order Unheld",
        timestamp: "Dec 5, 2024",
        description: "Payment verified successfully",
        isComplete: true,
        isCurrent: false,
        isOptional: true,
      },
      {
        status: "packed",
        label: "Packed",
        timestamp: "Dec 5, 2024",
        isComplete: true,
        isCurrent: false,
      },
      {
        status: "shipped",
        label: "Shipped",
        timestamp: "Dec 6, 2024",
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

  // ============================================
  // SHIPMENT 3: DELIVERED - MULTI-ITEM (5 items)
  // Demonstrates various post-delivery journeys
  // Location: Delhi NCR (exchange-eligible metro city)
  // ============================================
  {
    id: "SHP003",
    orderId: "20546974",
    status: "delivered",
    currentStep: 4,
    expectedDelivery: "Nov 25, 2024",
    deliveredDate: "Nov 24, 2024",
    trackingNumber: "DELHIVERY111222",
    carrier: "Delhivery",
    actionStatus: "none",
    items: [
      // Item A: Mattress (No Installation) - Return Requested → Approved → Pickup Scheduled
      {
        id: "TSCMAT001",
        sku: "TSCMAT001",
        name: "SmartGRID Original Mattress",
        variant: "Queen Size / 6 inch",
        configuration: "Medium Soft",
        image: "https://cdn.shopify.com/s/files/1/0635/6929/7637/files/Baby-Mattress_01.webp?v=1754644949",
        quantity: 1,
        price: 24999,
        installationRequired: false,
        installationStatus: "not_required",
        actionStatus: "return_scheduled",
        scheduledDate: "Dec 20, 2024",
        courierPartner: "Delhivery",
      },
      // Item B: Bed Frame (Installation Required) - Installation Done, then Replacement Requested
      {
        id: "TSCBED002",
        sku: "TSCBED002",
        name: "SmartGRID Classic Bed Frame",
        variant: "King Size / Oak",
        configuration: "Without Storage",
        image: "https://cdn.shopify.com/s/files/1/0635/6929/7637/files/01_2.webp?v=1754644948",
        quantity: 1,
        price: 38999,
        installationRequired: true,
        installationStatus: "installation_completed",
        actionStatus: "replacement_approved",
        scheduledDate: "Dec 22, 2024",
        courierPartner: "Blue Dart",
      },
      // Item C: Sofa (Installation Required) - Installation Complete, Exchange Requested
      {
        id: "TSCSOFA002",
        sku: "TSCSOFA002",
        name: "SmartGRID L-Shape Sofa",
        variant: "5 Seater / Charcoal Grey",
        configuration: "Left-Hand Facing",
        image: "https://cdn.shopify.com/s/files/1/0635/6929/7637/files/Baby-Mattress_01.webp?v=1754644949",
        quantity: 1,
        price: 89999,
        installationRequired: true,
        installationStatus: "installation_completed",
        actionStatus: "exchange_scheduled",
        scheduledDate: "Dec 21, 2024",
        courierPartner: "DTDC",
      },
      // Item D: Chair (Installation Required) - Technician Assigned, No return action yet
      {
        id: "TSCCHAIR002",
        sku: "TSCCHAIR002",
        name: "SmartGRID Ergo Office Chair",
        variant: "Premium / Navy Blue",
        configuration: "High Back with Headrest",
        image: "https://cdn.shopify.com/s/files/1/0635/6929/7637/files/1_42041cdc-de2c-4d7c-be95-58d3ef1d838e.webp?v=1754645146",
        quantity: 1,
        price: 22999,
        installationRequired: true,
        installationStatus: "technician_assigned",
        actionStatus: "none",
      },
      // Item E: Table (Installation Required) - Just delivered, no post-delivery actions
      {
        id: "TSCTABLE001",
        sku: "TSCTABLE001",
        name: "SmartGRID Standing Desk",
        variant: "Large / White",
        configuration: "Electric Height Adjustable",
        image: "https://cdn.shopify.com/s/files/1/0635/6929/7637/files/01_2.webp?v=1754644948",
        quantity: 1,
        price: 32999,
        installationRequired: true,
        installationStatus: "job_created",
        actionStatus: "none",
      },
    ],
    shippingAddress: {
      name: "Rahul Sharma",
      line1: "B-42, Sector 15",
      city: "Delhi NCR",
      state: "Delhi",
      pincode: "201301",
      phone: "+91 98278 74262",
    },
    milestones: [
      {
        status: "placed",
        label: "Order Placed",
        timestamp: "Nov 20, 2024",
        isComplete: true,
        isCurrent: false,
      },
      {
        status: "packed",
        label: "Packed",
        timestamp: "Nov 21, 2024",
        isComplete: true,
        isCurrent: false,
      },
      {
        status: "shipped",
        label: "Shipped",
        timestamp: "Nov 22, 2024",
        isComplete: true,
        isCurrent: false,
      },
      {
        status: "out_for_delivery",
        label: "Out for Delivery",
        timestamp: "Nov 24, 2024",
        isComplete: true,
        isCurrent: false,
      },
      {
        status: "delivered",
        label: "Delivered",
        timestamp: "Nov 24, 2024",
        description: "Delivered - Signed by Rahul",
        isComplete: true,
        isCurrent: true,
      },
    ],
  },

  // ============================================
  // SHIPMENT 4: Cancelled Order
  // ============================================
  {
    id: "SHP004",
    orderId: "20543687",
    status: "cancelled",
    currentStep: 0,
    expectedDelivery: "Cancelled",
    actionStatus: "none",
    items: [
      {
        id: "TSCCHAIR01",
        sku: "TSCCHAIR01",
        name: "SmartGRID Ergo Chair",
        variant: "Premium / Black",
        image: "https://cdn.shopify.com/s/files/1/0635/6929/7637/files/1_42041cdc-de2c-4d7c-be95-58d3ef1d838e.webp?v=1754645146",
        quantity: 1,
        price: 18999,
        installationRequired: true,
        actionStatus: "none",
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
        status: "placed",
        label: "Order Placed",
        timestamp: "Nov 8, 2024",
        isComplete: true,
        isCurrent: false,
      },
      {
        status: "cancelled",
        label: "Cancelled",
        timestamp: "Nov 10, 2024",
        description: "Order cancelled by customer",
        isComplete: true,
        isCurrent: true,
      },
    ],
  },

  // ============================================
  // SHIPMENT 5: DELIVERED - MULTI-ITEM (4 items)
  // Bangalore - Metro city (exchange eligible)
  // Shows complete post-delivery journeys
  // ============================================
  {
    id: "SHP005",
    orderId: "20551930",
    status: "delivered",
    currentStep: 4,
    expectedDelivery: "Dec 8, 2024",
    deliveredDate: "Dec 7, 2024",
    trackingNumber: "FEDEX8765432",
    carrier: "FedEx",
    actionStatus: "none",
    items: [
      // Mattress - No install, Return picked up (completed return flow)
      {
        id: "TSCMAT003",
        sku: "TSCMAT003",
        name: "SmartGRID Memory Foam Mattress",
        variant: "Double Size / 10 inch",
        configuration: "Extra Firm",
        image: "https://cdn.shopify.com/s/files/1/0635/6929/7637/files/Baby-Mattress_01.webp?v=1754644949",
        quantity: 1,
        price: 29999,
        installationRequired: false,
        installationStatus: "not_required",
        actionStatus: "return_picked_up",
      },
      // Sofa Bed - Installation completed, Exchange completed
      {
        id: "TSCSOFA003",
        sku: "TSCSOFA003",
        name: "SmartGRID Convertible Sofa Bed",
        variant: "3 Seater / Beige",
        configuration: "With Storage",
        image: "https://cdn.shopify.com/s/files/1/0635/6929/7637/files/Baby-Mattress_01.webp?v=1754644949",
        quantity: 1,
        price: 65999,
        installationRequired: true,
        installationStatus: "installation_completed",
        actionStatus: "exchange_picked_up",
      },
      // Wardrobe - Installation in progress (Technician assigned)
      {
        id: "TSCWARD001",
        sku: "TSCWARD001",
        name: "SmartGRID Sliding Door Wardrobe",
        variant: "6 Door / Walnut",
        configuration: "With Mirror",
        image: "https://cdn.shopify.com/s/files/1/0635/6929/7637/files/01_2.webp?v=1754644948",
        quantity: 1,
        price: 75999,
        installationRequired: true,
        installationStatus: "technician_assigned",
        actionStatus: "none",
      },
      // Pillow - Simple delivered, no action
      {
        id: "TSCPILLOW003",
        sku: "TSCPILLOW003",
        name: "SmartGRID Cervical Pillow",
        variant: "Memory Foam",
        image: "https://cdn.shopify.com/s/files/1/0635/6929/7637/files/1_42041cdc-de2c-4d7c-be95-58d3ef1d838e.webp?v=1754645146",
        quantity: 1,
        price: 3999,
        installationRequired: false,
        installationStatus: "not_required",
        actionStatus: "none",
      },
    ],
    shippingAddress: {
      name: "Priya Singh",
      line1: "A-101, HSR Layout",
      line2: "Sector 6",
      city: "Bangalore",
      state: "Karnataka",
      pincode: "560102",
      phone: "+91 99887 76655",
    },
    milestones: [
      {
        status: "placed",
        label: "Order Placed",
        timestamp: "Dec 1, 2024",
        description: "Your order has been placed successfully",
        isComplete: true,
        isCurrent: false,
      },
      {
        status: "packed",
        label: "Packed",
        timestamp: "Dec 2, 2024",
        isComplete: true,
        isCurrent: false,
      },
      {
        status: "shipped",
        label: "Shipped",
        timestamp: "Dec 3, 2024",
        description: "Package picked up by FedEx",
        isComplete: true,
        isCurrent: false,
      },
      {
        status: "out_for_delivery",
        label: "Out for Delivery",
        timestamp: "Dec 7, 2024",
        isComplete: true,
        isCurrent: false,
      },
      {
        status: "delivered",
        label: "Delivered",
        timestamp: "Dec 7, 2024",
        description: "Delivered successfully",
        isComplete: true,
        isCurrent: true,
      },
    ],
  },

  // ============================================
  // SHIPMENT 6: DELIVERED - MULTI-ITEM (3 items)
  // Mumbai - Metro city (exchange eligible)
  // Shows mixed installation + replacement flows
  // ============================================
  {
    id: "SHP006",
    orderId: "20551935",
    status: "delivered",
    currentStep: 4,
    expectedDelivery: "Dec 10, 2024",
    deliveredDate: "Dec 10, 2024",
    trackingNumber: "DTDC9999888",
    carrier: "DTDC",
    actionStatus: "none",
    items: [
      // Dining Table - Installation complete, Replacement requested
      {
        id: "TSCTABLE002",
        sku: "TSCTABLE002",
        name: "SmartGRID 6-Seater Dining Table",
        variant: "Glass Top / Chrome Legs",
        configuration: "With Extension Leaf",
        image: "https://cdn.shopify.com/s/files/1/0635/6929/7637/files/01_2.webp?v=1754644948",
        quantity: 1,
        price: 45999,
        installationRequired: true,
        installationStatus: "installation_completed",
        actionStatus: "replacement_requested",
      },
      // TV Unit - Job created (awaiting technician)
      {
        id: "TSCTVUNIT001",
        sku: "TSCTVUNIT001",
        name: "SmartGRID Floating TV Unit",
        variant: "65 inch / Matte Black",
        configuration: "With LED Backlight",
        image: "https://cdn.shopify.com/s/files/1/0635/6929/7637/files/01_2.webp?v=1754644948",
        quantity: 1,
        price: 28999,
        installationRequired: true,
        installationStatus: "job_created",
        actionStatus: "none",
      },
      // Mattress Protector - No installation, delivered successfully
      {
        id: "TSCPROTECT001",
        sku: "TSCPROTECT001",
        name: "SmartGRID Waterproof Mattress Protector",
        variant: "King Size",
        image: "https://cdn.shopify.com/s/files/1/0635/6929/7637/files/Baby-Mattress_01.webp?v=1754644949",
        quantity: 2,
        price: 1999,
        installationRequired: false,
        installationStatus: "not_required",
        actionStatus: "none",
      },
    ],
    shippingAddress: {
      name: "Amit Patel",
      line1: "405, Sea View Apartments",
      line2: "Worli",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400018",
      phone: "+91 99001 22334",
    },
    milestones: [
      {
        status: "placed",
        label: "Order Placed",
        timestamp: "Dec 5, 2024",
        isComplete: true,
        isCurrent: false,
      },
      {
        status: "packed",
        label: "Packed",
        timestamp: "Dec 6, 2024",
        isComplete: true,
        isCurrent: false,
      },
      {
        status: "shipped",
        label: "Shipped",
        timestamp: "Dec 7, 2024",
        description: "Package picked up by DTDC",
        isComplete: true,
        isCurrent: false,
      },
      {
        status: "out_for_delivery",
        label: "Out for Delivery",
        timestamp: "Dec 10, 2024",
        isComplete: true,
        isCurrent: false,
      },
      {
        status: "delivered",
        label: "Delivered",
        timestamp: "Dec 10, 2024",
        description: "Delivered - Signed by Amit",
        isComplete: true,
        isCurrent: true,
      },
    ],
  },

  // ============================================
  // SHIPMENT 7: DELIVERED - MULTI-ITEM (4 items)
  // Chennai - Metro city (exchange eligible)
  // Shows various installation stages + actions
  // ============================================
  {
    id: "SHP007",
    orderId: "20551940",
    status: "delivered",
    currentStep: 4,
    expectedDelivery: "Dec 12, 2024",
    deliveredDate: "Dec 11, 2024",
    trackingNumber: "BLUEDART7778889",
    carrier: "Blue Dart",
    actionStatus: "none",
    items: [
      // Bed Frame - Installation completed, Replacement picked up (full cycle)
      {
        id: "TSCBED003",
        sku: "TSCBED003",
        name: "SmartGRID Platform Bed",
        variant: "Queen Size / Teak",
        configuration: "Low Profile",
        image: "https://cdn.shopify.com/s/files/1/0635/6929/7637/files/01_2.webp?v=1754644948",
        quantity: 1,
        price: 35999,
        installationRequired: true,
        installationStatus: "installation_completed",
        actionStatus: "replacement_picked_up",
      },
      // Side Table - Installation completed
      {
        id: "TSCSIDETBL001",
        sku: "TSCSIDETBL001",
        name: "SmartGRID Bedside Table",
        variant: "Set of 2 / Walnut",
        configuration: "With Drawer",
        image: "https://cdn.shopify.com/s/files/1/0635/6929/7637/files/01_2.webp?v=1754644948",
        quantity: 1,
        price: 12999,
        installationRequired: true,
        installationStatus: "installation_completed",
        actionStatus: "none",
      },
      // Mattress - No install, Exchange requested
      {
        id: "TSCMAT004",
        sku: "TSCMAT004",
        name: "SmartGRID Latex Mattress",
        variant: "Queen Size / 8 inch",
        configuration: "Natural Latex",
        image: "https://cdn.shopify.com/s/files/1/0635/6929/7637/files/Baby-Mattress_01.webp?v=1754644949",
        quantity: 1,
        price: 42999,
        installationRequired: false,
        installationStatus: "not_required",
        actionStatus: "exchange_approved",
        scheduledDate: "Dec 18, 2024",
        courierPartner: "Delhivery",
      },
      // Pillow Set - Just delivered, no action
      {
        id: "TSCPILLOWSET001",
        sku: "TSCPILLOWSET001",
        name: "SmartGRID Pillow Set",
        variant: "Pack of 4",
        configuration: "Ultra Soft",
        image: "https://cdn.shopify.com/s/files/1/0635/6929/7637/files/1_42041cdc-de2c-4d7c-be95-58d3ef1d838e.webp?v=1754645146",
        quantity: 1,
        price: 7999,
        installationRequired: false,
        installationStatus: "not_required",
        actionStatus: "none",
      },
    ],
    shippingAddress: {
      name: "Sneha Kapoor",
      line1: "12, Anna Nagar",
      line2: "East Block",
      city: "Chennai",
      state: "Tamil Nadu",
      pincode: "600040",
      phone: "+91 98765 43210",
    },
    milestones: [
      {
        status: "placed",
        label: "Order Placed",
        timestamp: "Dec 6, 2024",
        isComplete: true,
        isCurrent: false,
      },
      {
        status: "packed",
        label: "Packed",
        timestamp: "Dec 7, 2024",
        isComplete: true,
        isCurrent: false,
      },
      {
        status: "shipped",
        label: "Shipped",
        timestamp: "Dec 8, 2024",
        description: "Package picked up by Blue Dart",
        isComplete: true,
        isCurrent: false,
      },
      {
        status: "out_for_delivery",
        label: "Out for Delivery",
        timestamp: "Dec 11, 2024",
        isComplete: true,
        isCurrent: false,
      },
      {
        status: "delivered",
        label: "Delivered",
        timestamp: "Dec 11, 2024",
        description: "Delivered successfully",
        isComplete: true,
        isCurrent: true,
      },
    ],
  },

  // ============================================
  // SHIPMENT 8: DELIVERED - Non-metro city
  // Jaipur - NOT exchange eligible (only return/replacement)
  // ============================================
  {
    id: "SHP008",
    orderId: "20551945",
    status: "delivered",
    currentStep: 4,
    expectedDelivery: "Dec 14, 2024",
    deliveredDate: "Dec 13, 2024",
    trackingNumber: "DELHIVERY5556667",
    carrier: "Delhivery",
    actionStatus: "none",
    items: [
      // Recliner - Installation pending (job created)
      {
        id: "TSCRECL001",
        sku: "TSCRECL001",
        name: "SmartGRID Power Recliner",
        variant: "Single / Tan Brown",
        configuration: "Electric with USB",
        image: "https://cdn.shopify.com/s/files/1/0635/6929/7637/files/01_2.webp?v=1754644948",
        quantity: 1,
        price: 55999,
        installationRequired: true,
        installationStatus: "job_created",
        actionStatus: "none",
      },
      // Coffee Table - Installation complete
      {
        id: "TSCCOFTBL001",
        sku: "TSCCOFTBL001",
        name: "SmartGRID Round Coffee Table",
        variant: "Marble Top / Gold Base",
        image: "https://cdn.shopify.com/s/files/1/0635/6929/7637/files/01_2.webp?v=1754644948",
        quantity: 1,
        price: 18999,
        installationRequired: true,
        installationStatus: "installation_completed",
        actionStatus: "none",
      },
      // Comforter - No install, return requested
      {
        id: "TSCCOMF001",
        sku: "TSCCOMF001",
        name: "SmartGRID All Season Comforter",
        variant: "King Size / White",
        configuration: "Microfiber",
        image: "https://cdn.shopify.com/s/files/1/0635/6929/7637/files/Baby-Mattress_01.webp?v=1754644949",
        quantity: 1,
        price: 8999,
        installationRequired: false,
        installationStatus: "not_required",
        actionStatus: "return_requested",
      },
    ],
    shippingAddress: {
      name: "Rajesh Kumar",
      line1: "45, Malviya Nagar",
      line2: "Near Central Park",
      city: "Jaipur",
      state: "Rajasthan",
      pincode: "302017",
      phone: "+91 94567 89012",
    },
    milestones: [
      {
        status: "placed",
        label: "Order Placed",
        timestamp: "Dec 8, 2024",
        isComplete: true,
        isCurrent: false,
      },
      {
        status: "packed",
        label: "Packed",
        timestamp: "Dec 9, 2024",
        isComplete: true,
        isCurrent: false,
      },
      {
        status: "shipped",
        label: "Shipped",
        timestamp: "Dec 10, 2024",
        description: "Package dispatched from Jaipur Hub",
        isComplete: true,
        isCurrent: false,
      },
      {
        status: "out_for_delivery",
        label: "Out for Delivery",
        timestamp: "Dec 13, 2024",
        isComplete: true,
        isCurrent: false,
      },
      {
        status: "delivered",
        label: "Delivered",
        timestamp: "Dec 13, 2024",
        description: "Delivered - Signed by Rajesh",
        isComplete: true,
        isCurrent: true,
      },
    ],
  },
];

// ============================================
// ORDERS DATA
// ============================================
export const mockOrders: Order[] = [
  {
    id: "20551926",
    orderNumber: "#20551926",
    orderDate: "Dec 5, 2024",
    shipments: [mockShipments[0], mockShipments[1]],
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
  },
  {
    id: "20553743",
    orderNumber: "#20553743",
    orderDate: "Dec 4, 2024",
    shipments: [mockShipments[2]],
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
  },
  // Multi-item delivered order with various post-delivery states (Delhi NCR)
  {
    id: "20546974",
    orderNumber: "#20546974",
    orderDate: "Nov 20, 2024",
    shipments: [mockShipments[3]],
    billingAddress: {
      name: "Rahul Sharma",
      line1: "B-42, Sector 15",
      city: "Delhi NCR",
      state: "Delhi",
      pincode: "201301",
    },
    payment: {
      method: "Net Banking",
      status: "Paid",
      total: 209995,
      subtotal: 209995,
      shipping: 0,
    },
  },
  // Cancelled order
  {
    id: "20543687",
    orderNumber: "#20543687",
    orderDate: "Nov 8, 2024",
    shipments: [mockShipments[4]],
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
  // Multi-item Bangalore order
  {
    id: "20551930",
    orderNumber: "#20551930",
    orderDate: "Dec 1, 2024",
    shipments: [mockShipments[5]],
    billingAddress: {
      name: "Priya Singh",
      line1: "A-101, HSR Layout",
      line2: "Sector 6",
      city: "Bangalore",
      state: "Karnataka",
      pincode: "560102",
    },
    payment: {
      method: "EMI (HDFC)",
      status: "Paid",
      total: 175996,
      subtotal: 175996,
      shipping: 0,
    },
  },
  // Multi-item Mumbai order
  {
    id: "20551935",
    orderNumber: "#20551935",
    orderDate: "Dec 5, 2024",
    shipments: [mockShipments[6]],
    billingAddress: {
      name: "Amit Patel",
      line1: "405, Sea View Apartments",
      line2: "Worli",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400018",
    },
    payment: {
      method: "Credit Card (ICICI ****7890)",
      status: "Paid",
      total: 76997,
      subtotal: 76997,
      shipping: 0,
    },
  },
  // Multi-item Chennai order
  {
    id: "20551940",
    orderNumber: "#20551940",
    orderDate: "Dec 6, 2024",
    shipments: [mockShipments[7]],
    billingAddress: {
      name: "Sneha Kapoor",
      line1: "12, Anna Nagar",
      line2: "East Block",
      city: "Chennai",
      state: "Tamil Nadu",
      pincode: "600040",
    },
    payment: {
      method: "Debit Card (SBI ****5678)",
      status: "Paid",
      total: 99996,
      subtotal: 99996,
      shipping: 0,
    },
  },
  // Multi-item Jaipur order (non-metro, no exchange)
  {
    id: "20551945",
    orderNumber: "#20551945",
    orderDate: "Dec 8, 2024",
    shipments: [mockShipments[8]],
    billingAddress: {
      name: "Rajesh Kumar",
      line1: "45, Malviya Nagar",
      line2: "Near Central Park",
      city: "Jaipur",
      state: "Rajasthan",
      pincode: "302017",
    },
    payment: {
      method: "UPI (Google Pay)",
      status: "Paid",
      total: 83997,
      subtotal: 83997,
      shipping: 0,
    },
  },
];

// ============================================
// HELPER FUNCTIONS
// ============================================
export const getShipmentById = (id: string): Shipment | undefined => {
  return mockShipments.find((s) => s.id === id);
};

export const getOrderById = (id: string): Order | undefined => {
  return mockOrders.find((o) => o.id === id);
};

export const getShipmentByOrderId = (orderId: string): Shipment | undefined => {
  return mockShipments.find((s) => s.orderId === orderId);
};
