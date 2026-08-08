import { create } from "zustand";

import {
  getProducts,
  searchProducts,
  getProductsByCategory,
} from "@/lib/api";

import { Product } from "@/types/product";

interface ProductState {
  products: Product[];
  total: number;

  loading: boolean;
  error: string | null;

  page: number;
  limit: number;

  search: string;
  category: string;

  fetchProducts: (page?: number) => Promise<void>;

  searchProduct: (query: string) => Promise<void>;

  filterByCategory: (category: string) => Promise<void>;

  setPage: (page: number) => void;
  setSearch: (search: string) => void;
  setCategory: (category: string) => void;
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  total: 0,

  loading: false,
  error: null,

  page: 1,
  limit: 10,

  search: "",
  category: "",

  // =========================
  // Fetch Products
  // =========================

  fetchProducts: async (page = get().page) => {
    try {
      set({
        loading: true,
        error: null,
      });

      const limit = get().limit;
      const skip = (page - 1) * limit;

      const data = await getProducts(limit, skip);

      set({
        products: data.products,
        total: data.total,
        page,
        loading: false,
      });
    } catch (error) {
      set({
        loading: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch products",
      });
    }
  },

  // =========================
  // Search Products
  // =========================

  searchProduct: async (query: string) => {
    try {
      set({
        loading: true,
        error: null,
      });

      if (!query.trim()) {
        await get().fetchProducts(1);
        return;
      }

      const data = await searchProducts(query);

      set({
        products: data.products,
        total: data.total,
        page: 1,
        loading: false,
      });
    } catch (error) {
      set({
        loading: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to search products",
      });
    }
  },

  // =========================
  // Category Filter
  // =========================

  filterByCategory: async (category: string) => {
    try {
      set({
        loading: true,
        error: null,
      });

      if (!category) {
        await get().fetchProducts(1);
        return;
      }

      const data = await getProductsByCategory(category);

      set({
        products: data.products,
        total: data.total,
        page: 1,
        loading: false,
      });
    } catch (error) {
      set({
        loading: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to filter products",
      });
    }
  },

  // =========================
  // Pagination
  // =========================

  setPage: (page) => {
    set({ page });
  },

  // =========================
  // Search State
  // =========================

  setSearch: (search) => {
    set({ search });
  },

  // =========================
  // Category State
  // =========================

  setCategory: (category) => {
    set({ category });
  },
}));