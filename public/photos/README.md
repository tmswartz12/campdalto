# Photos folder

Drop image files in here. The `PHOTOS` array in `lib/content.ts` references
them by filename (`/photos/01.jpg`, etc.).

## Current expected files (from the May 2026 paste)

Save each image from the chat — in the **order you pasted them** — as a
sequentially numbered JPG:

| File       | What it is                                              |
| ---------- | ------------------------------------------------------- |
| `01.jpg`   | Old print photo of the crew on a bedspread (throwback)  |
| `02.jpg`   | Eight groomsmen in a wedding tent                       |
| `03.jpg`   | Rob + friend on a Manhattan rooftop                     |
| `04.jpg`   | Three guys in suspenders at a wedding                   |
| `05.jpg`   | Wall Street bull run selfie                             |
| `06.jpg`   | Champagne in the Alps (drinking)                        |
| `07.jpg`   | Champagne in the Alps (kiss)                            |
| `08.jpg`   | Ring reveal, Alps backdrop                              |
| `09.jpg`   | Family selfie in the Alps with baby + dog               |
| `10.jpg`   | Rob & Miri celebrating with arms up                     |
| `11.jpg`   | The proposal (one knee, ring box)                       |
| `12.jpg`   | Couple running the Chicago Marathon                     |
| `13.jpg`   | Two guys at the Chicago marathon expo                   |
| `14.jpg`   | Couple with Chicago Marathon bibs                       |
| `15.jpg`   | NYC marathon medal, Bronx Burners tanks                 |
| `16.jpg`   | Coachella selfie, palm trees at sunset                  |

## A few that need rotating before you save

Images **01**, **03**, and **04** are currently rotated 90° in the chat.
Rotate them upright in Preview (⌘+R) before exporting, or the carousel will
show them sideways.

## Sizing tip

For best perf, run them through Squoosh (or export from Lightroom) at
~1600px on the long side, JPG quality ~80. Keeps each file ~250–500 KB.

## To add more photos later

1. Drop the file in this folder.
2. Add an entry to `PHOTOS` in `lib/content.ts`.
