# TODO: Fix Hanko Integration

## Tasks
- [x] Update HankoAuth.jsx: Change redirect from "/dashboard" to "/".
- [x] Update App.jsx: Add /profile route using HankoProfile component.
- [x] Update Register.jsx: Replace custom form with <hanko-registration> element.
- [x] Update Navbar.jsx: Add authentication state check, show Profile/Logout if logged in, Login if not. Add logout functionality using Hanko.logout().

## Followup Steps
- Test login, registration, profile access, and logout.
- Ensure VITE_HANKO_API_URL environment variable is set.
