import { NextRequest, NextResponse } from 'next/server';
import { registry } from '@domoskills/registry';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;
  const skill = registry.getSkillBySlug(slug);

  if (!skill) {
    return NextResponse.json(
      { success: false, error: `Skill '${slug}' not found` },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    data: skill,
  });
}
