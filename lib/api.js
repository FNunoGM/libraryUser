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
