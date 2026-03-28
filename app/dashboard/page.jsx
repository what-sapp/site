'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import EnvEditor from '@/components/EnvEditor'
import DeploymentGrid from '@/components/DeploymentGrid'
import LoadingSkeleton from '@/components/LoadingSkeleton'

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [forkVerified, setForkVerified] = useState(false)
  const [checkingFork, setCheckingFork] = useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/')
    }
    
    if (session) {
      fetch('/api/check-fork')
        .then(res => res.json())
        .then(data => setForkVerified(data.forked))
        .finally(() => setCheckingFork(false))
    }
  }, [session, status, router])

  if (status === 'loading' || checkingFork) {
    return <LoadingSkeleton />
  }

  if (!session) return null

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Welcome, <span className="text-[#00ff00]">{session.user.name}</span>
        </h1>
        <div className="flex items-center gap-4 mt-2">
          {session.user.image && (
            <Image 
              src={session.user.image} 
              alt={session.user.name || 'User'} 
              width={48} 
              height={48} 
              className="rounded-full"
            />
          )}
          <div>
            <p className="text-gray-400">@{session.user.login || session.user.name}</p>
            {forkVerified ? (
              <p className="text-[#00ff00]">✓ Repository forked ✓</p>
            ) : (
              <div>
                <p className="text-yellow-500">⚠️ Please fork the repository first</p>
                <a 
                  href="https://github.com/what-sapp/Phantom" 
                  target="_blank" 
                  className="text-[#00ff00] underline"
                >
                  Click here to fork →
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Env Editor */}
      <div className="mb-8">
        <EnvEditor />
      </div>

      {/* Deployment Options */}
      <DeploymentGrid forkVerified={forkVerified} />
    </div>
  )
}