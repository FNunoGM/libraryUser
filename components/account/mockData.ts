import { addDays } from "date-fns";

// Mock data for currently borrowed books
export const mockBorrowedBooks = [
  {
    id: "1",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    branch: "Main Library",
    borrowDate: "2025-02-15",
    dueDate: addDays(new Date(), 2).toISOString().split("T")[0], // Due in 2 days
    coverImage: "https://covers.openlibrary.org/b/id/8816605-L.jpg",
  },
  {
    id: "2",
    title: "1984",
    author: "George Orwell",
    branch: "Downtown Branch",
    borrowDate: "2025-02-01",
    dueDate: addDays(new Date(), -3).toISOString().split("T")[0], // Overdue by 3 days
    coverImage: "https://covers.openlibrary.org/b/id/8575708-L.jpg",
  },
  {
    id: "3",
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    branch: "East Side Branch",
    borrowDate: "2025-02-10",
    dueDate: addDays(new Date(), 5).toISOString().split("T")[0], // Due in 5 days
    coverImage: "https://covers.openlibrary.org/b/id/8231432-L.jpg",
  },
];

// Mock data for borrowing history
export const mockBorrowingHistory = [
  {
    id: "1",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    branch: "Main Library",
    borrowDate: "2025-01-15",
    returnDate: "2025-01-30",
  },
  {
    id: "4",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    branch: "Downtown Branch",
    borrowDate: "2024-12-10",
    returnDate: "2024-12-25",
  },
  {
    id: "5",
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    branch: "Main Library",
    borrowDate: "2024-11-05",
    returnDate: "2024-11-20",
  },
  {
    id: "6",
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    branch: "East Side Branch",
    borrowDate: "2024-10-20",
    returnDate: "2024-11-04",
  },
  ...mockBorrowedBooks.map(book => ({
    id: book.id,
    title: book.title,
    author: book.author,
    branch: book.branch,
    borrowDate: book.borrowDate,
    returnDate: null, // Currently borrowed
  })),
];

// Get all unique branches for filtering
export const branches = Array.from(
  new Set(mockBorrowingHistory.map(book => book.branch))
);
