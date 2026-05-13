import axios from "axios";
import { create } from "zustand";

export const useAuth = create((set) => ({

  isAuthenticated: false,
  currentUser: null,
  loading: false,
  error: null,

  login: async (userCredWithRole) => {
    const { role, ...userCredObj } = userCredWithRole;

    try {
      set({ loading: true, error: null });

      const res = await axios.post(
        "http://localhost:4000/common-api/login",
        userCredObj,
        { withCredentials: true } // 🔥 add this too
      );

      set({
        loading: false,
        isAuthenticated: true,
        currentUser: res.data.payload
      });

    } catch (err) {
      set({
        loading: false,
        isAuthenticated: false,
        currentUser: null,
        error: err.response?.data?.message || "Login failed"
      });
    }
  },

  logout: () => {
    set({
      isAuthenticated: false,
      currentUser: null,
      loading: false,
      error: null
    });
  },

  // ✅ FIXED: now inside store
  checkAuth: async () => {
    try {
      set({ loading: true });

      const res = await axios.get(
        "http://localhost:4000/common-api/check-auth",
        { withCredentials: true, timeout: 5000 }
      );

      set({
        currentUser: res.data.payload,
        isAuthenticated: true,
        loading: false,
        error: null
      });

    } catch (err) {

      if (err.response?.status === 401) {
        set({
          currentUser: null,
          isAuthenticated: false,
          loading: false,
          error: null
        });
        return;
      }

      // Network error or server not running
      if (!err.response) {
        console.error("Network Error: Backend server may not be running at http://localhost:4000", err.message);
        set({ 
          loading: false,
          error: "Unable to connect to server. Please ensure the backend is running.",
          isAuthenticated: false
        });
        return;
      }

      console.error("Auth check failed:", err);
      set({ 
        loading: false,
        error: err.response?.data?.message || "Auth check failed"
      });
    }
  }

}));