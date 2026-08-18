import { createHmac, timingSafeEqual } from "crypto";

export const VISIBILITYOS_AUTOMATION_SIGNATURE_HEADER = "x-visibilityos-signature";
export const VISIBILITYOS_AUTOMATION_TIMESTAMP_HEADER = "x-visibilityos-timestamp";
export const VISIBILITYOS_AUTOMATION_SIGNATURE_VERSION = "v1";

const MAX_SIGNATURE_AGE_SECONDS = 5 * 60;

export type VisibilityAutomationJobType = "daily" | "weekly";

export type VisibilityAutomationJob = {
  projectId: string;
  jobType: VisibilityAutomationJobType;
  idempotencyKey: string;
  scanPayload: {
    url: string;
    lang: "en" | "ua" | "ru";
    service: string;
    location: string;
    competitors: string[];
  };
};

export type VisibilityAutomationCallback = {
  projectId: string;
  jobType: VisibilityAutomationJobType;
  idempotencyKey: string;
  ok: boolean;
  result?: unknown;
  error?: string;
  finishedAt?: string;
};

function getAutomationSecret() {
  return process.env.VISIBILITYOS_AUTOMATION_SECRET?.trim() || "";
}

export function isVisibilityAutomationConfigured() {
  return getAutomationSecret().length >= 32;
}

export function signVisibilityAutomationPayload(rawBody: string, timestamp: string) {
  const secret = getAutomationSecret();
  if (!secret) return "";

  const digest = createHmac("sha256", secret)
    .update(`${timestamp}.${rawBody}`, "utf8")
    .digest("hex");

  return `${VISIBILITYOS_AUTOMATION_SIGNATURE_VERSION}=${digest}`;
}

export function verifyVisibilityAutomationRequest(input: {
  rawBody: string;
  timestamp: string | null;
  signature: string | null;
  nowMs?: number;
}) {
  if (!isVisibilityAutomationConfigured() || !input.timestamp || !input.signature) return false;

  const timestampSeconds = Number(input.timestamp);
  if (!Number.isInteger(timestampSeconds) || timestampSeconds <= 0) return false;

  const nowSeconds = Math.floor((input.nowMs ?? Date.now()) / 1000);
  if (Math.abs(nowSeconds - timestampSeconds) > MAX_SIGNATURE_AGE_SECONDS) return false;

  const expected = signVisibilityAutomationPayload(input.rawBody, input.timestamp);
  const receivedBuffer = Buffer.from(input.signature, "utf8");
  const expectedBuffer = Buffer.from(expected, "utf8");

  if (receivedBuffer.length !== expectedBuffer.length) return false;
  return timingSafeEqual(receivedBuffer, expectedBuffer);
}
