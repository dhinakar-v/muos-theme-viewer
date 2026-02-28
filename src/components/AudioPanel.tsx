import { useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

function prettifyName(filename: string): string {
  return filename
    .replace(/\.(wav|ogg|mp3)$/i, '')
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function AudioPanel() {
  const theme = useTheme();
  const [playingFile, setPlayingFile] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const audioMap = theme?.audio ?? new Map<string, string>();
  const entries = [...audioMap.entries()];

  function play(filename: string, url: string) {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    if (playingFile === filename) {
      setPlayingFile(null);
      return;
    }
    const audio = new Audio(url);
    audio.addEventListener('ended', () => setPlayingFile(null));
    audio.play().catch(() => setPlayingFile(null));
    audioRef.current = audio;
    setPlayingFile(filename);
  }

  if (entries.length === 0) {
    return (
      <div style={{ fontSize: '12px', opacity: 0.5, padding: '12px 0' }}>
        No audio files in this theme.
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <div style={{ fontSize: '11px', opacity: 0.5, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>
        Audio Files
      </div>
      {entries.map(([filename, url]) => {
        const isPlaying = playingFile === filename;
        return (
          <div
            key={filename}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 8px',
              borderRadius: '6px',
              background: isPlaying ? 'rgba(108,99,255,0.15)' : 'rgba(0,0,0,0.06)',
              border: `1px solid ${isPlaying ? 'rgba(108,99,255,0.4)' : 'rgba(0,0,0,0.1)'}`,
            }}
          >
            <button
              onClick={() => play(filename, url)}
              style={{
                width: '26px',
                height: '26px',
                borderRadius: '50%',
                border: 'none',
                background: isPlaying ? '#6c63ff' : 'rgba(108,99,255,0.5)',
                color: '#fff',
                cursor: 'pointer',
                fontSize: '11px',
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {isPlaying ? '■' : '▶'}
            </button>
            <span style={{ fontSize: '12px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {prettifyName(filename)}
            </span>
          </div>
        );
      })}
    </div>
  );
}
