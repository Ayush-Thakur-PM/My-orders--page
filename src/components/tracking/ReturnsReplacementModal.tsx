import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { RotateCcw, RefreshCw, ArrowLeftRight, CheckCircle2, Calendar, Truck } from "lucide-react";
import { OrderItem, isExchangeEligible } from "@/types/order";
import { motion } from "framer-motion";
import { format, addDays } from "date-fns";

interface ReturnsReplacementModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items?: OrderItem[];
  shippingCity?: string;
}

type ActionType = "return" | "replacement" | "exchange";
type ModalStep = "form" | "confirmation";

export const ReturnsReplacementModal = ({
  open,
  onOpenChange,
  items = [],
  shippingCity = "",
}: ReturnsReplacementModalProps) => {
  const [step, setStep] = useState<ModalStep>("form");
  const [selectedAction, setSelectedAction] = useState<ActionType | null>(null);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [notes, setNotes] = useState("");

  const isExchangeCity = isExchangeEligible(shippingCity);
  
  // Generate expected pickup date (3-5 business days from now)
  const expectedPickupDate = format(addDays(new Date(), 4), "EEE, dd MMM yyyy");

  const handleItemToggle = (itemId: string) => {
    setSelectedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleSelectAll = () => {
    if (selectedItems.length === items.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(items.map(item => item.id));
    }
  };

  const handleSubmit = () => {
    if (selectedAction && selectedItems.length > 0) {
      // Submit the request and show confirmation
      console.log("Submitted:", selectedAction, "Items:", selectedItems, "Notes:", notes);
      setStep("confirmation");
    }
  };

  const handleClose = () => {
    setStep("form");
    setSelectedAction(null);
    setSelectedItems([]);
    setNotes("");
    onOpenChange(false);
  };

  const getActionLabel = () => {
    switch (selectedAction) {
      case "return": return "Return";
      case "replacement": return "Replacement";
      case "exchange": return "Exchange";
      default: return "Request";
    }
  };

  const actionOptions = [
    {
      value: "return" as ActionType,
      icon: RotateCcw,
      label: "Return for Refund",
      description: "Get a full refund to your original payment method",
      show: true,
    },
    {
      value: "replacement" as ActionType,
      icon: RefreshCw,
      label: "Replace Item",
      description: "We'll send you a new item at no extra cost",
      show: !isExchangeCity,
    },
    {
      value: "exchange" as ActionType,
      icon: ArrowLeftRight,
      label: "Exchange",
      description: "We'll deliver the replacement & pick up old item together",
      show: isExchangeCity,
    },
  ];

  // Form Step
  const renderForm = () => (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center">
            {isExchangeCity ? "Returns & Exchanges" : "Returns & Replacements"}
          </DialogTitle>
          <DialogDescription className="text-center pt-2">
            We're really sorry for this 🥺
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-6">
          <p className="text-sm text-muted-foreground text-center">
            Please let us know how we can help make things right.
          </p>

          {/* Action Selection */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">What would you like to do?</Label>
            <RadioGroup
              value={selectedAction || ""}
              onValueChange={(value) => setSelectedAction(value as ActionType)}
              className="space-y-3"
            >
              {actionOptions.filter(opt => opt.show).map((option) => (
                <div
                  key={option.value}
                  className={`flex items-center space-x-3 rounded-xl border-2 p-4 transition-all cursor-pointer ${
                    selectedAction === option.value
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                  onClick={() => setSelectedAction(option.value)}
                >
                  <RadioGroupItem value={option.value} id={option.value} />
                  <div className="flex items-center gap-3 flex-1">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                      <option.icon className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <Label htmlFor={option.value} className="font-medium cursor-pointer">
                        {option.label}
                      </Label>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {option.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Item Selection */}
          {selectedAction && items.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Select items</Label>
                <button
                  type="button"
                  onClick={handleSelectAll}
                  className="text-sm text-primary hover:underline"
                >
                  {selectedItems.length === items.length ? "Deselect all" : "Select all"}
                </button>
              </div>
              <div className="space-y-2">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className={`flex items-center gap-3 rounded-xl border-2 p-3 transition-all cursor-pointer ${
                      selectedItems.includes(item.id)
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                    onClick={() => handleItemToggle(item.id)}
                  >
                    <Checkbox
                      checked={selectedItems.includes(item.id)}
                      onCheckedChange={() => handleItemToggle(item.id)}
                    />
                    <div className="h-[72px] w-[72px] flex-shrink-0 overflow-hidden rounded-lg bg-secondary">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm line-clamp-1">{item.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {item.sku && <span className="font-mono">{item.sku} · </span>}
                        {item.variant}
                        {item.configuration && ` · ${item.configuration}`}
                      </p>
                      {item.quantity > 1 && (
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Qty: {item.quantity}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        {/* Notes */}
          {selectedAction && selectedItems.length > 0 && (
            <div className="space-y-2">
              <Label htmlFor="notes" className="text-sm font-medium">
                Reason or comments (optional)
              </Label>
              <Textarea
                id="notes"
                placeholder="Tell us what went wrong..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="resize-none"
                rows={3}
              />
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={handleClose}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!selectedAction || selectedItems.length === 0}
            className="flex-1"
          >
            Submit Request
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  // Confirmation Step
  const renderConfirmation = () => (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="text-center py-4"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
            className="mx-auto w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mb-4"
          >
            <CheckCircle2 className="h-8 w-8 text-success" />
          </motion.div>
          
          <DialogHeader className="space-y-2">
            <DialogTitle className="text-xl">
              {getActionLabel()} Request Submitted
            </DialogTitle>
            <DialogDescription>
              We've received your request and will process it shortly.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-6 space-y-4">
            {/* Next Steps */}
            <div className="bg-secondary/50 rounded-xl p-4 text-left space-y-3">
              <h4 className="font-medium text-sm">What happens next?</h4>
              <div className="space-y-2">
                {selectedAction === "return" && (
                  <>
                    <div className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-medium">1</span>
                      <span>Our delivery partner will pick up the item(s)</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-medium">2</span>
                      <span>Quality check upon receiving the item</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-medium">3</span>
                      <span>Refund processed within 5-7 business days</span>
                    </div>
                  </>
                )}
                {selectedAction === "replacement" && (
                  <>
                    <div className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-medium">1</span>
                      <span>Our delivery partner will pick up the item(s)</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-medium">2</span>
                      <span>New item will be shipped once pickup is complete</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-medium">3</span>
                      <span>Track your replacement in My Orders</span>
                    </div>
                  </>
                )}
                {selectedAction === "exchange" && (
                  <>
                    <div className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-medium">1</span>
                      <span>Delivery partner will arrive with your new item</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-medium">2</span>
                      <span>Hand over the old item during delivery</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-medium">3</span>
                      <span>Exchange completed in a single visit!</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Expected Pickup Date */}
            <div className="flex items-center justify-center gap-3 py-3 px-4 bg-primary/5 rounded-xl">
              <div className="flex items-center gap-2">
                {selectedAction === "exchange" ? (
                  <Truck className="h-5 w-5 text-primary" />
                ) : (
                  <Calendar className="h-5 w-5 text-primary" />
                )}
                <span className="text-sm text-muted-foreground">
                  {selectedAction === "exchange" ? "Expected exchange" : "Expected pickup"}
                </span>
              </div>
              <span className="font-semibold text-foreground">{expectedPickupDate}</span>
            </div>
          </div>

          <Button onClick={handleClose} className="w-full mt-6">
            Back to My Orders
          </Button>
        </motion.div>
      </DialogContent>
    </Dialog>
  );

  return step === "confirmation" ? renderConfirmation() : renderForm();
};
