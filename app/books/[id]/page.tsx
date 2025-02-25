"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BookOpen, User, Calendar, BarChart } from "lucide-react";
import { BookCover } from "@/components/book-cover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RequestBookDto } from "@/lib/types";
import { books } from "@/lib/books";

export default function BookPage() {
  const { id } = useParams();
  const book = books.find(b => b.id === id);
  const [isAvailable, setIsAvailable] = useState(book?.available);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedLibrary, setSelectedLibrary] = useState("");
  const router = useRouter();

  // Mock data for libraries
  const libraries = [
    { id: "1", name: "Main Library" },
    { id: "2", name: "Downtown Library" },
    { id: "3", name: "Westside Library" },
    { id: "4", name: "Eastside Library" },
    { id: "5", name: "Northside Library" },
  ];

  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);
  }, []);

  if (!book) {
    return <div className="container py-8">Book not found</div>;
  }

  const handleIncrement = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecrement = () => {
    setQuantity(prev => Math.max(prev - 1, 1));
  };

  const handleRequest = async () => {
    if (!isLoggedIn) {
      toast.error("Please log in to request books");
      router.push("/login");
      return;
    }

    if (!selectedLibrary) {
      toast.error("Please select a library");
      return;
    }

    // Prepare the request payload
    const request: RequestBookDto = {
      userId: parseInt(localStorage.getItem("userId") || ""),
      bookId: parseInt(book.id), // Convert book ID to number
      libraryId: parseInt(selectedLibrary), // Convert library ID to number
      numberOfCopies: quantity,
    };

    try {
      // Call the backend API
      const response = await fetch("/api/requestbook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error("Failed to request book.");
      }

      const data = await response.json();
      toast.success(data.message || "Book requested successfully.");
    } catch (error) {
      console.error("Error requesting book:", error);
      toast.error("Failed to request book. Please try again.");
    }
  };

  return (
    <div className="container py-12">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="flex justify-center lg:justify-end">
          <Card className="w-full max-w-md overflow-hidden">
            <BookCover src={book.coverImage} alt={book.title} />
          </Card>
        </div>
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-2">{book.title}</h1>
          <p className="text-xl text-muted-foreground mb-4">by {book.author}</p>
          <div className="flex flex-wrap gap-2 mb-6">
            <Badge variant="secondary">{book.category}</Badge>
            <Badge variant={isAvailable ? "default" : "destructive"}>
              {isAvailable ? "Available" : "Not Available"}
            </Badge>
          </div>
          <Separator className="my-6" />
          <div className="grid gap-4 mb-6">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-muted-foreground" />
              <span>
                <strong>ISBN:</strong> {book.isbn}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-muted-foreground" />
              <span>
                <strong>Author:</strong> {book.author}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-muted-foreground" />
              <span>
                <strong>Publication Date:</strong> January 1, 2023
              </span>
            </div>
            <div className="flex items-center gap-2">
              <BarChart className="w-5 h-5 text-muted-foreground" />
              <span>
                <strong>Popularity:</strong> 4.5/5 (based on 100 reviews)
              </span>
            </div>
          </div>
          <Card className="mb-6">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-2">Book Description</h3>
              <p className="text-muted-foreground">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </CardContent>
          </Card>

          {/* Request Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 justify-self-center">
              <Button variant="outline" size="sm" onClick={handleDecrement}>
                -
              </Button>
              <span>{quantity}</span>
              <Button variant="outline" size="sm" onClick={handleIncrement}>
                +
              </Button>
            </div>

            <Select onValueChange={setSelectedLibrary}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a library" />
              </SelectTrigger>
              <SelectContent>
                {libraries.map(library => (
                  <SelectItem key={library.id} value={library.id}>
                    {library.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button className="w-full" onClick={handleRequest}>
              Request Book
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
