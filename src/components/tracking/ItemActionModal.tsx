import { useState } from "react";
import { motion } from "framer-motion";
import { OrderItem, RETURN_REASONS, ReturnReason, isExchangeEligible } from "@/types/order";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { RotateCcw, RefreshCw, ArrowLeftRight, CheckCircle2, Calendar, Truck } from "lucide-react";
import { cn } from "@/lib/utils";
import { format, addDays } from "date-fns";

type ActionType = "return" | "replacement" | "exchange";
type ModalStep = "form" | "confirmation";

interface ItemActionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: OrderItem;
  shippingCity: string;
  onSubmit: (item: OrderItem, action: string, reason: ReturnReason, notes: string) => void;
}

export const ItemActionModal = ({ 
  open, 
  onOpenChange, 
  item, 
  shippingCity, 
  onSubmit 
}: ItemActionModalProps) => {
  const [step, setStep] = useState<ModalStep>("form");
  const [selectedAction, setSelectedAction] = useState<ActionType | null>(null);
  const [reason, setReason] = useState<ReturnReason | "">("");
  const [notes, setNotes] = useState("");

  const isMetroCity = isExchangeEligible(shippingCity);
  const expectedDate = format(addDays(new Date(), 4), "EEE, dd MMM yyyy");

  const handleSubmit = () => {
    if (!selectedAction || !reason) return;
    setStep("confirmation");
  };

  const handleConfirm = () => {
    if (!selectedAction || !reason) return;
    onSubmit(item, selectedAction, reason as ReturnReason, notes);
    handleClose();
  };

  const handleClose = () => {
    setStep("form");
    setSelectedAction(null);
    setReason("");
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
      label: "Return for Refund", 
      icon: RotateCcw, 
      description: "Get a full refund to your original payment method",
      show: true,
    },
    { 
      value: "replacement" as ActionType, 
      label: "Replacement", 
      icon: RefreshCw, 
      description: "We'll send you a new item at no extra cost",
      show: !isMetroCity,
    },
    { 
      value: "exchange" as ActionType, 
      label: "Exchange", 
      icon: ArrowLeftRight, 
      description: "Simultaneous pickup & delivery of new item",
      show: isMetroCity,
    },
  ];

  // Form Step
  const renderForm = () => (
    <>
      <DialogHeader className="space-y-2">
        <DialogTitle className="text-center">
          {isMetroCity ? "Return / Exchange" : "Return / Replace"}
        </DialogTitle>
        <DialogDescription className="text-center">
          We're really sorry for this 🥺
        </DialogDescription>
      </DialogHeader>

      {/* Item Preview */}
      <div className="flex gap-3 py-4 px-1 border-b border-border/50">
        <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-secondary">
          <img
            src={item.image}
            alt={item.name}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-foreground text-sm line-clamp-1">{item.name}</h4>
          <p className="text-xs text-muted-foreground">
            {item.sku && <span className="font-mono">{item.sku} · </span>}
            {item.variant}
          </p>
          {item.configuration && (
            <p className="text-xs text-muted-foreground">{item.configuration}</p>
          )}
        </div>
      </div>

      <div className="py-4 space-y-5">
        {/* Action Selection */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">What would you like to do?</Label>
          <RadioGroup
            value={selectedAction || ""}
            onValueChange={(value) => setSelectedAction(value as ActionType)}
            className="space-y-2"
          >
            {actionOptions.filter(opt => opt.show).map((option) => (
              <div
                key={option.value}
                className={cn(
                  "flex items-center space-x-3 rounded-xl border-2 p-3 transition-all cursor-pointer",
                  selectedAction === option.value
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                )}
                onClick={() => setSelectedAction(option.value)}
              >
                <RadioGroupItem value={option.value} id={option.value} />
                <div className="flex items-center gap-3 flex-1">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary">
                    <option.icon className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <Label htmlFor={option.value} className="font-medium cursor-pointer text-sm">
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

        {/* Reason Dropdown */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Reason *</Label>
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
        <div className="space-y-2">
          <Label className="text-sm font-medium">Additional Notes (Optional)</Label>
          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Tell us more about the issue..."
            className="resize-none bg-background"
            rows={2}
          />
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <Button
          variant="outline"
          onClick={handleClose}
          className="flex-1"
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={!selectedAction || !reason}
          className="flex-1"
        >
          Submit Request
        </Button>
      </div>
    </>
  );

  // Confirmation Step
  const renderConfirmation = () => (
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
        {/* Item info */}
        <div className="flex gap-3 p-3 bg-secondary/50 rounded-xl text-left">
          <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-secondary">
            <img
              src={item.image}
              alt={item.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-foreground text-sm line-clamp-1">{item.name}</h4>
            <p className="text-xs text-muted-foreground">{item.variant}</p>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-secondary/50 rounded-xl p-4 text-left space-y-3">
          <h4 className="font-medium text-sm">What happens next?</h4>
          <div className="space-y-2">
            {selectedAction === "return" && (
              <>
                <div className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-medium shrink-0">1</span>
                  <span>Our team will review your request within 24 hours</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-medium shrink-0">2</span>
                  <span>Delivery partner will pick up the item</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-medium shrink-0">3</span>
                  <span>Refund processed within 5-7 business days</span>
                </div>
              </>
            )}
            {selectedAction === "replacement" && (
              <>
                <div className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-medium shrink-0">1</span>
                  <span>Our team will review your request within 24 hours</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-medium shrink-0">2</span>
                  <span>Delivery partner will pick up the old item</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-medium shrink-0">3</span>
                  <span>New item will be shipped once pickup is complete</span>
                </div>
              </>
            )}
            {selectedAction === "exchange" && (
              <>
                <div className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-medium shrink-0">1</span>
                  <span>Our team will review your request within 24 hours</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-medium shrink-0">2</span>
                  <span>Delivery partner will arrive with your new item</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-medium shrink-0">3</span>
                  <span>Hand over the old item during delivery — exchange completed in a single visit!</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Expected Date */}
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
          <span className="font-semibold text-foreground">{expectedDate}</span>
        </div>
      </div>

      <Button onClick={handleConfirm} className="w-full mt-6">
        Done
      </Button>
    </motion.div>
  );

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md max-h-[85vh] overflow-y-auto">
        {step === "confirmation" ? renderConfirmation() : renderForm()}
      </DialogContent>
    </Dialog>
  );
};
