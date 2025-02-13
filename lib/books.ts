export interface Book {
  id: string
  title: string
  author: string
  isbn: string
  category: string
  available: boolean
  coverImage: string
}

export const books: Book[] = [
  {
    id: "1",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    isbn: "9780446310789",
    category: "Fiction",
    available: true,
    coverImage: "https://covers.openlibrary.org/b/id/8816605-L.jpg",
  },
  {
    id: "2",
    title: "1984",
    author: "George Orwell",
    isbn: "9780451524935",
    category: "Fiction",
    available: false,
    coverImage: "https://covers.openlibrary.org/b/id/8575708-L.jpg",
  },
  {
    id: "3",
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    isbn: "9780316769174",
    category: "Fiction",
    available: true,
    coverImage: "https://covers.openlibrary.org/b/id/8231432-L.jpg",
  },
  {
    id: "4",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    isbn: "9780141439518",
    category: "Fiction",
    available: true,
    coverImage: "https://covers.openlibrary.org/b/id/8773270-L.jpg",
  },
  {
    id: "5",
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    isbn: "9780547928227",
    category: "Fantasy",
    available: false,
    coverImage: "https://covers.openlibrary.org/b/id/8406786-L.jpg",
  },
  {
    id: "6",
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    isbn: "9780062316097",
    category: "Non-Fiction",
    available: true,
    coverImage: "https://covers.openlibrary.org/b/id/8741742-L.jpg",
  },
  {
    id: "7",
    title: "The Alchemist",
    author: "Paulo Coelho",
    isbn: "9780062315007",
    category: "Fiction",
    available: true,
    coverImage: "https://covers.openlibrary.org/b/id/8578916-L.jpg",
  },
  {
    id: "8",
    title: "A Brief History of Time",
    author: "Stephen Hawking",
    isbn: "9780553380163",
    category: "Science",
    available: false,
    coverImage: "https://covers.openlibrary.org/b/id/8406236-L.jpg",
  },
  {
    id: "9",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    isbn: "9780743273565",
    category: "Fiction",
    available: true,
    coverImage: "https://covers.openlibrary.org/b/id/8761830-L.jpg",
  },
  {
    id: "10",
    title: "Dune",
    author: "Frank Herbert",
    isbn: "9780441172719",
    category: "Science Fiction",
    available: true,
    coverImage: "https://covers.openlibrary.org/b/id/8587651-L.jpg",
  },
]

export const categories = Array.from(new Set(books.map((book) => book.category)))

