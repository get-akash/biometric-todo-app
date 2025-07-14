# Biometric Todo App

A secure React Native Todo application that uses biometric authentication (FaceID / Fingerprint) for critical actions like adding, updating, or deleting tasks. Built with:

- **React Native**
- **Zustand** for global state management
- **Expo Local Authentication** for biometric handling

---

## Features

- Add, delete, toggle, and update todos.
- Biometric authentication for critical actions.
- Caching of successful authentication for 2 minutes.
- Zustand state management.
- Graceful fallback if biometric authentication is unavailable.

---

## Architecture Overview

- `App.tsx`: Handles biometric authentication gate before rendering the `HomeScreen`.
- `HomeScreen.tsx`: Main screen with input field, add button, and list of todos.
- `TodoItem.tsx`: Displays individual todos with options to edit, toggle, and delete.
- `TodoDisplay.tsx` & `TodoEditForm.tsx`: Conditionally rendered for view/edit modes.
- `authenticateUser.ts`: Prompts biometric authentication and manages time-based bypass.
- `useAuthenticationGate.ts`: Initial app gate to check for biometric availability and access.
- `zustand store`: Manages todos, auth timestamps, and skip flags.

---

## Installation & Running

```bash
# Install dependencies
npm install

# Run on Expo
npx expo start
```

---

## Future Integrations

We have a stub implementation for exploring advanced Expo local database usage. You can find this under:

```bash
future_integrations/initDB.ts
```
**Note:** This might be overkill for the current scope but is retained for future scaling or experimentation with local DBs like WatermelonDB or advanced SQLite usage.