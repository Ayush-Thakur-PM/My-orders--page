import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { OrderItem, ItemActionStatus, ReturnReason, isExchangeEligible } from "@/types/order";
import { ItemActionForm } from "./ItemActionForm";
import { PostDeliveryJourneySheet } from "./PostDeliveryJourneySheet";
import { RotateCcw, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ItemCardProps {
  item: OrderItem;
  index: number;
  isDelivered: boolean;
  shippingCity: string;
  onActionSubmit?: (item: OrderItem, action: string, reason: ReturnReason, notes: string) => void;
}

const getStatusBadge = (status: ItemActionStatus | undefined) => {
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
    <span className={cn("px-2 py-0.5 rounded-full text-xs font-medium", config.className)}>
      {config.label}
    </span>
  );
};

export const ItemCard = ({ 
  item, 
  index, 
  isDelivered, 
  shippingCity,
  onActionSubmit 
}: ItemCardProps) => {
  const [showActionForm, setShowActionForm] = useState(false);
  const [showJourneySheet, setShowJourneySheet] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const hasActiveAction = item.actionStatus && item.actionStatus !== "none";
  const canInitiateAction = isDelivered && !hasActiveAction;

  const handleActionSubmit = (item: OrderItem, action: string, reason: ReturnReason, notes: string) => {
    onActionSubmit?.(item, action, reason, notes);
    setShowActionForm(false);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className="rounded-xl bg-card p-4 shadow-card border border-border/50"
      >
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
            <div className="flex items-start justify-between gap-2">
              <h4 className="font-medium text-foreground line-clamp-1">{item.name}</h4>
              {getStatusBadge(item.actionStatus)}
            </div>
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

        {/* Post-delivery actions */}
        {isDelivered && (
          <div className="mt-3 pt-3 border-t border-border/50">
            <div className="flex items-center gap-2">
              {/* View Journey Button (if has active action or installation) */}
              {(hasActiveAction || item.installationRequired) && (
                <button
                  onClick={() => setShowJourneySheet(true)}
                  className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-secondary text-sm font-medium text-foreground hover:bg-secondary/80 transition-colors"
                >
                  View Journey
                  <ChevronRight className="h-4 w-4" />
                </button>
              )}

              {/* Replace/Return Button */}
              {canInitiateAction && (
                <button
                  onClick={() => setShowActionForm(!showActionForm)}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-sm font-medium transition-colors",
                    showActionForm 
                      ? "bg-primary text-primary-foreground"
                      : "border border-primary text-primary hover:bg-primary/5"
                  )}
                >
                  <RotateCcw className="h-4 w-4" />
                  Replace / Return
                </button>
              )}
            </div>
          </div>
        )}

        {/* Inline Action Form */}
        <AnimatePresence>
          {showActionForm && (
            <ItemActionForm
              item={item}
              shippingCity={shippingCity}
              onSubmit={handleActionSubmit}
              onCancel={() => setShowActionForm(false)}
            />
          )}
        </AnimatePresence>
      </motion.div>

      {/* Post-Delivery Journey Sheet */}
      <PostDeliveryJourneySheet
        open={showJourneySheet}
        onOpenChange={setShowJourneySheet}
        item={item}
      />
    </>
  );
};
