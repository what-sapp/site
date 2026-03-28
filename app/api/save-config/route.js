import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import UserConfig from '@/models/UserConfig';
import User from '@/models/User';

export async function POST(req) {
  try {
    const session = await getServerSession();
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const { config } = await req.json();
    
    // Validate SESSION_ID
    const sessionIdLine = config.split('\n').find(line => line.startsWith('SESSION_ID='));
    const sessionId = sessionIdLine?.split('=')[1]?.trim();
    
    if (!sessionId) {
      return NextResponse.json({ error: 'SESSION_ID is required' }, { status: 400 });
    }
    
    if (!sessionId.startsWith('PHANTOM')) {
      return NextResponse.json({ 
        error: 'Invalid SESSION_ID! Must start with "PHANTOM". Get a valid session ID from: https://session-j5sy.onrender.com' 
      }, { status: 400 });
    }
    
    await connectDB();
    
    const user = await User.findOne({ username: session.user.login });
    
    await UserConfig.findOneAndUpdate(
      { userId: user._id },
      { config, validated: true, updatedAt: new Date() },
      { upsert: true, new: true }
    );
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}