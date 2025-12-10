import { motion } from "framer-motion";
import { OrderItem } from "@/types/order";
import { cn } from "@/lib/utils";

interface PackageItemListProps {
  items: OrderItem[];
  compact?: boolean;
}

export const PackageItemList = ({ items, compact = false }: PackageItemListProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (compact) {
    return (
      <div className="space-y-2">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex items-center gap-3 rounded-lg bg-secondary/50 p-2"
          >
            <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg bg-secondary">
              <img
                src={item.image}
                alt={item.name}
                className="h-full w-full object-cover object-center"
                loading="lazy"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{item.name}</p>
              <p className="text-xs text-muted-foreground truncate">
                {item.variant}
                {item.configuration && ` • ${item.configuration}`}
              </p>
              {item.quantity > 1 && (
                <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className={cn(
            "flex gap-4 rounded-xl border border-border/50 bg-card p-3",
            "transition-shadow hover:shadow-sm"
          )}
        >
          {/* Uniform 72px thumbnail */}
          <div className="h-[72px] w-[72px] flex-shrink-0 overflow-hidden rounded-xl bg-secondary">
            <img
              src={item.image}
              alt={item.name}
              className="h-full w-full object-cover object-center"
              loading="lazy"
            />
          </div>

          <div className="flex-1 min-w-0">
            {/* SKU */}
            {item.sku && (
              <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide mb-0.5">
                {item.sku}
              </p>
            )}
            
            {/* Product Name */}
            <p className="text-sm font-semibold text-foreground leading-tight mb-1">
              {item.name}
            </p>
            
            {/* Variant & Configuration */}
            <p className="text-xs text-muted-foreground mb-1">
              {item.variant}
              {item.configuration && (
                <span className="ml-1 text-muted-foreground/70">• {item.configuration}</span>
              )}
            </p>
            
            {/* Price & Quantity */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">
                {formatPrice(item.price)}
              </span>
              {item.quantity > 1 && (
                <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">
                  Qty: {item.quantity}
                </span>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
