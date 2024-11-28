'use client'

import { useState } from 'react'
import { ConnectionForm } from '@/app/components/ConnectionForm'
import { ChatInterface } from './components/ChatInterface'
import { connectToDatabase, executeQuery } from './actions/db'

export default function Home() {
  const [isConnected, setIsConnected] = useState(false)

  const handleConnect = async (config: any) => {
    const result = await connectToDatabase(config)
    if (result.success) {
      setIsConnected(true)
    } else {
      alert(result.message)
    }
  }

  const handleSendMessage = async (message: string) => {
    // Convert natural language to SQL
    const response = await fetch('/api/ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: message })
    })
    const sqlQuery = await response.text()

    // Execute the SQL query
    const result = await executeQuery(sqlQuery)

    if (result.success) {
      return `SQL Query: ${sqlQuery}\n\nResult: ${JSON.stringify(result.data, null, 2)}`
    } else {
      return `Error: ${result.message}`
    }
  }

  return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24 space-y-8">
        {!isConnected ? (
            <ConnectionForm onConnect={handleConnect} />
        ) : (
            <ChatInterface onSendMessage={handleSendMessage} />
        )}
      </main>
  )
}

