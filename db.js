import * as SQLite from "expo-sqlite";

const DATABASE_NAME = "myLocation.sqlite";
const SQL_CREATE = `
CREATE TABLE IF NOT EXISTS locations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  latitude REAL NOT NULL,
  longitude REAL NOT NULL
);
`;

let db = null;

export default function openDB() {
  if (!db) {
    db = SQLite.openDatabaseSync(DATABASE_NAME);

    // primeira vez que iremos abrir a conexão,
    // tentaremos criar nossas tabelas
    db.withTransactionSync(() => {
      db.execSync(SQL_CREATE);
    });
  }

  return db;
}
