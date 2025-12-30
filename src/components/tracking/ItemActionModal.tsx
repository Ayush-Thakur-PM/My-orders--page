import { useState, useRef } from "react";
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
import { RotateCcw, RefreshCw, ArrowLeftRight, CheckCircle2, ImagePlus, X, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

type ActionType = "return" | "replacement" | "exchange";
type ModalStep = "action" | "details" | "confirmation";

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
  const [step, setStep] = useState<ModalStep>("action");
  const [selectedAction, setSelectedAction] = useState<ActionType | null>(null);
  const [reason, setReason] = useState<ReturnReason | "">("");
  const [notes, setNotes] = useState("");
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isMetroCity = isExchangeEligible(shippingCity);
  const requiresImages = selectedAction === "replacement" || selectedAction === "exchange";

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setUploadedImages(prev => [...prev, ...Array.from(files)]);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  const canProceedToDetails = !!selectedAction;
  const canSubmit = reason && (requiresImages ? uploadedImages.length > 0 : true);

  const handleSubmit = () => {
    if (!canSubmit || !selectedAction) return;
    onSubmit(item, selectedAction, reason as ReturnReason, notes);
    setStep("confirmation");
  };

  const handleClose = () => {
    setStep("action");
    setSelectedAction(null);
    setReason("");
    setNotes("");
    setUploadedImages([]);
    onOpenChange(false);
  };

  const handleBack = () => {
    if (step === "details") {
      setStep("action");
      setReason("");
      setNotes("");
      setUploadedImages([]);
    }
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

  // Step 1: Action Selection
  const renderActionStep = () => (
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
          onClick={() => setStep("details")}
          disabled={!canProceedToDetails}
          className="flex-1"
        >
          Continue
        </Button>
      </div>
    </>
  );

  // Step 2: Details (Reason, Images for replacement/exchange, Notes)
  const renderDetailsStep = () => (
    <>
      <DialogHeader className="space-y-2">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleBack}
            className="h-8 w-8"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <DialogTitle>{getActionLabel()} Request</DialogTitle>
        </div>
        <DialogDescription className="text-center">
          Please provide details about your request
        </DialogDescription>
      </DialogHeader>

      {/* Item Preview */}
      <div className="flex gap-3 py-4 px-1 border-b border-border/50">
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

      <div className="py-4 space-y-5">
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

        {/* Image Upload - Only for Replacement/Exchange */}
        {requiresImages && (
          <div className="space-y-2">
            <Label className="text-sm font-medium">Upload Images *</Label>
            <p className="text-xs text-muted-foreground">Please upload photos of the product to help us process your request</p>
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="hidden"
            />
            
            {uploadedImages.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {uploadedImages.map((file, index) => (
                  <div key={index} className="relative h-16 w-16 rounded-lg overflow-hidden bg-secondary">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Upload ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center shadow-sm"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              className="w-full mt-2"
            >
              <ImagePlus className="h-4 w-4 mr-2" />
              {uploadedImages.length > 0 ? "Add More Images" : "Upload Images"}
            </Button>
          </div>
        )}

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
          onClick={handleBack}
          className="flex-1"
        >
          Back
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={!canSubmit}
          className="flex-1"
        >
          Submit Request
        </Button>
      </div>
    </>
  );

  // Step 3: Confirmation
  const renderConfirmation = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="text-center py-6"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
        className="mx-auto w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mb-5"
      >
        <CheckCircle2 className="h-8 w-8 text-success" />
      </motion.div>
      
      <DialogHeader className="space-y-3">
        <DialogTitle className="text-xl">
          Request Registered
        </DialogTitle>
        <DialogDescription className="text-base">
          Your request has been registered. Our team will get back to you.
        </DialogDescription>
      </DialogHeader>

      <div className="mt-6">
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
      </div>

      <Button onClick={handleClose} className="w-full mt-6">
        Done
      </Button>
    </motion.div>
  );

  const renderStep = () => {
    switch (step) {
      case "action":
        return renderActionStep();
      case "details":
        return renderDetailsStep();
      case "confirmation":
        return renderConfirmation();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md max-h-[85vh] overflow-y-auto">
        {renderStep()}
      </DialogContent>
    </Dialog>
  );
};
