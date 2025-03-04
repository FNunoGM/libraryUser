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
import { AlertTriangle, LogOut } from "lucide-react";
import { mockBorrowedBooks } from "./mockData";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { userAgent } from "next/server";
import { User, UserOrder } from "@/lib/types";
import { deleteUser, getUserOrders } from "@/lib/api";
import { parse } from "path";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { AuthProvider, useAuth } from "../auth-context";

interface SubscriptionTabProps {
  orders: UserOrder[];
}

export function SubscriptionTab() {
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [returnConfirmed, setReturnConfirmed] = useState(false);
  const [orders, setOrders] = useState<UserOrder[]>([]);
  const router = useRouter();
  const { logout } = useAuth();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (!user || !user.userId) return;

    const loadOrders = async () => {
      try {
        const data = await getUserOrders(user.userId);
        setOrders(data);
      } catch (error) {
        toast.error("Failed to load books.");
      }
    };

    loadOrders();
    return () => {
      setOrders([]);
    };
  }, []);

  console.log(orders);
  const handleCancelSubscription = () => {
    if (orders.length > 0 && !returnConfirmed) {
      toast.error(
        "You must return all borrowed books before canceling your subscription"
      );
      return;
    }
    const user = localStorage.getItem("user");
    if (user != null) {
      const parsedUser = JSON.parse(user);
      deleteUser(parsedUser.userId);
    }
    console.log(orders);
    toast.success("Your subscription has been canceled");
    logout();
    localStorage.clear();
    router.push("/");
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

              {orders.length > 0 && (
                <div className="border rounded-md p-4 bg-destructive/10 my-4 background-color:#fff">
                  <h4 className="font-medium flex items-center text-destructive">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    You have {orders.length} books still borrowed
                  </h4>
                  <p className="text-sm mt-2">
                    You must return all borrowed books before canceling your
                    subscription.
                  </p>
                  <div className="flex items-center space-x-2 mt-4">
                    <Checkbox
                      id="confirm-return"
                      checked={returnConfirmed}
                      onCheckedChange={(checked) =>
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
