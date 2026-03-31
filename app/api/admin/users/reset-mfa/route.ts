import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin.auth.admin.mfa.listFactors({
      userId,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const factors =
      data?.factors?.filter((factor) => factor.factor_type === "totp") ?? [];

    for (const factor of factors) {
      const { error: deleteError } =
        await supabaseAdmin.auth.admin.mfa.deleteFactor({
          userId,
          id: factor.id,
        });

      if (deleteError) {
        return NextResponse.json(
          { error: deleteError.message },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({ ok: true, deleted: factors.length });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message || "Reset MFA failed" },
      { status: 500 }
    );
  }
}