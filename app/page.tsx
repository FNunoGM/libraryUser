"use client";

import { useEffect, useState } from "react";

export default function TestAPI() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/ping")
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to connect");
        }
        return response.text();
      })
      .then(data => setMessage(data))
      .catch(err => setError(err.message));
  }, []);

  return (
    <div>
      <h1>Test API Connection</h1>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {message && <p>API Response: {message}</p>}
    </div>
  );
}

/*import Link from "next/link";
import { Button } from "@/components/ui/button";
import { books } from "@/lib/books";
import { BookCover } from "@/components/book-cover";

export default function HomePage() {
  const featuredBooks = books.slice(0, 3); // Get first 3 books as featured

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-black text-white">
          <div className="container flex flex-col items-center justify-self-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter mb-4">
              Welcome to XPTO Library
            </h1>
            <p className="max-w-[600px] text-lg sm:text-xl text-white/80 mb-8">
              Your gateway to knowledge and imagination
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                className="bg-white text-black hover:bg-white/90"
              >
                <Link href="/explore">Explore Books</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-black"
              >
                <Link href="/request">Request a Book</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container justify-self-center">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Featured Books
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredBooks.map(book => (
                <div
                  key={book.id}
                  className="border rounded-lg p-4 flex flex-col"
                >
                  <div className="mb-4 aspect-[2/3]">
                    <BookCover src={book.coverImage} alt={book.title} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{book.title}</h3>
                  <p className="text-muted-foreground mb-2">by {book.author}</p>
                  <p className="text-sm mb-4">{book.category}</p>
                  <div className="mt-auto">
                    <Button asChild className="w-full">
                      <Link href={`/books/${book.id}`}>View Details</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container flex flex-col items-center justify-self-center">
            <h2 className="text-3xl font-bold tracking-tighter mb-4">
              Ready to start reading?
            </h2>
            <p className="max-w-[600px] text-muted-foreground mb-8 text-center">
              Create an account to borrow books, save your favorites, and join
              our community of book lovers.
            </p>
            <Button asChild size="lg">
              <Link href="/signup">Sign Up Now</Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="w-full border-t py-6">
        <div className="container flex flex-col items-center gap-4 justify-self-center">
          <p className="text-sm text-muted-foreground">
            © 2025 XPTO Library. All rights reserved.
          </p>
          <nav className="flex gap-4 text-sm">
            <Link
              href="/about"
              className="text-muted-foreground hover:underline"
            >
              About
            </Link>
            <Link
              href="/terms"
              className="text-muted-foreground hover:underline"
            >
              Terms of Service
            </Link>
            <Link
              href="/privacy"
              className="text-muted-foreground hover:underline"
            >
              Privacy Policy
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
*/
