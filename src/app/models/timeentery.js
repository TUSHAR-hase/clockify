const TimeEntrySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
  
  task: { type: String, required: true }, // "Fixing bug", "Design Homepage"
  
  startTime: { type: Date, required: true },
  endTime: { type: Date },
  duration: { type: Number }, // store in seconds
  isRunning: { type: Boolean, default: true },

}, { timestamps: true });

export default mongoose.models.TimeEntry || mongoose.model("TimeEntry", TimeEntrySchema);
