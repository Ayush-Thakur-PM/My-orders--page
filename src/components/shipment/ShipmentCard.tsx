import { motion } from "framer-motion";
import { ChevronRight, Package, ChevronDown, ChevronUp } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Shipment, isExchangeEligible } from "@/types/order";
import { StatusBadge } from "@/components/ui/status-badge";
import { ActionStatusBadge } from "@/components/ui/action-status-badge";
import { PackageItemList } from "./PackageItemList";
import { cn } from "@/lib/utils";

interface ShipmentCardProps {
  shipment: Shipment;
  index?: number;
  packageNumber?: number;
  totalPackages?: number;
  showItemDetails?: boolean;
}

export const ShipmentCard = ({ 
  shipment, 
  index = 0,
  packageNumber = 1,
  totalPackages = 1,
  showItemDetails = false
}: ShipmentCardProps) => {
  const [isExpanded, setIsExpanded] = useState(showItemDetails);
  const isActive = shipment.status !== "delivered" && shipment.status !== "cancelled";
  const itemCount = shipment.items.length;
  const displayItems = shipment.items.slice(0, 3);
  const remainingCount = itemCount - 3;
  
  // Determine exchange eligibility based on city
  const isMetroCity = isExchangeEligible(shipment.shippingAddress.city);

  const handleExpandClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
    >
      <div
        className={cn(
          "rounded-2xl bg-card p-4 shadow-card transition-all duration-300",
          "border border-border/50",
          isActive && "ring-1 ring-primary/10"
        )}
      >
        {/* Status row */}
        <div className="mb-3 flex items-center flex-wrap gap-2">
          <StatusBadge status={shipment.status} />
          {shipment.actionStatus && shipment.actionStatus !== "none" && (
            <ActionStatusBadge status={shipment.actionStatus} />
          )}
          <span className="ml-auto text-sm font-medium text-muted-foreground bg-secondary px-2.5 py-1 rounded-lg">
            Package {packageNumber}/{totalPackages}
          </span>
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
          ) : shipment.actionStatus && ["return_requested", "return_in_progress", "exchange_scheduled", "exchanged"].includes(shipment.actionStatus) ? (
            <p className="text-sm text-muted-foreground">
              Expected return pickup{" "}
              <span className="font-semibold text-foreground">{shipment.expectedDelivery}</span>
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">
              Expected delivery{" "}
              <span className="font-semibold text-foreground">{shipment.expectedDelivery}</span>
            </p>
          )}
        </div>

        {/* Collapsible Product List */}
        {isExpanded ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-4"
          >
            <PackageItemList items={shipment.items} />
          </motion.div>
        ) : (
          /* Product thumbnails - 72px uniform tiles */
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center -space-x-2">
              {displayItems.map((item, idx) => (
                <div
                  key={item.id}
                  className={cn(
                    "relative h-[72px] w-[72px] overflow-hidden rounded-xl border-2 border-card bg-secondary",
                    idx > 0 && "shadow-sm"
                  )}
                  style={{ zIndex: displayItems.length - idx }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover object-center"
                    loading="lazy"
                  />
                </div>
              ))}
              {remainingCount > 0 && (
                <div className="relative flex h-[72px] w-[72px] items-center justify-center rounded-xl border-2 border-card bg-secondary shadow-sm">
                  <span className="text-sm font-medium text-muted-foreground">+{remainingCount}</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Package className="h-4 w-4" />
              <span>{itemCount} {itemCount === 1 ? "item" : "items"}</span>
            </div>
          </div>
        )}

        {/* Expand/Collapse button */}
        <button
          onClick={handleExpandClick}
          className="flex items-center justify-center w-full gap-1.5 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors border-t border-border/50 mt-2"
        >
          {isExpanded ? (
            <>
              <ChevronUp className="h-4 w-4" />
              Show less
            </>
          ) : (
            <>
              <ChevronDown className="h-4 w-4" />
              View all items
            </>
          )}
        </button>

        {/* Action buttons */}
        <div className="flex items-center gap-3 mt-4">
          <Link
            to={`/track/${shipment.orderId}/${shipment.id}`}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl",
              "bg-primary text-primary-foreground text-sm font-medium",
              "hover:bg-primary/90 transition-colors"
            )}
          >
            Track Package
            <ChevronRight className="h-4 w-4" />
          </Link>
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

        {/* Metro city indicator for exchange eligibility */}
        {isMetroCity && shipment.status === "delivered" && (
          <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
            <span className="px-2 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full">
              Exchange eligible
            </span>
            <span>Simultaneous pickup & delivery available</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};
