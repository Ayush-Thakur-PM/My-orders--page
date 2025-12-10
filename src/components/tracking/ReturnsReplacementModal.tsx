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
import { RotateCcw, RefreshCw, ArrowLeftRight } from "lucide-react";
import { OrderItem, isExchangeEligible } from "@/types/order";

interface ReturnsReplacementModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items?: OrderItem[];
  shippingCity?: string;
}

type ActionType = "return" | "replacement" | "exchange";

export const ReturnsReplacementModal = ({
  open,
  onOpenChange,
  items = [],
  shippingCity = "",
}: ReturnsReplacementModalProps) => {
  const [selectedAction, setSelectedAction] = useState<ActionType | null>(null);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [notes, setNotes] = useState("");

  const isExchangeCity = isExchangeEligible(shippingCity);

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

  const handleContinue = () => {
    if (selectedAction && selectedItems.length > 0) {
      // Handle the flow continuation
      console.log("Action:", selectedAction, "Items:", selectedItems, "Notes:", notes);
      onOpenChange(false);
    }
  };

  const handleClose = () => {
    setSelectedAction(null);
    setSelectedItems([]);
    setNotes("");
    onOpenChange(false);
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

  return (
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
            onClick={handleContinue}
            disabled={!selectedAction || selectedItems.length === 0}
            className="flex-1"
          >
            Continue
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
