import {
  ApiResponse,
  BookDetailsDTO,
  BookSearchResult,
  RequestBookDto,
  User,
  UserOrder,
  LibraryByNumberOfCopies,
} from "@/lib/types";

const API_BASE_URL = "http://localhost:5000/api"; // URL da API

export async function registerUser(userData: User): Promise<ApiResponse<User>> {
  try {
    const response = await fetch(`${API_BASE_URL}/user/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    const data: ApiResponse<User> = await response.json();
    if (!response.ok) throw new Error(data.error || "Registration failed");

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function loginUser(
  email: string,
  password: string
): Promise<ApiResponse<User>> {
  try {
    const response = await fetch(`${API_BASE_URL}/user/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data: ApiResponse<User> = await response.json();

    if (!response.ok) throw new Error(data.error || "Login failed");

    return data;
  } catch (error: any) {
    console.error("Error in loginUser:", error);
    throw new Error(error.message);
  }
}

export async function requestBook(
  request: RequestBookDto
): Promise<ApiResponse<{ requestId: number }>> {
  try {
    const response = await fetch(`${API_BASE_URL}/Books/requestbook`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
    });

    if (!response.ok) throw new Error("Failed to request book.");

    const data: ApiResponse<{ requestId: number }> = await response.json();
    return data;
  } catch (error: any) {
    console.error("Error requesting book:", error);
    throw error;
  }
}

export const fetchBookSearch = async (): Promise<BookSearchResult[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/Books/getAll`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch books.");
    }
    const data: BookSearchResult[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
};

export async function getUserOrders(userId: number): Promise<UserOrder[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/orders?userId=${userId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) throw new Error("Failed to get user orders.");

    const data: UserOrder[] = await response.json();
    return data;
  } catch (error: any) {
    console.error("Error getting user orders:", error);
    throw error;
  }
}

export async function getBookById(bookId: number): Promise<BookDetailsDTO> {
  try {
    //When I pass the bookId number to the endpoint, it will return the book details
    const response = await fetch(`${API_BASE_URL}/Books/${bookId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Book not found.");
      }
      throw new Error(`Failed to get book details. Status: ${response.status}`);
    }

    const data: BookDetailsDTO = await response.json();
    return data;
  } catch (error: any) {
    console.error("Error getting book details:", error);
    throw new Error(error.message || "An unexpected error occurred.");
  }
}

export async function getLibrariesByNumberOfCopies(
  bookId: number
): Promise<LibraryByNumberOfCopies[]> {
  try {
    const url = `${API_BASE_URL}/Libraries/Books/${bookId}`;

    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    console.log(`Response status: ${response.status}`); // Debugging

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("No libraries found for the specified book.");
      }
      throw new Error(`Failed to fetch libraries. Status: ${response.status}`);
    }

    const data: LibraryByNumberOfCopies[] = await response.json();
    console.log("Fetched libraries:", data); // Debugging
    return data;
  } catch (error: any) {
    console.error("Error fetching libraries by number of copies:", error);
    throw new Error(error.message || "An unexpected error occurred.");
  }
}
