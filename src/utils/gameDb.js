import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const file = path.join(__dirname, 'database', 'game.json')

if (!fs.existsSync(file)) {
  fs.mkdirSync(path.dirname(file), { recursive: true })
  fs.writeFileSync(file, JSON.stringify({ tebakgambar: [] }, null, 2))
}

const adapter = new JSONFile(file)
const db = new Low(adapter, { tebakgambar: {} })

await db.read()
db.data ||= { tebakgambar: [] }

export default db