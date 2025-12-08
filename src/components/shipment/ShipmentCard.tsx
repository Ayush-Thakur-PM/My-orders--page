import { motion } from "framer-motion";
import { ChevronRight, Package } from "lucide-react";
import { Link } from "react-router-dom";
import { Shipment } from "@/types/order";
import { StatusBadge } from "@/components/ui/status-badge";
import { cn } from "@/lib/utils";

interface ShipmentCardProps {
  shipment: Shipment;
  index?: number;
}

export const ShipmentCard = ({ shipment, index = 0 }: ShipmentCardProps) => {
  const isActive = shipment.status !== "delivered" && shipment.status !== "cancelled";
  const itemCount = shipment.items.length;
  const displayItems = shipment.items.slice(0, 3);
  const remainingCount = itemCount - 3;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
    >
      <Link
        to={`/track/${shipment.orderId}/${shipment.id}`}
        className={cn(
          "group block rounded-2xl bg-card p-4 shadow-card transition-all duration-300",
          "hover:shadow-elevated hover:-translate-y-0.5",
          "border border-border/50",
          isActive && "ring-1 ring-primary/10"
        )}
      >
        {/* Status row */}
        <div className="mb-4 flex items-center justify-between">
          <StatusBadge status={shipment.status} />
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <span className="hidden sm:inline">Shipment</span>
            <span className="font-medium text-foreground">#{shipment.id}</span>
          </div>
        </div>

        {/* Delivery info */}
        <div className="mb-4">
          {shipment.status === "delivered" ? (
            <p className="text-sm text-muted-foreground">
              Delivered on{" "}
              <span className="font-medium text-foreground">{shipment.deliveredDate}</span>
            </p>
          ) : shipment.status === "cancelled" ? (
            <p className="text-sm text-destructive">Order was cancelled</p>
          ) : (
            <p className="text-sm text-muted-foreground">
              Expected delivery{" "}
              <span className="font-semibold text-foreground">{shipment.expectedDelivery}</span>
            </p>
          )}
        </div>

        {/* Product thumbnails */}
        <div className="flex items-center justify-between">
          <div className="flex items-center -space-x-2">
            {displayItems.map((item, idx) => (
              <div
                key={item.id}
                className={cn(
                  "relative h-14 w-14 overflow-hidden rounded-xl border-2 border-card bg-secondary",
                  "transition-transform group-hover:scale-105",
                  idx > 0 && "shadow-sm"
                )}
                style={{ zIndex: displayItems.length - idx }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
            {remainingCount > 0 && (
              <div className="relative flex h-14 w-14 items-center justify-center rounded-xl border-2 border-card bg-secondary shadow-sm">
                <span className="text-sm font-medium text-muted-foreground">+{remainingCount}</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Package className="h-4 w-4" />
              <span>{itemCount} {itemCount === 1 ? "item" : "items"}</span>
            </div>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              <ChevronRight className="h-4 w-4" />
            </div>
          </div>
        </div>

        {/* Active pulse indicator */}
        {isActive && shipment.status === "out_for_delivery" && (
          <div className="mt-4 flex items-center gap-2 rounded-lg bg-warning/5 px-3 py-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-warning opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-warning" />
            </span>
            <span className="text-sm font-medium text-warning">
              Delivery partner is on the way
            </span>
          </div>
        )}
      </Link>
    </motion.div>
  );
};
