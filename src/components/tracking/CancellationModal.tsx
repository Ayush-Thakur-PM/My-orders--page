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
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { ChevronLeft, AlertTriangle } from "lucide-react";

interface CancellationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  paymentMethod: string;
}

type Step = "reason" | "notes" | "bank";

const cancellationReasons = [
  "Changed my mind",
  "Found a better price elsewhere",
  "Ordered by mistake",
  "Delivery is taking too long",
  "Product no longer needed",
  "Other",
];

export const CancellationModal = ({
  open,
  onOpenChange,
  paymentMethod,
}: CancellationModalProps) => {
  const [step, setStep] = useState<Step>("reason");
  const [selectedReason, setSelectedReason] = useState<string>("");
  const [notes, setNotes] = useState("");
  const [bankDetails, setBankDetails] = useState({
    accountNumber: "",
    ifsc: "",
    accountHolder: "",
  });

  // COD orders need bank details for refund
  const needsBankDetails = paymentMethod.toLowerCase().includes("cod") || 
                           paymentMethod.toLowerCase().includes("cash");

  const handleNext = () => {
    if (step === "reason" && selectedReason) {
      setStep("notes");
    } else if (step === "notes") {
      if (needsBankDetails) {
        setStep("bank");
      } else {
        handleSubmit();
      }
    } else if (step === "bank") {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (step === "notes") {
      setStep("reason");
    } else if (step === "bank") {
      setStep("notes");
    }
  };

  const handleSubmit = () => {
    // Handle cancellation submission
    onOpenChange(false);
    // Reset state
    setStep("reason");
    setSelectedReason("");
    setNotes("");
    setBankDetails({ accountNumber: "", ifsc: "", accountHolder: "" });
  };

  const handleClose = () => {
    onOpenChange(false);
    setStep("reason");
    setSelectedReason("");
    setNotes("");
    setBankDetails({ accountNumber: "", ifsc: "", accountHolder: "" });
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2">
            {step !== "reason" && (
              <button
                onClick={handleBack}
                className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-secondary transition-colors"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
            )}
            <DialogTitle>Cancel Order</DialogTitle>
          </div>
          <DialogDescription className="flex items-center gap-2 pt-2">
            <AlertTriangle className="h-4 w-4 text-warning" />
            This action cannot be undone
          </DialogDescription>
        </DialogHeader>

        {step === "reason" && (
          <div className="py-4">
            <p className="text-sm text-muted-foreground mb-4">
              Please help us understand why you'd like to cancel:
            </p>
            <RadioGroup
              value={selectedReason}
              onValueChange={setSelectedReason}
              className="space-y-2"
            >
              {cancellationReasons.map((reason) => (
                <div
                  key={reason}
                  className={`flex items-center space-x-3 rounded-lg border p-3 transition-all cursor-pointer ${
                    selectedReason === reason
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                  onClick={() => setSelectedReason(reason)}
                >
                  <RadioGroupItem value={reason} id={reason} />
                  <Label htmlFor={reason} className="cursor-pointer flex-1 text-sm">
                    {reason}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        )}

        {step === "notes" && (
          <div className="py-4">
            <p className="text-sm text-muted-foreground mb-4">
              Any additional details you'd like to share? (Optional)
            </p>
            <Textarea
              placeholder="Tell us more about why you're cancelling..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[120px] resize-none"
            />
          </div>
        )}

        {step === "bank" && (
          <div className="py-4">
            <p className="text-sm text-muted-foreground mb-4">
              Please provide your bank details for the refund:
            </p>
            <div className="space-y-4">
              <div>
                <Label htmlFor="accountHolder" className="text-sm">
                  Account Holder Name
                </Label>
                <Input
                  id="accountHolder"
                  placeholder="Enter account holder name"
                  value={bankDetails.accountHolder}
                  onChange={(e) =>
                    setBankDetails({ ...bankDetails, accountHolder: e.target.value })
                  }
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="accountNumber" className="text-sm">
                  Account Number
                </Label>
                <Input
                  id="accountNumber"
                  placeholder="Enter account number"
                  value={bankDetails.accountNumber}
                  onChange={(e) =>
                    setBankDetails({ ...bankDetails, accountNumber: e.target.value })
                  }
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="ifsc" className="text-sm">
                  IFSC Code
                </Label>
                <Input
                  id="ifsc"
                  placeholder="Enter IFSC code"
                  value={bankDetails.ifsc}
                  onChange={(e) =>
                    setBankDetails({ ...bankDetails, ifsc: e.target.value })
                  }
                  className="mt-1.5"
                />
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-3 pt-2">
          <Button variant="outline" onClick={handleClose} className="flex-1">
            Keep Order
          </Button>
          <Button
            variant="destructive"
            onClick={handleNext}
            disabled={
              (step === "reason" && !selectedReason) ||
              (step === "bank" &&
                (!bankDetails.accountNumber ||
                  !bankDetails.ifsc ||
                  !bankDetails.accountHolder))
            }
            className="flex-1"
          >
            {step === "bank" || (step === "notes" && !needsBankDetails)
              ? "Confirm Cancellation"
              : "Continue"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
