import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertTriangle } from "lucide-react";
import { mockBorrowedBooks } from "./mockData";
import { useState } from "react";
import { toast } from "react-toastify";

export function SubscriptionTab() {
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [returnConfirmed, setReturnConfirmed] = useState(false);

  const handleCancelSubscription = () => {
    if (mockBorrowedBooks.length > 0 && !returnConfirmed) {
      toast.error(
        "You must return all borrowed books before canceling your subscription"
      );
      return;
    }

    toast.success("Your subscription has been canceled");
    setShowCancelDialog(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Subscription Management</CardTitle>
        <CardDescription>
          Manage your library subscription and account settings.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="subscription-type" className="text-right">
              Subscription Type
            </Label>
            <div className="col-span-3">
              <Input
                id="subscription-type"
                value="Premium Membership"
                readOnly
              />
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="renewal-date" className="text-right">
              Next Renewal Date
            </Label>
            <div className="col-span-3">
              <Input id="renewal-date" value="March 15, 2025" readOnly />
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="max-books" className="text-right">
              Max Books Allowed
            </Label>
            <div className="col-span-3">
              <Input id="max-books" value="10" readOnly />
            </div>
          </div>
        </div>

        <div className="border rounded-lg p-4 bg-muted/50">
          <h3 className="font-medium mb-2">Cancel Subscription</h3>
          <p className="text-sm text-muted-foreground mb-4">
            You can cancel your subscription at any time. However, you must
            return all borrowed books before canceling.
          </p>

          <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
            <DialogTrigger asChild>
              <Button variant="destructive">Cancel Subscription</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Cancel Your Subscription</DialogTitle>
                <DialogDescription>
                  Are you sure you want to cancel your library subscription?
                  This action cannot be undone.
                </DialogDescription>
              </DialogHeader>

              {mockBorrowedBooks.length > 0 && (
                <div className="border rounded-md p-4 bg-destructive/10 my-4 background-color:#fff">
                  <h4 className="font-medium flex items-center text-destructive">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    You have {mockBorrowedBooks.length} books still borrowed
                  </h4>
                  <p className="text-sm mt-2">
                    You must return all borrowed books before canceling your
                    subscription.
                  </p>
                  <div className="flex items-center space-x-2 mt-4">
                    <Checkbox
                      id="confirm-return"
                      checked={returnConfirmed}
                      onCheckedChange={checked =>
                        setReturnConfirmed(checked as boolean)
                      }
                    />
                    <label
                      htmlFor="confirm-return"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      I confirm that I will return all borrowed books
                      immediately
                    </label>
                  </div>
                </div>
              )}

              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setShowCancelDialog(false)}
                >
                  Keep Subscription
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleCancelSubscription}
                >
                  Cancel Subscription
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
}
