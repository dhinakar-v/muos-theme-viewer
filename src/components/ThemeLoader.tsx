import { useRef, useState } from 'react';
import type { ThemeData } from '../context/ThemeContext';
import { loadFromZip, loadFromFolder } from '../lib/themeLoader';

interface ThemeLoaderProps {
  onLoad: (data: ThemeData) => void;
}

export default function ThemeLoader({ onLoad }: ThemeLoaderProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const folderRef = useRef<HTMLInputElement>(null);

  async function handleZipFile(file: File) {
    if (!file.name.endsWith('.muxthm')) {
      setError('Please select a .muxthm file');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await loadFromZip(file);
      onLoad(data);
    } catch (e) {
      setError(`Failed to load theme: ${e instanceof Error ? e.message : String(e)}`);
    } finally {
      setLoading(false);
    }
  }

  async function handleFolder(files: FileList) {
    if (!files.length) return;
    setLoading(true);
    setError(null);
    try {
      const data = await loadFromFolder(files);
      onLoad(data);
    } catch (e) {
      setError(`Failed to load folder: ${e instanceof Error ? e.message : String(e)}`);
    } finally {
      setLoading(false);
    }
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleZipFile(file);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{ fontSize: '11px', opacity: 0.5, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>
        Load Theme
      </div>

      {/* Drop zone */}
      <div
        onDrop={onDrop}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onClick={() => fileRef.current?.click()}
        style={{
          border: `2px dashed ${dragging ? '#6c63ff' : 'rgba(255,255,255,0.15)'}`,
          borderRadius: '8px',
          padding: '20px 12px',
          textAlign: 'center',
          cursor: 'pointer',
          background: dragging ? 'rgba(108,99,255,0.1)' : 'rgba(255,255,255,0.03)',
          transition: 'all 0.15s ease',
          fontSize: '12px',
          color: 'rgba(255,255,255,0.6)',
          lineHeight: 1.6,
        }}
      >
        <div style={{ fontSize: '24px', marginBottom: '6px' }}>📦</div>
        <div style={{ fontWeight: 600, marginBottom: '2px' }}>Drop .muxthm here</div>
        <div style={{ opacity: 0.6 }}>or click to browse</div>
      </div>

      <input
        ref={fileRef}
        type="file"
        accept=".muxthm"
        style={{ display: 'none' }}
        onChange={(e) => e.target.files?.[0] && handleZipFile(e.target.files[0])}
      />

      {/* Divider */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', opacity: 0.4 }}>
        <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.2)' }} />
        <span style={{ fontSize: '11px' }}>or</span>
        <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.2)' }} />
      </div>

      {/* Folder button */}
      <button
        onClick={() => folderRef.current?.click()}
        style={{
          width: '100%',
          padding: '8px',
          background: 'rgba(255,255,255,0.07)',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: '6px',
          color: 'rgba(255,255,255,0.8)',
          cursor: 'pointer',
          fontSize: '12px',
          transition: 'background 0.15s ease',
        }}
        onMouseOver={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.12)')}
        onMouseOut={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.07)')}
      >
        📁 Load Folder
      </button>

      <input
        ref={folderRef}
        type="file"
        // @ts-ignore - webkitdirectory not in standard types
        webkitdirectory=""
        multiple
        style={{ display: 'none' }}
        onChange={(e) => e.target.files && handleFolder(e.target.files)}
      />

      {/* Loading state */}
      {loading && (
        <div style={{
          textAlign: 'center',
          fontSize: '12px',
          color: 'rgba(255,255,255,0.5)',
          padding: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px',
        }}>
          <span style={{ animation: 'spin 1s linear infinite', display: 'inline-block' }}>⟳</span>
          Parsing theme...
        </div>
      )}

      {/* Error */}
      {error && (
        <div style={{
          background: 'rgba(220,38,38,0.15)',
          border: '1px solid rgba(220,38,38,0.3)',
          borderRadius: '6px',
          padding: '8px 10px',
          fontSize: '12px',
          color: '#fca5a5',
        }}>
          {error}
        </div>
      )}
    </div>
  );
}
