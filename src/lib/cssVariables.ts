import type { SchemeValues } from './iniParser';

/**
 * Convert a hex color string (RRGGBB) and an alpha (0-255) to a CSS rgba() string.
 */
export function hexAlphaToRgba(hex: string, alpha: string | number = 255): string {
  const h = hex.replace('#', '').padEnd(6, '0');
  const r = parseInt(h.slice(0, 2), 16) || 0;
  const g = parseInt(h.slice(2, 4), 16) || 0;
  const b = parseInt(h.slice(4, 6), 16) || 0;
  const a = typeof alpha === 'string' ? parseInt(alpha, 10) : alpha;
  const cssA = Math.round((a / 255) * 100) / 100;
  if (cssA >= 1) return `#${h}`;
  return `rgba(${r},${g},${b},${cssA})`;
}

function color(scheme: SchemeValues, section: string, colorKey: string, alphaKey?: string): string {
  const s = scheme[section];
  if (!s) return 'transparent';
  const hex = s[colorKey] ?? '';
  if (!hex) return 'transparent';
  const alphaVal = alphaKey ? (s[alphaKey] ?? '255') : '255';
  return hexAlphaToRgba(hex, alphaVal);
}

function num(scheme: SchemeValues, section: string, key: string, fallback = '0'): string {
  return scheme[section]?.[key] ?? fallback;
}

/**
 * Map parsed INI SchemeValues to a flat Record of CSS custom properties.
 * All variables prefixed with `--mux-`.
 */
export function schemeToCssVars(scheme: SchemeValues): Record<string, string> {
  const v: Record<string, string> = {};

  // Background
  v['--mux-bg'] = color(scheme, 'background', 'BACKGROUND', 'BACKGROUND_ALPHA');

  // Header
  v['--mux-header-bg'] = color(scheme, 'header', 'HEADER_BACKGROUND', 'HEADER_BACKGROUND_ALPHA');
  v['--mux-header-text'] = color(scheme, 'header', 'HEADER_TEXT', 'HEADER_TEXT_ALPHA');
  v['--mux-header-height'] = num(scheme, 'header', 'HEADER_HEIGHT', '48') + 'px';

  // Footer
  v['--mux-footer-bg'] = color(scheme, 'footer', 'FOOTER_BACKGROUND', 'FOOTER_BACKGROUND_ALPHA');
  v['--mux-footer-text'] = color(scheme, 'footer', 'FOOTER_TEXT', 'FOOTER_TEXT_ALPHA');
  v['--mux-footer-height'] = num(scheme, 'footer', 'FOOTER_HEIGHT', '48') + 'px';

  // List
  v['--mux-list-default-bg'] = color(scheme, 'list', 'LIST_DEFAULT_BACKGROUND', 'LIST_DEFAULT_BACKGROUND_ALPHA');
  v['--mux-list-default-text'] = color(scheme, 'list', 'LIST_DEFAULT_TEXT', 'LIST_DEFAULT_TEXT_ALPHA');
  v['--mux-list-focus-bg'] = color(scheme, 'list', 'LIST_FOCUS_BACKGROUND', 'LIST_FOCUS_BACKGROUND_ALPHA');
  v['--mux-list-focus-text'] = color(scheme, 'list', 'LIST_FOCUS_TEXT', 'LIST_FOCUS_TEXT_ALPHA');
  v['--mux-list-pad-left'] = num(scheme, 'font', 'FONT_LIST_PAD_LEFT', '45') + 'px';
  v['--mux-list-pad-right'] = num(scheme, 'font', 'FONT_LIST_PAD_RIGHT', '15') + 'px';

  // Battery
  v['--mux-battery-normal'] = color(scheme, 'battery', 'BATTERY_NORMAL', 'BATTERY_NORMAL_ALPHA');
  v['--mux-battery-active'] = color(scheme, 'battery', 'BATTERY_ACTIVE', 'BATTERY_ACTIVE_ALPHA');
  v['--mux-battery-low'] = color(scheme, 'battery', 'BATTERY_LOW', 'BATTERY_LOW_ALPHA');

  // Navigation
  v['--mux-nav-a-text'] = color(scheme, 'navigation', 'NAV_A_TEXT', 'NAV_A_TEXT_ALPHA');
  v['--mux-nav-b-text'] = color(scheme, 'navigation', 'NAV_B_TEXT', 'NAV_B_TEXT_ALPHA');
  v['--mux-nav-x-text'] = color(scheme, 'navigation', 'NAV_X_TEXT', 'NAV_X_TEXT_ALPHA');
  v['--mux-nav-y-text'] = color(scheme, 'navigation', 'NAV_Y_TEXT', 'NAV_Y_TEXT_ALPHA');
  v['--mux-nav-a-glyph'] = color(scheme, 'navigation', 'NAV_A_GLYPH', 'NAV_A_GLYPH_ALPHA');
  v['--mux-nav-b-glyph'] = color(scheme, 'navigation', 'NAV_B_GLYPH', 'NAV_B_GLYPH_ALPHA');

  // Date/time
  v['--mux-datetime-text'] = color(scheme, 'date', 'DATETIME_TEXT', 'DATETIME_ALPHA');

  // Grid (for muxapp/muxplore)
  v['--mux-grid-column-count'] = num(scheme, 'grid', 'COLUMN_COUNT', '3');
  v['--mux-grid-row-count'] = num(scheme, 'grid', 'ROW_COUNT', '2');
  v['--mux-grid-column-width'] = num(scheme, 'grid', 'COLUMN_WIDTH', '190') + 'px';
  v['--mux-grid-row-height'] = num(scheme, 'grid', 'ROW_HEIGHT', '170') + 'px';
  v['--mux-grid-cell-width'] = num(scheme, 'grid', 'CELL_WIDTH', '160') + 'px';
  v['--mux-grid-cell-height'] = num(scheme, 'grid', 'CELL_HEIGHT', '140') + 'px';
  v['--mux-grid-cell-radius'] = num(scheme, 'grid', 'CELL_RADIUS', '20') + 'px';
  v['--mux-grid-location-x'] = num(scheme, 'grid', 'LOCATION_X', '75') + 'px';
  v['--mux-grid-location-y'] = num(scheme, 'grid', 'LOCATION_Y', '70') + 'px';
  v['--mux-grid-bg'] = color(scheme, 'grid', 'BACKGROUND', 'BACKGROUND_ALPHA');
  v['--mux-cell-focus-bg'] = color(scheme, 'grid', 'CELL_FOCUS_BACKGROUND', 'CELL_FOCUS_BACKGROUND_ALPHA');
  v['--mux-cell-default-bg'] = color(scheme, 'grid', 'CELL_DEFAULT_BACKGROUND', 'CELL_DEFAULT_BACKGROUND_ALPHA');

  // Label (grid item label)
  v['--mux-label-bg'] = color(scheme, 'grid', 'CURRENT_ITEM_LABEL_BACKGROUND', 'CURRENT_ITEM_LABEL_BACKGROUND_ALPHA');
  v['--mux-label-text'] = color(scheme, 'grid', 'CURRENT_ITEM_LABEL_TEXT', 'CURRENT_ITEM_LABEL_TEXT_ALPHA');

  // Help
  v['--mux-help-bg'] = color(scheme, 'help', 'HELP_BACKGROUND', 'HELP_BACKGROUND_ALPHA');
  v['--mux-help-text'] = color(scheme, 'help', 'HELP_CONTENT', 'HELP_BACKGROUND_ALPHA');

  // Notification
  v['--mux-msg-bg'] = color(scheme, 'notification', 'MSG_BACKGROUND', 'MSG_BACKGROUND_ALPHA');
  v['--mux-msg-text'] = color(scheme, 'notification', 'MSG_TEXT', 'MSG_TEXT_ALPHA');

  // Charging
  v['--mux-charger-bg'] = color(scheme, 'charging', 'CHARGER_BACKGROUND', 'CHARGER_BACKGROUND_ALPHA');
  v['--mux-charger-text'] = color(scheme, 'charging', 'CHARGER_TEXT', 'CHARGER_TEXT_ALPHA');
  v['--mux-charger-y'] = num(scheme, 'charging', 'CHARGER_Y_POS', '165') + 'px';

  return v;
}
