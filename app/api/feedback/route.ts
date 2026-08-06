/**
 * POST /api/feedback
 *
 * Route Handler behind the /feedback form. On Cloudflare Pages the Next.js
 * adapter compiles this into a Worker, so it *is* the "Cloudflare worker
 * function" that handles the submission. It:
 *
 *   1. verifies a Cloudflare Turnstile token to keep spam out, then
 *   2. emails the message to the site owner through the Resend API.
 *
 * Uses the default Node.js runtime — the edge runtime is deprecated in Next 16,
 * and Cloudflare's current adapter (@opennextjs/cloudflare) runs Node handlers.
 * The handler only uses Web APIs (fetch/Request/Response), so it's portable.
 *
 * Environment variables (Cloudflare Pages → Settings → Environment variables;
 * mark the two keys as secret). Locally, put them in `.env.local`:
 *   TURNSTILE_SECRET_KEY  – Turnstile secret key
 *   RESEND_API_KEY        – Resend API key
 *   FEEDBACK_TO_EMAIL     – where feedback lands (optional; defaults below)
 *   FEEDBACK_FROM_EMAIL   – verified Resend sender (optional; defaults below)
 */

/** Delivered here unless FEEDBACK_TO_EMAIL overrides it. */
const DEFAULT_TO = "admin@codebytwo.com";

/**
 * Resend only sends from a domain you've verified. Verify `mail.kidpad.app`
 * in Resend (add the DNS records it provides) so this sender is authorised.
 * Override per-environment with FEEDBACK_FROM_EMAIL if needed.
 */
const DEFAULT_FROM = "KidPad Feedback <feedback@mail.kidpad.app>";

const TYPE_LABELS: Record<string, string> = {
  feature: "Feature request",
  bug: "Bug report",
  other: "General feedback",
};

const MAX_MESSAGE = 4000;
const MAX_EMAIL = 254;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json" },
  });
}

export async function POST(request: Request): Promise<Response> {
  // ---- parse & validate ------------------------------------------------
  let body: {
    type?: unknown;
    message?: unknown;
    email?: unknown;
    token?: unknown;
  };
  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid request." }, 400);
  }

  const type = typeof body.type === "string" ? body.type : "other";
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const token = typeof body.token === "string" ? body.token : "";

  if (!message) {
    return json({ error: "Please enter a message." }, 400);
  }
  if (message.length > MAX_MESSAGE) {
    return json({ error: "That message is a little too long." }, 400);
  }
  if (email && (email.length > MAX_EMAIL || !EMAIL_RE.test(email))) {
    return json({ error: "That email address doesn't look right." }, 400);
  }
  if (!token) {
    return json({ error: "Please complete the anti-spam check." }, 400);
  }

  // ---- verify Turnstile ------------------------------------------------
  const form = new URLSearchParams();
  form.append("secret", process.env.TURNSTILE_SECRET_KEY ?? "");
  form.append("response", token);
  const ip = request.headers.get("CF-Connecting-IP");
  if (ip) form.append("remoteip", ip);

  let verified = false;
  try {
    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      { method: "POST", body: form },
    );
    const outcome = (await res.json()) as { success?: boolean };
    verified = outcome.success === true;
  } catch {
    verified = false;
  }
  if (!verified) {
    return json({ error: "Anti-spam check failed. Please try again." }, 400);
  }

  // ---- send the email via Resend --------------------------------------
  const label = TYPE_LABELS[type] ?? "General feedback";
  const to = process.env.FEEDBACK_TO_EMAIL || DEFAULT_TO;
  const fromAddr = process.env.FEEDBACK_FROM_EMAIL || DEFAULT_FROM;

  const text = [
    `Type:  ${label}`,
    `Reply-to:  ${email || "(not provided)"}`,
    "",
    message,
  ].join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        authorization: `Bearer ${process.env.RESEND_API_KEY ?? ""}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        from: fromAddr,
        to: [to],
        subject: `KidPad feedback — ${label}`,
        text,
        ...(email ? { reply_to: email } : {}),
      }),
    });

    if (!res.ok) {
      console.error("Resend error", res.status, await res.text());
      return json(
        { error: "Sorry — something went wrong sending your feedback." },
        502,
      );
    }
  } catch (err) {
    console.error("Resend request failed", err);
    return json(
      { error: "Sorry — something went wrong sending your feedback." },
      502,
    );
  }

  return json({ ok: true });
}
