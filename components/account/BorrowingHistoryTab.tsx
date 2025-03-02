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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format, parseISO } from "date-fns";
import { LibraryByNumberOfCopies, ReturnedUserOrder } from "@/lib/types";
import { useEffect, useState } from "react";
import {
  getReturnedOrdersByUserId,
  getLibrariesByNumberOfCopies,
} from "@/lib/api"; // Add getLibraries
import { toast } from "react-toastify";

export function BorrowingHistoryTab() {
  const [selectedLibrary, setSelectedLibrary] = useState<string>("all");
  const [allOrdersHistory, setAllOrdersHistory] = useState<ReturnedUserOrder[]>(
    []
  ); // Store all orders
  const [filteredOrders, setFilteredOrders] = useState<ReturnedUserOrder[]>([]); // Store filtered orders
  const [libraries, setLibraries] = useState<LibraryByNumberOfCopies[]>([]); // Store libraries
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });

  // Fetch orders history and libraries
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (!user || !user.userId) return;

    const loadData = async () => {
      try {
        // Fetch returned orders
        const ordersData = await getReturnedOrdersByUserId(user.userId);
        setAllOrdersHistory(ordersData); // Store all orders
        setFilteredOrders(ordersData); // Initialize filtered orders with all orders

        // Fetch libraries
        const bookId = 1; // Replace with the appropriate bookId
        const librariesData = await getLibrariesByNumberOfCopies(bookId);
        setLibraries(librariesData);
      } catch (error) {
        toast.error("Failed to load data.");
      }
    };

    loadData();
    return () => {
      setAllOrdersHistory([]);
      setFilteredOrders([]);
      setLibraries([]);
    };
  }, []);

  // Apply filters whenever selectedLibrary or dateRange changes
  useEffect(() => {
    const filtered = allOrdersHistory.filter(order => {
      const matchesLibrary =
        selectedLibrary === "all" || order.libraryName === selectedLibrary;
      const orderDate = new Date(order.orderDate);
      const matchesDateFrom = !dateRange.from || orderDate >= dateRange.from;
      const matchesDateTo = !dateRange.to || orderDate <= dateRange.to;
      return matchesLibrary && matchesDateFrom && matchesDateTo;
    });

    setFilteredOrders(filtered); // Update filtered orders
  }, [selectedLibrary, dateRange, allOrdersHistory]);

  // Clear filters
  const clearFilters = () => {
    setSelectedLibrary("all");
    setDateRange({ from: undefined, to: undefined });
    setFilteredOrders(allOrdersHistory); // Reset filtered orders to all orders
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Borrowing History</CardTitle>
        <CardDescription>
          View all books you have borrowed in the past.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 bg-white">
            <Label htmlFor="branch-filter">Filter by Library</Label>
            <Select value={selectedLibrary} onValueChange={setSelectedLibrary}>
              <SelectTrigger id="branch-filter">
                <SelectValue placeholder="Select Library" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Libraries</SelectItem>
                {libraries.map(library => (
                  <SelectItem
                    key={library.libraryId}
                    value={library.libraryName} // Use libraryName as the value
                  >
                    {library.libraryName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1">
            <Label>Filter by Date Range</Label>
            <div className="grid gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    variant={"outline"}
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange.from ? (
                      dateRange.to ? (
                        <>
                          {format(dateRange.from, "LLL dd, y")} -{" "}
                          {format(dateRange.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(dateRange.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Pick a date range</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="range"
                    defaultMonth={dateRange.from}
                    selected={{
                      from: dateRange.from,
                      to: dateRange.to,
                    }}
                    onSelect={range => {
                      setDateRange({
                        from: range?.from,
                        to: range?.to,
                      });
                    }}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="flex items-end">
            <Button variant="outline" onClick={clearFilters}>
              Clear Filters
            </Button>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Library</TableHead>
              <TableHead>Requested Copies</TableHead>
              <TableHead>Borrow Date</TableHead>
              <TableHead>Return Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map(order => (
              <TableRow key={`history-${order.orderId}`}>
                <TableCell className="font-medium">{order.title}</TableCell>
                <TableCell>{order.authorName}</TableCell>
                <TableCell>{order.libraryName}</TableCell>
                <TableCell>{order.requestedCopiesQTY}</TableCell>
                <TableCell>
                  {format(parseISO(order.orderDate.toString()), "MMM d, yyyy")}
                </TableCell>
                <TableCell>
                  {order.returnDate
                    ? format(
                        parseISO(order.returnDate.toString()),
                        "MMM d, yyyy"
                      )
                    : "Not returned yet"}
                </TableCell>
                <TableCell>
                  {order.returnDate ? (
                    <Badge variant="outline">Returned</Badge>
                  ) : (
                    <Badge>Active</Badge>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {filteredOrders.length === 0 && (
          <p className="text-center py-8 text-muted-foreground">
            No borrowing history found with the selected filters.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
