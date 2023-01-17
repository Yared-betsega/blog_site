import { response, Router } from 'express';
import { post, getAllTeams, getTeamById, updateTeam, deleteTeam, filterTeam } from './team.controller';
import { respond } from '../../middlewares/respond';
const teamRouter = Router();

teamRouter.post('/', post, respond);
teamRouter.get('/:id', getTeamById, respond);
teamRouter.put('/:id', updateTeam, respond);
teamRouter.get('/', filterTeam, respond);
teamRouter.delete('/:id', deleteTeam, respond);
export default teamRouter;
