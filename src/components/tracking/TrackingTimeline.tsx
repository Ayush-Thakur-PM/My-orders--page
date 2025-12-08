import { motion } from "framer-motion";
import { Check, Package, Truck, MapPin, Home, CircleCheck } from "lucide-react";
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
    case "confirmed":
      return CircleCheck;
    case "packed":
      return Package;
    case "shipped":
      return Truck;
    case "out_for_delivery":
      return MapPin;
    case "delivered":
      return Home;
    default:
      return CircleCheck;
  }
};

export const TrackingTimeline = ({ 
  milestones, 
  carrier, 
  trackingNumber,
  onCarrierClick 
}: TrackingTimelineProps) => {
  return (
    <div className="relative">
      {/* Horizontal progress bar for mobile - cleaner view */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          {milestones.slice(0, 5).map((milestone, index) => {
            const Icon = getIcon(milestone.status);
            const isComplete = milestone.isComplete;
            const isCurrent = milestone.isCurrent;
            
            return (
              <div key={milestone.status} className="flex flex-col items-center relative z-10">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full transition-all",
                    isComplete && !isCurrent && "bg-success",
                    isCurrent && "bg-primary ring-4 ring-primary/20",
                    !isComplete && !isCurrent && "bg-secondary border-2 border-border"
                  )}
                >
                  {isComplete && !isCurrent ? (
                    <Check className="h-5 w-5 text-success-foreground" />
                  ) : (
                    <Icon className={cn(
                      "h-5 w-5",
                      isCurrent ? "text-primary-foreground" : "text-muted-foreground"
                    )} />
                  )}
                </motion.div>
                <span className={cn(
                  "mt-2 text-xs text-center max-w-[60px] leading-tight",
                  isCurrent ? "font-semibold text-primary" : 
                  isComplete ? "font-medium text-foreground" : "text-muted-foreground"
                )}>
                  {milestone.label.split(" ").slice(-1)[0]}
                </span>
              </div>
            );
          })}
        </div>
        
        {/* Progress line */}
        <div className="absolute top-5 left-5 right-5 h-0.5 bg-border -z-0" style={{ top: '20px' }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ 
              width: `${(milestones.filter(m => m.isComplete).length / (milestones.length - 1)) * 100}%` 
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="h-full bg-success"
          />
        </div>
      </div>

      {/* Current status detail card */}
      {milestones
        .filter(m => m.isCurrent || (m.isComplete && m.timestamp))
        .slice(-3)
        .reverse()
        .map((milestone, index) => {
          const isCurrentStatus = milestone.isCurrent;
          const showCarrierLink = 
            (milestone.status === "shipped" || milestone.status === "out_for_delivery") &&
            carrier &&
            trackingNumber;
          
          return (
            <motion.div
              key={milestone.status}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.3 }}
              className={cn(
                "relative flex gap-3 py-3",
                index < 2 && "border-b border-border/30"
              )}
            >
              <div className={cn(
                "w-1 rounded-full flex-shrink-0",
                isCurrentStatus ? "bg-primary" : "bg-success"
              )} />
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <h4 className={cn(
                      "font-semibold text-sm",
                      isCurrentStatus ? "text-primary" : "text-foreground"
                    )}>
                      {milestone.label}
                      {isCurrentStatus && (
                        <span className="ml-2 inline-flex items-center gap-1 text-xs font-normal text-muted-foreground">
                          <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                          </span>
                          Current
                        </span>
                      )}
                    </h4>
                    {milestone.description && (
                      <p className="text-sm text-muted-foreground mt-0.5">
                        {milestone.description}
                      </p>
                    )}
                    {showCarrierLink && (
                      <button 
                        onClick={onCarrierClick}
                        className="mt-1.5 text-sm font-medium text-primary hover:underline inline-flex items-center gap-1"
                      >
                        <Truck className="h-3.5 w-3.5" />
                        View {carrier} Journey →
                      </button>
                    )}
                  </div>
                  {milestone.timestamp && (
                    <span className="flex-shrink-0 text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-md">
                      {milestone.timestamp.split(" at ")[0]}
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
