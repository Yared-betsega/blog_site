import mongoose from 'mongoose';

export interface IsupportInterface {
  name: string;
  email: string;
  way: string;
  experience: string;
}

export const SupportSchema = new mongoose.Schema<IsupportInterface>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    way: {
      type: String,
      required: true,
      enum: ['Q&A', 'Recruit', 'Mentor', 'Other'],
    },
    experience: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  },
);

export const Support = mongoose.model<IsupportInterface>('Support', SupportSchema);
