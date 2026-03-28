'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import LoadingSkeleton from '@/components/LoadingSkeleton'

export default function Profile() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [deployments, setDeployments] = useState([])
  const [passkey, setPasskey] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/')
    }
    
    if (session) {
      fetch('/api/deployments')
        .then(res => res.json())
        .then(data => setDeployments(data))
    }
  }, [session, status, router])

  const verifyPasskey = () => {
    if (passkey === 'uthuman') {
      setIsAdmin(true)
      alert('Admin access granted!')
    } else {
      alert('Invalid passkey')
    }
  }

  if (status === 'loading') {
    return <LoadingSkeleton />
  }

  if (!session) return null

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="card text-center mb-8">
          {session.user.image && (
            <Image 
              src={session.user.image} 
              alt={session.user.name || 'User'} 
              width={96} 
              height={96} 
              className="rounded-full mx-auto mb-4 border-2 border-[#00ff00]"
            />
          )}
          <h1 className="text-2xl font-bold">{session.user.name}</h1>
          <p className="text-gray-400">@{session.user.login || session.user.name}</p>
          <p className="text-gray-400">{session.user.email}</p>
          
          <div className="mt-4 flex justify-center gap-4">
            <a href="https://github.com/what-sapp/Phantom" target="_blank" className="text-[#00ff00]">
              📦 Bot Repository
            </a>
            <a href="https://whatsapp.com/channel/0029Vb57ZHh7IUYcNttXEB3y" target="_blank" className="text-[#00ff00]">
              💬 WhatsApp Channel
            </a>
          </div>
        </div>

        {/* Developer Passkey Section */}
        <div className="card mb-8">
          <h2 className="text-xl font-bold mb-4 text-[#00ff00]">🔐 Developer Access</h2>
          <div className="flex gap-2">
            <input
              type="password"
              placeholder="Enter developer passkey"
              value={passkey}
              onChange={(e) => setPasskey(e.target.value)}
              className="flex-1 p-2 bg-black border border-[#00ff00] rounded text-white"
            />
            <button onClick={verifyPasskey} className="btn-primary">
              Verify
            </button>
          </div>
          {isAdmin && (
            <p className="text-[#00ff00] mt-2">✓ Admin privileges active</p>
          )}
        </div>

        {/* Deployment History */}
        <div className="card">
          <h2 className="text-xl font-bold mb-4 text-[#00ff00]">📊 Deployment History</h2>
          {deployments.length === 0 ? (
            <p className="text-gray-400">No deployments yet. Start deploying!</p>
          ) : (
            <div className="space-y-2">
              {deployments.map((deployment, index) => (
                <div key={index} className="bg-black/50 p-3 rounded">
                  <p className="font-mono">
                    {deployment.platform} - {deployment.status}
                  </p>
                  <p className="text-sm text-gray-400">
                    {new Date(deployment.createdAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Account Stats */}
        <div className="grid md:grid-cols-3 gap-4 mt-8">
          <div className="card text-center">
            <p className="text-2xl font-bold text-[#00ff00]">{deployments.length}</p>
            <p className="text-gray-400">Total Deployments</p>
          </div>
          <div className="card text-center">
            <p className="text-2xl font-bold text-[#00ff00]">1</p>
            <p className="text-gray-400">Active Config</p>
          </div>
          <div className="card text-center">
            <p className="text-2xl font-bold text-[#00ff00]">✓</p>
            <p className="text-gray-400">Verified Account</p>
          </div>
        </div>
      </div>
    </div>
  )
}