import { NextResponse } from "next/server";
import { z } from "zod";

import {
  VISIBILITYOS_AUTOMATION_SIGNATURE_HEADER,
  VISIBILITYOS_AUTOMATION_TIMESTAMP_HEADER,
  isVisibilityAutomationConfigured,
  verifyVisibilityAutomationRequest,
} from "@/lib/visibilityos-automation";
import {
  isVisibilityStoreConfigured,
  recordVisibilityAutomationCallback,
} from "@/lib/visibilityos-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const CallbackSchema = z.object({
  projectId: z.string().uuid(),
  jobType: z.enum(["daily", "weekly"]),
  idempotencyKey: z.string().min(12).max(240),
  ok: z.boolean(),
  result: z.unknown().optional(),
  error: z.string().max(2_000).optional(),
  finishedAt: z.string().datetime().optional(),
}).superRefine((value, context) => {
  if (value.ok && (!value.result || typeof value.result !== "object")) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["result"],
      message: "Successful callbacks require a scan result.",
    });
  }

  if (!value.ok && !value.error) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["error"],
      message: "Failed callbacks require an error.",
    });
  }
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

  let callback: z.infer<typeof CallbackSchema>;
  try {
    callback = CallbackSchema.parse(JSON.parse(rawBody));
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_callback" }, { status: 400 });
  }

  try {
    const stored = await recordVisibilityAutomationCallback(callback);
    return NextResponse.json(
      { ok: true, stored },
      {
        headers: {
          "Cache-Control": "no-store",
          "X-Robots-Tag": "noindex, nofollow",
        },
      },
    );
  } catch (error) {
    console.error("VisibilityOS automation callback failed", error);
    return NextResponse.json({ ok: false, error: "callback_unavailable" }, { status: 503 });
  }
}
