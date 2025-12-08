import { useParams, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { TrackingTimeline } from "@/components/tracking/TrackingTimeline";
import { ProductList } from "@/components/tracking/ProductList";
import { OrderDetailsAccordion } from "@/components/tracking/OrderDetailsAccordion";
import { StickyBottomCTA } from "@/components/ui/sticky-bottom-cta";
import { StatusBadge } from "@/components/ui/status-badge";
import { getShipmentByOrderId, getOrderById } from "@/data/mockOrders";
import { Calendar, Package } from "lucide-react";

const ItemTracking = () => {
  const { orderId, shipmentId } = useParams();

  const shipment = orderId ? getShipmentByOrderId(orderId) : undefined;
  const order = orderId ? getOrderById(orderId) : undefined;

  if (!shipment || !order) {
    return <Navigate to="/orders" replace />;
  }

  const isActive = shipment.status !== "delivered" && shipment.status !== "cancelled";

  return (
    <div className="min-h-screen bg-background pb-28">
      <Header title="Track Shipment" showBack />

      <main className="container px-4 py-6">
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
              <span className="text-sm text-muted-foreground">
                #{shipment.id}
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
            <TrackingTimeline milestones={shipment.milestones} />
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
              Items in this Shipment
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
      </main>

      <StickyBottomCTA
        primaryLabel="Contact Support"
        secondaryLabel="Call Us"
      />
    </div>
  );
};

export default ItemTracking;
