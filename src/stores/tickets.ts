import { defineStore } from "pinia";
import type { Ticket } from "../types";

export const useTicketsStore = defineStore("tickets", {
  state: () => ({
    tickets: [] as Ticket[],
  }),
  actions: {
    loadTickets() {
      const saved = localStorage.getItem("ticketapp_tickets");
      if (saved) {
        try {
          this.tickets = JSON.parse(saved);
        } catch (error) {
          console.error("Error parsing saved tickets:", error);
          localStorage.removeItem("ticketapp_tickets");
          this.tickets = [];
        }
      }
    },

    saveTickets() {
      localStorage.setItem("ticketapp_tickets", JSON.stringify(this.tickets));
    },

    addTicket(ticketData: Omit<Ticket, "id" | "createdAt" | "updatedAt">) {
      const newTicket: Ticket = {
        ...ticketData,
        id: `ticket_${Date.now()}_${Math.random()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      this.tickets.push(newTicket);
      this.saveTickets();
    },

    updateTicket(id: string, updates: Partial<Ticket>) {
      this.tickets = this.tickets.map((t) =>
        t.id === id ? { ...t, ...updates, updatedAt: new Date().toISOString() } : t
      );
      this.saveTickets();
    },

    deleteTicket(id: string) {
      this.tickets = this.tickets.filter((t) => t.id !== id);
      this.saveTickets();
    },

    getTicketStats() {
      const total = this.tickets.length;
      const open = this.tickets.filter((t) => t.status === "open").length;
      const inProgress = this.tickets.filter((t) => t.status === "in_progress").length;
      const closed = this.tickets.filter((t) => t.status === "closed").length;

      return { total, open, inProgress, closed };
    },
  },
});
