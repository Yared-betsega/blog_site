import mongoose from 'mongoose';
export interface Iplacement {
  country: string;
  city: string;
  company: string;
}

export const PlacementSchema: mongoose.Schema<Iplacement> = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
});

export const Placement = mongoose.model('PlacementSchema', PlacementSchema);
