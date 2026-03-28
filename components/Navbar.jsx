'use client'

import { useSession, signIn, signOut } from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

export default function Navbar() {
  const { data: session } = useSession()
  const [mobileMenu, setMobileMenu] = useState(false)

  return (
    <nav className="glass sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold">
            <span className="text-[#00ff00]">Phantom</span> Bot
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-6 items-center">
            <Link href="/dashboard" className="hover:text-[#00ff00] transition">Dashboard</Link>
            <Link href="/videos" className="hover:text-[#00ff00] transition">Videos</Link>
            <Link href="/docs" className="hover:text-[#00ff00] transition">Docs</Link>
            
            {session ? (
              <>
                <Link href="/profile" className="flex items-center gap-2 hover:text-[#00ff00]">
                  {session.user.image && (
                    <Image 
                      src={session.user.image} 
                      alt={session.user.name || 'User'} 
                      width={32} 
                      height={32} 
                      className="rounded-full"
                    />
                  )}
                  <span className="hidden lg:inline">{session.user.name}</span>
                </Link>
                <button onClick={() => signOut()} className="btn-secondary">Logout</button>
              </>
            ) : (
              <button onClick={() => signIn('github')} className="btn-primary">Login</button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setMobileMenu(!mobileMenu)}>
            ☰
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenu && (
          <div className="md:hidden mt-4 flex flex-col gap-4">
            <Link href="/dashboard" className="hover:text-[#00ff00]">Dashboard</Link>
            <Link href="/videos" className="hover:text-[#00ff00]">Videos</Link>
            <Link href="/docs" className="hover:text-[#00ff00]">Docs</Link>
            {session ? (
              <>
                <Link href="/profile">Profile</Link>
                <button onClick={() => signOut()} className="btn-secondary">Logout</button>
              </>
            ) : (
              <button onClick={() => signIn('github')} className="btn-primary">Login</button>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}