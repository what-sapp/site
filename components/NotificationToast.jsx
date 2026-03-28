'use client'

import { useEffect, useState } from 'react'

export default function NotificationToast() {
  const [notifications, setNotifications] = useState([])
  const [visible, setVisible] = useState({})

  useEffect(() => {
    fetch('/api/notifications')
      .then(res => res.json())
      .then(data => {
        setNotifications(data)
        data.forEach(notif => {
          if (notif.active) {
            setTimeout(() => {
              setVisible(prev => ({ ...prev, [notif.id]: true }))
              setTimeout(() => {
                setVisible(prev => ({ ...prev, [notif.id]: false }))
              }, 5000)
            }, notif.id * 1000)
          }
        })
      })
  }, [])

  const dismiss = (id) => {
    setVisible(prev => ({ ...prev, [id]: false }))
  }

  const getTypeClass = (type) => {
    switch(type) {
      case 'success': return 'bg-green-900/80 border-green-500'
      case 'warning': return 'bg-yellow-900/80 border-yellow-500'
      case 'error': return 'bg-red-900/80 border-red-500'
      default: return 'bg-blue-900/80 border-blue-500'
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      {notifications.map(notif => visible[notif.id] && (
        <div key={notif.id} className={`${getTypeClass(notif.type)} border rounded-lg p-4 max-w-sm animate-slide-in`}>
          <div className="flex justify-between items-start">
            <p className="text-sm">{notif.message}</p>
            {notif.dismissible && (
              <button onClick={() => dismiss(notif.id)} className="ml-4 text-gray-400 hover:text-white">
                ×
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}