import { create } from "zustand";

import {
  deleteUser,
  getUsers,
  searchUsers,
  updateUser,
} from "@/lib/api";

import { User } from "@/types/user";

interface UserState {
  users: User[];
  total: number;

  loading: boolean;
  error: string | null;

  page: number;
  limit: number;

  search: string;

  fetchUsers: (page?: number) => Promise<void>;
  searchUser: (query: string) => Promise<void>;

  updateUserData: (
    id: number,
    userData: Partial<User>
  ) => Promise<void>;

  deleteUserData: (id: number) => Promise<void>;

  setPage: (page: number) => void;
  setSearch: (search: string) => void;
}

export const useUserStore = create<UserState>((set, get) => ({
  users: [],
  total: 0,

  loading: false,
  error: null,

  page: 1,
  limit: 10,

  search: "",

  // =========================
  // Fetch Users
  // =========================

  fetchUsers: async (page = get().page) => {
    try {
      set({
        loading: true,
        error: null,
      });

      const limit = get().limit;

      const skip = (page - 1) * limit;

      const data = await getUsers(limit, skip);

      set({
        users: data.users,
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
            : "Failed to fetch users",
      });
    }
  },

  // =========================
  // Search Users
  // =========================

  searchUser: async (query: string) => {
    try {
      set({
        loading: true,
        error: null,
      });

      if (!query.trim()) {
        await get().fetchUsers(1);
        return;
      }

      const data = await searchUsers(query);

      set({
        users: data.users,
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
            : "Failed to search users",
      });
    }
  },

  // =========================
  // Update User
  // =========================

  updateUserData: async (id, userData) => {
    try {
      set({
        loading: true,
        error: null,
      });

      const updatedUser = await updateUser(id, userData);

      set((state) => ({
        users: state.users.map((user) =>
          user.id === id ? { ...user, ...updatedUser } : user
        ),

        loading: false,
      }));
    } catch (error) {
      set({
        loading: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to update user",
      });

      throw error;
    }
  },

  // =========================
  // Delete User
  // =========================

  deleteUserData: async (id) => {
    try {
      set({
        loading: true,
        error: null,
      });

      await deleteUser(id);

      set((state) => ({
        users: state.users.filter((user) => user.id !== id),

        total: state.total - 1,

        loading: false,
      }));
    } catch (error) {
      set({
        loading: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to delete user",
      });

      throw error;
    }
  },

  // =========================
  // Pagination
  // =========================

  setPage: (page) => {
    set({ page });
  },

  // =========================
  // Search
  // =========================

  setSearch: (search) => {
    set({ search });
  },
}));