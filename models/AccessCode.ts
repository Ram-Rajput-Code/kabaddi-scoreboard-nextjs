import mongoose from "mongoose";

const AccessCodeSchema = new mongoose.Schema({
  code: { type: String, required: true },
  expiresAt: { type: Date, required: true },
}, { timestamps: true });

export default mongoose.models.AccessCode ||
  mongoose.model("AccessCode", AccessCodeSchema);
