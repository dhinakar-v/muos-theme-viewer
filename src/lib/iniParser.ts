// INI parser for muOS theme scheme files
// Sections use uppercase keys; values are typically hex colors or numeric strings

export type SchemeSection = Record<string, string>;
export type SchemeValues = Record<string, SchemeSection>;

/**
 * Parse an INI file content string into a SchemeValues object.
 * Section headers are uppercased. Keys are uppercased. Comments (;) are stripped.
 */
export function parseIni(content: string): SchemeValues {
  const result: SchemeValues = {};
  let currentSection = '_default';

  const lines = content.split(/\r?\n/);
  for (const rawLine of lines) {
    const line = rawLine.trim();

    // Skip empty lines and comments
    if (!line || line.startsWith(';') || line.startsWith('#')) continue;

    // Section header
    const sectionMatch = line.match(/^\[([^\]]+)\]/);
    if (sectionMatch) {
      currentSection = sectionMatch[1].toLowerCase();
      if (!result[currentSection]) result[currentSection] = {};
      continue;
    }

    // Key=value pair
    const eqIdx = line.indexOf('=');
    if (eqIdx > 0) {
      const key = line.slice(0, eqIdx).trim().toUpperCase();
      // Strip inline comments from value
      let value = line.slice(eqIdx + 1).trim();
      const commentIdx = value.indexOf(';');
      if (commentIdx >= 0) value = value.slice(0, commentIdx).trim();
      if (!result[currentSection]) result[currentSection] = {};
      result[currentSection][key] = value;
    }
  }

  return result;
}

/**
 * Merge multiple SchemeValues objects together.
 * Later arguments override earlier ones at the key level within each section.
 * Priority: global < default < screen-specific
 */
export function mergeSchemes(...schemes: SchemeValues[]): SchemeValues {
  const merged: SchemeValues = {};
  for (const scheme of schemes) {
    for (const section of Object.keys(scheme)) {
      if (!merged[section]) merged[section] = {};
      Object.assign(merged[section], scheme[section]);
    }
  }
  return merged;
}

/**
 * Get a value from a scheme, checking multiple section names in order.
 */
export function getSchemeValue(
  scheme: SchemeValues,
  section: string,
  key: string,
  fallback = ''
): string {
  const s = scheme[section.toLowerCase()];
  return s?.[key.toUpperCase()] ?? fallback;
}
