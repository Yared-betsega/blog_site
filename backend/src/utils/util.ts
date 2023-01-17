import { Request } from 'express';
import { Aggregate } from 'mongoose';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const paginate = async (req:Request, query: Aggregate<any[]>) => {
    const limit = parseInt(req.query.limit as string) || 20
    const page = parseInt(req.query.page as string) || 0
    const result = await query
        .skip(page * limit)
        .limit(limit)
    return { meta: { page: page, limit: limit}, data: result}
}