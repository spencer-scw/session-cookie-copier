# Session Cookie Copier

A browser extension that copies the session cookie for the current site to your clipboard with a single click.

It automatically detects common session cookie names (`__session`, `connect.sid`, `PHPSESSID`, `JSESSIONID`, etc.) and copies the most likely match in `name=value` format. A toast notification confirms which cookie was copied.

This is useful for Playwright or other instances where you need to provide programatic or agentic access to website authentication.

## Install

### Chrome-based
1. Clone this repository
2. Go to `chrome://extensions`
3. Enable **Developer mode**
4. Click **Load unpacked** and select the `chrome/` folder in this repo

### Firefox-based
Install from [addons.mozilla.org](https://addons.mozilla.org/en-US/firefox/addon/session-cookie-copier/).

Or, if the addon isn't up yet,

1. Clone this repository
2. Go to `about:debugging#/runtime/this-firefox`
3. Click **Load Temporary Add-on** and select `firefox/manifest.json` in this repo

## Usage

Click the cookie icon in your toolbar. That's it!
