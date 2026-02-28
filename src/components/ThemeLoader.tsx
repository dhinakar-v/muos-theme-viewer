import { useState } from 'react';
import { open } from '@tauri-apps/plugin-dialog';
import { readFile, readDir } from '@tauri-apps/plugin-fs';
import type { ThemeData } from '../context/ThemeContext';
import {
  loadFromZipBytes,
  loadFromFolderEntries,
  type FolderEntry,
} from '../lib/themeLoader';

interface ThemeLoaderProps {
  onLoad: (data: ThemeData) => void;
}

async function readDirRecursive(
  dirPath: string,
  base: string
): Promise<FolderEntry[]> {
  const entries: FolderEntry[] = [];
  const items = await readDir(dirPath);
  for (const item of items) {
    if (item.isDirectory && item.name) {
      const sub = await readDirRecursive(
        `${dirPath}/${item.name}`,
        `${base}${item.name}/`
      );
      entries.push(...sub);
    } else if (item.isFile && item.name) {
      const bytes = await readFile(`${dirPath}/${item.name}`);
      entries.push({ relativePath: `${base}${item.name}`, bytes });
    }
  }
  return entries;
}

export default function ThemeLoader({ onLoad }: ThemeLoaderProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleOpenZip() {
    const path = await open({
      multiple: false,
      filters: [{ name: 'muOS Theme', extensions: ['muxthm'] }],
    });
    if (!path) return;
    setLoading(true);
    setError(null);
    try {
      const bytes = await readFile(path);
      const name = path.split('/').pop()?.replace(/\.muxthm$/i, '') ?? 'theme';
      const data = await loadFromZipBytes(bytes, name);
      onLoad(data);
    } catch (e) {
      setError(
        `Failed to load theme: ${e instanceof Error ? e.message : String(e)}`
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleOpenFolder() {
    const dirPath = await open({ directory: true, multiple: false });
    if (!dirPath) return;
    setLoading(true);
    setError(null);
    try {
      const folderName = dirPath.split('/').pop() ?? 'theme';
      const entries = await readDirRecursive(dirPath, '');
      const data = await loadFromFolderEntries(entries, folderName);
      onLoad(data);
    } catch (e) {
      setError(
        `Failed to load folder: ${e instanceof Error ? e.message : String(e)}`
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div
        style={{
          fontSize: '11px',
          opacity: 0.5,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          marginBottom: '4px',
        }}
      >
        Load Theme
      </div>

      <button
        onClick={handleOpenZip}
        disabled={loading}
        style={{
          width: '100%',
          padding: '10px 8px',
          background: 'rgba(108,99,255,0.10)',
          border: '1px solid rgba(108,99,255,0.25)',
          borderRadius: '6px',
          color: 'rgba(0,0,0,0.75)',
          cursor: loading ? 'not-allowed' : 'pointer',
          fontSize: '12px',
          fontWeight: 600,
          transition: 'background 0.15s ease',
        }}
        onMouseOver={(e) => {
          if (!loading)
            e.currentTarget.style.background = 'rgba(108,99,255,0.18)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.background = 'rgba(108,99,255,0.10)';
        }}
      >
        📦 Open .muxthm File
      </button>

      {/* Divider */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          opacity: 0.4,
        }}
      >
        <div
          style={{ flex: 1, height: '1px', background: 'rgba(0,0,0,0.2)' }}
        />
        <span style={{ fontSize: '11px' }}>or</span>
        <div
          style={{ flex: 1, height: '1px', background: 'rgba(0,0,0,0.2)' }}
        />
      </div>

      <button
        onClick={handleOpenFolder}
        disabled={loading}
        style={{
          width: '100%',
          padding: '8px',
          background: 'rgba(0,0,0,0.06)',
          border: '1px solid rgba(0,0,0,0.12)',
          borderRadius: '6px',
          color: 'rgba(0,0,0,0.75)',
          cursor: loading ? 'not-allowed' : 'pointer',
          fontSize: '12px',
          transition: 'background 0.15s ease',
        }}
        onMouseOver={(e) => {
          if (!loading)
            e.currentTarget.style.background = 'rgba(0,0,0,0.10)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.background = 'rgba(0,0,0,0.06)';
        }}
      >
        📁 Open Theme Folder
      </button>

      {/* Loading state */}
      {loading && (
        <div
          style={{
            textAlign: 'center',
            fontSize: '12px',
            color: 'rgba(0,0,0,0.5)',
            padding: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
          }}
        >
          <span
            style={{
              animation: 'spin 1s linear infinite',
              display: 'inline-block',
            }}
          >
            ⟳
          </span>
          Parsing theme...
        </div>
      )}

      {/* Error */}
      {error && (
        <div
          style={{
            background: 'rgba(220,38,38,0.1)',
            border: '1px solid rgba(220,38,38,0.3)',
            borderRadius: '6px',
            padding: '8px 10px',
            fontSize: '12px',
            color: '#dc2626',
          }}
        >
          {error}
        </div>
      )}
    </div>
  );
}
