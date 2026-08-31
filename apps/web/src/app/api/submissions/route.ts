import { NextRequest, NextResponse } from 'next/server';
import { registry } from '@domoskills/registry';
import { SubmissionRequestSchema } from '@domoskills/validators';

export async function POST(request: NextRequest) {
  try {
    const json = await request.json();
    const parsed = SubmissionRequestSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, errors: parsed.error.format() },
        { status: 400 }
      );
    }

    const res = await registry.submitSkill(parsed.data);

    return NextResponse.json({
      success: true,
      message: res.message,
      data: res.record,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Internal error' },
      { status: 500 }
    );
  }
}
