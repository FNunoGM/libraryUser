"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { books } from "@/lib/books"
import { toast } from "sonner"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { BookOpen, User, Calendar, BarChart } from "lucide-react"
import { BookCover } from "@/components/book-cover"

export default function BookPage() {
  const { id } = useParams()
  const book = books.find((b) => b.id === id)
  const [isAvailable, setIsAvailable] = useState(book?.available)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const user = localStorage.getItem("user")
    setIsLoggedIn(!!user)
  }, [])

  if (!book) {
    return <div className="container py-8">Book not found</div>
  }

  const handleBorrow = () => {
    if (!isLoggedIn) {
      toast.error("Please log in to borrow books")
      router.push("/login")
      return
    }
    setIsAvailable(false)
    toast.success(`You have borrowed "${book.title}". Please return it within 14 days.`)
  }

  const handleWaitlist = () => {
    if (!isLoggedIn) {
      toast.error("Please log in to join the waitlist")
      router.push("/login")
      return
    }
    toast.success(`You have been added to the waitlist for "${book.title}".`)
  }

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
            <Badge variant={isAvailable ? "success" : "destructive"}>
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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat.
              </p>
            </CardContent>
          </Card>
          {isAvailable ? (
            <Button size="lg" onClick={handleBorrow}>
              Borrow Now
            </Button>
          ) : (
            <Button size="lg" variant="secondary" onClick={handleWaitlist}>
              Join Waitlist
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

