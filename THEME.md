# Mutiara Connect – theme guide

All pages use the team layout: white header, dark teal nav bar, light grey page, white rounded cards. Link `css/theme.css` and the pages will match.

## Start a page
1. Copy `template.html` (or open your starter page).
2. Keep the header and footer exactly as they are. They are marked with comments.
3. Set `<body data-page="...">` so your nav item is highlighted: `home`, `closures`, `schedule`, `business`, `report`, `track`.
4. Put your content inside `<main id="main" class="container">`, starting with the `page-header` (breadcrumb, h1, one-line intro), then `section` + `card` blocks.
5. Page-only styles go in a `<style>` block or `css/your-page.css`. Never restyle the header, nav or footer per page.

## Already built your page with your own CSS?
Swap three things so it matches:
- Header logo tile → `<img src="images/brand/icon.svg" width="38" height="38" alt="">`
- Add `<link rel="stylesheet" href="css/theme.css?v=3">` before your own CSS (or copy the colours below into yours)
- Use the same nav items and order: Home, Closures & Detours, Works Schedule, Business Access, Report a Concern, My Reports

## Colours
| Variable | Hex | Use |
|---|---|---|
| `--nav` | #13343B | Nav bar |
| `--teal` | #14696B | Buttons, links, active language |
| `--teal-mid` | #2A8A8C | Active nav pill, the station line |
| `--teal-soft` | #E3F2F2 | Light teal fills, date blocks |
| `--bg` | #F4F5F9 | Page background, input fill |
| `--border` | #E2E5EA | Card and input borders |
| `--ink` | #1B2530 | Text |
| `--muted` | #5F6B76 | Secondary text |
| `--orange` | #E2531B | Counts, works markers |

Teal gradient panel (log-in page, alerts box): `linear-gradient(135deg, #0B5A5E, #129BA1)`.

## Font
Inter (400, 500, 600, 700), stored in `fonts/`, works offline.

## Classes
| Need | Class |
|---|---|
| Buttons | `btn btn-primary`, `btn btn-outline`, `btn btn-white` (on teal), add `btn-sm` |
| White box | `card` |
| Status | `pill pill-received`, `pill-forwarded`, `pill-action`, `pill-resolved` |
| Notice type | `tag tag-closure`, `tag-lane`, `tag-walk`, `tag-business` |
| Station | `<a class="station" href="..."><b>S14</b>Gelugor</a>` |
| Notice with date block | copy one `<li class="notice">` from `index.html` |
| Form field | `<div class="field"><label>…</label><input …></div>` |
| Progress | `<ol class="status-steps">` with `done` / `current` |
| Table | `<table class="table">` |

## Words
- Statuses are always Received, Forwarded, In action, Resolved.
- Use real station codes: A01 PSR-A to S20 KOMTAR, S31 Penang Sentral.
- Ticket IDs look like MC-2026-04817.

## Logo and images
- `images/brand/icon.svg` in the header, `logo.svg` / `logo-white.svg` where a full wordmark is needed.
- Photos and the alignment map are from MRT Corp and Gamuda: keep the credit in the footer and the report references.
