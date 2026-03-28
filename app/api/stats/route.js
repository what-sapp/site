import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import Deployment from '@/models/Deployment';

export async function GET() {
  try {
    await connectDB();
    
    const users = await User.countDocuments();
    const deployments = await Deployment.countDocuments();
    
    return NextResponse.json({ users, deployments });
  } catch (error) {
    return NextResponse.json({ users: 0, deployments: 0 });
  }
}