import mongoose from "mongoose";

const impactStoriesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    phase: {
        type: String,
        required: true,
    },
});

const ImpactStoryResource = mongoose.model("ImpactStoryResource", impactStoriesSchema);
export default ImpactStoryResource
