import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { motion } from "framer-motion";
import { MapPin, Truck, Package, CheckCircle2 } from "lucide-react";

interface CourierJourneyStep {
  location: string;
  timestamp: string;
  status: string;
  isComplete: boolean;
  isCurrent: boolean;
}

interface CourierJourneySheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  carrier: string;
  trackingNumber: string;
}

const mockCourierJourney: CourierJourneyStep[] = [
  {
    location: "Mumbai Hub",
    timestamp: "Dec 6, 2024 at 6:45 PM",
    status: "Package picked up",
    isComplete: true,
    isCurrent: false,
  },
  {
    location: "Mumbai Airport",
    timestamp: "Dec 7, 2024 at 2:30 AM",
    status: "In transit to destination city",
    isComplete: true,
    isCurrent: false,
  },
  {
    location: "Delhi Airport",
    timestamp: "Dec 7, 2024 at 6:15 AM",
    status: "Arrived at destination city",
    isComplete: true,
    isCurrent: false,
  },
  {
    location: "Noida Distribution Center",
    timestamp: "Dec 7, 2024 at 11:00 AM",
    status: "Package sorted for delivery",
    isComplete: true,
    isCurrent: false,
  },
  {
    location: "Sector 15, Noida",
    timestamp: "Dec 8, 2024 at 9:00 AM",
    status: "Out for delivery",
    isComplete: false,
    isCurrent: true,
  },
];

export const CourierJourneySheet = ({
  open,
  onOpenChange,
  carrier,
  trackingNumber,
}: CourierJourneySheetProps) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader className="pb-4 border-b border-border/50">
          <SheetTitle className="flex items-center gap-2">
            <Truck className="h-5 w-5 text-primary" />
            {carrier} Journey
          </SheetTitle>
          <p className="text-sm text-muted-foreground font-mono">
            {trackingNumber}
          </p>
        </SheetHeader>

        <div className="py-6">
          <div className="relative">
            {mockCourierJourney.map((step, index) => {
              const isLast = index === mockCourierJourney.length - 1;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.08, duration: 0.3 }}
                  className="relative flex gap-4 pb-6 last:pb-0"
                >
                  {/* Connector line */}
                  {!isLast && (
                    <div
                      className={`absolute left-[11px] top-6 h-[calc(100%-0.5rem)] w-0.5 ${
                        step.isComplete ? "bg-success" : "bg-border"
                      }`}
                    />
                  )}

                  {/* Icon */}
                  <div className="relative z-10 flex-shrink-0">
                    {step.isCurrent ? (
                      <div className="relative flex h-6 w-6 items-center justify-center">
                        <span className="absolute h-6 w-6 animate-ping rounded-full bg-primary/30" />
                        <Truck className="relative h-4 w-4 text-primary" />
                      </div>
                    ) : step.isComplete ? (
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-success">
                        <CheckCircle2 className="h-3.5 w-3.5 text-success-foreground" />
                      </div>
                    ) : (
                      <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-border bg-background">
                        <Package className="h-3 w-3 text-muted-foreground" />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-0.5">
                    <div className="flex items-start gap-2">
                      <MapPin className="mt-0.5 h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className={`font-medium text-sm ${step.isCurrent ? "text-primary" : "text-foreground"}`}>
                          {step.location}
                        </p>
                        <p className="text-sm text-muted-foreground mt-0.5">
                          {step.status}
                        </p>
                        <p className="text-xs text-muted-foreground/70 mt-1">
                          {step.timestamp}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
