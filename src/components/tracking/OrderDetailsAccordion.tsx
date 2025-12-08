import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Order, Shipment } from "@/types/order";
import { MapPin, CreditCard, Calendar, FileText, RotateCcw } from "lucide-react";

interface OrderDetailsAccordionProps {
  order: Order;
  shipment: Shipment;
}

export const OrderDetailsAccordion = ({ order, shipment }: OrderDetailsAccordionProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Accordion type="multiple" className="space-y-2">
      {/* Shipping Address */}
      <AccordionItem value="shipping" className="rounded-xl border border-border/50 bg-card px-4 shadow-card">
        <AccordionTrigger className="py-4 hover:no-underline">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary">
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </div>
            <span className="font-medium">Shipping Address</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="pb-4">
          <div className="ml-11 space-y-1 text-sm text-muted-foreground">
            <p className="font-medium text-foreground">{shipment.shippingAddress.name}</p>
            <p>{shipment.shippingAddress.line1}</p>
            {shipment.shippingAddress.line2 && <p>{shipment.shippingAddress.line2}</p>}
            <p>
              {shipment.shippingAddress.city}, {shipment.shippingAddress.state} -{" "}
              {shipment.shippingAddress.pincode}
            </p>
            <p className="pt-1">{shipment.shippingAddress.phone}</p>
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* Order Details */}
      <AccordionItem value="order" className="rounded-xl border border-border/50 bg-card px-4 shadow-card">
        <AccordionTrigger className="py-4 hover:no-underline">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary">
              <FileText className="h-4 w-4 text-muted-foreground" />
            </div>
            <span className="font-medium">Order Details</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="pb-4">
          <div className="ml-11 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Order ID</span>
              <span className="font-medium text-foreground">{order.orderNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Order Date</span>
              <span className="text-foreground">{order.orderDate}</span>
            </div>
            {shipment.trackingNumber && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tracking Number</span>
                <span className="font-mono text-foreground">{shipment.trackingNumber}</span>
              </div>
            )}
            {shipment.carrier && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Carrier</span>
                <span className="text-foreground">{shipment.carrier}</span>
              </div>
            )}
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* Payment Details */}
      <AccordionItem value="payment" className="rounded-xl border border-border/50 bg-card px-4 shadow-card">
        <AccordionTrigger className="py-4 hover:no-underline">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary">
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </div>
            <span className="font-medium">Payment Details</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="pb-4">
          <div className="ml-11 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Payment Method</span>
              <span className="text-foreground">{order.payment.method}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status</span>
              <span className="font-medium text-success">{order.payment.status}</span>
            </div>
            <div className="my-2 border-t border-border/50" />
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="text-foreground">{formatPrice(order.payment.subtotal)}</span>
            </div>
            {order.payment.discount && order.payment.discount > 0 && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Discount</span>
                <span className="text-success">-{formatPrice(order.payment.discount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span className="text-foreground">
                {order.payment.shipping === 0 ? "Free" : formatPrice(order.payment.shipping)}
              </span>
            </div>
            <div className="my-2 border-t border-border/50" />
            <div className="flex justify-between">
              <span className="font-medium text-foreground">Total</span>
              <span className="font-semibold text-foreground">{formatPrice(order.payment.total)}</span>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* Installation */}
      {order.installation?.scheduled && (
        <AccordionItem value="installation" className="rounded-xl border border-border/50 bg-card px-4 shadow-card">
          <AccordionTrigger className="py-4 hover:no-underline">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary">
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </div>
              <span className="font-medium">Installation</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pb-4">
            <div className="ml-11 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Scheduled Date</span>
                <span className="font-medium text-foreground">{order.installation.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Time Slot</span>
                <span className="text-foreground">{order.installation.timeSlot}</span>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Our installation team will contact you 30 minutes before arrival.
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
      )}

      {/* Returns & Refunds */}
      <AccordionItem value="returns" className="rounded-xl border border-border/50 bg-card px-4 shadow-card">
        <AccordionTrigger className="py-4 hover:no-underline">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary">
              <RotateCcw className="h-4 w-4 text-muted-foreground" />
            </div>
            <span className="font-medium">Returns & Refunds</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="pb-4">
          <div className="ml-11 space-y-3 text-sm text-muted-foreground">
            <p>
              Enjoy our <span className="font-medium text-foreground">100 Nights Trial</span> on
              mattresses. If you're not satisfied, we'll pick it up for free.
            </p>
            <p>
              For other products, returns are accepted within{" "}
              <span className="font-medium text-foreground">7 days</span> of delivery.
            </p>
            <button className="mt-2 text-sm font-medium text-primary hover:underline">
              Initiate Return →
            </button>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
