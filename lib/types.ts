export interface Book {
  bookId: number;
  title: string;
  edition: string;
  year: number;
  quantity: number;
  authorId: number;
  authorName: string;
  libraryId: number;
  libraryName: string;
  libraryAddress: string;
  email: string;
  contact: string;
  numberOfCopies: number;
  coverImage: string;
  subjectNames: string[];
}

export interface BookSearchResult {
  bookId: number;
  title: string;
  quantity: number;
  authorId: number;
  authorName: string;
  booksBookId?: number;
  coverImage: string; // Assuming the cover image is a URL or base64 string
  subjectNames: string[];
}

export interface User {
  id?: number;
  name: string;
  email: string;
  password?: string; // Exclude when fetching user data
}

export interface RequestBookDto {
  userId: number;
  bookId: number;
  libraryId: number;
  numberOfCopies: number;
}

export interface ApiResponse<T> {
  userId: number;
  message?: string;
  data?: T;
  error?: string;
}
