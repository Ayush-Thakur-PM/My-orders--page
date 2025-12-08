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
import { useState } from "react";
import { RotateCcw, RefreshCw } from "lucide-react";

interface ReturnsReplacementModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ReturnsReplacementModal = ({
  open,
  onOpenChange,
}: ReturnsReplacementModalProps) => {
  const [selectedOption, setSelectedOption] = useState<"return" | "replacement" | null>(null);

  const handleContinue = () => {
    if (selectedOption) {
      // Handle the flow continuation
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Returns & Replacements</DialogTitle>
          <DialogDescription className="text-center pt-2">
            We're really sorry for this 🥺
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <p className="text-sm text-muted-foreground text-center mb-6">
            Please let us know how we can help make things right.
          </p>

          <RadioGroup
            value={selectedOption || ""}
            onValueChange={(value) => setSelectedOption(value as "return" | "replacement")}
            className="space-y-3"
          >
            <div
              className={`flex items-center space-x-3 rounded-xl border-2 p-4 transition-all cursor-pointer ${
                selectedOption === "return"
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50"
              }`}
              onClick={() => setSelectedOption("return")}
            >
              <RadioGroupItem value="return" id="return" />
              <div className="flex items-center gap-3 flex-1">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                  <RotateCcw className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <Label htmlFor="return" className="font-medium cursor-pointer">
                    Return for Refund
                  </Label>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Get a full refund to your original payment method
                  </p>
                </div>
              </div>
            </div>

            <div
              className={`flex items-center space-x-3 rounded-xl border-2 p-4 transition-all cursor-pointer ${
                selectedOption === "replacement"
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50"
              }`}
              onClick={() => setSelectedOption("replacement")}
            >
              <RadioGroupItem value="replacement" id="replacement" />
              <div className="flex items-center gap-3 flex-1">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                  <RefreshCw className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <Label htmlFor="replacement" className="font-medium cursor-pointer">
                    Replace Item
                  </Label>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    We'll send you a new item at no extra cost
                  </p>
                </div>
              </div>
            </div>
          </RadioGroup>
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            onClick={handleContinue}
            disabled={!selectedOption}
            className="flex-1"
          >
            Continue
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
