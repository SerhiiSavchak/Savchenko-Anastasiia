/**
 * Telegram Bot API notification stub.
 * Replace with real implementation when TELEGRAM_BOT_TOKEN is set.
 */

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const OWNER_CHAT_ID = process.env.TELEGRAM_OWNER_CHAT_ID;

export async function notifyOwnerTelegram(message: string): Promise<void> {
  if (!BOT_TOKEN || !OWNER_CHAT_ID) {
    console.log("[notify:telegram] Owner notification (stub):", message);
    return;
  }

  await fetch(
    `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: OWNER_CHAT_ID,
        text: message,
        parse_mode: "Markdown",
      }),
    }
  );
}

export async function notifyUserTelegram(
  chatIdOrUsername: string,
  message: string
): Promise<void> {
  if (!BOT_TOKEN) {
    console.log("[notify:telegram] User notification (stub):", chatIdOrUsername, message);
    return;
  }

  await fetch(
    `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatIdOrUsername,
        text: message,
        parse_mode: "Markdown",
      }),
    }
  );
}
