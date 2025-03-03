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

export interface ReturnBook {
  orderId: number;
}

export interface BookSearchResult {
  bookId: number;
  title: string;
  quantity: number;
  authorId: number;
  authorName: string;
  coverImage?: string;
  subjectNames: string[];
}

export interface User {
  id?: number;
  name: string;
  email: string;
  password?: string;
}

export interface UserOrder {
  userId(orderId: number, userId: any): void;
  bookId(orderId: number, bookId: any): unknown;
  orderId: number;
  title: string;
  authorName: string;
  libraryName: string;
  requestedCopiesQTY: number;
  orderDate: Date;
  returnDate: Date;
  stateName: string;
}

export interface ReturnedUserOrder {
  orderId: number;
  title: string;
  authorName: string;
  libraryId: number | null;
  libraryName: string;
  requestedCopiesQTY: number;
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
