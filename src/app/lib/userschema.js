const mongoose = require('mongoose');

const baseOptions = {
  discriminatorKey: 'role',
  collection: 'users',
  timestamps: true,
};

const UserSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String }, // Only required for freelancer/admin
  profilePic: { type: String }, // store URL/path if uploaded
  country: { type: String },
  timezone: { type: String },
  workspace: { type: String }, // for freelancer/admin
  industry: { type: String }, // for admin only
  teamEmails: [{ type: String }], // for admin only
  billableRate: { type: Number }, // for team member only
  role: {
    type: String,
    enum: ['freelancer', 'client', 'team', 'admin'],
    required: true,
  },
}, baseOptions);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

// Prevent duplicate discriminator creation
const Freelancer = mongoose.models.freelancer || User.discriminator(
  'freelancer',
  new mongoose.Schema({}, { _id: false }) // empty schema
);

const TeamMember = mongoose.models.team || User.discriminator(
  'team',
  new mongoose.Schema({
    roleType: {
      type: String,
      enum: ['User', 'Manager'],
      default: 'User',
    },
    billableRate: { type: Number },
  }, { _id: false })
);

const Admin = mongoose.models.admin || User.discriminator(
  'admin',
  new mongoose.Schema({
    workspace: { type: String, required: true },
    industry: { type: String },
    teamEmails: [{ type: String }],
    password: { type: String, required: true },
  }, { _id: false })
);

const Client = mongoose.models.client || User.discriminator(
  'client',
  new mongoose.Schema({
    clientName: { type: String, required: true },
    clientEmail: { type: String, required: true },
    clientCompany: { type: String },
    clientNotes: { type: String },
  }, { _id: false })
);

module.exports = { User, Freelancer, TeamMember, Admin, Client };
