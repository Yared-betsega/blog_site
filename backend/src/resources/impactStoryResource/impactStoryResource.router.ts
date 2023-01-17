import { Router } from 'express';
import { respond } from '../../middlewares/respond';
import { getAllImpactStoryResources, addImpactStoryResources } from './impactStoryResource.controller';
export const impactStoryRouter = Router();
impactStoryRouter.get('/impacts', getAllImpactStoryResources, respond);
impactStoryRouter.post('/impact/add', addImpactStoryResources, respond);
