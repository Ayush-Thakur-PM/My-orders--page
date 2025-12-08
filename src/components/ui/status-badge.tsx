import { cn } from "@/lib/utils";
import { ShipmentStatus } from "@/types/order";
import { Package, Truck, MapPin, CheckCircle2, XCircle, Clock } from "lucide-react";

interface StatusBadgeProps {
  status: ShipmentStatus;
  size?: "sm" | "md" | "lg";
  showIcon?: boolean;
  className?: string;
}

const statusConfig: Record<ShipmentStatus, { 
  label: string; 
  className: string; 
  icon: typeof Package;
}> = {
  processing: {
    label: "Processing",
    className: "bg-muted text-muted-foreground",
    icon: Clock,
  },
  in_transit: {
    label: "In Transit",
    className: "bg-info/10 text-info",
    icon: Truck,
  },
  out_for_delivery: {
    label: "Out for Delivery",
    className: "bg-warning/10 text-warning",
    icon: MapPin,
  },
  delivered: {
    label: "Delivered",
    className: "bg-success/10 text-success",
    icon: CheckCircle2,
  },
  cancelled: {
    label: "Cancelled",
    className: "bg-destructive/10 text-destructive",
    icon: XCircle,
  },
};

const sizeClasses = {
  sm: "px-2 py-0.5 text-xs gap-1",
  md: "px-3 py-1 text-sm gap-1.5",
  lg: "px-4 py-1.5 text-base gap-2",
};

const iconSizes = {
  sm: "h-3 w-3",
  md: "h-3.5 w-3.5",
  lg: "h-4 w-4",
};

export const StatusBadge = ({
  status,
  size = "md",
  showIcon = true,
  className,
}: StatusBadgeProps) => {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-medium",
        config.className,
        sizeClasses[size],
        className
      )}
    >
      {showIcon && <Icon className={iconSizes[size]} />}
      {config.label}
    </span>
  );
};
