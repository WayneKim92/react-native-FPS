import fs from "fs";

export const __DEV__ = fs.existsSync('./in-development-environment');

export const sqlCreateFpsTable =
`CREATE TABLE fps (
  id SERIAL PRIMARY KEY,
  fps FLOAT,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);`
