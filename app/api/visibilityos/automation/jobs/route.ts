import { NextResponse } from "next/server";
import { z } from "zod";

import {
  VISIBILITYOS_AUTOMATION_SIGNATURE_HEADER,
  VISIBILITYOS_AUTOMATION_TIMESTAMP_HEADER,
  isVisibilityAutomationConfigured,
  verifyVisibilityAutomationRequest,
} from "@/lib/visibilityos-automation";
import {
  getDueVisibilityAutomationJobs,
  isVisibilityStoreConfigured,
} from "@/lib/visibilityos-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const RequestSchema = z.object({
  jobType: z.enum(["daily", "weekly"]),
  limit: z.number().int().min(1).max(50).optional().default(20),
});

export async function POST(request: Request) {
  const rawBody = await request.text();

  if (!isVisibilityAutomationConfigured() || !isVisibilityStoreConfigured()) {
    return NextResponse.json({ ok: false, error: "automation_not_configured" }, { status: 503 });
  }

  const verified = verifyVisibilityAutomationRequest({
    rawBody,
    timestamp: request.headers.get(VISIBILITYOS_AUTOMATION_TIMESTAMP_HEADER),
    signature: request.headers.get(VISIBILITYOS_AUTOMATION_SIGNATURE_HEADER),
  });

  if (!verified) {
    return NextResponse.json({ ok: false, error: "invalid_signature" }, { status: 401 });
  }

  let input: z.infer<typeof RequestSchema>;
  try {
    input = RequestSchema.parse(JSON.parse(rawBody));
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_request" }, { status: 400 });
  }

  try {
    const jobs = await getDueVisibilityAutomationJobs(input);
    return NextResponse.json(
      { ok: true, jobs },
      {
        headers: {
          "Cache-Control": "no-store",
          "X-Robots-Tag": "noindex, nofollow",
        },
      },
    );
  } catch (error) {
    console.error("VisibilityOS automation jobs failed", error);
    return NextResponse.json({ ok: false, error: "jobs_unavailable" }, { status: 503 });
  }
}
