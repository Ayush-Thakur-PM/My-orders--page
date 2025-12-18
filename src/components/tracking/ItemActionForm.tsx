import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { OrderItem, RETURN_REASONS, ReturnReason, isExchangeEligible } from "@/types/order";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RotateCcw, RefreshCw, ArrowLeftRight, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

type ActionType = "return" | "replacement" | "exchange";

interface ItemActionFormProps {
  item: OrderItem;
  shippingCity: string;
  onSubmit: (item: OrderItem, action: ActionType, reason: ReturnReason, notes: string) => void;
  onCancel: () => void;
}

export const ItemActionForm = ({ item, shippingCity, onSubmit, onCancel }: ItemActionFormProps) => {
  const [selectedAction, setSelectedAction] = useState<ActionType | null>(null);
  const [reason, setReason] = useState<ReturnReason | "">("");
  const [notes, setNotes] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const isMetroCity = isExchangeEligible(shippingCity);

  const handleSubmit = () => {
    if (!selectedAction || !reason) return;
    setShowConfirmation(true);
  };

  const handleConfirm = () => {
    if (!selectedAction || !reason) return;
    onSubmit(item, selectedAction, reason as ReturnReason, notes);
  };

  const actionOptions = [
    { value: "return" as ActionType, label: "Return", icon: RotateCcw, description: "Get a full refund" },
    { value: "replacement" as ActionType, label: "Replacement", icon: RefreshCw, description: "Get same product" },
  ];

  if (isMetroCity) {
    actionOptions.push({
      value: "exchange" as ActionType,
      label: "Exchange",
      icon: ArrowLeftRight,
      description: "Simultaneous pickup & delivery"
    });
  }

  if (showConfirmation) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-4 bg-success/10 rounded-xl border border-success/20"
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="h-10 w-10 rounded-full bg-success flex items-center justify-center">
            <Check className="h-5 w-5 text-success-foreground" />
          </div>
          <div>
            <p className="font-semibold text-foreground">Request Submitted!</p>
            <p className="text-sm text-muted-foreground">
              {selectedAction === "return" && "Your return request has been received."}
              {selectedAction === "replacement" && "Your replacement request has been received."}
              {selectedAction === "exchange" && "Your exchange request has been received."}
            </p>
          </div>
        </div>
        <div className="text-sm text-muted-foreground space-y-1 ml-13">
          <p>• Our team will review your request within 24 hours</p>
          <p>• You'll receive a confirmation email with next steps</p>
          {selectedAction === "exchange" && (
            <p>• Pickup and delivery will happen simultaneously</p>
          )}
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleConfirm}
          className="mt-4 w-full"
        >
          Done
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="mt-3 p-4 bg-secondary/50 rounded-xl border border-border/50"
    >
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-medium text-foreground">What would you like to do?</p>
        <button 
          onClick={onCancel}
          className="p-1 hover:bg-secondary rounded-md transition-colors"
        >
          <X className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>

      {/* Action Selection */}
      <div className="grid gap-2 mb-4">
        {actionOptions.map((option) => {
          const Icon = option.icon;
          return (
            <button
              key={option.value}
              onClick={() => setSelectedAction(option.value)}
              className={cn(
                "flex items-center gap-3 p-3 rounded-lg border transition-all text-left",
                selectedAction === option.value
                  ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                  : "border-border hover:border-primary/50 hover:bg-secondary"
              )}
            >
              <div className={cn(
                "h-8 w-8 rounded-lg flex items-center justify-center",
                selectedAction === option.value ? "bg-primary text-primary-foreground" : "bg-secondary"
              )}>
                <Icon className="h-4 w-4" />
              </div>
              <div>
                <p className="font-medium text-sm text-foreground">{option.label}</p>
                <p className="text-xs text-muted-foreground">{option.description}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Reason Dropdown */}
      <div className="space-y-2 mb-4">
        <Label className="text-sm text-foreground">Reason *</Label>
        <Select value={reason} onValueChange={(val) => setReason(val as ReturnReason)}>
          <SelectTrigger className="bg-background">
            <SelectValue placeholder="Select a reason" />
          </SelectTrigger>
          <SelectContent>
            {RETURN_REASONS.map((r) => (
              <SelectItem key={r} value={r}>{r}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Notes */}
      <div className="space-y-2 mb-4">
        <Label className="text-sm text-foreground">Additional Notes (Optional)</Label>
        <Textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Tell us more about the issue..."
          className="resize-none bg-background"
          rows={2}
        />
      </div>

      {/* Submit Button */}
      <Button
        onClick={handleSubmit}
        disabled={!selectedAction || !reason}
        className="w-full"
      >
        Submit Request
      </Button>

      <p className="text-xs text-muted-foreground text-center mt-3">
        We're sorry you had an issue. We'll make it right! 🥺
      </p>
    </motion.div>
  );
};
