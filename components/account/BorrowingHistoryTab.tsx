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
import { mockBorrowingHistory, branches } from "./mockData";
import { useState } from "react";

export function BorrowingHistoryTab() {
  const [selectedBranch, setSelectedBranch] = useState<string>("all");
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });

  const filteredHistory = mockBorrowingHistory.filter(book => {
    const matchesBranch =
      selectedBranch === "all" || book.branch === selectedBranch;
    const borrowDate = parseISO(book.borrowDate);
    const matchesDateFrom = !dateRange.from || borrowDate >= dateRange.from;
    const matchesDateTo = !dateRange.to || borrowDate <= dateRange.to;
    return matchesBranch && matchesDateFrom && matchesDateTo;
  });

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
            <Label htmlFor="branch-filter">Filter by Branch</Label>
            <Select value={selectedBranch} onValueChange={setSelectedBranch}>
              <SelectTrigger id="branch-filter">
                <SelectValue placeholder="Select branch" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Branches</SelectItem>
                {branches.map(branch => (
                  <SelectItem key={branch} value={branch}>
                    {branch}
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
            <Button
              variant="outline"
              onClick={() => {
                setSelectedBranch("all");
                setDateRange({ from: undefined, to: undefined });
              }}
            >
              Clear Filters
            </Button>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Branch</TableHead>
              <TableHead>Borrow Date</TableHead>
              <TableHead>Return Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredHistory.map(book => (
              <TableRow key={`history-${book.id}-${book.borrowDate}`}>
                <TableCell className="font-medium">{book.title}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>{book.branch}</TableCell>
                <TableCell>
                  {format(parseISO(book.borrowDate), "MMM d, yyyy")}
                </TableCell>
                <TableCell>
                  {book.returnDate
                    ? format(parseISO(book.returnDate), "MMM d, yyyy")
                    : "Not returned yet"}
                </TableCell>
                <TableCell>
                  {book.returnDate ? (
                    <Badge variant="outline">Returned</Badge>
                  ) : (
                    <Badge>Active</Badge>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {filteredHistory.length === 0 && (
          <p className="text-center py-8 text-muted-foreground">
            No borrowing history found with the selected filters.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
