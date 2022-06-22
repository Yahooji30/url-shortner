import mongoose from "mongoose";
const urlSchema = new mongoose.Schema(
  {
    shortCode: {
      type: String,
      required: true,
    },
    fullURL: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);

const shortUrl = new mongoose.model("shortUrl", urlSchema);

export default shortUrl;
