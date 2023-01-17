import { Router } from 'express';
import { addContent, getAllContents } from './content.controller';
import { respond } from '../../middlewares/respond';
const contentRouter = Router()
contentRouter.post('/add', addContent, respond)
contentRouter.get('/', getAllContents, respond)
export default contentRouter
