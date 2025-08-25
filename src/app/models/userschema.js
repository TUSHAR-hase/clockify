import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  profilePic: { type: String },
  country: { type: String },
  timezone: { type: String },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  workspaces: [{ type: mongoose.Schema.Types.ObjectId, ref: "Workspace" }],
  invitations: [{ type: mongoose.Schema.Types.ObjectId, ref: "Invite" }],
}, { timestamps: true });

export default mongoose.models.User || mongoose.model("User", UserSchema);
