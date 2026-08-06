/**
 * Renders the feedback notification email — an on-brand HTML version plus a
 * plain-text fallback. Every user-supplied value is HTML-escaped before it
 * reaches the markup, so a submission can't inject HTML into the inbox.
 *
 * The template is deliberately old-school: table-based layout with fully inline
 * styles and no remote assets, which is what email clients (Gmail, Outlook,
 * Apple Mail) render reliably.
 */

interface FeedbackEmailInput {
  /** Human label, e.g. "Feature request". */
  label: string;
  /** Raw type key: "feature" | "bug" | "other". */
  type: string;
  /** Submitter's email, or "" if not provided. */
  email: string;
  /** The raw feedback message. */
  message: string;
}

interface RenderedEmail {
  subject: string;
  html: string;
  text: string;
}

/** Accent colour + emoji per feedback type (mirrors the site's brand palette). */
const TYPE_STYLES: Record<string, { color: string; emoji: string }> = {
  feature: { color: "#3da5f4", emoji: "💡" },
  bug: { color: "#ff6b6b", emoji: "🐞" },
  other: { color: "#3fd0c8", emoji: "💬" },
};

const FONT =
  "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function renderFeedbackEmail({
  label,
  type,
  email,
  message,
}: FeedbackEmailInput): RenderedEmail {
  const style = TYPE_STYLES[type] ?? TYPE_STYLES.other;
  const safeMessage = escapeHtml(message).replace(/\r?\n/g, "<br>");
  const safeEmail = email ? escapeHtml(email) : "";

  const subject = `${style.emoji} KidPad feedback — ${label}`;

  const replyBlock = safeEmail
    ? `
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:24px;">
                <tr>
                  <td style="font-family:${FONT};font-size:14px;color:#7a6e66;padding-bottom:12px;">
                    From <a href="mailto:${safeEmail}" style="color:#2e86d8;font-weight:700;text-decoration:none;">${safeEmail}</a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <a href="mailto:${safeEmail}?subject=Re:%20Your%20KidPad%20feedback"
                       style="display:inline-block;background-color:#2e86d8;color:#ffffff;font-family:${FONT};font-size:15px;font-weight:700;text-decoration:none;padding:12px 24px;border-radius:14px;">
                      Reply by email
                    </a>
                  </td>
                </tr>
              </table>`
    : `
              <p style="margin:24px 0 0;font-family:${FONT};font-size:14px;color:#7a6e66;">
                No email was provided, so there's no way to reply to this one.
              </p>`;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="x-apple-disable-message-reformatting">
<title>KidPad feedback</title>
</head>
<body style="margin:0;padding:0;background-color:#fff6e5;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">New ${label.toLowerCase()} from the KidPad feedback form</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#fff6e5;padding:24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background-color:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 8px 16px rgba(58,46,42,0.10);">
          <!-- header -->
          <tr>
            <td style="background-color:${style.color};padding:22px 28px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="font-size:26px;line-height:1;">${style.emoji}</td>
                  <td align="right" style="font-family:${FONT};font-size:14px;font-weight:700;color:#ffffff;letter-spacing:0.4px;">KidPad Feedback</td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- body -->
          <tr>
            <td style="padding:28px;">
              <p style="margin:0 0 4px;font-family:${FONT};font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.7px;color:#7a6e66;">New feedback</p>
              <h1 style="margin:0 0 20px;font-family:${FONT};font-size:22px;font-weight:800;color:#3a2e2a;">${label}</h1>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#fff6e5;border-radius:14px;">
                <tr>
                  <td style="padding:18px 20px;border-left:4px solid ${style.color};border-radius:14px;font-family:${FONT};font-size:16px;line-height:1.6;color:#3a2e2a;">${safeMessage}</td>
                </tr>
              </table>${replyBlock}
            </td>
          </tr>
          <!-- footer -->
          <tr>
            <td style="padding:18px 28px 24px;border-top:1px solid #f0e6d6;font-family:${FONT};font-size:12px;color:#7a6e66;">
              Sent automatically from the <strong style="color:#3a2e2a;">KidPad</strong> feedback form.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const text = [
    `New feedback — ${label}`,
    "",
    `Type:      ${label}`,
    `Reply-to:  ${email || "(not provided)"}`,
    "",
    message,
    "",
    "—",
    "Sent from the KidPad feedback form",
  ].join("\n");

  return { subject, html, text };
}
