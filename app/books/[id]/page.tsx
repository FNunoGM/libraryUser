"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { User, Calendar } from "lucide-react";
import { BookCover } from "@/components/book-cover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RequestBookDto } from "@/lib/types";
import {
  getBookById,
  getLibrariesByNumberOfCopies,
  requestBook,
} from "@/lib/api";
import { BookDetailsDTO, LibraryByNumberOfCopies } from "@/lib/types";

export default function BookPage() {
  const { id } = useParams();
  const [book, setBook] = useState<BookDetailsDTO | null>(null);
  const [libraries, setLibraries] = useState<LibraryByNumberOfCopies[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedLibrary, setSelectedLibrary] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookId = parseInt(id as string, 10);
        if (isNaN(bookId)) {
          throw new Error("Invalid book ID.");
        }

        // Fetch book details
        const bookDetails = await getBookById(bookId);
        setBook(bookDetails);

        // Fetch libraries with available copies
        const librariesData = await getLibrariesByNumberOfCopies(bookId);
        setLibraries(librariesData);
      } catch (error) {
        toast.error("Failed to fetch libraries. Please try again.");
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);
  }, []);

  if (!book) {
    return <div className="container py-8">Loading...</div>;
  }

  const handleIncrement = () => {
    if (selectedLibrary) {
      const selectedLibraryData = libraries.find(
        lib => lib.libraryId.toString() === selectedLibrary
      );
      if (
        selectedLibraryData &&
        quantity < selectedLibraryData.numberOfCopies - 1
      ) {
        setQuantity(prev => prev + 1);
      } else {
        toast.warning(
          `You cannot request more than ${
            selectedLibraryData ? selectedLibraryData.numberOfCopies - 1 : 0
          } copies.`
        );
      }
    } else {
      toast.warning("Please select a library first.");
    }
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

    // Retrieve userId from localStorage
    const userData = localStorage.getItem("user");
    if (!userData) {
      toast.error("User data not found. Please log in again.");
      return;
    }

    try {
      const user = JSON.parse(userData);
      const userId = user.userId; // Access userId from the parsed object
      if (!userId) {
        toast.error("User ID not found. Please log in again.");
        return;
      }

      const parsedUserId = parseInt(userId, 10);
      if (isNaN(parsedUserId)) {
        toast.error("Invalid user ID. Please log in again.");
        return;
      }

      // Prepare the request payload
      const request: RequestBookDto = {
        userId: parsedUserId, // Use the parsed userId
        bookId: parseInt(book.bookId.toString(), 10), // Convert book ID to number
        libraryId: parseInt(selectedLibrary, 10), // Convert library ID to number
        numberOfCopies: quantity,
      };

      // Call the backend API
      const response = await requestBook(request);

      if (!response.ok) {
        toast.success("Book requested successfully!");
      }

      toast.success("Book requested successfully!");
    } catch (error) {
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
          <p className="text-xl text-muted-foreground mb-4">
            by {book.authorName}
          </p>
          <div className="flex flex-wrap gap-2 mb-6">
            <Badge variant="secondary">{book.subjectNames.join(", ")}</Badge>
            <Badge variant={libraries.length > 0 ? "default" : "destructive"}>
              {libraries.length > 0 ? "Available" : "Not Available"}
            </Badge>
          </div>
          <Separator className="my-6" />
          <div className="grid gap-4 mb-6">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-muted-foreground" />
              <span>
                <strong>Author:</strong> {book.authorName}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-muted-foreground" />
              <span>
                <strong>Publication Date:</strong> {book.year}
              </span>
            </div>
          </div>

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
                  <SelectItem
                    key={library.libraryId}
                    value={library.libraryId.toString()}
                  >
                    {library.libraryName} ({library.numberOfCopies} copies)
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
