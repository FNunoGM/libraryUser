export interface ApiResponse<T> {
  json(): unknown;
  ok: any;
  userId: number;
  message?: string;
  data?: T;
  error?: string;
}

export interface RequestBookDto {
  userId: number;
  bookId: number;
  libraryId: number;
  numberOfCopies: number;
}

export interface BookSearchResult {
  bookId: number;
  title: string;
  quantity: number;
  authorId: number;
  authorName: string;
  coverImage: string; // Assuming the cover image is a URL or base64 string
  subjectNames: string[];
}

export interface User {
  id?: number;
  name: string;
  email: string;
  password?: string; // Exclude when fetching user data
}

export interface UserOrder {
  orderId: number;
  title: string;
  authorName: string;
  libraryName: string;
  orderDate: Date;
  returnDate: Date;
  stateName: string;
}

export interface BookDetailsDTO {
  bookId: number;
  title: string;
  edition: string;
  year: number;
  coverImage: string;
  authorName: string;
  subjectNames: string[];
}

export interface LibraryByNumberOfCopies {
  libraryId: number;
  libraryName: string;
  numberOfCopies: number;
}
