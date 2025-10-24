# Migration Mapping — React -> Vue (Ticketly)

This file maps every React source file in `stage2-react/src` to its planned Vue SFC equivalent in `stage2-vue/src` and includes brief notes on conversion details.

Priority: Auth & routing first, then UI primitives, then pages and forms, then QA.

## React -> Vue Mapping

- `src/components/layout/Layout.tsx` -> `src/components/layout/AppLayout.vue`

  - Wraps page content and includes sidebar; convert to slot-based SFC.

- `src/components/layout/Sidebar.tsx` -> `src/components/layout/Sidebar.vue`

  - Fixed desktop width, mobile drawer. Use shadcn/vue or Headless UI for drawer.

- `src/components/layout/AppLayout.tsx` -> `src/components/layout/AppLayout.vue`

  - Keep as top-level layout wrapper.

- `src/components/layout/Footer.tsx` -> `src/components/layout/Footer.vue`

  - Copy markup and Tailwind classes exactly.

- `src/components/ProtectedRoute.tsx` -> `src/components/ProtectedRoute.vue` (or router guard)

  - Implement as router navigation guard (global beforeEach) and optional wrapper component.

- `src/components/forms/EditTicketForm.tsx` -> `src/components/forms/EditTicketForm.vue`

  - Modal-based, prefilled form. Use VeeValidate/Yup or Zod for validation.

- `src/components/forms/CreateTicketForm.tsx` -> `src/components/forms/CreateTicketForm.vue`

  - Modal-based create form.

- `src/components/ui/WaveBackground.tsx` -> `src/components/ui/WaveBackground.vue`

  - Copy inline SVG + Tailwind classes.

- `src/components/ui/button.tsx` -> `src/components/ui/Button.vue`

  - Expose `variant` and `size` props to match shadcn usage.

- `src/components/ui/sonner.tsx` -> use `src/lib/toasts.ts` + Vue Toast lib

  - We'll use Vue Toastification and mirror message strings exactly.

- `src/components/ui/DecorativeCircle.tsx` -> `src/components/ui/DecorativeCircle.vue`

- `src/components/ui/input.tsx` -> `src/components/ui/Input.vue`

- `src/components/ui/card.tsx` -> `src/components/ui/Card.vue`

- `src/components/ui/badge.tsx` -> `src/components/ui/Badge.vue`

- `src/pages/SignupPage.tsx` -> `src/views/SignupPage.vue`

- `src/pages/TicketManagement.tsx` -> `src/views/TicketManagement.vue`

- `src/components/ui/form.tsx` -> utilities / base styles, move to `src/components/ui/FormWrapper.vue` or utils

- `src/pages/LoginPage.tsx` -> `src/views/LoginPage.vue`

- `src/components/ui/textarea.tsx` -> `src/components/ui/Textarea.vue`

- `src/components/ui/label.tsx` -> `src/components/ui/Label.vue`

- `src/components/ui/StatusBadge.tsx` -> `src/components/ui/StatusBadge.vue`

- `src/pages/Dashboard.tsx` -> `src/views/Dashboard.vue`

- `src/components/ui/sheet.tsx` -> `src/components/ui/Sheet.vue` (mobile drawer)

- `src/context/AuthContext.tsx` -> `src/stores/auth.ts` (Pinia)

  - Implement login/signup/logout/initializeAuth with identical localStorage keys and token formats.

- `src/context/TicketContext.tsx` -> `src/stores/tickets.ts` (Pinia)

  - CRUD actions, load/save to `ticketapp_tickets` key.

- `src/types/index.ts` -> `src/types/index.ts` (keep same types in TS)

- `src/context/AppProviders.tsx` -> `src/main.ts` (install Pinia and provide stores)

- `src/assets/react.svg` -> `src/assets/react.svg` (copy)

- `src/utils/statusColors.ts` -> `src/utils/statusColors.ts` (copy)

- `src/lib/utils.ts` -> `src/utils/index.ts` (copy helpers: id/token generation, date formatting)

## Routing mapping

React routes -> Vue routes (per guide):

- `/` -> `views/LandingPage.vue`
- `/auth/login` -> `views/LoginPage.vue`
- `/auth/signup` -> `views/SignupPage.vue`
- `/dashboard` -> `views/Dashboard.vue` (protected)
- `/tickets` -> `views/TicketManagement.vue` (protected)

Implement protected route logic as a router guard that checks `localStorage.getItem('ticketapp_session')`.

## Data & LocalStorage

Keep exact keys and object shapes:

- `ticketapp_session` ("token*" + timestamp + "*" + random)
- `ticketapp_user` (user object)
- `ticketapp_users` (array of users)
- `ticketapp_tickets` (array of tickets)

ID formats:

- user: `user_` + timestamp
- ticket: `ticket_` + timestamp + "\_" + random

## Priority / Implementation plan (short)

1. Add Pinia stores (`auth.ts`, `tickets.ts`) and wire them in `main.ts`.
2. Add router routes and global guard. Ensure dev server boots and auth flows work.
3. Implement Login/Signup views and minimal UI components used by them.
4. Implement Ticket store + TicketManagement view (CRUD + modals).
5. Convert remaining UI primitives and pages.
6. QA: run flows, fix discrepancies, copy assets/styles, create README.

---

This mapping file will be updated as I convert files. Next step: I'll read `stage2-vue/src/router/index.ts` to prepare adding routes and a guard, then create Pinia stores for auth and tickets.
