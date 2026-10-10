-- Run once in ksi-visits → Console. Safe to run again; does not reset counts.
CREATE TABLE IF NOT EXISTS visit_tokens (
  day TEXT NOT NULL,
  token_hash TEXT NOT NULL,
  PRIMARY KEY (day, token_hash)
) WITHOUT ROWID;

CREATE TABLE IF NOT EXISTS visit_days (
  day TEXT PRIMARY KEY,
  visits INTEGER NOT NULL CHECK (visits >= 0)
) WITHOUT ROWID;

CREATE TABLE IF NOT EXISTS visit_total (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  visits INTEGER NOT NULL CHECK (visits >= 0),
  started_on TEXT NOT NULL
);

-- This trigger runs only for a new daily token, in the same transaction.
CREATE TRIGGER IF NOT EXISTS count_new_visit
AFTER INSERT ON visit_tokens
BEGIN
  INSERT INTO visit_days (day, visits) VALUES (NEW.day, 1)
  ON CONFLICT (day) DO UPDATE SET visits = visits + 1;
  INSERT INTO visit_total (id, visits, started_on) VALUES (1, 1, NEW.day)
  ON CONFLICT (id) DO UPDATE SET visits = visits + 1;
END;
