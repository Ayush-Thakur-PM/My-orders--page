import { motion } from "framer-motion";
import { OrderItem } from "@/types/order";

interface ProductListProps {
  items: OrderItem[];
}

export const ProductList = ({ items }: ProductListProps) => {
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
          <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-secondary">
            <img
              src={item.image}
              alt={item.name}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          
          <div className="flex flex-1 flex-col justify-center">
            <h4 className="font-medium text-foreground line-clamp-1">{item.name}</h4>
            <p className="mt-0.5 text-sm text-muted-foreground">{item.variant}</p>
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
