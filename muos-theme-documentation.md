# muOS Theme Documentation

> Source: https://muos.dev/themes
> muOS (MustardOS) enables full customization of menu appearance through **Themes**.

---

## Table of Contents

1. [Overview](#overview)
2. [Theme Structure](#theme-structure)
3. [Images](#images)
4. [Fonts](#fonts)
5. [Scheme Files](#scheme-files)
6. [Theme Alternatives](#theme-alternatives)
7. [Assets (Grid Images)](#assets-grid-images)
8. [Finishing Your Theme](#finishing-your-theme)

---

## Overview

muOS allows users to create custom themes or install community-created ones. Themes are distributed as `.muxthm` files and placed in the `MUOS/theme` directory on the device.

- **Theme Library**: Download `.muxthm` files from the muOS theme repository
- **Community**: Additional themes hosted on the MustardOS Forum
- **Matching Artwork**: Some themes include matching folder artwork for Explore Content (installed separately)
- **License**: CC Attribution-Noncommercial 4.0 International

---

## Theme Structure

> Source: https://muos.dev/themes/structure

### Directory Layout

```
theme-name/
├── active.txt               # Default alternative theme to load on install
├── assets.muxzip            # Grid icon images archive
├── credits.txt              # Theme credits
├── font/                    # Custom fonts (.bin format)
│   ├── default/
│   ├── header/
│   ├── footer/
│   └── panel/
├── glyph/                   # PNG images for menu glyphs, organized by program
│   └── muxlaunch/
│       ├── explore.png
│       ├── favourite.png
│       ├── history.png
│       ├── apps.png
│       ├── info.png
│       ├── config.png
│       ├── reboot.png
│       └── shutdown.png
├── image/                   # Theme visual assets
│   ├── static/              # Static overlay images
│   ├── wall/                # Background images
│   └── bootlogo.bmp         # Boot logo (24-bit BMP)
├── scheme/                  # .ini config files controlling visual properties
├── sound/                   # WAVE files for audio feedback
├── alternate/               # Alternative theme variations
│   ├── {name}.ini           # Scheme-based alternative
│   └── {name}.muxalt        # Archive-based alternative
└── {Resolution}/            # Resolution-specific overrides
    ├── font/
    ├── glyph/
    ├── image/
    └── scheme/
```

### Supported Resolutions

Themes support multiple device resolutions through dedicated subdirectories:

| Resolution | Description |
|------------|-------------|
| `640x480`  | Standard handheld |
| `720x480`  | Widescreen variant |
| `720x576`  | PAL variant |
| `720x720`  | Square display |
| `1280x720` | HD display |

### Shared Resources

> "For shared resources across all resolutions, you can place them in the root (outside of the resolution subfolder) of the theme."

Resolution-specific folders override root-level resources, allowing common assets to be shared while maintaining device-specific overrides.

### The Scheme File

The `scheme` file is described as **"the brain of the theme"** — it controls how windows and text appear across different programs and dictates asset usage.

### Supported Programs (for per-program customization)

- `muxapp`
- `muxconfig`
- `muxhistory`
- `muxlaunch`
- and more — each can have individual `.ini` and glyph customizations

---

## Images

> Source: https://muos.dev/themes/images

### Supported Formats

| Format | Usage |
|--------|-------|
| `.bmp` | Boot logo only (24-bit True Colour bitmap) |
| `.png` | Static images, backgrounds, overlays |

> "If you decide to use images for your themes please ensure that you use the correct resolution for the device!"

### File Locations

| Path | Purpose |
|------|---------|
| `./image/static/` | Static overlay images |
| `./image/wall/` | Background/wallpaper images |
| `./image/bootlogo.bmp` | Boot logo |
| `./image/overlay.png` | Screen overlay |

### Recommended Design Tools

- **Photoshop** – Industry standard
- **Photopea** – Free online alternative to Photoshop
- **GIMP** – Free open-source editor
- **Procreate** – iPad illustration app
- **Aseprite** – Pixel art editor
- **Affinity** – Professional alternative

### Custom Main Menu Example

To create a fully custom image-based main menu (`muxlaunch`):

1. Create the folder: `./image/wall/muxlaunch/`
2. Add per-item images:
   - `explore.png`
   - `collection.png`
   - `history.png`
   - `apps.png`
   - `info.png`
   - `config.png`
   - `reboot.png`
   - `shutdown.png`
3. Duplicate `./scheme/default.ini` → `muxlaunch.ini`
4. Set all `[LIST]` alpha values to `=0` (invisible list items)
5. Configure navigation type:
   - `[MISC] NAVIGATION_TYPE=0` → Vertical navigation
   - `[MISC] NAVIGATION_TYPE=1` → Horizontal navigation

### Reference Themes

- **GamePal** – Navigation pattern example
- **GbOs** – Navigation pattern example
- **Plexus** – Navigation pattern example

---

## Fonts

> Source: https://muos.dev/themes/fonts

### Supported Input Formats

| Format | Description |
|--------|-------------|
| `.ttf` | TrueType Font |
| `.otf` | OpenType Font |
| `.woff` | Web Open Font Format |

All fonts must be converted to `.bin` (binary) format for use in muOS themes.

### Conversion: Online Method

Use the **LVGL Font Converter**: https://lvgl.io/tools/fontconverter

### Conversion: Offline Method

**Prerequisites:**
- [Node.js](https://nodejs.org/en/download/prebuilt-installer) installed
- Install `lv_font_conv` globally:
  ```
  npm i lv_font_conv -g
  ```
  > macOS users may need to prepend `sudo`

**Basic Conversion Command:**
```bash
lv_font_conv --bpp 4 --size 20 --font "username/folder/example.ttf" \
  -r 0x00-0xFF --format bin --no-compress --no-prefilter \
  -o "./Downloads/default.bin"
```

### Configuration Parameters

| Parameter | Description |
|-----------|-------------|
| `--size` | Font size in pixels (20 recommended for most screen elements) |
| `--bpp` | Bits-per-pixel for smoothness: 1, 2, 4, or 8 (default: 4) |
| `-r` | Character range(s) to include |
| `-o` | Output file path and filename |

### Recommended Character Ranges

For broad language support:

| Range | Script |
|-------|--------|
| `0x0020-0x007E` | Basic Latin |
| `0x00A1-0x00FF` | Latin-1 Supplement |
| `0x0100-0x017F` | Latin Extended-A |
| `0x0180-0x024F` | Latin Extended-B |
| `0x0400-0x04FF` | Cyrillic |
| `0x0900-0x097F` | Devanagari |
| `0x1E00-0x1EFF` | Latin Extended Additional |
| `0x2010-0x205E` | General Punctuation |

**Full multi-range command:**
```bash
lv_font_conv --bpp 4 --size 20 --font "username/folder/example.ttf" \
  -r 0x0020-0x007E,0x00A1-0x00FF,0x0100-0x017F,0x0180-0x024F,\
0x0400-0x04FF,0x0900-0x097F,0x1E00-0x1EFF,0x2010-0x205E \
  --format bin --no-compress --no-prefilter \
  -o "./Downloads/default.bin"
```

### Installation

Place compiled `.bin` files in `./font/` with the following naming:

| Filename | Scope |
|----------|-------|
| `default.bin` | Universal — applies to all programs |
| `mux_example.bin` | Program-specific font |

### Important Notes

- Some fonts don't support all character ranges — errors are normal; exclude unsupported ranges or choose a different font
- File paths with **spaces** may cause generation errors — rename files/folders to remove spaces before converting
- Reference: [lv_font_conv GitHub repository](https://github.com/lvgl/lv_font_conv)

---

## Scheme Files

> Source: https://muos.dev/themes/scheme

### Overview

Scheme files (`.ini`) are the core configuration layer of muOS themes. They control color, transparency, positioning, and alignment across all UI elements.

### File Hierarchy (Additive/Override System)

Settings are loaded in order — later files override earlier values:

1. `/scheme/global.ini` — Global settings across all resolutions
2. `/{Resolution}/scheme/default.ini` — Resolution-specific defaults for all screens
3. `/{Resolution}/scheme/{module}.ini` — Screen-specific overrides

### Color Format

- **Hex colors**: 6-digit values, e.g., `000000` (black), `FFFFFF` (white)
- **Alpha range**: `0` (invisible) → `255` (fully opaque)

---

### `[BACKGROUND]` Section

Controls the main background appearance.

| Key | Description | Values |
|-----|-------------|--------|
| `BACKGROUND` | Primary background color | Hex |
| `BACKGROUND_ALPHA` | Background transparency | 0–255 |
| `BACKGROUND_GRADIENT_COLOR` | Secondary gradient color | Hex |
| `BACKGROUND_GRADIENT_DIRECTION` | Gradient orientation | 0=None, 1=Vertical, 2=Horizontal |
| `BACKGROUND_GRADIENT_DITHER` | Dither enhancement | — |
| `BACKGROUND_GRADIENT_BLUR` | Blur enhancement | — |

---

### `[FONT PADDING]` Section

Manages spacing between text/icons and container edges.

| Key | Description |
|-----|-------------|
| `FONT_HEADER_PAD_TOP` | Header text top spacing |
| `FONT_HEADER_PAD_BOTTOM` | Header text bottom spacing |
| `FONT_LIST_PAD_LEFT` | List item text left padding |
| `FONT_LIST_PAD_RIGHT` | List item text right padding |
| `FONT_LIST_PAD_TOP` | List item text top padding |
| `FONT_LIST_PAD_BOTTOM` | List item text bottom padding |
| `FONT_LIST_ICON_PAD_TOP` | Glyph top spacing within list items |
| `FONT_LIST_ICON_PAD_BOTTOM` | Glyph bottom spacing within list items |

---

### `[HEADER]` / `[FOOTER]` Sections

Define dimensions and styling for top/bottom interface bars.

| Key | Description | Values |
|-----|-------------|--------|
| `HEIGHT` | Bar height in pixels | Integer |
| `BACKGROUND` | Bar background color | Hex |
| `BACKGROUND_ALPHA` | Bar background transparency | 0–255 |
| `TEXT` | Bar text color | Hex |
| `TEXT_ALPHA` | Bar text transparency | 0–255 |
| `TEXT_ALIGN` | Horizontal text alignment | 0=Auto, 1=Left, 2=Center, 3=Right |
| `PADDING_LEFT` | Left horizontal spacing | Integer |
| `PADDING_RIGHT` | Right horizontal spacing | Integer |

---

### `[NAVIGATION]` Section

Configures button appearance and labels for device controls.

Buttons: `A`, `B`, `C`, `X`, `Y`, `Z`, `MENU`

| Key Pattern | Description |
|-------------|-------------|
| `NAV_{BUTTON}_GLYPH` | Icon color |
| `NAV_{BUTTON}_TEXT` | Label color |
| `NAV_{BUTTON}_GLYPH_ALPHA` | Icon transparency |
| `ALIGNMENT` | Footer button positioning: 0=Left, 1=Center, 2=Right, 3+=Special |

---

### `[LIST]` Section

Manages appearance of selectable list items.

| Key | Description | Values |
|-----|-------------|--------|
| `LIST_DEFAULT_BACKGROUND` | Unselected item background | Hex |
| `LIST_DEFAULT_BACKGROUND_ALPHA` | Unselected item transparency | 0–255 |
| `LIST_FOCUS_BACKGROUND` | Selected item background | Hex |
| `LIST_FOCUS_BACKGROUND_ALPHA` | Selected item transparency | 0–255 |
| `LIST_DEFAULT_TEXT` | Unselected text color | Hex |
| `LIST_FOCUS_TEXT` | Selected text color | Hex |
| `LIST_DEFAULT_BORDER_WIDTH` | Border width for unselected items | Integer |
| `LIST_DEFAULT_BORDER_SIDE` | Border sides (additive values) | 1=Bottom, 2=Top, 4=Left, 8=Right |
| `LIST_DEFAULT_GLYPH_RECOLOUR` | Icon tinting for unselected | Hex |
| `LIST_DEFAULT_LABEL_LONG_MODE` | Text overflow behavior | 0=Wrap, 1=Ellipse/Scroll |

**Border side calculation** (additive):
`All sides = 1 (bottom) + 2 (top) + 4 (left) + 8 (right) = 15`

---

### `[GRID]` Section

Controls icon grid display for menus and content explorers.

| Key | Description | Values |
|-----|-------------|--------|
| `COLUMN_COUNT` | Number of grid columns | Integer |
| `ROW_COUNT` | Number of grid rows | Integer |
| `CELL_WIDTH` | Individual cell width | Integer |
| `CELL_HEIGHT` | Individual cell height | Integer |
| `CELL_DEFAULT_BACKGROUND` | Unselected cell background | Hex |
| `CELL_FOCUS_BACKGROUND` | Selected cell background | Hex |
| `CURRENT_ITEM_LABEL_ALIGNMENT` | Label position (compass) | 1–9 |
| `CURRENT_ITEM_LABEL_OFFSET_X` | Fine horizontal position | Integer |
| `CURRENT_ITEM_LABEL_OFFSET_Y` | Fine vertical position | Integer |
| `NAVIGATION_TYPE` | Input handling | 2=Standard, 4=Wrapping |

**Label alignment compass values:**
```
7 8 9
4 5 6
1 2 3
```

---

### `[STATUS BAR]` Section

| Key | Description | Values |
|-----|-------------|--------|
| `ALIGN` | Icon positioning in header | 0=Left, 1=Right, 2=Center, 3=Spaced, 4=Distributed, 5=Mixed |
| `PADDING_LEFT` | Icon spacing from left edge | Integer |
| `PADDING_RIGHT` | Icon spacing from right edge | Integer |

---

### `[BATTERY]` / `[NETWORK]` / `[BLUETOOTH]` Sections

Status indicator styling.

| Key Pattern | Description |
|-------------|-------------|
| `{STATUS}_NORMAL` | Disconnected/standard state color |
| `{STATUS}_ACTIVE` | Connected/charging state color |
| `{STATUS}_ALPHA` | Transparency values |

---

### `[CONTENT LIST]` Properties

| Key | Description | Values |
|-----|-------------|--------|
| `CONTENT_ITEM_COUNT` | Items visible on screen | 5–13 |
| `CONTENT_HEIGHT` | Total list area height | min: 100 |
| `CONTENT_WIDTH` | List item width | Integer |
| `CONTENT_PADDING_TOP` | Distance from header | Integer (default accounts for 42px header) |
| `CONTENT_ALIGNMENT` | Item positioning | 0=Left, 1=Center, 2=Right |
| `CONTENT_SIZE_TO_CONTENT` | Auto-resize to text dimensions | 0/1 |

---

### Additional UI Sections

| Section | Description |
|---------|-------------|
| `[HELP]` / `[INFO]` | Background, border, text, and radius styling for windows |
| `[OSK]` | On-Screen Keyboard — unselected/focused button appearance, text colors, transparency |
| `[NOTIFICATION]` | Pop-up message styling with background and border properties |
| `[PROGRESS BAR]` | Volume/brightness indicator with active/inactive states |
| `[PASSCODE]` / `[ROLL]` | Lock screen button styling and selection states |
| `[COUNTER]` | Item indexing display — positioning and styling |
| `[CHARGING SCREEN]` | Banner appearance when device charges without booting |

---

### Special Features

#### Random Backgrounds
```ini
RANDOM_BACKGROUND=1
```
Cycles through sequentially-named PNG files:
`{program}.0.png`, `{program}.1.png`, etc.

#### Static Image Layering

`STATIC_ALIGNMENT` controls positioning relative to header/footer (values 0–4 with different z-index and position combinations).

---

## Theme Alternatives

> Source: https://muos.dev/themes/alternative

### Overview

Theme Alternatives allow multiple versions of a theme to be bundled in a single `.muxthm` file. Users select alternatives at:
`Configuration → Customisation`

The default alternative is specified in `active.txt` at the theme root.

---

### Method 1: Scheme `.ini` Files

Store `.ini` files in the `alternate/` folder at the theme root. The filename becomes the display name in the customization menu.

```
alternate/
├── Black.ini
├── Blue.ini
├── Green.ini
├── muOS.ini
├── Orange.ini
├── Purple.ini
└── Red.ini
```

**Characteristics:**
- Adjusts styling across all muOS screens and resolutions
- Typically modifies color parameters
- Lightweight — no image assets involved

**RGB Configuration (optional):**
Place `rgbconf.sh` files in `/alternate/rgb/{name}/` to apply unique RGB lighting settings per alternative.

---

### Method 2: `.muxalt` Archive Files

More substantial theme variations — can include images, fonts, and full scheme overrides.

**Example structure (Aurora theme):**
```
theme/active/
└── 640x480/
    ├── image/
    │   ├── bootlogo.png
    │   ├── overlay.png
    │   └── wall/
    ├── font/
    └── scheme/
```

`.muxalt` files extract into a `theme/active/` directory structure.

---

## Assets (Grid Images)

> Source: https://muos.dev/themes/assets

### Overview

Theme assets extend themes with additional grid icon images. They are packaged in an `assets.muxzip` file placed at the theme root. This archive auto-extracts when the theme is selected.

### Directory Structure

**Applications:**
```
catalogue/Application/grid/
├── {icon_name}.png
└── {Resolution}/
    └── {icon_name}.png
```

**Content Explorer (Folders/Systems):**
```
catalogue/Folder/grid/
├── {system_name}.png
├── default.png
└── {Resolution}/
    └── {system_name}.png
```

> Icon names for applications come from the `ICON` variable in application scripts. If undefined, `app` is used as the fallback.

### Image Lookup Priority

muOS searches for grid images in this order:

1. `/{Grid Path}/{Resolution}/{Filename}.png`
2. `/{Grid Path}/{Resolution}/default.png`
3. `/{Grid Path}/{Filename}.png`
4. `/{Grid Path}/default.png`

`default.png` serves as a fallback when specific images are unavailable.

### Focused State Images

| Filename | Scope |
|----------|-------|
| `{Filename}_focused.png` | Custom focus indicator per item |
| `default_focused.png` | Fallback focus indicator for all items |

### Best Practices

- Use catalogue names as filenames: e.g., `Sega Mega Drive - Genesis.png`
  This ensures correct images display regardless of custom folder naming by the user.

### Packaging Steps

1. Organize files following the catalogue structure
2. Compress the `catalogue/` folder using:
   - **Windows**: WinRar or 7zip
   - **macOS**: Keka
   - **Linux**: 7zip
3. Rename the archive to `assets.muxzip`
4. Place at the theme's root directory

---

## Finishing Your Theme

> Source: https://muos.dev/themes/finish

### Preview Image

The preview image visually represents your theme in the theme selector.

> "Most preview images are displayed at 45% the screen resolution."

**Options:**
- Capture a screenshot from your device using `MENU + PWR`
- Create a custom showcase image

**Requirements:**
- Filename: `preview.png`
- Location: `{Resolution}/preview.png` (e.g., `640x480/preview.png`)

---

### Packaging Your Theme

> **Critical:** "You must compress the folder structure together **NOT** the root folder of your theme."

**Files/folders to include:**
- `credits.txt`
- `./640x480/preview.png` (or your resolution folder)
- `./image/` directory
- `./scheme/` directory
- All other theme-related folders

**Packaging steps:**

1. Select all necessary files and directories
2. Compress using appropriate software:
   - **Windows**: WinRar or 7zip
   - **macOS**: Keka
   - **Linux**: 7zip
3. Name the archive as desired
4. **Rename** the `.zip` extension to `.muxthm`
   Example: `my_theme.zip` → `my_theme.muxthm`

The `.muxthm` file is now ready for distribution and installation.

---

## Quick Reference

### File Extension Glossary

| Extension | Purpose |
|-----------|---------|
| `.muxthm` | Complete theme package |
| `.muxalt` | Theme alternative archive |
| `.muxzip` | Theme assets archive (grid icons) |
| `.ini` | Scheme configuration file |
| `.bin` | Compiled font file |
| `.bmp` | Boot logo (24-bit True Colour) |
| `.png` | Images (backgrounds, glyphs, overlays) |
| `.wav` | Sound effects |

### Minimum Theme Structure Checklist

- [ ] `credits.txt`
- [ ] `active.txt` (if using alternatives)
- [ ] `{Resolution}/scheme/default.ini`
- [ ] `{Resolution}/preview.png`
- [ ] Any custom images in `{Resolution}/image/wall/` or `{Resolution}/image/static/`
- [ ] Any custom glyphs in `{Resolution}/glyph/{program}/`
- [ ] Any custom fonts in `font/` as `.bin` files
- [ ] `assets.muxzip` (if including grid icons)

### Scheme Sections Summary

| Section | Controls |
|---------|---------|
| `BACKGROUND` | Main background color & gradient |
| `FONT PADDING` | Text/icon spacing |
| `HEADER` | Top bar appearance |
| `FOOTER` | Bottom bar appearance |
| `NAVIGATION` | Button glyphs and labels |
| `LIST` | Selectable item styling |
| `GRID` | Icon grid display |
| `STATUS BAR` | Status icon alignment |
| `BATTERY/NETWORK/BLUETOOTH` | Status indicator colors |
| `CONTENT LIST` | List layout and count |
| `HELP/INFO` | Info window styling |
| `OSK` | On-screen keyboard |
| `NOTIFICATION` | Pop-up messages |
| `PROGRESS BAR` | Volume/brightness bar |
| `PASSCODE/ROLL` | Lock screen |
| `COUNTER` | Item index display |
| `CHARGING SCREEN` | Charging banner |
