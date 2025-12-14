import { cn } from "@/lib/utils";
import { ActionStatus } from "@/types/order";
import { RotateCcw, ArrowLeftRight, RefreshCw, Clock, CheckCircle2 } from "lucide-react";

interface ActionStatusBadgeProps {
  status?: ActionStatus;
  className?: string;
}

export const ActionStatusBadge = ({ status, className }: ActionStatusBadgeProps) => {
  if (!status || status === "none") {
    return null;
  }

  const config: Record<Exclude<ActionStatus, "none">, {
    label: string;
    icon: typeof RotateCcw;
    className: string;
  }> = {
    return_requested: {
      label: "Return Requested",
      icon: Clock,
      className: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
    },
    return_in_progress: {
      label: "Return in Progress",
      icon: RotateCcw,
      className: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
    },
    returned: {
      label: "Returned",
      icon: CheckCircle2,
      className: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
    },
    replacement_in_progress: {
      label: "Replacement in Progress",
      icon: RefreshCw,
      className: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    },
    replaced: {
      label: "Replaced",
      icon: CheckCircle2,
      className: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
    },
    exchange_scheduled: {
      label: "Exchange Scheduled",
      icon: ArrowLeftRight,
      className: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
    },
    exchanged: {
      label: "Exchanged",
      icon: CheckCircle2,
      className: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
    },
  };

  const { label, icon: Icon, className: badgeClass } = config[status];

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
