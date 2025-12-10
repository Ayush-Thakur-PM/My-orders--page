import { cn } from "@/lib/utils";
import { OrderType } from "@/types/order";
import { RotateCcw, ArrowLeftRight } from "lucide-react";

interface OrderTypeBadgeProps {
  orderType?: OrderType;
  className?: string;
}

export const OrderTypeBadge = ({ orderType, className }: OrderTypeBadgeProps) => {
  // Only show badge for return or exchange orders
  if (!orderType || orderType === "normal" || orderType === "replacement") {
    return null;
  }

  const config = {
    return: {
      label: "Returned",
      icon: RotateCcw,
      className: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
    },
    exchange: {
      label: "Exchange",
      icon: ArrowLeftRight,
      className: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    },
  };

  const { label, icon: Icon, className: badgeClass } = config[orderType];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium",
        badgeClass,
        className
      )}
    >
      <Icon className="h-3 w-3" />
      {label}
    </span>
  );
};
