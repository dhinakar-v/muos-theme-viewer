import JSZip from 'jszip';
import { parseIni, mergeSchemes } from './iniParser';
import type { SchemeValues } from './iniParser';

export interface ThemeData {
  scheme: SchemeValues;
  images: Map<string, string>; // normalized path → blob URL
  resolution: string;
  name: string;
}

const TARGET_RESOLUTION = '720x480';
const FALLBACK_RESOLUTIONS = ['720x480', '640x480', '1280x720', '720x720'];

/**
 * Normalize a file path to use forward slashes and lowercase.
 */
function normPath(p: string): string {
  return p.replace(/\\/g, '/').replace(/^\//, '');
}

/**
 * Extract scheme values from a map of filename → content.
 * Priority: global.ini < {res}/scheme/default.ini < {res}/scheme/{module}.ini
 */
function buildScheme(
  iniFiles: Map<string, string>,
  resolution: string
): SchemeValues {
  const global = iniFiles.get('scheme/global.ini') ?? '';
  const resDefault = iniFiles.get(`${resolution}/scheme/default.ini`) ?? '';

  const globalScheme = parseIni(global);
  const defaultScheme = parseIni(resDefault);

  // Merge all screen-specific ini files from the resolution folder
  const screenSchemes: SchemeValues[] = [];
  for (const [path, content] of iniFiles.entries()) {
    if (
      path.startsWith(`${resolution}/scheme/`) &&
      !path.endsWith('/default.ini') &&
      path.endsWith('.ini')
    ) {
      screenSchemes.push(parseIni(content));
    }
  }

  return mergeSchemes(globalScheme, defaultScheme, ...screenSchemes);
}

/**
 * Build per-screen schemes (keyed by module name like "muxlaunch").
 */
export function buildScreenSchemes(
  iniFiles: Map<string, string>,
  resolution: string
): Map<string, SchemeValues> {
  const global = iniFiles.get('scheme/global.ini') ?? '';
  const resDefault = iniFiles.get(`${resolution}/scheme/default.ini`) ?? '';
  const globalScheme = parseIni(global);
  const defaultScheme = parseIni(resDefault);

  const base = mergeSchemes(globalScheme, defaultScheme);
  const screens = new Map<string, SchemeValues>();
  screens.set('default', base);

  for (const [path, content] of iniFiles.entries()) {
    if (
      path.startsWith(`${resolution}/scheme/`) &&
      !path.endsWith('/default.ini') &&
      path.endsWith('.ini')
    ) {
      const moduleName = path.split('/').pop()!.replace('.ini', '');
      screens.set(moduleName, mergeSchemes(base, parseIni(content)));
    }
    // Also check root scheme/ for per-module files
    if (
      path.startsWith('scheme/') &&
      !path.endsWith('/global.ini') &&
      path.endsWith('.ini')
    ) {
      const moduleName = path.split('/').pop()!.replace('.ini', '');
      if (!screens.has(moduleName)) {
        screens.set(moduleName, mergeSchemes(base, parseIni(content)));
      }
    }
  }

  return screens;
}

/**
 * Pick the best available resolution from what's in the theme.
 */
function pickResolution(availablePaths: string[]): string {
  for (const res of FALLBACK_RESOLUTIONS) {
    if (availablePaths.some((p) => p.startsWith(res + '/'))) return res;
  }
  return TARGET_RESOLUTION;
}

/**
 * Determine if a file is an image we want to keep.
 */
function isImage(path: string): boolean {
  return /\.(png|jpg|jpeg|bmp|gif|webp|svg)$/i.test(path);
}

/**
 * Load theme from a .muxthm ZIP file.
 */
export async function loadFromZip(file: File): Promise<ThemeData & { screenSchemes: Map<string, SchemeValues> }> {
  const zip = await JSZip.loadAsync(file);

  const iniFiles = new Map<string, string>();
  const imageFiles = new Map<string, Blob>();

  const promises: Promise<void>[] = [];

  zip.forEach((relativePath, zipEntry) => {
    if (zipEntry.dir) return;
    const p = normPath(relativePath);

    if (p.endsWith('.ini')) {
      promises.push(
        zipEntry.async('string').then((content) => {
          iniFiles.set(p, content);
        })
      );
    } else if (isImage(p)) {
      promises.push(
        zipEntry.async('blob').then((blob) => {
          imageFiles.set(p, blob);
        })
      );
    }
  });

  await Promise.all(promises);

  const allPaths = [...iniFiles.keys(), ...imageFiles.keys()];
  const resolution = pickResolution(allPaths);

  const scheme = buildScheme(iniFiles, resolution);
  const screenSchemes = buildScreenSchemes(iniFiles, resolution);

  const images = new Map<string, string>();
  for (const [path, blob] of imageFiles.entries()) {
    images.set(path, URL.createObjectURL(blob));
  }

  const name = file.name.replace(/\.muxthm$/i, '');
  return { scheme, images, resolution, name, screenSchemes };
}

/**
 * Load theme from a folder via <input webkitdirectory>.
 */
export async function loadFromFolder(files: FileList): Promise<ThemeData & { screenSchemes: Map<string, SchemeValues> }> {
  const iniFiles = new Map<string, string>();
  const imageFiles = new Map<string, Blob>();

  const promises: Promise<void>[] = [];

  // The FileList from webkitdirectory includes the folder name as prefix.
  // We strip it to get a consistent path.
  const allWebkitPaths = Array.from(files).map((f) => (f as File & { webkitRelativePath: string }).webkitRelativePath);
  const prefix = allWebkitPaths[0]?.split('/')[0] ?? '';

  for (const file of Array.from(files)) {
    const f = file as File & { webkitRelativePath: string };
    const rawPath = f.webkitRelativePath;
    const p = rawPath.startsWith(prefix + '/')
      ? rawPath.slice(prefix.length + 1)
      : rawPath;

    if (p.endsWith('.ini')) {
      promises.push(
        f.text().then((content) => {
          iniFiles.set(p, content);
        })
      );
    } else if (isImage(p)) {
      imageFiles.set(p, f);
    }
  }

  await Promise.all(promises);

  const allPaths = [...iniFiles.keys(), ...imageFiles.keys()];
  const resolution = pickResolution(allPaths);

  const scheme = buildScheme(iniFiles, resolution);
  const screenSchemes = buildScreenSchemes(iniFiles, resolution);

  const images = new Map<string, string>();
  for (const [path, blob] of imageFiles.entries()) {
    images.set(path, URL.createObjectURL(blob));
  }

  const name = prefix || 'theme';
  return { scheme, images, resolution, name, screenSchemes };
}

/**
 * Find an image URL by trying various path patterns.
 */
export function findImage(
  images: Map<string, string>,
  resolution: string,
  ...paths: string[]
): string | undefined {
  for (const p of paths) {
    // Try resolution-specific first
    const resPath = `${resolution}/${p}`;
    if (images.has(resPath)) return images.get(resPath);
    if (images.has(p)) return images.get(p);
  }
  return undefined;
}
