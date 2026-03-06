# Session Cookie Copier

A browser extension that copies the session cookie for the current site to your clipboard with a single click.

It automatically detects common session cookie names (`__session`, `connect.sid`, `PHPSESSID`, `JSESSIONID`, etc.) and copies the most likely match in `name=value` format. A toast notification confirms which cookie was copied.

## Install

### Chrome
1. Go to `chrome://extensions`
2. Enable **Developer mode**
3. Click **Load unpacked** and select the `chrome/` folder

### Firefox
1. Go to `about:debugging#/runtime/this-firefox`
2. Click **Load Temporary Add-on** and select `firefox/manifest.json`

Or install from [addons.mozilla.org](https://addons.mozilla.org) (if published).

## Usage

Click the cookie icon in your toolbar. That's it.