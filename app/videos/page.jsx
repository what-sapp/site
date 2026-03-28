'use client'

import { useState } from 'react'

const VIDEOS = [
  {
    id: 1,
    title: 'How to Deploy Phantom Bot on Render',
    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '5:32',
    category: 'Deployment'
  },
  {
    id: 2,
    title: 'Setting Up .env Configuration',
    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '3:45',
    category: 'Configuration'
  },
  {
    id: 3,
    title: 'Deploy on Heroku Step by Step',
    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '4:20',
    category: 'Deployment'
  },
  {
    id: 4,
    title: 'Panel Hosting Guide (Katabump, Pterodactyl)',
    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '8:15',
    category: 'Panel'
  },
  {
    id: 5,
    title: 'Getting Session ID for Phantom Bot',
    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '2:30',
    category: 'Setup'
  }
]

export default function Videos() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')

  const categories = ['All', ...new Set(VIDEOS.map(v => v.category))]

  const filteredVideos = VIDEOS.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = category === 'All' || video.category === category
    return matchesSearch && matchesCategory
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-[#00ff00]">📹 Video Tutorials</h1>
      
      {/* Search and Filter */}
      <div className="flex flex-wrap gap-4 mb-8">
        <input
          type="text"
          placeholder="Search videos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 p-2 bg-black border border-[#00ff00] rounded text-white"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 bg-black border border-[#00ff00] rounded text-white"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Videos Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.map(video => (
          <div key={video.id} className="card">
            <div className="aspect-video bg-black rounded mb-4">
              <iframe
                src={video.url}
                title={video.title}
                className="w-full h-full rounded"
                allowFullScreen
              />
            </div>
            <h3 className="font-bold mb-2">{video.title}</h3>
            <div className="flex justify-between text-sm text-gray-400">
              <span>{video.category}</span>
              <span>{video.duration}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}