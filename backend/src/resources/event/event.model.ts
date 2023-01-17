import mongoose from 'mongoose';

export const eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    start: {
      type: Date,
      required: true,
    },
    end: {
      type: Date,
      required: true,
    },
    eventType: {
      type: String,
      // We can add some more event types when necessary
      enum: ['CONTEST', 'Q&A', 'PRODUCT RELEASE'],
      required: true,
    },
    description: {
      type: String,
      minlength: 10,
      required: true,
    },
    location: {
      type: String,
    },
    links: {
      type: [
        {
          name: {
            type: String,
          },
          link: {
            type: String,
          },
        },
      ],
      default: [],
    },
    gallery: {
      type: String,
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


export const Event = mongoose.model('Event', eventSchema);
