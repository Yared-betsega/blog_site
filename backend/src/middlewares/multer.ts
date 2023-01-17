/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request } from 'express'
import multer from 'multer'
import path from 'path'

export const filter = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req: Request, file:any, cb:any) => {
    const ext = path.extname(file.originalname)
    if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
      cb(null, false)
      return
    }
    cb(null, true)
  }
})
