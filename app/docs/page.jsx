'use client'

import { useState } from 'react'

export default function Docs() {
  const [activeSection, setActiveSection] = useState('getting-started')

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="lg:w-1/4">
          <div className="glass sticky top-20 p-4">
            <h3 className="font-bold mb-4 text-[#00ff00]">Documentation</h3>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => setActiveSection('getting-started')}
                  className={`w-full text-left p-2 rounded ${activeSection === 'getting-started' ? 'bg-[#00ff00]/20 text-[#00ff00]' : 'hover:bg-white/10'}`}
                >
                  🚀 Getting Started
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveSection('configuration')}
                  className={`w-full text-left p-2 rounded ${activeSection === 'configuration' ? 'bg-[#00ff00]/20 text-[#00ff00]' : 'hover:bg-white/10'}`}
                >
                  ⚙️ Configuration
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveSection('deployment')}
                  className={`w-full text-left p-2 rounded ${activeSection === 'deployment' ? 'bg-[#00ff00]/20 text-[#00ff00]' : 'hover:bg-white/10'}`}
                >
                  🚀 Deployment
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveSection('faq')}
                  className={`w-full text-left p-2 rounded ${activeSection === 'faq' ? 'bg-[#00ff00]/20 text-[#00ff00]' : 'hover:bg-white/10'}`}
                >
                  ❓ FAQ
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveSection('troubleshooting')}
                  className={`w-full text-left p-2 rounded ${activeSection === 'troubleshooting' ? 'bg-[#00ff00]/20 text-[#00ff00]' : 'hover:bg-white/10'}`}
                >
                  🔧 Troubleshooting
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Content */}
        <div className="lg:w-3/4">
          {activeSection === 'getting-started' && (
            <div className="card">
              <h1 className="text-2xl font-bold mb-4 text-[#00ff00]">Getting Started with Phantom Bot</h1>
              <div className="space-y-4">
                <div className="terminal p-4">
                  <p className="text-[#00ff00]">Step 1: Fork the Repository</p>
                  <p className="mt-2">Visit https://github.com/what-sapp/Phantom and click the Fork button.</p>
                </div>
                <div className="terminal p-4">
                  <p className="text-[#00ff00]">Step 2: Get Your Session ID</p>
                  <p className="mt-2">Go to https://session-j5sy.onrender.com to generate your SESSION_ID.</p>
                  <p className="text-yellow-500 mt-2">⚠️ IMPORTANT: Your SESSION_ID must start with "PHANTOM"</p>
                </div>
                <div className="terminal p-4">
                  <p className="text-[#00ff00]">Step 3: Configure .env File</p>
                  <p className="mt-2">Edit the .env file with your SESSION_ID, SUDO number, and other preferences.</p>
                </div>
                <div className="terminal p-4">
                  <p className="text-[#00ff00]">Step 4: Deploy Your Bot</p>
                  <p className="mt-2">Choose one of the deployment options: Render, Heroku, Panel Hosting, or Download ZIP.</p>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'configuration' && (
            <div className="card">
              <h1 className="text-2xl font-bold mb-4 text-[#00ff00]">Configuration Guide</h1>
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-[#00ff00]">SESSION_ID</h3>
                  <p>Required. Must start with "PHANTOM". Get it from: https://session-j5sy.onrender.com</p>
                </div>
                <div>
                  <h3 className="font-bold text-[#00ff00]">SUDO</h3>
                  <p>Your WhatsApp number (without +). Example: 256752792178</p>
                </div>
                <div>
                  <h3 className="font-bold text-[#00ff00]">API_ID</h3>
                  <p>API endpoint URL: https://terrisapi.zone.id/</p>
                </div>
                <div>
                  <h3 className="font-bold text-[#00ff00]">BOT_INFO</h3>
                  <p>Bot display name format: "Name;Username"</p>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'faq' && (
            <div className="card">
              <h1 className="text-2xl font-bold mb-4 text-[#00ff00]">Frequently Asked Questions</h1>
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold">❓ How do I get a SESSION_ID?</h3>
                  <p>Visit https://session-j5sy.onrender.com and follow the instructions to generate your session ID.</p>
                </div>
                <div>
                  <h3 className="font-bold">❓ Why does my SESSION_ID need to start with PHANTOM?</h3>
                  <p>This is a validation requirement to ensure the session ID is compatible with Phantom Bot.</p>
                </div>
                <div>
                  <h3 className="font-bold">❓ Can I deploy on free hosting?</h3>
                  <p>Yes! Render and Heroku offer free tiers perfect for running your bot.</p>
                </div>
                <div>
                  <h3 className="font-bold">❓ Is the bot free?</h3>
                  <p>Yes, Phantom Bot is completely free and open source!</p>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'troubleshooting' && (
            <div className="card">
              <h1 className="text-2xl font-bold mb-4 text-[#00ff00]">Troubleshooting</h1>
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold">⚠️ Invalid SESSION_ID error</h3>
                  <p>Make sure your SESSION_ID starts with "PHANTOM". Generate a new one if needed.</p>
                </div>
                <div>
                  <h3 className="font-bold">⚠️ Bot not responding</h3>
                  <p>Check if your SUDO number is correct (without +) and you're the owner.</p>
                </div>
                <div>
                  <h3 className="font-bold">⚠️ Deployment fails</h3>
                  <p>Ensure you've forked the repository and configured all required environment variables.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}