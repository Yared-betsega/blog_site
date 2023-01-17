import { Router } from 'express';
import { respond } from '../../middlewares/respond';
import {
  addTag,
  getAllTag,
  updateTag
} from './tag.controller';
const tagRouter = Router();

tagRouter.get('/', getAllTag, respond);
tagRouter.post('/', addTag, respond);
tagRouter.patch('/:id', updateTag, respond);


export default tagRouter;
