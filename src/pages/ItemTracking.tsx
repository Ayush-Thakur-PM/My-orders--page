import { useState } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { TrackingTimeline } from "@/components/tracking/TrackingTimeline";
import { ProductList } from "@/components/tracking/ProductList";
import { OrderDetailsAccordion } from "@/components/tracking/OrderDetailsAccordion";
import { StickyBottomCTA } from "@/components/ui/sticky-bottom-cta";
import { StatusBadge } from "@/components/ui/status-badge";
import { CourierJourneySheet } from "@/components/tracking/CourierJourneySheet";
import { FAQSection } from "@/components/tracking/FAQSection";
import { getShipmentByOrderId, getOrderById } from "@/data/mockOrders";
import { Calendar, Package, ChevronRight } from "lucide-react";

const ItemTracking = () => {
  const { orderId, shipmentId } = useParams();
  const [courierSheetOpen, setCourierSheetOpen] = useState(false);

  const shipment = orderId ? getShipmentByOrderId(orderId) : undefined;
  const order = orderId ? getOrderById(orderId) : undefined;

  if (!shipment || !order) {
    return <Navigate to="/orders" replace />;
  }

  const isActive = shipment.status !== "delivered" && shipment.status !== "cancelled";

  // Calculate package number (e.g., "Package 1/2")
  const totalPackages = order.shipments.length;
  const packageIndex = order.shipments.findIndex(s => s.id === shipment.id) + 1;
  const packageLabel = `Package ${packageIndex}/${totalPackages}`;

  return (
    <div className="min-h-screen bg-background pb-28">
      <Header title="Track Package" showBack showBrandTitle />

      <main className="container px-4 py-6">
        {/* Breadcrumb Navigation */}
        <nav className="mb-4 flex items-center gap-1 text-sm text-muted-foreground overflow-x-auto">
          <Link to="/orders" className="hover:text-foreground transition-colors whitespace-nowrap">
            My Orders
          </Link>
          <ChevronRight className="h-3.5 w-3.5 flex-shrink-0" />
          <span className="whitespace-nowrap">Order {order.orderNumber}</span>
          <ChevronRight className="h-3.5 w-3.5 flex-shrink-0" />
          <span className="text-foreground font-medium whitespace-nowrap">Track Shipment</span>
        </nav>
        {/* Hero Status Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 overflow-hidden rounded-2xl bg-card shadow-card"
        >
          {/* Status header */}
          <div className="border-b border-border/50 p-4">
            <div className="flex items-center justify-between">
              <StatusBadge status={shipment.status} size="lg" />
              <span className="text-sm font-medium text-muted-foreground bg-secondary px-2.5 py-1 rounded-lg">
                {packageLabel}
              </span>
            </div>
          </div>

          {/* Delivery info */}
          <div className="p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <div>
                {shipment.status === "delivered" ? (
                  <>
                    <p className="text-sm text-muted-foreground">Delivered on</p>
                    <p className="text-lg font-semibold text-foreground">
                      {shipment.deliveredDate}
                    </p>
                  </>
                ) : shipment.status === "cancelled" ? (
                  <>
                    <p className="text-sm text-destructive">Order Cancelled</p>
                    <p className="text-base text-muted-foreground">
                      Refund has been initiated
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-sm text-muted-foreground">Expected Delivery</p>
                    <p className="text-lg font-semibold text-foreground">
                      {shipment.expectedDelivery}
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* Live indicator for active deliveries */}
            {shipment.status === "out_for_delivery" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-4 flex items-center gap-2 rounded-lg bg-warning/5 px-3 py-2.5"
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-warning opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-warning" />
                </span>
                <span className="text-sm font-medium text-warning">
                  Your package is out for delivery
                </span>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Tracking Timeline */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <h2 className="mb-4 text-lg font-semibold text-foreground">
            Tracking Updates
          </h2>
          <div className="rounded-2xl bg-card p-4 shadow-card">
            <TrackingTimeline 
              milestones={shipment.milestones}
              carrier={shipment.carrier}
              trackingNumber={shipment.trackingNumber}
              onCarrierClick={() => setCourierSheetOpen(true)}
            />
          </div>
        </motion.section>

        {/* Items in Shipment */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <div className="mb-4 flex items-center gap-2">
            <Package className="h-5 w-5 text-muted-foreground" />
            <h2 className="text-lg font-semibold text-foreground">
              Items in this Package
            </h2>
            <span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-medium text-muted-foreground">
              {shipment.items.length}
            </span>
          </div>
          <ProductList items={shipment.items} />
        </motion.section>

        {/* Order Details Accordion */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="mb-4 text-lg font-semibold text-foreground">
            Order Information
          </h2>
          <OrderDetailsAccordion order={order} shipment={shipment} />
        </motion.section>

        {/* FAQ Section */}
        <FAQSection />
      </main>

      <StickyBottomCTA
        primaryLabel="Contact Support"
        secondaryLabel="Call Us"
      />

      {/* Courier Journey Sheet */}
      {shipment.carrier && shipment.trackingNumber && (
        <CourierJourneySheet
          open={courierSheetOpen}
          onOpenChange={setCourierSheetOpen}
          carrier={shipment.carrier}
          trackingNumber={shipment.trackingNumber}
        />
      )}
    </div>
  );
};

export default ItemTracking;
