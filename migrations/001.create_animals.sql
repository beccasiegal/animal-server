CREATE TABLE animals (
  id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  imageUrl TEXT NOT NULL,
  date_created TIMESTAMP DEFAULT now() NOT NULL
);