import { Router } from 'express';
import { respond } from '../../middlewares/respond';
import {
  addInformation,
  updateInformation,
  deleteInformation,
  getInformationById,
  getAllInformation,
} from './information.controller';
const informationRouter = Router();

informationRouter.get('/', getAllInformation, respond);
informationRouter.get('/:id', getInformationById, respond);
informationRouter.post('/', addInformation, respond);
informationRouter.patch('/:id', updateInformation, respond);
informationRouter.delete('/:id', deleteInformation, respond);

export default informationRouter;
