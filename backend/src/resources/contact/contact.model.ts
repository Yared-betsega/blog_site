import mongoose from 'mongoose';

export interface IContactInterface {
  name: string;
  email: string;
  subject: string;
  message: string;
  phase: string;
}

export const ContactSchema = new mongoose.Schema<IContactInterface>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
      minlength: 5,
    },
    message: {
      type: String,
      required: true,
      minlength: 10,
    },
    phase: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  },
);

export const Contact = mongoose.model<IContactInterface>('Contact', ContactSchema);
