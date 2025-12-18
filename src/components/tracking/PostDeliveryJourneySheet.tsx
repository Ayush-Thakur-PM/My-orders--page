import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { OrderItem, ItemActionStatus, InstallationStatus } from "@/types/order";
import { motion } from "framer-motion";
import { 
  Check, 
  Package, 
  Wrench, 
  UserCheck, 
  CheckCircle2, 
  FileText, 
  ThumbsUp, 
  Calendar, 
  Truck,
  Clock
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PostDeliveryJourneySheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: OrderItem;
}

interface JourneyStep {
  id: string;
  label: string;
  description?: string;
  icon: React.ElementType;
  isComplete: boolean;
  isCurrent: boolean;
  timestamp?: string;
}

const getJourneySteps = (item: OrderItem): JourneyStep[] => {
  const steps: JourneyStep[] = [];
  const hasInstallation = item.installationRequired;
  const installationStatus = item.installationStatus || "not_required";
  const actionStatus = item.actionStatus || "none";

  // Step 1: Delivered (always complete at this stage)
  steps.push({
    id: "delivered",
    label: "Delivered",
    description: "Package delivered successfully",
    icon: Package,
    isComplete: true,
    isCurrent: false,
  });

  // Installation flow (if required)
  if (hasInstallation) {
    const jobCreatedComplete = ["job_created", "technician_assigned", "installation_completed"].includes(installationStatus);
    const techAssignedComplete = ["technician_assigned", "installation_completed"].includes(installationStatus);
    const installComplete = installationStatus === "installation_completed";

    const installationSteps: JourneyStep[] = [
      {
        id: "job_created",
        label: "Job Created",
        description: "Installation request submitted to our team",
        icon: FileText,
        isComplete: jobCreatedComplete,
        isCurrent: installationStatus === "job_created" && !jobCreatedComplete,
      },
      {
        id: "technician_assigned",
        label: "Technician Assigned",
        description: "A technician will contact you to schedule the installation",
        icon: UserCheck,
        isComplete: techAssignedComplete,
        isCurrent: installationStatus === "technician_assigned",
      },
      {
        id: "installation_completed",
        label: "Installation Completed",
        description: "Product has been assembled and set up",
        icon: Wrench,
        isComplete: installComplete,
        isCurrent: false,
      },
    ];
    steps.push(...installationSteps);
  }

  // Return/Replacement/Exchange flow (if initiated)
  if (actionStatus !== "none") {
    const isReturn = actionStatus.includes("return");
    const isReplacement = actionStatus.includes("replacement");
    const isExchange = actionStatus.includes("exchange");
    const actionLabel = isReturn ? "Return" : isReplacement ? "Replacement" : "Exchange";

    const requestedComplete = true; // If action exists, request was submitted
    const approvedComplete = actionStatus.includes("approved") || actionStatus.includes("scheduled") || actionStatus.includes("picked_up");
    const scheduledComplete = actionStatus.includes("scheduled") || actionStatus.includes("picked_up");
    const pickedUpComplete = actionStatus.includes("picked_up");

    const actionSteps: JourneyStep[] = [
      {
        id: "request_submitted",
        label: "Request Submitted",
        description: `${actionLabel} request received by our team`,
        icon: FileText,
        isComplete: requestedComplete,
        isCurrent: actionStatus.includes("requested") && !approvedComplete,
      },
      {
        id: "request_approved",
        label: "Request Approved",
        description: "Your request has been reviewed and approved",
        icon: ThumbsUp,
        isComplete: approvedComplete,
        isCurrent: actionStatus.includes("approved") && !scheduledComplete,
      },
      {
        id: "pickup_scheduled",
        label: `${actionLabel} Scheduled`,
        description: item.scheduledDate 
          ? `${isExchange ? "Exchange" : "Pickup"} scheduled for ${item.scheduledDate}${item.courierPartner ? ` via ${item.courierPartner}` : ""}`
          : `${isExchange ? "Exchange" : "Pickup"} date will be confirmed shortly`,
        icon: Calendar,
        isComplete: scheduledComplete,
        isCurrent: actionStatus.includes("scheduled") && !pickedUpComplete,
        timestamp: item.scheduledDate,
      },
      {
        id: "picked_up",
        label: isExchange ? "Exchange Completed" : `${actionLabel} Picked Up`,
        description: isExchange 
          ? "New item delivered and old item collected"
          : "Item has been collected by delivery partner",
        icon: Truck,
        isComplete: pickedUpComplete,
        isCurrent: false,
      },
    ];

    steps.push(...actionSteps);
  }

  return steps;
};

export const PostDeliveryJourneySheet = ({ 
  open, 
  onOpenChange, 
  item 
}: PostDeliveryJourneySheetProps) => {
  const journeySteps = getJourneySteps(item);

  // Determine if there's actual post-delivery activity
  const hasActivity = item.installationRequired || (item.actionStatus && item.actionStatus !== "none");

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader className="pb-4 border-b border-border/50">
          <SheetTitle className="text-lg">Post-Delivery Journey</SheetTitle>
          <SheetDescription className="text-sm">
            Track what happens after delivery for this item
          </SheetDescription>
        </SheetHeader>

        {/* Item Preview */}
        <div className="flex gap-3 py-4 border-b border-border/50">
          <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-secondary">
            <img
              src={item.image}
              alt={item.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-foreground text-sm line-clamp-1">{item.name}</h4>
            <p className="text-xs text-muted-foreground">{item.variant}</p>
            {item.configuration && (
              <p className="text-xs text-muted-foreground">{item.configuration}</p>
            )}
            {item.installationRequired && (
              <span className="inline-flex items-center gap-1 mt-1 px-1.5 py-0.5 rounded bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300 text-xs">
                <Wrench className="h-3 w-3" />
                Installation Required
              </span>
            )}
          </div>
        </div>

        {/* Journey Timeline */}
        <div className="py-4">
          <h4 className="text-sm font-semibold text-foreground mb-4">Journey Timeline</h4>
          <div className="relative">
            {journeySteps.map((step, index) => {
              const Icon = step.icon;
              const isLast = index === journeySteps.length - 1;

              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative flex gap-3"
                >
                  {/* Connector line */}
                  {!isLast && (
                    <div className="absolute left-4 top-8 bottom-0 w-0.5 -translate-x-1/2">
                      <div 
                        className={cn(
                          "h-full w-full",
                          step.isComplete ? "bg-success" : "bg-border"
                        )}
                      />
                    </div>
                  )}

                  {/* Icon */}
                  <div className="relative z-10 flex-shrink-0">
                    <div
                      className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-full transition-all",
                        step.isComplete && !step.isCurrent && "bg-success",
                        step.isCurrent && "bg-primary ring-2 ring-primary/20",
                        !step.isComplete && !step.isCurrent && "bg-secondary border border-border"
                      )}
                    >
                      {step.isComplete && !step.isCurrent ? (
                        <Check className="h-4 w-4 text-success-foreground" />
                      ) : (
                        <Icon className={cn(
                          "h-4 w-4",
                          step.isCurrent ? "text-primary-foreground" : "text-muted-foreground"
                        )} />
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className={cn("flex-1 pb-6", isLast && "pb-0")}>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h5 className={cn(
                        "text-sm font-medium",
                        step.isCurrent && "text-primary",
                        step.isComplete && !step.isCurrent && "text-foreground",
                        !step.isComplete && !step.isCurrent && "text-muted-foreground"
                      )}>
                        {step.label}
                      </h5>
                      {step.isCurrent && (
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-primary/10 text-xs font-medium text-primary">
                          <span className="relative flex h-1.5 w-1.5">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
                          </span>
                          Current
                        </span>
                      )}
                    </div>
                    {step.description && (
                      <p className={cn(
                        "text-xs mt-0.5",
                        step.isComplete || step.isCurrent ? "text-muted-foreground" : "text-muted-foreground/60"
                      )}>
                        {step.description}
                      </p>
                    )}
                    {step.timestamp && step.isCurrent && (
                      <div className="flex items-center gap-1 mt-1.5 text-xs text-primary">
                        <Clock className="h-3 w-3" />
                        <span>{step.timestamp}</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* No activity yet */}
        {!hasActivity && (
          <div className="text-center py-8 text-muted-foreground">
            <CheckCircle2 className="h-12 w-12 mx-auto mb-3 text-success" />
            <p className="text-sm font-medium">Item Delivered Successfully</p>
            <p className="text-xs mt-1">No post-delivery actions initiated yet</p>
          </div>
        )}

        {/* Simple delivered state with no further actions */}
        {journeySteps.length === 1 && (
          <div className="text-center py-8 text-muted-foreground">
            <CheckCircle2 className="h-12 w-12 mx-auto mb-3 text-success" />
            <p className="text-sm font-medium">Item Delivered Successfully</p>
            <p className="text-xs mt-1">No post-delivery actions initiated yet</p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
