import { Product } from "@/types/product";
import { User } from "@/types/user";

const BASE_URL = "https://dummyjson.com";

// =========================
// Authentication
// =========================

export async function loginUser(
  username: string,
  password: string
) {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data;
}

// =========================
// Users
// =========================

export async function getUsers(
  limit = 10,
  skip = 0
): Promise<{
  users: User[];
  total: number;
  skip: number;
  limit: number;
}> {
  const response = await fetch(
    `${BASE_URL}/users?limit=${limit}&skip=${skip}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  return response.json();
}

export async function searchUsers(query: string) {
  const response = await fetch(
    `${BASE_URL}/users/search?q=${encodeURIComponent(query)}`
  );

  if (!response.ok) {
    throw new Error("Failed to search users");
  }

  return response.json();
}

export async function getUserById(
  id: string
): Promise<User> {
  const response = await fetch(
    `${BASE_URL}/users/${id}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }

  return response.json();
}

// =========================
// Update User
// =========================

export async function updateUser(
  id: string,
  userData: Partial<User>
): Promise<User> {
  const response = await fetch(
    `${BASE_URL}/users/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to update user"
    );
  }

  return data;
}

// =========================
// Delete User
// =========================

export async function deleteUser(
  id: number
): Promise<User> {
  const response = await fetch(
    `${BASE_URL}/users/${id}`,
    {
      method: "DELETE",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to delete user"
    );
  }

  return data;
}

// =========================
// Products
// =========================

export async function getProducts(
  limit = 10,
  skip = 0
): Promise<{
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}> {
  const response = await fetch(
    `${BASE_URL}/products?limit=${limit}&skip=${skip}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
}

export async function searchProducts(query: string) {
  const response = await fetch(
    `${BASE_URL}/products/search?q=${encodeURIComponent(query)}`
  );

  if (!response.ok) {
    throw new Error("Failed to search products");
  }

  return response.json();
}

export async function getProductsByCategory(
  category: string
) {
  const response = await fetch(
    `${BASE_URL}/products/category/${encodeURIComponent(
      category
    )}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch products by category");
  }

  return response.json();
}

export async function getProductById(
  id: string
): Promise<Product> {
  const response = await fetch(
    `${BASE_URL}/products/${id}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }

  return response.json();
}