'use client'

import { useEffect, useState } from 'react'

export default function StatsCounter({ users, deployments }) {
  const [countUsers, setCountUsers] = useState(0)
  const [countDeployments, setCountDeployments] = useState(0)

  useEffect(() => {
    const duration = 2000
    const stepTime = 20
    const userSteps = users / (duration / stepTime)
    const deploySteps = deployments / (duration / stepTime)
    
    let currentUsers = 0
    let currentDeployments = 0
    
    const interval = setInterval(() => {
      if (currentUsers < users) {
        currentUsers = Math.min(currentUsers + userSteps, users)
        setCountUsers(Math.floor(currentUsers))
      }
      if (currentDeployments < deployments) {
        currentDeployments = Math.min(currentDeployments + deploySteps, deployments)
        setCountDeployments(Math.floor(currentDeployments))
      }
      if (currentUsers >= users && currentDeployments >= deployments) {
        clearInterval(interval)
      }
    }, stepTime)
    
    return () => clearInterval(interval)
  }, [users, deployments])

  return (
    <div className="grid grid-cols-2 gap-8 max-w-2xl mx-auto mt-12">
      <div className="card text-center">
        <div className="text-4xl font-bold text-[#00ff00]">{countUsers}+</div>
        <div className="text-gray-400">Active Users</div>
      </div>
      <div className="card text-center">
        <div className="text-4xl font-bold text-[#00ff00]">{countDeployments}+</div>
        <div className="text-gray-400">Bot Deployments</div>
      </div>
    </div>
  )
}