function showToast(message, success) {
  const el = document.createElement("div");
  el.textContent = message;
  el.style.cssText = `
    position: fixed;
    bottom: 24px;
    right: 24px;
    padding: 10px 16px;
    background: ${success ? "#16a34a" : "#dc2626"};
    color: white;
    font: 14px/1.4 system-ui, sans-serif;
    border-radius: 8px;
    z-index: 2147483647;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    opacity: 0;
    transition: opacity 0.2s;
  `;
  document.body.appendChild(el);
  requestAnimationFrame(() => (el.style.opacity = "1"));
  setTimeout(() => {
    el.style.opacity = "0";
    setTimeout(() => el.remove(), 200);
  }, 2000);
}

const SESSION_PATTERNS = [
  "__session",
  "session",
  "session_id",
  "sessionid",
  "connect.sid",
  "PHPSESSID",
  "JSESSIONID",
  "_session_id",
  "ASP.NET_SessionId",
  "laravel_session",
  "sid",
];

function findSessionCookie(cookies) {
  for (const name of SESSION_PATTERNS) {
    const match = cookies.find((c) => c.name === name);
    if (match) return match;
  }
  // Fallback: any cookie whose name contains "session" or "sid" (case-insensitive)
  return cookies.find((c) => /session|sid/i.test(c.name));
}

chrome.action.onClicked.addListener(async (tab) => {
  try {
    const url = new URL(tab.url);
    const cookies = await chrome.cookies.getAll({ url: url.origin });
    const cookie = findSessionCookie(cookies);

    if (!cookie) {
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: showToast,
        args: ["No session cookie found", false],
      });
      return;
    }

    await setupOffscreen();
    const resp = await chrome.runtime.sendMessage({
      type: "copy",
      text: `${cookie.name}=${cookie.value}`,
    });

    const ok = resp && resp.ok;
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: showToast,
      args: [ok ? `Copied "${cookie.name}" cookie!` : "Failed to copy cookie", ok],
    });
  } catch (err) {
    console.error("Failed to copy session cookie:", err);
  }
});

let creatingOffscreen;
async function setupOffscreen() {
  const existing = await chrome.offscreen.hasDocument();
  if (existing) return;
  if (creatingOffscreen) {
    await creatingOffscreen;
  } else {
    creatingOffscreen = chrome.offscreen.createDocument({
      url: "offscreen.html",
      reasons: ["CLIPBOARD"],
      justification: "Copy cookie value to clipboard",
    });
    await creatingOffscreen;
    creatingOffscreen = null;
  }
}