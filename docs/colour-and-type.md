# Furnishes: colour and type

What the site uses today. Every value is a token in `apps/web/src/app/globals.css`; change it there, not in a component.

## Colour

The theme is **red on cream, with brown for reading**. Red-orange is the supporting accent.

### The four main colours

| Colour     | Hex       | Token        | Used for                                                                                                                                                      |
| ---------- | --------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Cream      | `#f8ebcb` | `--paper`    | The background of every page; text on the dark footer band                                                                                                    |
| Red        | `#d31b00` | `--ink`      | The brand colour: headings, big statements, figures, links, buttons, anything meant to catch the eye                                                          |
| Red-orange | `#d9380c` | `--ink-warm` | The footer background; accents in the flat tour (label, step number, room name, chosen mark), the floor plan's lines and room names, the "Today" swatch label |
| Brown      | `#5e2a15` | `--ink-dark` | Body text and sentences, second lines under titles, floor plan walls and windows, the base of thin lines                                                      |

### Mixes of those four

| Token                      | What it is        | Used for                                                                          |
| -------------------------- | ----------------- | --------------------------------------------------------------------------------- |
| `--ink-pale`               | Lighter red       | Words not chosen; the softer half of a headline                                   |
| `--ink-dark-pale`          | Lighter brown     | Quiet text such as "Coming"; the "What we believe" words before they light up red |
| `--rule`, `--rule-strong`  | See-through brown | Thin dividing lines                                                               |
| `--ink-wash`, `--ink-tile` | Faint red         | Backgrounds for bands, boxes and tiles                                            |
| `--panel-orange`           | Pale red-orange   | The factory panel                                                                 |

### Finishes (fills only, never text)

| Token          | Hex                  | Used for                                                       |
| -------------- | -------------------- | -------------------------------------------------------------- |
| `--birch`      | `#e7c58f`            | Bookcase in the flat tour, swatches, the colour photos load on |
| `--walnut`     | `#6b4428`            | Bookcase and swatches                                          |
| `--finish-red` | red mixed with cream | Bookcase and swatches                                          |
| `--finish-*`   | various              | The "Coming" swatches (oak, cane, linen, bouclé, wool)         |

### Over photos only

| Token                                                | Used for                                    |
| ---------------------------------------------------- | ------------------------------------------- |
| `--photo-text`, `--photo-text-white`                 | Near-white cream text on photos             |
| `--photo-shade`, `--photo-shade-deep`, `--photo-dim` | Dark gradients so words read on a busy room |
| `--photo-dot`, `--photo-halo`                        | The white pulsing dots on the banner        |

## Type

### Fonts

Both come from Google Fonts, loaded in `apps/web/src/app/layout.tsx`.

| Font            | Token             | Role                                                                                                           |
| --------------- | ----------------- | -------------------------------------------------------------------------------------------------------------- |
| Instrument Sans | `--font`          | The main font: headings, statements, menu, labels, buttons, numbers. Falls back to Helvetica Neue, then Arial. |
| Jost            | `--font-wordmark` | The "furnishes." logo, and the softer reading lines under titles                                               |

### Weights

| Weight      | Font            | Used for                                                        |
| ----------- | --------------- | --------------------------------------------------------------- |
| 400 regular | Instrument Sans | Most text: headings, statements, figures, buttons (the default) |
| 500 medium  | Instrument Sans | Small capital labels, menu links, the biggest display words     |
| 420         | Jost            | The logo                                                        |
| 350         | Jost            | Brown second lines and descriptions (`--weight-title-rest`)     |
| 300 light   | Jost            | The banner links "Shop furniture" and "Shop modular"            |

Nothing is bold; the heaviest weight is 500.

### Width

Large headings use Instrument Sans narrowed to **85%** (`--width-display`), the site's condensed look. Body text and labels stay at normal width.

### Style and case

- Upright throughout; the only italic is one partner logo in the scrolling strip.
- **Sentence case** for titles ("Made to fit your room").
- **UPPERCASE** for small labels and the menu ("WHAT WE BELIEVE"), via the `.caps` class.
- **lowercase** for the logo ("furnishes.").

### Letter spacing

| Token             | Value   | Used for                  |
| ----------------- | ------- | ------------------------- |
| `--track-tight`   | -0.02em | Headings                  |
| `--track-display` | -0.04em | The biggest display words |
| `--track-caps`    | +0.06em | Small capitals            |

### Line height

| Token               | Value    | Used for                               |
| ------------------- | -------- | -------------------------------------- |
| `--leading-display` | 0.92     | The biggest words                      |
| (per heading)       | 1.0–1.15 | Titles and statements                  |
| `--leading-line`    | 1.38     | Reading text (some blocks use 1.4–1.5) |

### Sizes

Every size scales with the screen width, between a smallest and a largest value.

| Token            | Range     | Used for                                         |
| ---------------- | --------- | ------------------------------------------------ |
| `--text-nav`     | 11.5–13px | Menu links                                       |
| `--text-sm`      | 12–14px   | Labels, small lines                              |
| `--text-md`      | 13–15px   | Small reading text                               |
| `--text-lg`      | 16–20px   | Buttons, body copy                               |
| `--text-line`    | 16–22px   | Lines under names                                |
| `--text-rest`    | 18–25px   | A title's brown second line                      |
| `--text-logo`    | 20–36px   | Partner names in the scrolling strip             |
| `--text-head`    | 24–34px   | Step headlines                                   |
| `--text-over`    | 28–58px   | Two-line titles; the "What we believe" statement |
| `--text-section` | 30–48px   | Section titles on the collection pages           |
| `--text-title`   | 36–116px  | A page's main title                              |
| `--text-display` | 45–120px  | The biggest words                                |
| `--text-run`     | 64–200px  | The words running across the quiz page's band    |

## In one line

Cream for the background, red for what should catch the eye, red-orange for accents and the footer, brown for reading. Instrument Sans for anything loud (condensed when large), Jost for the logo and the quiet sentences.
