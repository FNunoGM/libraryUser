import {
  ApiResponse,
  Book,
  BookSearchResult,
  RequestBookDto,
  User,
  Order
} from "@/lib/types";

const API_BASE_URL = "http://localhost:5000/api"; // URL da API

export const fetchBooks = async (): Promise<Book[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/books`);
    if (!response.ok) {
      throw new Error("Failed to fetch books.");
    }
    const data: Book[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
};

export const fetchBookSearch = async (): Promise<BookSearchResult[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/books/getAll`, {
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
    const response = await fetch(`${API_BASE_URL}/requestbook`, {
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

export const getOrdersByUserId = async (userId: number): Promise<Order[]> => {
  try{
    const response = await fetch(`${API_BASE_URL}/orders`);
    if (!response.ok) {
      throw Error("Failed to fetch orders.");
    }

    const data: Order[] = await response.json();

    return data;
  }
  catch (error) {
    console.error("Error fetching orders: ", error);
    throw error;
  }
}