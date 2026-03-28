import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Deployment from '@/models/Deployment';
import User from '@/models/User';

export async function GET() {
  try {
    const session = await getServerSession();
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    await connectDB();
    
    const user = await User.findOne({ username: session.user.login });
    const deployments = await Deployment.find({ userId: user._id })
      .sort({ createdAt: -1 })
      .limit(20);
    
    return NextResponse.json(deployments);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}