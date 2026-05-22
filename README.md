Project Overview: Highlighting the React + Vite single-page application (SPA).
Key Tech Stack: React, Vite, Zustand (State Management), React Router DOM (Routing), Axios (HTTP Client), React Hot Toast (Notifications), CSS/Tailwind (Styles).
Key Features:
Dynamic dashboards based on user role (USER, AUTHOR, ADMIN).
Protected Routes wrapper (ProtectedRoute.jsx) to enforce access controls.
Article management interface for authors (Write/Edit articles).
Comment section for logged-in readers.
User authentication state synchronized globally using Zustand.
Configuration:
Environment variable VITE_API_URL pointing to local backend (http://localhost:4000) or deployed instance on Vercel.
Launch Instructions: npm install and npm run dev to boot up.
