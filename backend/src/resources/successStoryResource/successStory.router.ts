import { Router } from 'express';
import { respond } from '../../middlewares/respond';
import { getAllSuccessStoryResources, addSuccessStoryResource } from './successStory.controller';
export const SuccessRouter = Router();
SuccessRouter.get('/', getAllSuccessStoryResources, respond);
SuccessRouter.post('/add', addSuccessStoryResource, respond);
