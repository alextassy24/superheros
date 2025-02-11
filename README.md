# Superhero Humility Tracker

This project consists of two parts:

1. **Hono API**: A lightweight API built with the Hono framework that lets users add and fetch superheroes (with name, superpower, and humility score).  
2. **React App**: A simple frontend built with React that interacts with the API to display and add superheroes.

---

## Project Setup

### Hono API (Server)
- **Location:** `/server`
- **Requirements:** Bun
- **Installation & Run:**
  1. Install dependencies:
     ```bash
     bun install
     ```
  2. Start the server:
     ```bash
     bun run index.js
     ```
- **Endpoints:**
  - `GET /superheroes`: Retrieves all superheroes (sorted by humility score).
  - `POST /superheroes`: Adds a new superhero.  
- **Note:** CORS is enabled to allow cross-origin requests from the React frontend.
