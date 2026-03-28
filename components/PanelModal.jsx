'use client'

import { useState } from 'react'

const PANELS = [
  {
    name: 'Katabump',
    url: 'https://katabump.com',
    instructions: [
      '1. Download the bot ZIP file below',
      '2. Login to your Katabump account',
      '3. Go to "Upload Bot" section',
      '4. Upload the ZIP file',
      '5. Start the bot instance'
    ]
  },
  {
    name: 'Bot Hosting Net',
    url: 'https://bothosting.net',
    instructions: [
      '1. Download the bot ZIP file',
      '2. Register/Login to Bot Hosting Net',
      '3. Create new bot instance',
      '4. Upload the ZIP file',
      '5. Configure environment variables',
      '6. Start your bot'
    ]
  },
  {
    name: 'Optiklink',
    url: 'https://optiklink.com',
    instructions: [
      '1. Download bot ZIP',
      '2. Login to Optiklink panel',
      '3. Navigate to Bot Manager',
      '4. Upload ZIP file',
      '5. Set .env variables from editor',
      '6. Deploy bot'
    ]
  },
  {
    name: 'Pterodactyl Panel',
    url: 'https://pterodactyl.io',
    instructions: [
      '1. Download bot ZIP',
      '2. Access your Pterodactyl panel',
      '3. Create new server (Node.js)',
      '4. Upload ZIP via File Manager',
      '5. Extract files',
      '6. Set environment variables',
      '7. Start the server'
    ]
  },
  {
    name: 'VPS/Dedicated Server',
    url: '',
    instructions: [
      '1. Download bot ZIP to your VPS',
      '2. Unzip: unzip phantom-bot.zip',
      '3. Navigate to directory: cd phantom-bot',
      '4. Install dependencies: npm install',
      '5. Ensure .env is configured',
      '6. Start bot: npm start',
      '7. Use PM2: pm2 start index.js'
    ]
  }
]

export default function PanelModal({ isOpen, onClose }) {
  const [selectedPanel, setSelectedPanel] = useState(PANELS[0])

  const downloadBot = async () => {
    const response = await fetch('/api/download-bot', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ config: localStorage.getItem('phantom_env') })
    })
    
    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'phantom-bot.zip'
    a.click()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="glass max-w-2xl w-full max-h-[80vh] overflow-y-auto rounded-lg">
        <div className="sticky top-0 glass p-4 border-b border-[#00ff00] flex justify-between">
          <h2 className="text-xl font-bold text-[#00ff00]">Panel Hosting Options</h2>
          <button onClick={onClose} className="text-2xl">&times;</button>
        </div>
        
        <div className="p-4">
          {/* Panel Selection */}
          <div className="mb-6">
            <label className="block mb-2">Select Panel:</label>
            <select 
              onChange={(e) => setSelectedPanel(PANELS.find(p => p.name === e.target.value))}
              className="w-full p-2 bg-black border border-[#00ff00] rounded text-white"
            >
              {PANELS.map(panel => (
                <option key={panel.name} value={panel.name}>{panel.name}</option>
              ))}
            </select>
          </div>

          {/* Instructions */}
          <div className="mb-6">
            <h3 className="font-bold mb-2 text-[#00ff00]">Instructions for {selectedPanel.name}:</h3>
            <div className="bg-black/50 p-4 rounded">
              {selectedPanel.instructions.map((step, i) => (
                <p key={i} className="mb-2 font-mono">📌 {step}</p>
              ))}
            </div>
          </div>

          {/* Download Button */}
          <button 
            onClick={downloadBot}
            className="btn-primary w-full mb-4"
          >
            📥 Download Bot ZIP for {selectedPanel.name}
          </button>

          {/* Panel Link */}
          {selectedPanel.url && (
            <a 
              href={selectedPanel.url} 
              target="_blank" 
              className="text-[#00ff00] underline block text-center"
            >
              Visit {selectedPanel.name} →
            </a>
          )}
        </div>
      </div>
    </div>
  )
}