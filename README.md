# Ticketly - Vue 3 Ticket Management System

A modern, responsive ticket management application built with Vue 3, TypeScript, and Tailwind CSS. This is a **carbon copy migration** from the original React implementation, maintaining exact feature parity and user experience.

## 🚀 Features

- **Landing Page** with wavy SVG background and decorative elements
- **Authentication System** with login/signup and session management
- **Dashboard** with ticket statistics and quick navigation
- **Complete CRUD Operations** for ticket management
- **Responsive Design** optimized for mobile, tablet, and desktop
- **Responsive Sidebar** with mobile hamburger menu
- **Form Validation** with real-time error handling
- **Toast Notifications** for user feedback
- **Protected Routes** with session-based authentication

## 📋 Requirements Met

- ✅ Max-width 1440px centered layout
- ✅ Wavy background hero section
- ✅ Decorative circle elements
- ✅ Card-style boxes with shadows and rounded corners
- ✅ Responsive mobile/tablet/desktop layouts
- ✅ Complete authentication with localStorage session management
- ✅ Full ticket CRUD with validation
- ✅ Status-based color coding (green/amber/gray)
- ✅ Accessibility compliance with semantic HTML
- ✅ Error handling for all scenarios

## � Tech Stack

- **Vue 3.5.22** - Progressive JavaScript framework with Composition API
- **TypeScript 5.9.3** - Type-safe development
- **Pinia 3.0.3** - Official Vue state management library
- **Vue Router 4.6.3** - Client-side routing with navigation guards
- **shadcn-vue** - High-quality, accessible UI components
- **Tailwind CSS 4.1.16** - Utility-first CSS framework
- **vue-sonner 2.x** - Beautiful toast notifications
- **Vite 7.1.12** - Next-generation frontend tooling

## 🚀 Setup Instructions

### Prerequisites

- Node.js (version 16 or higher)
- pnpm package manager

### Installation

1. **Clone or download the project**

   ```bash
   cd /path/to/stage2-vue
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Start the development server**

   ```bash
   pnpm dev
   ```

4. **Open your browser**
   - Navigate to `http://localhost:5173`
   - The application will automatically reload when you make changes

### Build for Production

```bash
pnpm build
```

### Preview Production Build

```bash
pnpm preview
```

## 📁 Project Structure

```
src/
├── components/
│   ├── forms/
│   │   ├── CreateTicketForm.vue    # Create ticket modal
│   │   └── EditTicketForm.vue      # Edit ticket modal
│   ├── layout/
│   │   ├── AppLayout.vue           # Main app layout wrapper
│   │   ├── Sidebar.vue             # Responsive sidebar (desktop/mobile)
│   │   └── Footer.vue              # Footer component
│   └── ui/
│       ├── StatusBadge.vue         # Ticket status badge
│       ├── WaveBackground.vue      # SVG wave decoration
│       ├── DecorativeCircle.vue    # Floating circles
│       └── [shadcn components]     # UI primitives
├── composables/
│   └── useToast.ts                 # Toast notification wrapper
├── stores/
│   ├── auth.ts                     # Pinia auth store
│   └── tickets.ts                  # Pinia tickets store
├── router/
│   └── index.ts                    # Vue Router configuration
├── types/
│   └── index.ts                    # TypeScript type definitions
├── utils/
│   └── statusColors.ts             # Status color mappings
├── views/
│   ├── LandingPage.vue             # Public landing page
│   ├── LoginPage.vue               # Login form
│   ├── SignupPage.vue              # Signup form
│   ├── Dashboard.vue               # Dashboard with stats
│   └── TicketManagement.vue        # Ticket CRUD interface
└── main.ts                         # Application entry point
```

## 🔄 Migration Notes from React

This Vue implementation maintains **exact feature parity** with the React version:

### Key Equivalences:

- React Context API → Pinia Stores
- `useState` / `useEffect` → `ref` / `reactive` / `onMounted`
- `createContext` → `defineStore`
- React Router → Vue Router
- Props drilling → Props with TypeScript interfaces
- `className` → `class`
- Event handlers: `onClick` → `@click`

### Validation Rules (Identical):

- Title: Required, 3-100 characters
- Description: Optional, max 500 characters
- Status: Required, one of: open/in_progress/closed
- Priority: Optional, one of: low/medium/high
- Email: Required, valid email format
- Password: Required, min 6 characters
- Name: Required, min 2 characters

### Toast Messages (Exact Matches):

- "Account created successfully! Welcome to Ticketly!"
- "Welcome back to Ticketly!"
- "Invalid email or password. Please check your credentials and try again."
- "Email already exists. Please use a different email or login."
- "Ticket created successfully!"
- "Ticket updated successfully!"
- "Ticket deleted successfully!"
- "Please fix the errors below"

### Data Formats (Identical):

**User Object:**

```typescript
{
  id: string; // Format: "user_" + timestamp
  name: string;
  email: string;
  password: string;
}
```

**Ticket Object:**

```typescript
{
  id: string                                    // Format: "ticket_" + timestamp + "_" + random
  title: string                                 // 3-100 characters
  description?: string                          // Max 500 characters
  status: 'open' | 'in_progress' | 'closed'
  priority?: 'low' | 'medium' | 'high'
  createdBy: string                             // User ID
  createdAt: string                             // ISO date string
  updatedAt: string                             // ISO date string
}
```

**Session Token:**

```typescript
string; // Format: "token_" + timestamp + "_" + random
```

## 🔐 State Management

### Authentication Store (`stores/auth.ts`)

- **User State**: Current logged-in user information
- **Session Management**: localStorage-based session tokens
- **Actions**: `login()`, `signup()`, `logout()`, `initializeAuth()`
- **Data**: Stored in `ticketapp_session`, `ticketapp_user`, `ticketapp_users`

### Ticket Store (`stores/tickets.ts`)

- **Ticket State**: Reactive array of all tickets
- **CRUD Actions**: `addTicket()`, `updateTicket()`, `deleteTicket()`, `loadTickets()`
- **Getters**: `getTicketStats()` for dashboard metrics
- **Data**: Persisted in `ticketapp_tickets` localStorage key

### Data Persistence

All data is stored in localStorage with the following keys:

- `ticketapp_session`: Current user session token
- `ticketapp_user`: Current user information
- `ticketapp_users`: Database of all registered users
- `ticketapp_tickets`: Array of all tickets

## 🎯 Authentication System

### User Registration

- Form validation for email, password, and name
- Duplicate email prevention
- Automatic login after successful registration

### User Login

- Email and password validation
- Session token generation and storage
- Redirect to dashboard on success

### Session Management

- Protected routes check for valid session token
- Automatic logout and redirect for invalid sessions
- Session persistence across browser refreshes

### Test User Credentials

For testing purposes, you can use these credentials or create new accounts:

**Pre-seeded Test User:**

- **Email**: `admin@ticketly.com`
- **Password**: `password123`
- **Name**: `Admin User`

**Or create a new account:**

- Use any valid email format
- Password must be at least 6 characters
- Full name is required

## 📱 Responsive Design

### Mobile (< 768px)

- Stacked layout with hamburger menu
- Full-width cards and forms
- Touch-friendly button sizes
- Collapsible sidebar with slide-out sheet

### Tablet (768px - 1024px)

- Two-column grid layouts
- Optimized spacing and typography
- Responsive sidebar behavior

### Desktop (> 1024px)

- Three-column layouts where appropriate
- Fixed sidebar navigation
- Max-width 1440px container
- Hover states and interactions

## ♿ Accessibility Features

### Semantic HTML

- Proper heading hierarchy (h1, h2, h3)
- Semantic elements (`<main>`, `<section>`, `<nav>`)
- Form labels and associations

### Keyboard Navigation

- Tab order and focus management
- Visible focus indicators
- Skip links where appropriate

### Color & Contrast

- WCAG-compliant color contrast ratios
- Status colors with sufficient contrast:
  - Open tickets: Green (#16a34a)
  - In Progress: Amber (#d97706)
  - Closed: Gray (#6b7280)

### Screen Reader Support

- ARIA labels and descriptions
- Alternative text for decorative elements
- Meaningful link text

## 🧪 Data Validation

### Ticket Validation Rules

- **Title**: Required, 1-100 characters
- **Description**: Optional, max 500 characters
- **Status**: Required, must be one of: `open`, `in_progress`, `closed`
- **Priority**: Optional, must be one of: `low`, `medium`, `high`

### Authentication Validation

- **Email**: Valid email format required
- **Password**: Minimum 6 characters
- **Name**: Required for registration

### Error Handling

- Real-time validation with inline error messages
- Toast notifications for system-level errors
- Graceful fallbacks for failed operations

## � Known Limitations

- No backend integration (localStorage only)
- No user avatar/profile images
- No ticket attachments
- No real-time collaboration
- No email notifications
- No password reset functionality
- No pagination (all tickets loaded at once)

## 🔮 Future Enhancements

- [ ] Backend API integration (REST/GraphQL)
- [ ] User profile management
- [ ] Ticket assignment to users
- [ ] Comments/activity log per ticket
- [ ] File attachments
- [ ] Email notifications
- [ ] Advanced filtering (date ranges, priority)
- [ ] Sorting options
- [ ] Export to CSV/PDF
- [ ] Dark mode toggle
- [ ] Multi-language support

## � Development Commands

```bash
# Install new dependencies
pnpm add <package-name>

# Add shadcn-vue component
pnpm dlx shadcn-vue@latest add <component-name>

# Type checking
pnpm vue-tsc --noEmit

# Linting
pnpm eslint src/
```

## 🤝 Contributing

This project is a learning exercise and migration reference. Feel free to:

- Report bugs via issues
- Suggest enhancements
- Submit pull requests for improvements

## 📄 License

This project is part of the HNG Frontend Stage 2 requirements.

---

**Built with ❤️ for the HNG Internship Program**
