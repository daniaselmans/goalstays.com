import { useState } from 'react';
import { Bell } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { usePriceAlerts, AlertSearchType } from '@/hooks/usePriceAlerts';
import { useAuth } from '@/hooks/useAuth';

interface PriceAlertDialogProps {
  searchType: AlertSearchType;
  searchParams: Record<string, unknown>;
  currentPrice: number;
  itemName: string;
  trigger?: React.ReactNode;
}

const PriceAlertDialog = ({
  searchType,
  searchParams,
  currentPrice,
  itemName,
  trigger,
}: PriceAlertDialogProps) => {
  const { user } = useAuth();
  const { createAlert } = usePriceAlerts();
  const [open, setOpen] = useState(false);
  const [targetPrice, setTargetPrice] = useState(Math.floor(currentPrice * 0.9));
  const [isSubmitting, setIsSubmitting] = useState(false);

  const minPrice = Math.floor(currentPrice * 0.5);
  const maxPrice = Math.floor(currentPrice * 0.95);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const success = await createAlert(
      searchType,
      searchParams,
      targetPrice,
      currentPrice,
      itemName
    );
    setIsSubmitting(false);
    if (success) {
      setOpen(false);
    }
  };

  const savings = currentPrice - targetPrice;
  const savingsPercent = Math.round((savings / currentPrice) * 100);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm" className="gap-2">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Price Alert</span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            Set Price Alert
          </DialogTitle>
          <DialogDescription>
            We'll notify you when the price drops to your target.
          </DialogDescription>
        </DialogHeader>

        {!user ? (
          <div className="py-6 text-center">
            <p className="text-muted-foreground mb-4">
              Please sign in to set price alerts.
            </p>
            <Button onClick={() => setOpen(false)}>Close</Button>
          </div>
        ) : (
          <>
            <div className="space-y-6 py-4">
              <div>
                <p className="text-sm font-medium mb-1">{itemName}</p>
                <p className="text-2xl font-bold text-foreground">
                  Current: ${currentPrice.toFixed(0)}
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="target-price">Alert me when price drops to:</Label>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-primary">
                      ${targetPrice}
                    </span>
                  </div>
                </div>

                <Slider
                  id="target-price"
                  value={[targetPrice]}
                  onValueChange={(value) => setTargetPrice(value[0])}
                  min={minPrice}
                  max={maxPrice}
                  step={5}
                  className="w-full"
                />

                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>${minPrice} (50% off)</span>
                  <span>${maxPrice} (5% off)</span>
                </div>
              </div>

              <div className="bg-primary/10 rounded-lg p-4">
                <p className="text-sm text-primary font-medium">
                  You'll save ${savings.toFixed(0)} ({savingsPercent}% off)
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  We check prices regularly and will notify you when this deal is available.
                </p>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? 'Setting alert...' : 'Set Alert'}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PriceAlertDialog;
