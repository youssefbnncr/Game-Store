#!/usr/bin/env node

const { Client } = require("pg");

const SQL = `
-- Create Categories Table
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) UNIQUE NOT NULL
);

-- Create Items Table
CREATE TABLE IF NOT EXISTS items (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  year INTEGER,
  quantity INTEGER DEFAULT 1,
  category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE
);

-- Insert Dummy Categories
INSERT INTO categories (name) VALUES
  ('Action'),
  ('Adventure'),
  ('RPG')
ON CONFLICT (name) DO NOTHING;

-- Insert Dummy Items
INSERT INTO items (name, description, year, quantity, category_id) VALUES
  ('God of War', 'An epic action-adventure game', 2018, 10, (SELECT id FROM categories WHERE name = 'Action')),
  ('The Legend of Zelda', 'A legendary open-world game', 2017, 5, (SELECT id FROM categories WHERE name = 'Adventure')),
  ('Final Fantasy VII', 'A classic RPG with deep story', 1997, 3, (SELECT id FROM categories WHERE name = 'RPG'))
ON CONFLICT (name) DO NOTHING;
`;

async function main() {
  console.log("Seeding database...");

  const client = new Client({
    connectionString: "postgresql://<role_name>:<role_password>@localhost:5432/<your_database_name>",
  });

  try {
    await client.connect();
    await client.query(SQL);
    console.log("Database seeding complete!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await client.end();
  }
}

main();
