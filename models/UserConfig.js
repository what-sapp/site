import mongoose from 'mongoose';

const UserConfigSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  config: { type: String, required: true },
  validated: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.models.UserConfig || mongoose.model('UserConfig', UserConfigSchema);