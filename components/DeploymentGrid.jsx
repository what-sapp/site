'use client'

import { useState } from 'react'
import PanelModal from './PanelModal'

export default function DeploymentGrid({ forkVerified }) {
  const [loading, setLoading] = useState(null)
  const [showPanelModal, setShowPanelModal] = useState(false)

  const deployToRender = async () => {
    setLoading('render')
    try {
      const response = await fetch('/api/deploy-render', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ config: localStorage.getItem('phantom_env') })
      })
      const data = await response.json()
      window.open(data.url, '_blank')
    } catch (error) {
      alert('Deployment failed')
    } finally {
      setLoading(null)
    }
  }

  const deployToHeroku = async () => {
    setLoading('heroku')
    try {
      const response = await fetch('/api/deploy-heroku', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ config: localStorage.getItem('phantom_env') })
      })
      const data = await response.json()
      window.open(data.url, '_blank')
    } catch (error) {
      alert('Deployment failed')
    } finally {
      setLoading(null)
    }
  }

  const downloadBot = async () => {
    setLoading('download')
    try {
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
    } catch (error) {
      alert('Download failed')
    } finally {
      setLoading(null)
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-[#00ff00]">🚀 Deployment Options</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Render */}
        <button 
          onClick={deployToRender}
          disabled={loading || !forkVerified}
          className="card text-center hover:border-[#00ff00]"
        >
          <div className="text-3xl mb-2">⚡</div>
          <h3 className="font-bold">Deploy to Render</h3>
          <p className="text-sm text-gray-400">One-click deployment</p>
        </button>

        {/* Heroku */}
        <button 
          onClick={deployToHeroku}
          disabled={loading || !forkVerified}
          className="card text-center hover:border-[#00ff00]"
        >
          <div className="text-3xl mb-2">🪴</div>
          <h3 className="font-bold">Deploy to Heroku</h3>
          <p className="text-sm text-gray-400">One-click deployment</p>
        </button>

        {/* Panel Hosting */}
        <button 
          onClick={() => setShowPanelModal(true)}
          disabled={!forkVerified}
          className="card text-center hover:border-[#00ff00]"
        >
          <div className="text-3xl mb-2">🎮</div>
          <h3 className="font-bold">Panel Hosting</h3>
          <p className="text-sm text-gray-400">Katabump, Pterodactyl, VPS</p>
        </button>

        {/* Download */}
        <button 
          onClick={downloadBot}
          disabled={loading || !forkVerified}
          className="card text-center hover:border-[#00ff00]"
        >
          <div className="text-3xl mb-2">📦</div>
          <h3 className="font-bold">Download ZIP</h3>
          <p className="text-sm text-gray-400">With your config</p>
        </button>
      </div>

      <PanelModal 
        isOpen={showPanelModal} 
        onClose={() => setShowPanelModal(false)} 
      />
    </div>
  )
}