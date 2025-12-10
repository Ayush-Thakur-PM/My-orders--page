import { motion } from "framer-motion";
import { Check, Package, Truck, MapPin, Home, ShoppingBag, Pause, Play, RefreshCw, PackageCheck } from "lucide-react";
import { TrackingMilestone } from "@/types/order";
import { cn } from "@/lib/utils";

interface TrackingTimelineProps {
  milestones: TrackingMilestone[];
  carrier?: string;
  trackingNumber?: string;
  onCarrierClick?: () => void;
}

const getIcon = (status: string) => {
  switch (status) {
    case "placed":
      return ShoppingBag;
    case "on_hold":
      return Pause;
    case "unheld":
      return Play;
    case "packed":
      return Package;
    case "shipped":
      return Truck;
    case "out_for_delivery":
      return MapPin;
    case "rescheduled":
      return RefreshCw;
    case "delivered":
      return Home;
    case "return_pickup":
      return PackageCheck;
    default:
      return ShoppingBag;
  }
};

export const TrackingTimeline = ({ 
  milestones, 
  carrier, 
  trackingNumber,
  onCarrierClick 
}: TrackingTimelineProps) => {
  // Filter out optional milestones that aren't active/complete
  const visibleMilestones = milestones.filter(m => {
    if (!m.isOptional) return true;
    return m.isComplete || m.isCurrent;
  });

  return (
    <div className="relative py-2">
      {visibleMilestones.map((milestone, index) => {
        const Icon = getIcon(milestone.status);
        const isComplete = milestone.isComplete && !milestone.isCurrent;
        const isCurrent = milestone.isCurrent;
        const isFuture = !milestone.isComplete && !milestone.isCurrent;
        const isLast = index === visibleMilestones.length - 1;
        
        const showCarrierLink = 
          (milestone.status === "shipped" || milestone.status === "out_for_delivery") &&
          carrier &&
          trackingNumber &&
          (isCurrent || isComplete);

        return (
          <motion.div
            key={milestone.status}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.08, duration: 0.3 }}
            className="relative flex gap-4"
          >
            {/* Vertical connector line */}
            {!isLast && (
              <div className="absolute left-5 top-10 bottom-0 w-0.5 -translate-x-1/2">
                <div 
                  className={cn(
                    "h-full w-full",
                    isComplete ? "bg-success" : "bg-border"
                  )}
                />
              </div>
            )}
            
            {/* Icon circle */}
            <div className="relative z-10 flex-shrink-0">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.08 + 0.1, duration: 0.25, type: "spring" }}
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full transition-all",
                  isComplete && "bg-success shadow-sm",
                  isCurrent && "bg-primary ring-4 ring-primary/20 shadow-md",
                  isFuture && "bg-secondary border-2 border-border"
                )}
              >
                {isComplete ? (
                  <Check className="h-5 w-5 text-success-foreground" />
                ) : (
                  <Icon className={cn(
                    "h-5 w-5",
                    isCurrent ? "text-primary-foreground" : "text-muted-foreground"
                  )} />
                )}
              </motion.div>
            </div>
            
            {/* Content */}
            <div className={cn(
              "flex-1 pb-6 min-w-0",
              isLast && "pb-0"
            )}>
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className={cn(
                      "text-sm font-semibold",
                      isCurrent && "text-primary",
                      isComplete && "text-foreground",
                      isFuture && "text-muted-foreground"
                    )}>
                      {milestone.label}
                    </h4>
                    {isCurrent && (
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-primary/10 text-xs font-medium text-primary">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
                        </span>
                        Current
                      </span>
                    )}
                  </div>
                  
                  {milestone.description && (
                    <p className={cn(
                      "mt-0.5 text-sm",
                      isFuture ? "text-muted-foreground/60" : "text-muted-foreground"
                    )}>
                      {milestone.description}
                    </p>
                  )}
                  
                  {showCarrierLink && (
                    <button 
                      onClick={onCarrierClick}
                      className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                    >
                      <Truck className="h-3.5 w-3.5" />
                      View {carrier} Journey →
                    </button>
                  )}
                </div>
                
                {milestone.timestamp && (
                  <span className={cn(
                    "flex-shrink-0 text-xs px-2 py-1 rounded-md",
                    isCurrent ? "bg-primary/10 text-primary font-medium" :
                    isComplete ? "bg-secondary text-muted-foreground" :
                    "text-muted-foreground/60"
                  )}>
                    {milestone.timestamp}
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
