import mongoose from 'mongoose';
import { Contact } from './contact.model';
import { NextFunction, Request, Response } from 'express-serve-static-core';

// getting all contacts
export const getAllContacts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const filter = {};

    if (req.query.name) {
      const re = new RegExp(req.query.name.toString() || '', 'i');
      Object.assign(filter, { subject: { $regex: re } });
    }

    if (req.query.email) {
      Object.assign(filter, { email: req.query.email.toString() || { $ne: null } });
    }

    if (req.query.subject) {
      const re = new RegExp(req.query.subject.toString(), 'i');
      Object.assign(filter, { subject: { $regex: re } });
    }
    if (req.query.phase) {
      Object.assign(filter, { phase: req.query.phase.toString() || { $ne: null } });
    }

    const query = await Contact.aggregate([{ $match: filter }]);
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
export const getContactById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      res.locals.json = {
        statusCode: 400,
        data: 'Invalid ID',
      };
      return next();
    }
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      res.locals.json = {
        statusCode: 400,
        data: 'User not found',
      };
    } else {
      res.locals.json = {
        statusCode: 200,
        data: contact,
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
export const postContactData = async (req: Request, res: Response, next: NextFunction) => {
  const { name, message, subject, email, phase } = req.body;
  try {
    const contact = await Contact.create({ name, message, subject, email, phase });
    res.locals.json = {
      statusCode: 200,
      data: contact,
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
export const updateContact = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      res.locals.json = {
        statusCode: 400,
        data: 'Invalid ID',
      };
      return next();
    }
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      res.locals.json = {
        statusCode: 400,
        data: 'contact not found',
      };
      return next();
    }
    await contact.set(req.body);
    await contact.save();
    const updatedContact = await Contact.findById(req.params.id);
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
export const deleteContact = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      res.locals.json = {
        statusCode: 400,
        data: 'Invalid ID',
      };
      return next();
    }
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      res.locals.json = {
        statusCode: 404,
        data: 'contact not found',
      };
      return;
    }

    const deletedContact = await Contact.findById(req.params.id);
    res.locals.json = {
      statusCode: 200,
      data: deletedContact,
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
