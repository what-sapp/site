'use client'

import { useState, useEffect } from 'react'
import MonacoEditor from '@monaco-editor/react'

const DEFAULT_ENV = `# Session Configuration
SESSION_ID=PHANTOM_74_35_58

# Owner/Sudo Number (without + symbol)
SUDO=256752792178

# API Configuration
API_ID=https://terrisapi.zone.id/

# Bot Information
BOT_INFO=Phantom Dev;Phantom X

# Sticker Pack Information
STICKER_PACK=мα∂є ву; Phantom X

# Warning System
WARN_COUNT=3

# Time Zone
TIME_ZONE=Africa/Kampala

# Debug Mode (true/false)
DEBUG=true`

export default function EnvEditor({ onSave, onValidate }) {
  const [content, setContent] = useState(DEFAULT_ENV)
  const [error, setError] = useState(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    // Load saved config from localStorage or API
    const saved = localStorage.getItem('phantom_env')
    if (saved) setContent(saved)
  }, [])

  const validateConfig = () => {
    const lines = content.split('\n')
    let sessionId = ''
    
    for (let line of lines) {
      if (line.startsWith('SESSION_ID=')) {
        sessionId = line.split('=')[1]?.trim()
        break
      }
    }
    
    if (!sessionId) {
      setError('❌ SESSION_ID is required! Get one from: https://session-j5sy.onrender.com')
      return false
    }
    
    if (!sessionId.startsWith('PHANTOM')) {
      setError('❌ Invalid SESSION_ID! Must start with "PHANTOM". Get a valid session ID from: https://session-j5sy.onrender.com')
      return false
    }
    
    setError(null)
    return true
  }

  const handleSave = async () => {
    if (!validateConfig()) return
    
    setSaving(true)
    try {
      const response = await fetch('/api/save-config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ config: content })
      })
      
      if (response.ok) {
        localStorage.setItem('phantom_env', content)
        alert('✅ Configuration saved successfully!')
        if (onSave) onSave(content)
      }
    } catch (error) {
      alert('Error saving configuration')
    } finally {
      setSaving(false)
    }
  }

  const handleReset = () => {
    if (confirm('Reset to default configuration?')) {
      setContent(DEFAULT_ENV)
      setError(null)
    }
  }

  const getSessionLink = () => {
    window.open('https://session-j5sy.onrender.com', '_blank')
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-[#00ff00]">⚙️ Edit .env Configuration</h2>
        <div className="flex gap-2">
          <button onClick={handleReset} className="btn-secondary">Reset</button>
          <button onClick={() => validateConfig()} className="btn-secondary">Validate</button>
          <button onClick={handleSave} disabled={saving} className="btn-primary">
            {saving ? 'Saving...' : 'Save Config'}
          </button>
        </div>
      </div>
      
      {error && (
        <div className="bg-red-900/50 border border-red-500 rounded p-4">
          <p className="text-red-400">{error}</p>
          <button onClick={getSessionLink} className="mt-2 text-[#00ff00] underline">
            🔗 Click here to get a valid SESSION_ID
          </button>
        </div>
      )}
      
      <div className="terminal h-[500px] overflow-hidden">
        <MonacoEditor
          height="100%"
          language="ini"
          theme="vs-dark"
          value={content}
          onChange={(value) => setContent(value)}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            fontFamily: 'Courier New, monospace',
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            automaticLayout: true,
          }}
        />
      </div>
      
      <div className="text-sm text-gray-400">
        <p>⚠️ <span className="text-[#00ff00]">SESSION_ID must start with "PHANTOM"</span></p>
        <p>📝 Edit the values above to configure your bot</p>
      </div>
    </div>
  )
}