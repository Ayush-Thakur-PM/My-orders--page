import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { TrackingMilestone } from "@/types/order";
import { cn } from "@/lib/utils";

interface TrackingTimelineProps {
  milestones: TrackingMilestone[];
}

export const TrackingTimeline = ({ milestones }: TrackingTimelineProps) => {
  return (
    <div className="relative">
      {milestones.map((milestone, index) => {
        const isLast = index === milestones.length - 1;
        
        return (
          <motion.div
            key={milestone.status}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            className={cn(
              "relative flex gap-4",
              !isLast && "pb-8"
            )}
          >
            {/* Timeline connector */}
            {!isLast && (
              <div
                className={cn(
                  "absolute left-[15px] top-8 h-[calc(100%-2rem)] w-0.5",
                  milestone.isComplete
                    ? "bg-success"
                    : "bg-border"
                )}
              />
            )}

            {/* Step indicator */}
            <div className="relative z-10 flex-shrink-0">
              {milestone.isComplete && !milestone.isCurrent ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-success"
                >
                  <Check className="h-4 w-4 text-success-foreground" />
                </motion.div>
              ) : milestone.isCurrent ? (
                <div className="relative flex h-8 w-8 items-center justify-center">
                  <motion.span
                    animate={{ scale: [1, 1.4, 1] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    className="absolute h-8 w-8 rounded-full bg-primary/20"
                  />
                  <span className="relative flex h-4 w-4 rounded-full bg-primary" />
                </div>
              ) : (
                <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-border bg-background">
                  <span className="h-2 w-2 rounded-full bg-muted" />
                </div>
              )}
            </div>

            {/* Content */}
            <div className={cn(
              "flex-1 pt-1",
              !milestone.isComplete && !milestone.isCurrent && "opacity-50"
            )}>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className={cn(
                    "font-semibold",
                    milestone.isCurrent ? "text-primary" : "text-foreground"
                  )}>
                    {milestone.label}
                  </h3>
                  {milestone.description && (
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      {milestone.description}
                    </p>
                  )}
                </div>
                {milestone.timestamp && (
                  <span className="flex-shrink-0 text-xs text-muted-foreground">
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
