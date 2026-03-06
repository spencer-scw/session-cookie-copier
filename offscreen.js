chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === "copy") {
    const ta = document.getElementById("text");
    ta.value = msg.text;
    ta.select();
    const ok = document.execCommand("copy");
    sendResponse({ ok });
  }
  return true;
});