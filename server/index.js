import express from 'express'
import cors from 'cors'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import fs from 'fs/promises'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json())

// Path to config file
const CONFIG_PATH = join(__dirname, '..', 'data', 'calendar-config.json')
const BACKUP_CONFIG_PATH = join(__dirname, '..', 'intructions', 'calendar-config.json')

// Ensure data directory exists
async function ensureDataDirectory() {
  const dataDir = join(__dirname, '..', 'data')
  try {
    await fs.access(dataDir)
  } catch {
    await fs.mkdir(dataDir, { recursive: true })
  }
}

// Initialize config file from backup if it doesn't exist
async function initializeConfig() {
  try {
    await fs.access(CONFIG_PATH)
  } catch {
    // Config doesn't exist, copy from instructions
    try {
      const backupConfig = await fs.readFile(BACKUP_CONFIG_PATH, 'utf-8')
      await fs.writeFile(CONFIG_PATH, backupConfig)
      console.log('✅ Initialized config from instructions folder')
    } catch (error) {
      console.error('❌ Error initializing config:', error)
    }
  }
}

// GET config
app.get('/api/config', async (req, res) => {
  try {
    const data = await fs.readFile(CONFIG_PATH, 'utf-8')
    const config = JSON.parse(data)
    res.json(config)
  } catch (error) {
    console.error('Error reading config:', error)
    res.status(500).json({ error: 'Failed to read configuration' })
  }
})

// POST config (save changes)
app.post('/api/config', async (req, res) => {
  try {
    const config = req.body

    // Validate config structure
    if (!config.weekSettings || !config.schedules) {
      return res.status(400).json({ error: 'Invalid configuration format' })
    }

    // Write to file with pretty formatting
    await fs.writeFile(CONFIG_PATH, JSON.stringify(config, null, 2))

    console.log('✅ Configuration saved successfully')
    res.json({ success: true })
  } catch (error) {
    console.error('Error saving config:', error)
    res.status(500).json({ error: 'Failed to save configuration' })
  }
})

// Start server
async function start() {
  await ensureDataDirectory()
  await initializeConfig()

  app.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════╗
║   🌅 School Calendar Server Running   ║
║                                        ║
║   Backend: http://localhost:${PORT}      ║
║   Status: ✅ Ready                     ║
╚════════════════════════════════════════╝
    `)
  })
}

start()
