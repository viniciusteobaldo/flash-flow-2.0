import { Database } from 'node-sqlite3-wasm'
import path from 'path'

const dbPath = process.env.DATABASE_URL || path.resolve(__dirname, '../../../flashflow.db')

const db = new Database(dbPath)

db.exec(`
  CREATE TABLE IF NOT EXISTS flashcards (
    id TEXT PRIMARY KEY,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    category TEXT NOT NULL,
    created_at TEXT NOT NULL
  )
`)

export default db
