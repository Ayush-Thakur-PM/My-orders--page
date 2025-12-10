import { motion } from "framer-motion";
import { OrderItem } from "@/types/order";

interface ProductListProps {
  items: OrderItem[];
  showSku?: boolean;
}

export const ProductList = ({ items, showSku = true }: ProductListProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex gap-4 rounded-xl bg-card p-3 shadow-card"
        >
          {/* 72px uniform thumbnail */}
          <div className="h-[72px] w-[72px] flex-shrink-0 overflow-hidden rounded-lg bg-secondary">
            <img
              src={item.image}
              alt={item.name}
              className="h-full w-full object-cover object-center"
              loading="lazy"
            />
          </div>
          
          <div className="flex flex-1 flex-col justify-center min-w-0">
            <h4 className="font-medium text-foreground line-clamp-1">{item.name}</h4>
            <div className="mt-0.5 flex flex-wrap items-center gap-x-2 text-sm text-muted-foreground">
              {showSku && item.sku && (
                <span className="font-mono text-xs">{item.sku}</span>
              )}
              <span>{item.variant}</span>
              {item.configuration && (
                <span className="text-xs">· {item.configuration}</span>
              )}
            </div>
            <div className="mt-1.5 flex items-center justify-between">
              <span className="font-semibold text-foreground">{formatPrice(item.price)}</span>
              {item.quantity > 1 && (
                <span className="text-sm text-muted-foreground">Qty: {item.quantity}</span>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
