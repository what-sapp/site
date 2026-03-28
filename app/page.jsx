'use client'

import { useSession, signIn } from 'next-auth/react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import StatsCounter from '@/components/StatsCounter'

export default function Home() {
  const { data: session } = useSession()
  const [stats, setStats] = useState({ users: 0, deployments: 0 })

  useEffect(() => {
    // Fetch stats
    fetch('/api/stats')
      .then(res => res.json())
      .then(data => setStats(data))
  }, [])

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-6">
            <span className="text-[#00ff00]">Phantom</span> Bot
          </h1>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Deploy your custom Phantom WhatsApp bot with one click. 
            Configure, customize, and deploy to multiple platforms instantly.
          </p>
          
          {!session ? (
            <button 
              onClick={() => signIn('github')}
              className="btn-primary text-lg px-8 py-4"
            >
              🚀 Get Started with GitHub
            </button>
          ) : (
            <Link href="/dashboard">
              <button className="btn-primary text-lg px-8 py-4">
                🎯 Go to Dashboard
              </button>
            </Link>
          )}
        </div>

        {/* Stats Counter */}
        <StatsCounter users={stats.users} deployments={stats.deployments} />

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mt-20">
          <div className="card text-center">
            <div className="text-4xl mb-4">⚙️</div>
            <h3 className="text-xl font-bold mb-2">Edit .env File</h3>
            <p className="text-gray-400">Customize your bot configuration with Monaco editor</p>
          </div>
          
          <div className="card text-center">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-xl font-bold mb-2">One-Click Deploy</h3>
            <p className="text-gray-400">Deploy to Render, Heroku, and more platforms</p>
          </div>
          
          <div className="card text-center">
            <div className="text-4xl mb-4">📦</div>
            <h3 className="text-xl font-bold mb-2">Download ZIP</h3>
            <p className="text-gray-400">Get complete bot with your configuration</p>
          </div>
          
          <div className="card text-center">
            <div className="text-4xl mb-4">🎮</div>
            <h3 className="text-xl font-bold mb-2">Panel Hosting</h3>
            <p className="text-gray-400">Instructions for Katabump, Pterodactyl, VPS</p>
          </div>
          
          <div className="card text-center">
            <div className="text-4xl mb-4">📹</div>
            <h3 className="text-xl font-bold mb-2">Video Tutorials</h3>
            <p className="text-gray-400">Step-by-step video guides</p>
          </div>
          
          <div className="card text-center">
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-xl font-bold mb-2">Documentation</h3>
            <p className="text-gray-400">Complete guides and FAQ</p>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-20 py-8 text-center text-gray-500">
          <p>Developed by Phantom Dev</p>
          <div className="flex justify-center gap-4 mt-2">
            <a href="https://whatsapp.com/channel/0029Vb57ZHh7IUYcNttXEB3y" target="_blank" className="hover:text-[#00ff00]">WhatsApp Channel</a>
            <a href="https://github.com/what-sapp" target="_blank" className="hover:text-[#00ff00]">GitHub</a>
          </div>
        </footer>
      </div>
    </div>
  )
}