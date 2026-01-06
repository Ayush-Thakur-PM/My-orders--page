import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { OrderItem, ItemActionStatus, InstallationStatus } from "@/types/order";
import { PostDeliveryJourneySheet } from "@/components/tracking/PostDeliveryJourneySheet";
import { RotateCcw, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PackageItemListProps {
  items: OrderItem[];
  compact?: boolean;
  orderId?: string;
  shipmentId?: string;
  onItemClick?: (itemId: string) => void;
  showInlineActions?: boolean;
  onActionClick?: (item: OrderItem) => void;
}

// Helper to determine exchange eligibility per item
const isItemExchangeEligible = (item: OrderItem): boolean => {
  const name = item.name.toLowerCase();
  // Pillows are NOT exchange eligible
  if (name.includes("pillow")) return false;
  // Everything else is exchange eligible
  return true;
};

// Get status badge for action status
const getActionStatusBadge = (status: ItemActionStatus | undefined) => {
  if (!status || status === "none") return null;

  const statusConfig: Record<string, { label: string; className: string }> = {
    return_requested: { label: "Return Requested", className: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300" },
    return_approved: { label: "Return Approved", className: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300" },
    return_scheduled: { label: "Pickup Scheduled", className: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300" },
    return_picked_up: { label: "Returned", className: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300" },
    replacement_requested: { label: "Replacement Requested", className: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300" },
    replacement_approved: { label: "Replacement Approved", className: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300" },
    replacement_scheduled: { label: "Replacement Scheduled", className: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300" },
    replacement_picked_up: { label: "Replaced", className: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300" },
    exchange_requested: { label: "Exchange Requested", className: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300" },
    exchange_approved: { label: "Exchange Approved", className: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300" },
    exchange_scheduled: { label: "Exchange Scheduled", className: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300" },
    exchange_picked_up: { label: "Exchanged", className: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300" },
  };

  const config = statusConfig[status];
  if (!config) return null;

  return (
    <span className={cn("px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap", config.className)}>
      {config.label}
    </span>
  );
};

// Get status badge for installation status
const getInstallationStatusBadge = (status: InstallationStatus | undefined, installationRequired: boolean | undefined) => {
  if (!installationRequired || !status || status === "not_required") return null;

  const statusConfig: Record<string, { label: string; className: string }> = {
    job_created: { label: "Installation Pending", className: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300" },
    technician_assigned: { label: "Technician Assigned", className: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300" },
    installation_completed: { label: "Installation Complete", className: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300" },
  };

  const config = statusConfig[status];
  if (!config) return null;

  return (
    <span className={cn("px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap", config.className)}>
      {config.label}
    </span>
  );
};

export const PackageItemList = ({ 
  items, 
  compact = false, 
  orderId, 
  shipmentId,
  onItemClick,
  showInlineActions = false,
  onActionClick
}: PackageItemListProps) => {
  const navigate = useNavigate();
  const [journeyItem, setJourneyItem] = useState<OrderItem | null>(null);
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (compact) {
    return (
      <div className="space-y-2">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex items-center gap-3 rounded-lg bg-secondary/50 p-2"
          >
            <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg bg-secondary">
              <img
                src={item.image}
                alt={item.name}
                className="h-full w-full object-cover object-center"
                loading="lazy"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{item.name}</p>
              <p className="text-xs text-muted-foreground truncate">
                {item.variant}
                {item.configuration && ` • ${item.configuration}`}
              </p>
              {item.quantity > 1 && (
                <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  const handleItemClick = (itemId: string) => {
    if (onItemClick) {
      onItemClick(itemId);
    } else if (orderId && shipmentId) {
      // Navigate to tracking page with item highlight
      navigate(`/track/${orderId}/${shipmentId}?item=${itemId}`);
    }
  };

  const isClickable = !!(onItemClick || (orderId && shipmentId));
  const isExchangeEligibleItem = (item: OrderItem) => isItemExchangeEligible(item);

  // Check if item has any post-delivery journey to show
  const hasPostDeliveryJourney = (item: OrderItem) => {
    const hasActiveAction = item.actionStatus && item.actionStatus !== "none";
    return hasActiveAction || item.installationRequired;
  };

  // Check if item can initiate action (no active action in progress)
  const canInitiateAction = (item: OrderItem) => {
    return !(item.actionStatus && item.actionStatus !== "none");
  };

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          onClick={() => isClickable && handleItemClick(item.id)}
          className={cn(
            "flex gap-4 rounded-xl border border-border/50 bg-card p-3",
            "transition-all",
            isClickable && "cursor-pointer hover:shadow-md hover:border-primary/30 hover:bg-secondary/30"
          )}
        >
          {/* Uniform 72px thumbnail */}
          <div className="h-[72px] w-[72px] flex-shrink-0 overflow-hidden rounded-xl bg-secondary">
            <img
              src={item.image}
              alt={item.name}
              className="h-full w-full object-cover object-center"
              loading="lazy"
            />
          </div>

          <div className="flex-1 min-w-0">
            {/* SKU */}
            {item.sku && (
              <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide mb-0.5">
                {item.sku}
              </p>
            )}
            
            {/* Product Name */}
            <p className="text-sm font-semibold text-foreground leading-tight mb-1">
              {item.name}
            </p>
            
            {/* Variant & Configuration */}
            <p className="text-xs text-muted-foreground mb-1">
              {item.variant}
              {item.configuration && (
                <span className="ml-1 text-muted-foreground/70">• {item.configuration}</span>
              )}
            </p>
            
            {/* Price & Quantity */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">
                {formatPrice(item.price)}
              </span>
              {item.quantity > 1 && (
                <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">
                  Qty: {item.quantity}
                </span>
              )}
            </div>

            {(() => {
              const hasAction = !!(item.actionStatus && item.actionStatus !== "none");
              return (
                <>
                  {/* Status badges - visible for items with post-delivery actions */}
                  {(hasAction || item.installationRequired) && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {getInstallationStatusBadge(item.installationStatus, item.installationRequired)}
                      {getActionStatusBadge(item.actionStatus)}
                      {isExchangeEligibleItem(item) && !hasAction && (
                        <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400">
                          Exchange eligible
                        </span>
                      )}
                    </div>
                  )}

                  {/* Inline action CTAs - lightweight pill style */}
                  {showInlineActions && (hasPostDeliveryJourney(item) || (canInitiateAction(item) && onActionClick)) && (
                    <div className="mt-2.5 flex items-center gap-2">
                      {/* View Journey - ghost pill style */}
                      {hasPostDeliveryJourney(item) && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setJourneyItem(item);
                          }}
                          className="flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-medium text-muted-foreground bg-muted/60 hover:bg-muted transition-colors"
                        >
                          <span>View Journey</span>
                          <ChevronRight className="h-3.5 w-3.5" />
                        </button>
                      )}

                      {/* Replace/Return - subtle outline pill */}
                      {canInitiateAction(item) && onActionClick && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onActionClick(item);
                          }}
                          className="flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-medium border border-border text-foreground hover:border-primary/50 hover:text-primary transition-colors"
                        >
                          <RotateCcw className="h-3.5 w-3.5" />
                          <span>Replace / Return</span>
                        </button>
                      )}
                    </div>
                  )}
                </>
              );
            })()}
          </div>
        </motion.div>
      ))}

      {/* Post-Delivery Journey Sheet */}
      {journeyItem && (
        <PostDeliveryJourneySheet
          open={!!journeyItem}
          onOpenChange={(open) => !open && setJourneyItem(null)}
          item={journeyItem}
        />
      )}
    </div>
  );
};
