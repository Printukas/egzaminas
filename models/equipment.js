import mongoose from "mongoose";

const equipmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 2
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ["published", "draft"],
    default: "draft"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Equipment", equipmentSchema);
