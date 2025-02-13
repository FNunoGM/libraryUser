"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Search } from "lucide-react"
import { books, categories } from "@/lib/books"
import Link from "next/link"
import { BookCover } from "@/components/book-cover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [searchResults, setSearchResults] = useState(books)

  const handleSearch = () => {
    
    const results = books.filter(
      (book) =>
        (book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.isbn.includes(searchQuery)) &&
        (selectedCategory === "" || book.category === selectedCategory || !selectedCategory),
    )
    setSearchResults(results)
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-2xl font-bold mb-4">Search Books</h1>
        <div className="flex w-full max-w-2xl gap-2 mb-4">
          <Input
            placeholder="Search by title, author, or ISBN..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
          />
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
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
        {searchResults.map((book) => (
          <Card key={book.id}>
            <CardHeader>
              <div className="w-full aspect-[2/3] mb-4">
                <BookCover src={book.coverImage} alt={book.title} />
              </div>
              <CardTitle>{book.title}</CardTitle>
              <CardDescription>By {book.author}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                ISBN: {book.isbn}
                <br />
                Category: {book.category}
                <br />
                Status: {book.available ? "Available" : "Not Available"}
              </p>
              <Button className="w-full" asChild>
                <Link href={`/books/${book.id}`}>View Details</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

