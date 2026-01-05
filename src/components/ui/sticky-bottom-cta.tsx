import { motion } from "framer-motion";
import { MessageCircle, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

interface StickyBottomCTAProps {
  primaryLabel: string;
  primaryAction?: () => void;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryAction?: () => void;
  className?: string;
}

export const StickyBottomCTA = ({
  primaryLabel,
  primaryAction,
  primaryHref,
  secondaryLabel,
  secondaryAction,
  className,
}: StickyBottomCTAProps) => {
  const PrimaryWrapper = primaryHref ? "a" : "button";

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50",
        "border-t border-border/50 bg-card/95 backdrop-blur-lg",
        "px-4 pb-safe pt-3",
        className
      )}
      style={{ paddingBottom: "max(env(safe-area-inset-bottom), 1rem)" }}
    >
      <div className="container flex gap-3 max-w-2xl mx-auto">
        {secondaryLabel && (
          <button
            onClick={secondaryAction}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-border bg-secondary py-3.5 font-medium text-secondary-foreground transition-colors hover:bg-secondary/80"
          >
            <Phone className="h-4 w-4" />
            <span className="hidden sm:inline">{secondaryLabel}</span>
            <span className="sm:hidden">Call</span>
          </button>
        )}
        <PrimaryWrapper
          onClick={primaryAction}
          href={primaryHref}
          className={cn(
            "flex items-center justify-center gap-2 rounded-xl bg-primary py-3.5 font-medium text-primary-foreground transition-all",
            "hover:bg-primary/90 active:scale-[0.98]",
            secondaryLabel ? "flex-[2]" : "flex-1"
          )}
        >
          <MessageCircle className="h-4 w-4" />
          {primaryLabel}
        </PrimaryWrapper>
      </div>
    </motion.div>
  );
};
