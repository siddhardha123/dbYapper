'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function ConnectionForm({ onConnect }: { onConnect: (config: any) => void }) {
    const [config, setConfig] = useState({
        host: '',
        port: '',
        database: '',
        user: '',
        password: '',
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onConnect(config)
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Database Connection</CardTitle>
    </CardHeader>

    <CardContent>
    <form onSubmit={handleSubmit} className="space-y-4">
    <div className="space-y-2">
    <Label htmlFor="host">Host</Label>
        <Input
    id="host"
    value={config.host}
    onChange={(e) => setConfig({ ...config, host: e.target.value })}
    required
    />
    </div>
    <div className="space-y-2">
    <Label htmlFor="port">Port</Label>
        <Input
    id="port"
    value={config.port}
    onChange={(e) => setConfig({ ...config, port: e.target.value })}
    required
    />
    </div>
    <div className="space-y-2">
    <Label htmlFor="database">Database</Label>
        <Input
    id="database"
    value={config.database}
    onChange={(e) => setConfig({ ...config, database: e.target.value })}
    required
    />
    </div>
    <div className="space-y-2">
    <Label htmlFor="user">User</Label>
        <Input
    id="user"
    value={config.user}
    onChange={(e) => setConfig({ ...config, user: e.target.value })}
    required
    />
    </div>
    <div className="space-y-2">
    <Label htmlFor="password">Password</Label>
        <Input
    id="password"
    type="password"
    value={config.password}
    onChange={(e) => setConfig({ ...config, password: e.target.value })}
    required
    />
    </div>
    <Button type="submit" className="w-full">Connect</Button>
        </form>
        </CardContent>
        </Card>
)
}
