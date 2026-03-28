import mongoose from 'mongoose';

const DeploymentSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  platform: { type: String, required: true },
  status: { type: String, enum: ['success', 'failed', 'pending'], default: 'pending' },
  url: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Deployment || mongoose.model('Deployment', DeploymentSchema);