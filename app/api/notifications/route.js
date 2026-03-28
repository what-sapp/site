import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'notifications.json');
    const data = fs.readFileSync(filePath, 'utf8');
    const notifications = JSON.parse(data);
    
    // Return only active notifications
    const activeNotifications = notifications.filter(n => n.active);
    
    return NextResponse.json(activeNotifications);
  } catch (error) {
    return NextResponse.json([], { status: 200 });
  }
}