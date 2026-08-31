import { NextRequest, NextResponse } from 'next/server';
import { registry } from '@domoskills/registry';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q') || '';
  const limit = parseInt(searchParams.get('limit') || '10', 10);

  const results = registry.getSkills({
    query: q,
    limit,
  });

  return NextResponse.json({
    success: true,
    query: q,
    total: results.total,
    results: results.skills.map((s) => ({
      slug: s.slug,
      name: s.name,
      description: s.description,
      category: s.category,
      license: s.license,
      trustLevel: s.trustLevel,
      installs: s.installs,
      url: `/skills/${s.slug}`,
    })),
  });
}
