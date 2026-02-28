import { createContext, useContext } from 'react';
import type { SchemeValues } from '../lib/iniParser';

export interface AltScheme {
  name: string;
  scheme: SchemeValues;
}

export interface ThemeData {
  scheme: SchemeValues;           // merged global scheme
  screenSchemes: Map<string, SchemeValues>; // per-screen schemes
  images: Map<string, string>;    // normalized path → blob URL
  resolution: string;             // e.g. "720x480"
  name: string;                   // theme display name
  audio: Map<string, string>;     // filename → blob URL
  altSchemes: AltScheme[];        // parsed .muxalt files
}

export const ThemeContext = createContext<ThemeData | null>(null);

export function useTheme(): ThemeData | null {
  return useContext(ThemeContext);
}

/**
 * Hook that returns a per-screen scheme, falling back to global scheme.
 */
export function useScreenScheme(screenName: string): SchemeValues {
  const theme = useContext(ThemeContext);
  if (!theme) return {};
  return theme.screenSchemes.get(screenName) ?? theme.scheme;
}

/**
 * Find an image URL by trying resolution-specific then root paths.
 */
export function useImage(
  ...paths: string[]
): string | undefined {
  const theme = useContext(ThemeContext);
  if (!theme) return undefined;
  const { images, resolution } = theme;

  for (const p of paths) {
    const resPath = `${resolution}/${p}`;
    if (images.has(resPath)) return images.get(resPath);
    if (images.has(p)) return images.get(p);
  }
  return undefined;
}
