import { Hono } from "hono";
import { cors } from 'hono/cors'

const app = new Hono();

const superheroes = [];

app.use('*', cors());

// GET /superheroes: Return the list of superheroes sorted by humilityScore (desc)
app.get("/superheroes", (c) => {
  const sortedHeroes = superheroes.slice().sort((a, b) => b.humilityScore - a.humilityScore);
  return c.json(sortedHeroes);
});

// POST /superheroes: Add a new superhero
app.post("/superheroes", async (c) => {
  const hero = await c.req.json();

  // Validate required fields
  if (!hero.name || !hero.superpower || hero.humilityScore === undefined) {
    return c.json(
      { error: "Missing required fields: name, superpower, and humilityScore are required." },
      400
    );
  }

  // Validate that humilityScore is a number
  if (typeof hero.humilityScore !== "number") {
    return c.json({ error: "humilityScore must be a number." }, 400);
  }

   // Validate that humilityScore is betweeen 1 and 10
   if (hero.humilityScore < 1 || hero.humilityScore > 10) {
    return c.json({ error: "humilityScore must be between 1 and 10." }, 400);
  }

  superheroes.push(hero);
  return c.json(hero, 201);
});

// A simple home endpoint
app.get("/", (c) => c.text("Hello, Hono!"));

// Use Bun.serve to start the server on port 3000
Bun.serve({
  fetch: app.fetch,
  port: 3000,
});

console.log("Server running on http://localhost:3000");
