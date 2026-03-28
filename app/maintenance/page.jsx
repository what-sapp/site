'use client'

import { useEffect, useState } from 'react'

export default function Maintenance() {
  const [maintenance, setMaintenance] = useState(null)
  const [timeLeft, setTimeLeft] = useState({})

  useEffect(() => {
    fetch('/api/maintenance')
      .then(res => res.json())
      .then(data => setMaintenance(data))
  }, [])

  useEffect(() => {
    if (maintenance?.endTime) {
      const interval = setInterval(() => {
        const end = new Date(maintenance.endTime)
        const now = new Date()
        const diff = end - now
        
        if (diff <= 0) {
          clearInterval(interval)
          setTimeLeft({})
          return
        }
        
        const hours = Math.floor(diff / (1000 * 60 * 60))
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((diff % (1000 * 60)) / 1000)
        
        setTimeLeft({ hours, minutes, seconds })
      }, 1000)
      
      return () => clearInterval(interval)
    }
  }, [maintenance])

  if (!maintenance) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="terminal text-center">
          <p className="text-[#00ff00]">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="glass max-w-2xl w-full p-8 text-center">
        <div className="text-6xl mb-6">🔧</div>
        <h1 className="text-3xl font-bold mb-4 text-[#00ff00]">Maintenance Mode</h1>
        <p className="text-gray-400 mb-8">{maintenance.message || "We're currently updating the system. We'll be back soon!"}</p>
        
        {timeLeft.hours !== undefined && (
          <div className="mb-8">
            <h2 className="text-xl mb-4">Time until return:</h2>
            <div className="grid grid-cols-3 gap-4 max-w-xs mx-auto">
              <div className="card text-center">
                <div className="text-2xl font-bold text-[#00ff00]">{timeLeft.hours}</div>
                <div className="text-sm text-gray-400">Hours</div>
              </div>
              <div className="card text-center">
                <div className="text-2xl font-bold text-[#00ff00]">{timeLeft.minutes}</div>
                <div className="text-sm text-gray-400">Minutes</div>
              </div>
              <div className="card text-center">
                <div className="text-2xl font-bold text-[#00ff00]">{timeLeft.seconds}</div>
                <div className="text-sm text-gray-400">Seconds</div>
              </div>
            </div>
          </div>
        )}
        
        <div className="flex justify-center gap-4">
          {maintenance.socialLinks?.whatsapp && (
            <a href={maintenance.socialLinks.whatsapp} target="_blank" className="text-[#00ff00] hover:underline">
              📱 WhatsApp Channel
            </a>
          )}
          {maintenance.socialLinks?.github && (
            <a href={maintenance.socialLinks.github} target="_blank" className="text-[#00ff00] hover:underline">
              🐙 GitHub
            </a>
          )}
        </div>
        
        <div className="mt-8 text-sm text-gray-500">
          <p>Contact: +256752792178 | +254784937112</p>
        </div>
      </div>
    </div>
  )
}