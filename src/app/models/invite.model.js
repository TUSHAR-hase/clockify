import mongoose from "mongoose";

const inviteSchema = new mongoose.Schema({
  email: { type: String, required: true },
  workspace: { type: mongoose.Schema.Types.ObjectId, ref: "Workspace" },
  token: { type: String, required: true },
  expiresAt: { type: Date, required: true },
  accepted: { type: Boolean, default: false },
});

export default mongoose.models.Invite || mongoose.model("Invite", inviteSchema);
