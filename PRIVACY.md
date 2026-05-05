```markdown
# Privacy Policy — Pokéweb

*Last updated: May 5, 2026*

## Overview

Pokéweb is a Chrome extension that detects the technical stack of websites
you visit. It is designed with privacy as a core principle: everything
happens locally in your browser, nothing leaves your device.

## Data Collection

Pokéweb does **not** collect, store, transmit, or share any personal data.

Specifically, Pokéweb does **not**:
- Collect your browsing history
- Record which websites you visit
- Transmit any information to external servers
- Use analytics or tracking tools
- Require an account or login

## Local Storage

Pokéweb stores one piece of data locally on your device:

**Your personal collection** (`chrome.storage.local`, key: `collection`)
This is the list of technologies detected during your browsing sessions.
It is stored exclusively in your browser and never leaves your device.
You can delete it at any time using the "Réinitialiser" button inside
the extension.

## Permissions

Pokéweb requests the following Chrome permissions, each strictly limited
to its core function:

| Permission | Purpose |
|---|---|
| `activeTab` | Access the current tab's URL to display analysis results |
| `storage` | Save your local collection in your browser |
| `webRequest` | Read HTTP response headers to detect server, CDN and backend technologies |
| `<all_urls>` | Analyze any website you choose to visit |

No data obtained through these permissions is transmitted externally.

## Open Source

Pokéweb is fully open source. You can inspect every line of code at:
https://github.com/Liamdbav/POKEWEB

## Contact

For any privacy-related questions:
[ton email]

## Changes

Any future changes to this policy will be reflected in this document
with an updated date.
```
