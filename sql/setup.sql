-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS monsters;

CREATE TABLE monsters (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  species TEXT NOT NULL,
  category TEXT NOT NULL,
);

INSERT INTO
  monsters (species, category)
VALUES
  ('werewolf', 'animal'),
  ('vampire', 'humanoid');
