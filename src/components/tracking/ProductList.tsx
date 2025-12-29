import { OrderItem, ReturnReason } from "@/types/order";
import { ItemCard } from "./ItemCard";

interface ProductListProps {
  items: OrderItem[];
  showSku?: boolean;
  isDelivered?: boolean;
  shippingCity?: string;
  onActionSubmit?: (item: OrderItem, action: string, reason: ReturnReason, notes: string) => void;
  highlightedItemId?: string;
}

export const ProductList = ({ 
  items, 
  showSku = true, 
  isDelivered = false,
  shippingCity = "",
  onActionSubmit,
  highlightedItemId 
}: ProductListProps) => {
  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <ItemCard
          key={item.id}
          item={item}
          index={index}
          isDelivered={isDelivered}
          shippingCity={shippingCity}
          onActionSubmit={onActionSubmit}
          isHighlighted={item.id === highlightedItemId}
        />
      ))}
    </div>
  );
};
