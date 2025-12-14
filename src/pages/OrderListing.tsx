import { motion } from "framer-motion";
import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { ShipmentCard } from "@/components/shipment/ShipmentCard";
import { StickyBottomCTA } from "@/components/ui/sticky-bottom-cta";
import { ReturnsReplacementModal } from "@/components/tracking/ReturnsReplacementModal";
import { mockShipments } from "@/data/mockOrders";
import { Shipment } from "@/types/order";
import { Package, Clock } from "lucide-react";

const OrderListing = () => {
  const [returnsModalOpen, setReturnsModalOpen] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null);

  // Group shipments by status
  const activeShipments = mockShipments.filter(
    (s) => s.status !== "delivered" && s.status !== "cancelled"
  );
  const completedShipments = mockShipments.filter(
    (s) => s.status === "delivered" || s.status === "cancelled"
  );

  const handleReturnsClick = (shipment: Shipment) => {
    setSelectedShipment(shipment);
    setReturnsModalOpen(true);
  };

  const ShipmentSection = ({
    title,
    icon: Icon,
    shipments,
    startIndex = 0,
  }: {
    title: string;
    icon: typeof Package;
    shipments: Shipment[];
    startIndex?: number;
  }) => (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6"
    >
      <div className="mb-4 flex items-center gap-2">
        <Icon className="h-5 w-5 text-muted-foreground" />
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
        <span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-medium text-muted-foreground">
          {shipments.length}
        </span>
      </div>
      <div className="space-y-4">
        {shipments.map((shipment, index) => (
          <ShipmentCard
            key={shipment.id}
            shipment={shipment}
            index={startIndex + index}
            onReturnsClick={handleReturnsClick}
          />
        ))}
      </div>
    </motion.section>
  );

  return (
    <div className="min-h-screen bg-background pb-28">
      <Header title="My Orders" showBack />

      <main className="container px-4 py-6">
        {/* User greeting */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <p className="text-muted-foreground">
            Hi, <span className="font-medium text-foreground">Rahul</span>
          </p>
          <p className="text-sm text-muted-foreground">
            Track and manage your Sleep Company orders
          </p>
        </motion.div>

        {/* Active Shipments */}
        {activeShipments.length > 0 && (
          <ShipmentSection
            title="Active Shipments"
            icon={Package}
            shipments={activeShipments}
          />
        )}

        {/* Completed Shipments */}
        {completedShipments.length > 0 && (
          <ShipmentSection
            title="Past Orders"
            icon={Clock}
            shipments={completedShipments}
            startIndex={activeShipments.length}
          />
        )}

        {/* Empty state */}
        {mockShipments.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-secondary">
              <Package className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">No orders yet</h3>
            <p className="mt-1 text-muted-foreground">
              Your orders will appear here once you make a purchase
            </p>
          </motion.div>
        )}
      </main>

      <StickyBottomCTA
        primaryLabel="Need Help?"
        secondaryLabel="Call Support"
      />

      {/* Returns Modal */}
      <ReturnsReplacementModal
        open={returnsModalOpen}
        onOpenChange={setReturnsModalOpen}
        items={selectedShipment?.items}
        shippingCity={selectedShipment?.shippingAddress.city}
      />
    </div>
  );
};

export default OrderListing;
