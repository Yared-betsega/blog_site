import { Team } from './team.model';
import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
export const getAllTeams = async (req: Request, res: Response, next: NextFunction) => {
  const team = await Team.find({});
  if (team.length == 0) {
    res.locals.json = {
      statusCode: 404,
      data: 'Team member not found',
    };
    return next();
  }
  res.locals.json = {
    statusCode: 200,
    data: team,
  };
  return next();
};

export const post = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, image, title, linkedin, description, country, placement, priority, memberType, phase } =
      req.body;
    const team = await Team.create({
      name,
      email,
      image,
      title,
      linkedin,
      description,
      country,
      placement,
      priority,
      memberType,
      phase,
    });
    res.locals.json = {
      statusCode: 200,
      data: team,
    };
    return next();
  } catch {
    res.locals.json = {
      statusCode: 400,
      data: 'invalid input',
    };
    return next();
  }
};
export const getTeamById = async (req: Request, res: Response, next: NextFunction) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    res.locals.json = {
      statusCode: 400,
      data: 'Invalid ID',
    };
    return next();
  }
  const team = await Team.findById(req.params.id);
  if (!team) {
    res.locals.json = {
      statusCode: 404,
      data: 'Team member not found',
    };
    return next();
  }
  res.locals.json = {
    statusCode: 200,
    data: team,
  };
  return next();
};

export const updateTeam = async (req: Request, res: Response, next: NextFunction) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    res.locals.json = {
      statusCode: 400,
      message: 'Invalid Id',
    };
    return next();
  }

  const team = await Team.findById(req.params.id);
  if (!team) {
    res.locals.json = {
      statusCode: 404,
      message: 'Not found',
    };
    return next();
  }

  team.set(req.body);
  await team.save();
  res.locals.json = {
    statusCode: 200,
    data: team,
  };
  return next();
};
export const filterTeam = async (req: Request, res: Response, next: NextFunction) => {
  const filter = {};
  const name = req.body.name || '';
  const email = req.body.email || '';
  const title = req.body.title || '';
  const phase = req.body.phase || '';
  const memberType = req.body.memberType || '';
  const team = await Team.find({
    name: { $regex: `${name}`, $options: 'i' },
    email: { $regex: `${email}`, $options: 'i' },
    title: { $regex: `${title}`, $options: 'i' },
    phase: { $regex: `${phase}`, $options: 'i' },
    memberType: { $regex: `${memberType}`, $options: 'i' },
  });

  res.locals.json = {
    statusCode: 200,
    data: team,
  };
  return next();
};
export const deleteTeam = async (req: Request, res: Response, next: NextFunction) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    res.locals.json = {
      statusCode: 400,
      message: 'Invalid Id',
    };
    return next();
  }
  const team = await Team.findByIdAndRemove(req.params.id);
  res.locals.json = {
    statusCode: 200,
    data: team,
  };
  return next();
};
