import { ApiResponse, Book, RequestBookDto, User } from "@/lib/types";

const API_BASE_URL = "http://localhost:5000/"; // URL da API

export const fetchBooks = async (): Promise<Book[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}api/books`);
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

export async function registerUser(userData: User): Promise<ApiResponse<User>> {
  try {
    const response = await fetch(`${API_BASE_URL}api/user/register`, {
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
    const response = await fetch(`${API_BASE_URL}api/user/login`, {
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
    const response = await fetch(`${API_BASE_URL}api/requestbook`, {
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
