import { NextResponse } from 'next/server';
import { registry } from '@domoskills/registry';

export async function GET() {
  const categories = registry.getCategories();
  const allSkills = registry.getAllSkills();

  const formatted = categories.map((cat) => ({
    ...cat,
    count: allSkills.filter((s) => s.category === cat.slug).length,
  }));

  return NextResponse.json({
    success: true,
    data: formatted,
  });
}
