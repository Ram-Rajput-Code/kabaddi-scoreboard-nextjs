import mongoose from "mongoose";

const ScoreSchema = new mongoose.Schema({
  teamA: Number,
  teamB: Number,
});

export default mongoose.models.Score ||
  mongoose.model("Score", ScoreSchema);
