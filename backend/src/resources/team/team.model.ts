import mongoose from 'mongoose';
import { PlacementSchema, Iplacement } from './placement.model';
export interface Iteams {
  name: string;
  email: string;
  image: string;
  title: string;
  linkedin: string;
  description: string;
  country: string;
  placement: Iplacement;
  priority: number;
  memberType: [string];
  phase: string;
}
export const TeamSchema: mongoose.Schema<Iteams> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    image: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    linkedin: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    placement: {
      type: PlacementSchema,
    },
    priority: {
      type: Number,
      default: 20,
    },
    memberType: {
      type: [
        {
          type: String,
          enum: ['EXECUTIVE', 'BOARD', 'STAFF', 'GROUP', 'PLACEMENT', 'MENTOR'],
        },
      ],
      default: ['GROUP'],
    },
    phase: {
      type: String,
      default: 'Phase-1',
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  },
);
export const Team = mongoose.model('Team', TeamSchema);
