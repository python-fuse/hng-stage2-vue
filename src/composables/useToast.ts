import { toast } from 'vue-sonner'

// Exact toast messages matching React version
export const useToast = () => {
  return {
    success: (message: string) => toast.success(message),
    error: (message: string) => toast.error(message),
    info: (message: string) => toast.info(message),
    
    // Pre-defined messages matching React exactly
    accountCreated: () => toast.success('Account created successfully! Welcome to Ticketly!'),
    welcomeBack: () => toast.success('Welcome back to Ticketly!'),
    ticketCreated: () => toast.success('Ticket created successfully!'),
    ticketUpdated: () => toast.success('Ticket updated successfully!'),
    ticketDeleted: () => toast.success('Ticket deleted successfully!'),
    
    invalidCredentials: () => toast.error('Invalid email or password. Please check your credentials and try again.'),
    emailExists: () => toast.error('An account with this email already exists. Please use a different email or try logging in.'),
    genericError: () => toast.error('Something went wrong. Please try again.'),
    fixErrors: () => toast.error('Please fix the errors below'),
  }
}
