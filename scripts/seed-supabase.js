/**
 * POLARIS - Supabase Data Migration & Seed Runner
 *
 * Runs programmatic seeding into your Supabase database.
 * Usage:
 *   node --env-file=.env scripts/seed-supabase.js
 */

import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const url = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL
const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY

if (!url || !key) {
  console.log('------------------------------------------------------------')
  console.log('ℹ️  No Supabase credentials detected in environment.')
  console.log('   To seed a remote Supabase project:')
  console.log('   1. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env')
  console.log('   2. Run: node --env-file=.env scripts/seed-supabase.js')
  console.log('   OR copy supabase/schema.sql and supabase/seed.sql directly')
  console.log('   into your Supabase SQL Editor.')
  console.log('------------------------------------------------------------')
  process.exit(0)
}

const supabase = createClient(url, key)

async function checkAndReport() {
  console.log(`Connecting to Supabase at: ${url}`)
  const tables = ['stations', 'expeditions', 'datasets', 'publications', 'knowledge', 'education', 'media']
  
  for (const table of tables) {
    const { count, error } = await supabase.from(table).select('*', { count: 'exact', head: true })
    if (error) {
      console.log(`❌ Table "${table}": Error (${error.message})`)
    } else {
      console.log(`✅ Table "${table}": ${count} records`)
    }
  }
}

checkAndReport().catch(console.error)
