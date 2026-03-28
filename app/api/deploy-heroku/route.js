import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const session = await getServerSession();
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const { config } = await req.json();
    
    // Parse config into env variables
    const envVars = {};
    config.split('\n').forEach(line => {
      const [key, ...value] = line.split('=');
      if (key && value.length) {
        envVars[key.trim()] = value.join('=').trim();
      }
    });
    
    // Create Heroku deploy URL
    const deployUrl = `https://heroku.com/deploy?template=${encodeURIComponent(process.env.NEXT_PUBLIC_REPO_URL)}`;
    
    // Log deployment
    const { connectDB } = await import('@/lib/mongodb');
    const Deployment = (await import('@/models/Deployment')).default;
    const User = (await import('@/models/User')).default;
    
    await connectDB();
    const user = await User.findOne({ username: session.user.login });
    
    await Deployment.create({
      userId: user._id,
      platform: 'heroku',
      status: 'success',
      url: deployUrl
    });
    
    return NextResponse.json({ url: deployUrl });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}