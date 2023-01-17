import mongoose from 'mongoose';
import { IsupportInterface, Support } from './support.model';
import { NextFunction, Request, Response } from 'express-serve-static-core';
import nodemailer from 'nodemailer';
// import config from '../../config';

/**
 * helper function to send email
 * @param support
 * @returns
 */
const forwardContactUsInformation = async (support: IsupportInterface) => {
  const userMessage: any = {
    from: support.email,
    to: process.env.APP_FORWARD_EMAIL_ADDRESS,
    subject: `From ${support.name}/${support.email} offering his help on ${support.way}`,
    text: `Message from ${support.name} : ${support.experience}`,
  };

  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.APP_FORWARD_EMAIL_ADDRESS,
        pass: process.env.APP_FORWARD_EMAIL_PASS,
      },
    });

    transporter.sendMail(userMessage, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    return 'Message successfully forward.';
  } catch (error) {
    return 'Unable to forward your message.' + error;
  }
};

// getting all contacts
export const getAllSupports = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const filter = {};

    if (req.query.way) {
      const re = new RegExp(req.query.way.toString() || '', 'i');
      Object.assign(filter, { way: { $regex: re } });
    }

    const query = await Support.aggregate([{ $match: filter }]);
    res.locals.json = {
      statusCode: 200,
      data: query,
    };
  } catch (error) {
    res.locals.json = {
      statusCode: 500,
      data: 'error occured',
    };
  }

  return next();
};

// get single contact
export const getSupportById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      res.locals.json = {
        statusCode: 400,
        data: 'Invalid ID',
      };
      return next();
    }
    const support = await Support.findById(req.params.id);
    if (!support) {
      res.locals.json = {
        statusCode: 400,
        data: 'support not found',
      };
    } else {
      res.locals.json = {
        statusCode: 200,
        data: support,
      };
    }
  } catch (error) {
    res.locals.json = {
      statusCode: 500,
      data: 'error occured',
    };
  }
  return next();
};

// Post a contact
export const postSupportData = async (req: Request, res: Response, next: NextFunction) => {
  const { name, experience, way, email } = req.body;
  try {
    const newSupport = await Support.create({ name, experience, way, email });
    await forwardContactUsInformation(newSupport);
    res.locals.json = {
      statusCode: 200,
      data: newSupport,
    };
  } catch (error) {
    res.locals.json = {
      statusCode: 500,
      data: 'error occured',
    };
  }
  return next();
};

// update a contact
export const updateSupport = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      res.locals.json = {
        statusCode: 400,
        data: 'Invalid ID',
      };
      return next();
    }
    const support = await Support.findById(req.params.id);

    if (!support) {
      res.locals.json = {
        statusCode: 400,
        data: 'Support not found',
      };
      return next();
    }
    await support.set(req.body);
    await support.save();
    const updatedContact = await Support.findById(req.params.id);
    res.locals.json = {
      statusCode: 200,
      data: updatedContact,
    };
  } catch (error) {
    console.log(error);
    res.locals.json = {
      statusCode: 500,
      data: 'error occured',
    };
  }
  return next();
};

// Deleting a contact
export const deleteSupport = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      res.locals.json = {
        statusCode: 400,
        data: 'Invalid ID',
      };
      return next();
    }
    const support = await Support.findByIdAndDelete(req.params.id);
    if (!support) {
      res.locals.json = {
        statusCode: 404,
        data: 'contact not found',
      };
      return;
    }

    const deletedSupport = await Support.findById(req.params.id);
    res.locals.json = {
      statusCode: 200,
      data: deletedSupport,
    };
  } catch (error) {
    console.log(error);
    res.locals.json = {
      statusCode: 500,
      data: 'error occured',
    };
  }
  return next();
};
