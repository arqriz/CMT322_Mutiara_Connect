# Mutiara Connect – theme guide

Every page must look like `index.html`. Follow these rules and the pages will match.

## Start a page
1. Open the starter page for your feature (e.g. `report.html`), or copy `template.html` for a new one.
2. Keep the header, page header and footer exactly as they are.
3. Set `<body data-page="...">` so your page is highlighted in the nav: `home`, `closures`, `schedule`, `business`, `report`, `track` (login, authority and admin are not in the nav).
4. Build your content inside `<section class="section"><div class="container"> ... </div></section>`.
5. Put styles only your page needs in a `<style>` block or `css/your-page.css`. Never change the header, nav or footer in your own CSS. If they need to change, change `css/theme.css` and tell the group.

## Colours (use the variables, not hex codes)
| Variable | Hex | Use it for |
|---|---|---|
| `--navy` | #042551 | Header, footer, page headers, headings |
| `--blue` | #2A6078 | Buttons, links |
| `--sky` | #6EC1E4 | The line, active nav, focus outline |
| `--amber` | #F2A900 | Closures and alerts only |
| `--ground` | #F2F4F6 | Grey background bands |
| `--ink` | #17212B | Body text |

## Fonts
- Headings, nav, station codes, dates: **Barlow Condensed** (`--font-display`)
- Body text, buttons, forms: **Atkinson Hyperlegible** (`--font-body`), 18px. It is designed for low-vision readers, which suits elderly and OKU users.
Both are in `fonts/` and load offline.

## Components in theme.css
| Need | Class |
|---|---|
| Buttons | `btn btn-primary`, `btn btn-amber`, `btn btn-outline`, add `btn-sm` for small |
| Station sign | `<a class="station" href="..."><b>S14</b><span>Gelugor</span></a>` |
| Notice type | `tag tag-closure`, `tag tag-lane`, `tag tag-walk`, `tag tag-business` |
| Notice list with date block | copy one `<li class="notice">` from `index.html` |
| Boxed content | `panel` |
| Form field | `<div class="field"><label>…</label><input …></div>`; add `has-error` and `<span class="error-text">` for errors |
| Complaint status | `<ol class="status-steps">` with `done` / `current` on the `<li>` |
| Data table | `<table class="table">` |

## Writing on the page
- Sentence case for headings and buttons ("Report a concern", not "REPORT A CONCERN").
- Buttons say what happens: "Submit report", "Track report", "Forward to authority".
- Use the real station codes and names (A01 PSR-A to S20 KOMTAR, S31 Penang Sentral).
- Complaint statuses are always: Received, Forwarded, In action, Resolved.

## Logo and images
- `images/brand/logo.svg` on white, `logo-white.svg` on navy, `icon.svg` as the favicon. Don't recolour or stretch them.
- Photos and the alignment map are from MRT Corp and Gamuda: keep the credit in the footer and list them in the report's references.
