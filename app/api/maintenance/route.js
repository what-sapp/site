import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'maintenance.json');
    const data = fs.readFileSync(filePath, 'utf8');
    const maintenance = JSON.parse(data);
    
    return NextResponse.json(maintenance);
  } catch (error) {
    return NextResponse.json({ enabled: false }, { status: 200 });
  }
}