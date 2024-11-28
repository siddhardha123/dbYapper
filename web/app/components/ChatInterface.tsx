'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function ChatInterface({ onSendMessage }: { onSendMessage: (message: string) => Promise<string> }) {
    const [message, setMessage] = useState('')
    const [chat, setChat] = useState<{ role: 'user' | 'assistant', content: string }[]>([])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!message.trim()) return

        setChat(prev => [...prev, { role: 'user', content: message }])
        setMessage('')

        const response = await onSendMessage(message)
        setChat(prev => [...prev, { role: 'assistant', content: response }])
    }

    return (
        <Card className="w-[600px]">
            <CardHeader>
                <CardTitle>Chat with your Database</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[400px] overflow-y-auto mb-4 space-y-4">
                    {chat.map((msg, index) => (
                        <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`rounded-lg p-2 max-w-[70%] ${msg.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                                {msg.content}
                            </div>
                        </div>
                    ))}
                </div>
                <form onSubmit={handleSubmit} className="flex space-x-2">
                    <Input
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Ask a question about your data..."
                        className="flex-grow"
                    />
                    <Button type="submit">Send</Button>
                </form>
            </CardContent>
        </Card>
    )
}

