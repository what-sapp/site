import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import JSZip from 'jszip';

export async function POST(req) {
  try {
    const session = await getServerSession();
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const { config } = await req.json();
    
    // Fetch bot files from GitHub
    const response = await fetch(process.env.NEXT_PUBLIC_REPO_URL);
    
    // Create ZIP
    const zip = new JSZip();
    
    // Add .env file with user's config
    zip.file('.env', config);
    
    // Add placeholder for other files (in production, fetch actual files)
    zip.file('README.md', '# Phantom Bot\n\nYour custom configured bot');
    zip.file('package.json', JSON.stringify({
      name: 'phantom-bot',
      version: '1.0.0',
      scripts: { start: 'node index.js' }
    }, null, 2));
    
    // Generate ZIP
    const zipBuffer = await zip.generateAsync({ type: 'nodebuffer' });
    
    // Log download
    const { connectDB } = await import('@/lib/mongodb');
    const Deployment = (await import('@/models/Deployment')).default;
    const User = (await import('@/models/User')).default;
    
    await connectDB();
    const user = await User.findOne({ username: session.user.login });
    
    await Deployment.create({
      userId: user._id,
      platform: 'download',
      status: 'success'
    });
    
    // Return ZIP file
    return new NextResponse(zipBuffer, {
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename=phantom-bot-${session.user.login}.zip`
      }
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}