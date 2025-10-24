import { defineStore } from "pinia";
import type { User } from "../types";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as User | null,
    isAuthenticated: false as boolean,
  }),
  actions: {
    initializeAuth() {
      const token = localStorage.getItem("ticketapp_session");
      const savedUser = localStorage.getItem("ticketapp_user");

      if (token && savedUser) {
        try {
          this.user = JSON.parse(savedUser);
          this.isAuthenticated = true;
        } catch (error) {
          console.error("Error parsing saved user:", error);
          localStorage.removeItem("ticketapp_session");
          localStorage.removeItem("ticketapp_user");
        }
      }
    },

    async login(email: string, password: string): Promise<boolean> {
      const savedUsers = localStorage.getItem("ticketapp_users");
      const users = savedUsers ? JSON.parse(savedUsers) : [];

      const user = users.find(
        (u: User & { password: string }) => u.email === email && u.password === password
      );

      if (user) {
        const mockToken = `token_${Date.now()}_${Math.random()}`;
        const { password: _, ...userWithoutPassword } = user;

        localStorage.setItem("ticketapp_session", mockToken);
        localStorage.setItem("ticketapp_user", JSON.stringify(userWithoutPassword));

        this.user = userWithoutPassword;
        this.isAuthenticated = true;
        return true;
      }

      return false;
    },

    async signup(email: string, password: string, name: string): Promise<boolean> {
      const savedUsers = localStorage.getItem("ticketapp_users");
      const users = savedUsers ? JSON.parse(savedUsers) : [];

      const existingUser = users.find((u: User & { password: string }) => u.email === email);
      if (existingUser) {
        return false;
      }

      const newUser = {
        id: `user_${Date.now()}`,
        email,
        name,
        password,
      };

      users.push(newUser);
      localStorage.setItem("ticketapp_users", JSON.stringify(users));

      const mockToken = `token_${Date.now()}_${Math.random()}`;
      const { password: _, ...userWithoutPassword } = newUser;

      localStorage.setItem("ticketapp_session", mockToken);
      localStorage.setItem("ticketapp_user", JSON.stringify(userWithoutPassword));

      this.user = userWithoutPassword;
      this.isAuthenticated = true;
      return true;
    },

    logout() {
      localStorage.removeItem("ticketapp_session");
      localStorage.removeItem("ticketapp_user");
      this.user = null;
      this.isAuthenticated = false;
    },
  },
});
