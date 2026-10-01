import { NextRequest, NextResponse } from 'next/server';
import { registry } from '@domoskills/registry';
import { CategorySlug, AgentTarget, TrustLevel, License } from '@domoskills/validators';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const query = searchParams.get('q') || '';
  const category = (searchParams.get('category') as CategorySlug) || 'all';
  const agent = (searchParams.get('agent') as AgentTarget) || 'all';
  const trustLevel = (searchParams.get('trustLevel') as TrustLevel) || 'all';
  const license = (searchParams.get('license') as License) || 'all';
  const hasScriptsParam = searchParams.get('hasScripts');
  const hasScripts = hasScriptsParam !== null ? hasScriptsParam === 'true' : undefined;
  const sortBy = (searchParams.get('sortBy') as any) || 'trending';
  const rawLimit = parseInt(searchParams.get('limit') || '50', 10);
  // Anti-scraping clamp: Prevents callers from downloading the entire database in a single query
  const limit = Math.min(Math.max(1, isNaN(rawLimit) ? 50 : rawLimit), 60);
  const rawOffset = parseInt(searchParams.get('offset') || '0', 10);
  const offset = Math.max(0, isNaN(rawOffset) ? 0 : rawOffset);

  const results = registry.getSkills({
    query,
    category,
    agent,
    trustLevel,
    license,
    hasScripts,
    sortBy,
    limit,
    offset,
  });

  return NextResponse.json(
    {
      success: true,
      data: results.skills,
      total: results.total,
      hasMore: results.hasMore,
      categories: results.categories,
    },
    {
      headers: {
        'Cache-Control': 'public, s-maxage=120, stale-while-revalidate=300',
        'X-Content-Type-Options': 'nosniff',
      },
    }
  );
}
