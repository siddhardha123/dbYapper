'use server'

import { Pool } from 'pg'

let pool: Pool | null = null

export async function connectToDatabase(config: any) {
    pool = new Pool(config)
    try {
        await pool.query('SELECT NOW()')
        return { success: true, message: 'Connected successfully' }
    } catch (error) {
        return { success: false, message: 'Connection failed' }
    }
}

export async function executeQuery(query: string) {
    if (!pool) {
        throw new Error('Database not connected')
    }
    try {
        const result = await pool.query(query)
        return { success: true, data: result.rows }
    } catch (error) {
        return { success: false, message: (error as Error).message }
    }
}

