import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const session = await getServerSession();
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const username = session.user.login;
    const repo = 'what-sapp/Phantom';
    
    // Check if user forked the repo
    const response = await fetch(`https://api.github.com/repos/${repo}/forks`, {
      headers: {
        'Authorization': `token ${process.env.GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });
    
    const forks = await response.json();
    const hasForked = forks.some(fork => fork.owner.login === username);
    
    // Update user in database
    const { connectDB } = await import('@/lib/mongodb');
    const User = (await import('@/models/User')).default;
    
    await connectDB();
    await User.findOneAndUpdate(
      { username },
      { forkVerified: hasForked },
      { new: true }
    );
    
    return NextResponse.json({ forked: hasForked });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}