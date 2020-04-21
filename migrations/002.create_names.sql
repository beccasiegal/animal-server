CREATE TABLE names (
  id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  nameText TEXT NOT NULL,
  date_created TIMESTAMP DEFAULT now() NOT NULL,
  votes INTEGER NOT NULL,
  animalsId INTEGER REFERENCES animals(id) ON DELETE CASCADE NOT NULL
);