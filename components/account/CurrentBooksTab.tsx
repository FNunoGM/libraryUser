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
import { differenceInDays, format, parseISO } from "date-fns";
import { AlertTriangle, AlertCircle, Clock } from "lucide-react";
import { mockBorrowedBooks } from "./mockData";
import { toast } from "react-toastify";

export function CurrentBooksTab() {
  const getReturnStatus = (dueDate: string) => {
    const today = new Date();
    const due = parseISO(dueDate);
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
        {mockBorrowedBooks.length === 0 ? (
          <p className="text-center py-8 text-muted-foreground">
            You don't have any books currently borrowed.
          </p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Branch</TableHead>
                <TableHead>Borrow Date</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockBorrowedBooks.map(book => {
                const status = getReturnStatus(book.dueDate);
                return (
                  <TableRow key={book.id}>
                    <TableCell className="font-medium">{book.title}</TableCell>
                    <TableCell>{book.author}</TableCell>
                    <TableCell>{book.branch}</TableCell>
                    <TableCell>
                      {format(parseISO(book.borrowDate), "MMM d, yyyy")}
                    </TableCell>
                    <TableCell>
                      {format(parseISO(book.dueDate), "MMM d, yyyy")}
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
                        onClick={() =>
                          toast.success(
                            `Return process initiated for "${book.title}"`
                          )
                        }
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
