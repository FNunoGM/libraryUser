import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { books, categories } from "@/lib/books"
import Link from "next/link"
import { BookCover } from "@/components/book-cover"

export default function ExplorePage() {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Explore Our Collection</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <section>
          <h2 className="text-xl font-semibold mb-4">Categories</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {categories.map((category) => (
              <Card key={category}>
                <CardHeader className="p-4">
                  <CardTitle className="text-lg">{category}</CardTitle>
                  <CardDescription>{books.filter((book) => book.category === category).length} books</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Featured Books</h2>
          <div className="space-y-4">
            {books.slice(0, 5).map((book) => (
              <Card key={book.id}>
                <CardContent className="flex items-center p-4">
                  <div className="w-16 h-24 mr-4">
                    <BookCover src={book.coverImage} alt={book.title} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{book.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      by {book.author} • {book.category}
                    </p>
                  </div>
                  <Button variant={book.available ? "default" : "secondary"} asChild>
                    <Link href={`/books/${book.id}`}>{book.available ? "View Details" : "Join Waitlist"}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

