const API_BASE_URL = "http://localhost:5000/"; // URL da API

export async function fetchBooks() {
  const res = await fetch(`${API_BASE_URL}/books`);
  if (!res.ok) throw new Error("Erro ao buscar livros");
  return res.json();
}

export async function addBook(book) {
  const res = await fetch(`${API_BASE_URL}/books`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(book),
  });
  if (!res.ok) throw new Error("Erro ao adicionar livro");
  return res.json();
}

export async function registerUser(userData) {
  try {
    const response = await fetch(`${API_BASE_URL}api/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Registration failed");
    }
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function loginUser(email, password) {
  try {
    const response = await fetch(`${API_BASE_URL}api/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Login failed");
    }

    return data;
  } catch (error) {
    console.log("Error in loginUser:", error);
    throw new Error(error.message);
  }
}
