import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { differenceInDays } from "date-fns";
import { format, parseISO } from "date-fns";
import { AlertTriangle, AlertCircle, Clock } from "lucide-react";
import { toast } from "react-toastify";
import { UserOrder } from "@/lib/types";
import { returnBook } from "@/lib/api";

interface CurrentBooksTabProps {
  orders: UserOrder[];
  setOrders: React.Dispatch<React.SetStateAction<UserOrder[]>>; // Add this prop to update state
}

export function CurrentBooksTab({ orders, setOrders }: CurrentBooksTabProps) {
  const getReturnStatus = (dueDate: string) => {
    const today = new Date();
    const due = parseISO(dueDate);
    // const due = new Date(today);
    // due.setDate(due.getDate() + 15);
    const daysLeft = differenceInDays(due, today);

    if (daysLeft < 0) {
      return {
        status: "LATE",
        color: "destructive",
        icon: <AlertTriangle className="h-4 w-4 mr-1" />,
      };
    } else if (daysLeft <= 3) {
      return {
        status: "URGENT RETURN",
        color: "warning",
        icon: <AlertCircle className="h-4 w-4 mr-1" />,
      };
    } else if (daysLeft <= 5) {
      return {
        status: "RETURN SOON",
        color: "secondary",
        icon: <Clock className="h-4 w-4 mr-1" />,
      };
    } else {
      return { status: `${daysLeft} days left`, color: "default", icon: null };
    }
  };

  const handleReturnBook = async (orderId: number) => {
    try {
      const response = await returnBook(orderId); // Pass only the orderId

      if (response?.data?.success === false) {
        toast.error(response?.data?.message || `Failed to return book.`);
      } else {
        // Remove the returned book from the orders state
        setOrders(prevOrders =>
          prevOrders.filter(order => order.orderId !== orderId)
        );

        // You could also store this in the localStorage or update the backend if necessary
        toast.success(response?.data?.message || `Book returned successfully.`);
      }
    } catch (error) {
      toast.error(`Error returning book: ${error}`);
    }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Currently Borrowed Books</CardTitle>
        <CardDescription>
          The maximum return period for each book is fifteen days. Please check
          the status of your books.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {orders.length === 0 ? (
          <p className="text-center py-8 text-muted-foreground">
            You don't have any books currently borrowed.
          </p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Library</TableHead>
                <TableHead>Borrow Date</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => {
                const returnDate = new Date(order.orderDate);
                returnDate.setDate(returnDate.getDate() + 15);
                const status = getReturnStatus(
                  format(returnDate.toString(), "yyyy-MM-dd")
                );
                return (
                  <TableRow key={order.orderId}>
                    <TableCell className="font-medium">{order.title}</TableCell>
                    <TableCell>{order.authorName}</TableCell>
                    <TableCell>{order.libraryName}</TableCell>
                    <TableCell>
                      {format(order.orderDate, "yyyy-MM-dd")}
                    </TableCell>
                    <TableCell>
                      {/* {format(order.orderDate, "yyyy-MM-dd")} */}
                      {format(returnDate.toString(), "yyyy-MM-dd")}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={status.color as any}
                        className="flex items-center w-fit"
                      >
                        {status.icon}
                        {status.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleReturnBook(order.orderId)}
                      >
                        Return
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
