import { NextRequest, NextResponse } from 'next/server';
import { registry } from '@domoskills/registry';
import { InstallResolveRequestSchema } from '@domoskills/validators';

export async function POST(request: NextRequest) {
  try {
    const json = await request.json();
    const parsed = InstallResolveRequestSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, errors: parsed.error.format() },
        { status: 400 }
      );
    }

    const { skills, agent, global } = parsed.data;
    const resolved = registry.resolveInstallManifest(skills, agent, global);

    return NextResponse.json(resolved);
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Internal error' },
      { status: 500 }
    );
  }
}
