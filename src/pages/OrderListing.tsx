import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { ShipmentCard } from "@/components/shipment/ShipmentCard";
import { StickyBottomCTA } from "@/components/ui/sticky-bottom-cta";
import { mockOrders } from "@/data/mockOrders";
import { Order } from "@/types/order";
import { Package, Clock, CalendarDays } from "lucide-react";

const OrderListing = () => {
  // Separate active and past orders
  const activeOrders = mockOrders.filter((order) =>
    order.shipments.some(
      (s) => s.status !== "delivered" && s.status !== "cancelled"
    )
  );
  const pastOrders = mockOrders.filter((order) =>
    order.shipments.every(
      (s) => s.status === "delivered" || s.status === "cancelled"
    )
  );

  const OrderGroupCard = ({
    order,
    animationIndex,
  }: {
    order: Order;
    animationIndex: number;
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: animationIndex * 0.08, duration: 0.4 }}
      className="rounded-2xl border border-dashed border-border bg-muted/30 p-3 lg:p-4"
    >
      {/* Order header row */}
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <CalendarDays className="h-3.5 w-3.5" />
          <span>{order.orderDate}</span>
        </div>
        <span className="rounded-md bg-secondary px-2.5 py-1 text-xs font-medium text-muted-foreground border border-border/60">
          Order ID: <span className="font-semibold text-foreground">{order.orderNumber}</span>
        </span>
      </div>

      {/* Shipments within this order */}
      <div className="space-y-3">
        {order.shipments.map((shipment, idx) => (
          <ShipmentCard
            key={shipment.id}
            shipment={shipment}
            index={0}
            packageNumber={idx + 1}
            totalPackages={order.shipments.length}
          />
        ))}
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-background pb-28">
      <Header title="My Orders" />

      <main className="container px-4 py-6 lg:py-8 max-w-2xl mx-auto">
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

        {/* Active Orders */}
        {activeOrders.length > 0 && (
          <section className="mb-8">
            <div className="mb-4 flex items-center gap-2">
              <Package className="h-5 w-5 text-muted-foreground" />
              <h2 className="text-lg font-semibold text-foreground">Active Orders</h2>
              <span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-medium text-muted-foreground">
                {activeOrders.length}
              </span>
            </div>
            <div className="space-y-5">
              {activeOrders.map((order, index) => (
                <OrderGroupCard
                  key={order.id}
                  order={order}
                  animationIndex={index}
                />
              ))}
            </div>
          </section>
        )}

        {/* Past Orders */}
        {pastOrders.length > 0 && (
          <section className="mb-6">
            <div className="mb-4 flex items-center gap-2">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <h2 className="text-lg font-semibold text-foreground">Past Orders</h2>
              <span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-medium text-muted-foreground">
                {pastOrders.length}
              </span>
            </div>
            <div className="space-y-5">
              {pastOrders.map((order, index) => (
                <OrderGroupCard
                  key={order.id}
                  order={order}
                  animationIndex={activeOrders.length + index}
                />
              ))}
            </div>
          </section>
        )}

        {/* Empty state */}
        {mockOrders.length === 0 && (
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
    </div>
  );
};

export default OrderListing;
