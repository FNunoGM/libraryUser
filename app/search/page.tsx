"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Search } from "lucide-react";
import { toast } from "react-toastify";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BookCover } from "@/components/book-cover";
import { BookSearchResult } from "@/lib/types";
import { fetchBookSearch } from "@/lib/api";

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [books, setBooks] = useState<BookSearchResult[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<BookSearchResult[]>([]);

  // Extract unique subjects from all books
  const subjects = Array.from(
    new Set(books.flatMap((book) => book.subjectNames))
  );

  useEffect(() => {
    // Fetch books when the component mounts
    const loadBooks = async () => {
      try {
        const data = await fetchBookSearch();
        setBooks(data);
        setFilteredBooks(data); // Initialize filtered books with all books
      } catch (error) {
        toast.error("Failed to load books.");
      }
    };
    loadBooks();
  }, []);

  const handleSearch = () => {
    const results = books.filter(
      (book) =>
        (book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.authorName.toLowerCase().includes(searchQuery.toLowerCase())) &&
        (selectedSubject === "all" ||
          book.subjectNames.includes(selectedSubject))
    );
    setFilteredBooks(results);
  };

  return (
    <div className="container py-8 justify-self-center">
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-2xl font-bold mb-4">Search Books</h1>
        <div className="flex w-full max-w-2xl gap-2 mb-4">
          <Input
            placeholder="Search by title or author..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
          />
          <Select value={selectedSubject} onValueChange={setSelectedSubject}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Subjects" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" defaultValue={"all"}>
                All Subjects
              </SelectItem>
              {subjects.map((subject) => (
                <SelectItem key={subject} value={subject}>
                  {subject}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={handleSearch}>
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredBooks.map((book) => (
          <Card key={book.bookId}>
            <CardHeader>
              <div className="w-full aspect-[2/3] mb-4">
                <BookCover src={book.coverImage ?? ""} alt={book.title} />
              </div>
              <CardTitle>{book.title}</CardTitle>
              <CardDescription>By {book.authorName}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Subjects: {book.subjectNames.join(", ")}
              </p>
              <Button className="w-full" asChild>
                <a href={`/books/${book.bookId}`}>View Details</a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
