import { Router } from 'express';
import { respond } from '../../middlewares/respond';
import {
  addPartner,
  getAllPartners,
  updatePartner,
  deletePartner,
  getPartnerById,
  addPartnerLink,
} from './partner.controller';
// import { verifyToken } from '../../../middlewares/verifyToken';

const partnerRouter = Router();

partnerRouter.post('/', addPartner, respond);
partnerRouter.get('/', getAllPartners, respond);
partnerRouter.get('/:id', getPartnerById, respond);
partnerRouter.patch('/:id', updatePartner, respond);
partnerRouter.patch('/:id/links', addPartnerLink, respond);
partnerRouter.delete('/:id', deletePartner, respond);

export default partnerRouter;
