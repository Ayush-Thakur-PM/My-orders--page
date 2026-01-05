import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { OrderItem, ItemActionStatus, InstallationStatus, ReturnReason, isExchangeEligible } from "@/types/order";
import { ItemActionModal } from "./ItemActionModal";
import { PostDeliveryJourneySheet } from "./PostDeliveryJourneySheet";
import { RotateCcw, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ItemCardProps {
  item: OrderItem;
  index: number;
  isDelivered: boolean;
  shippingCity: string;
  onActionSubmit?: (item: OrderItem, action: string, reason: ReturnReason, notes: string) => void;
  isHighlighted?: boolean;
}

// Get status badge for action status
const getActionStatusBadge = (status: ItemActionStatus | undefined) => {
  if (!status || status === "none") return null;

  const statusConfig: Record<string, { label: string; className: string }> = {
    return_requested: { label: "Return Requested", className: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300" },
    return_approved: { label: "Return Approved", className: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300" },
    return_scheduled: { label: "Pickup Scheduled", className: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300" },
    return_picked_up: { label: "Returned", className: "bg-success/10 text-success" },
    replacement_requested: { label: "Replacement Requested", className: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300" },
    replacement_approved: { label: "Replacement Approved", className: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300" },
    replacement_scheduled: { label: "Replacement Scheduled", className: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300" },
    replacement_picked_up: { label: "Replaced", className: "bg-success/10 text-success" },
    exchange_requested: { label: "Exchange Requested", className: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300" },
    exchange_approved: { label: "Exchange Approved", className: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300" },
    exchange_scheduled: { label: "Exchange Scheduled", className: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300" },
    exchange_picked_up: { label: "Exchanged", className: "bg-success/10 text-success" },
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

// Helper to determine exchange eligibility per item
const isItemExchangeEligible = (item: OrderItem): boolean => {
  const name = item.name.toLowerCase();
  // Pillows are NOT exchange eligible
  if (name.includes("pillow")) return false;
  // Everything else is exchange eligible
  return true;
};

export const ItemCard = ({ 
  item, 
  index, 
  isDelivered, 
  shippingCity,
  onActionSubmit,
  isHighlighted = false
}: ItemCardProps) => {
  const [showActionModal, setShowActionModal] = useState(false);
  const [showJourneySheet, setShowJourneySheet] = useState(false);
  const [showHighlight, setShowHighlight] = useState(isHighlighted);

  // Fade out the highlight after 2 seconds
  useEffect(() => {
    if (isHighlighted) {
      setShowHighlight(true);
      const timer = setTimeout(() => {
        setShowHighlight(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isHighlighted]);
  // Check exchange eligibility at item level
  const exchangeEligible = isDelivered && isItemExchangeEligible(item) && isExchangeEligible(shippingCity);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const hasActiveAction = item.actionStatus && item.actionStatus !== "none";
  const hasInstallationInProgress = item.installationRequired && 
    item.installationStatus && 
    item.installationStatus !== "not_required" && 
    item.installationStatus !== "installation_completed";
  const canInitiateAction = isDelivered && !hasActiveAction;

  const handleActionSubmit = (item: OrderItem, action: string, reason: ReturnReason, notes: string) => {
    onActionSubmit?.(item, action, reason, notes);
    // Modal stays open to show confirmation screen - closed by user via "Done" button
  };

  // Check if item has any post-delivery journey to show
  const hasPostDeliveryJourney = hasActiveAction || item.installationRequired;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className={cn(
          "rounded-xl bg-card p-4 lg:p-5 shadow-card border transition-all duration-300 relative overflow-hidden",
          "lg:hover:shadow-lg lg:hover:border-border",
          isHighlighted 
            ? "border-primary ring-2 ring-primary/20" 
            : "border-border/50"
        )}
      >
        {/* Highlight overlay with fade-out animation */}
        <AnimatePresence>
          {showHighlight && (
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: [1, 0.7, 1, 0.7, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="absolute inset-0 bg-primary/15 rounded-xl pointer-events-none"
            />
          )}
        </AnimatePresence>
        <div className="flex gap-4">
          {/* 72px uniform thumbnail */}
          <div className="h-[72px] w-[72px] flex-shrink-0 overflow-hidden rounded-lg bg-secondary">
            <img
              src={item.image}
              alt={item.name}
              className="h-full w-full object-cover object-center"
              loading="lazy"
            />
          </div>
          
          <div className="flex flex-1 flex-col justify-center min-w-0">
            <h4 className="font-medium text-foreground line-clamp-1">{item.name}</h4>
            <div className="mt-0.5 flex flex-wrap items-center gap-x-2 text-sm text-muted-foreground">
              {item.sku && (
                <span className="font-mono text-xs">{item.sku}</span>
              )}
              <span>{item.variant}</span>
              {item.configuration && (
                <span className="text-xs">· {item.configuration}</span>
              )}
            </div>
            <div className="mt-1.5 flex items-center justify-between">
              <span className="font-semibold text-foreground">{formatPrice(item.price)}</span>
              {item.quantity > 1 && (
                <span className="text-sm text-muted-foreground">Qty: {item.quantity}</span>
              )}
            </div>
          </div>
        </div>

        {/* Status Badges - Always visible for delivered items */}
        {isDelivered && (
          <div className="mt-3 flex flex-wrap gap-2">
            {getInstallationStatusBadge(item.installationStatus, item.installationRequired)}
            {getActionStatusBadge(item.actionStatus)}
            {/* Exchange eligibility badge at item level */}
            {exchangeEligible && !hasActiveAction && (
              <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400">
                Exchange eligible
              </span>
            )}
          </div>
        )}

        {/* Post-delivery actions */}
        {isDelivered && (
          <div className="mt-3 pt-3 border-t border-border/50">
            <div className="flex items-center gap-2">
              {/* View Journey Button (if has active action or installation) */}
              {hasPostDeliveryJourney && (
                <button
                  onClick={() => setShowJourneySheet(true)}
                  className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-secondary text-sm font-medium text-foreground hover:bg-secondary/80 transition-colors"
                >
                  View Journey
                  <ChevronRight className="h-4 w-4" />
                </button>
              )}

              {/* Replace/Return Button - Opens Modal */}
              {canInitiateAction && (
                <button
                  onClick={() => setShowActionModal(true)}
                  className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-sm font-medium transition-colors border border-primary text-primary hover:bg-primary/5"
                >
                  <RotateCcw className="h-4 w-4" />
                  Replace / Return
                </button>
              )}
            </div>
          </div>
        )}
      </motion.div>

      {/* Replace/Return Modal */}
      <ItemActionModal
        open={showActionModal}
        onOpenChange={setShowActionModal}
        item={item}
        shippingCity={shippingCity}
        onSubmit={handleActionSubmit}
      />

      {/* Post-Delivery Journey Sheet */}
      <PostDeliveryJourneySheet
        open={showJourneySheet}
        onOpenChange={setShowJourneySheet}
        item={item}
      />
    </>
  );
};
