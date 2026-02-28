import { useTheme } from '../context/ThemeContext';
import { useUIState } from '../context/UIStateContext';
import { findImage } from '../lib/themeLoader';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ListItem from '../components/ListItem';

const SAMPLE_APPS = [
  { id: 'retroarch', label: 'RetroArch', emoji: '🕹' },
  { id: 'gmenu2x', label: 'GMenu2X', emoji: '📋' },
  { id: 'moonlight', label: 'Moonlight', emoji: '🌙' },
  { id: 'drastic', label: 'DraStic', emoji: '📱' },
  { id: 'ppsspp', label: 'PPSSPP', emoji: '🎮' },
  { id: 'scummvm', label: 'ScummVM', emoji: '🖥' },
  { id: 'gptokeyb', label: 'GpToKeyb', emoji: '⌨' },
  { id: 'portmaster', label: 'PortMaster', emoji: '⚓' },
];

export default function MuxApp() {
  const theme = useTheme();
  const { viewMode } = useUIState();
  const images = theme?.images ?? new Map();
  const resolution = theme?.resolution ?? '720x480';

  const wallUrl = findImage(images, resolution, 'image/wall/muxapp.png', 'wall/muxapp.png');

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: 'var(--mux-bg, #121212)',
        backgroundImage: wallUrl ? `url(${wallUrl})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
      }}
    >
      <Header title="APPLICATIONS" />

      {viewMode === 'grid' ? (
        <div
          style={{
            position: 'absolute',
            top: 'var(--mux-header-height, 48px)',
            bottom: 'var(--mux-footer-height, 48px)',
            left: 0,
            right: 0,
            display: 'grid',
            gridTemplateColumns: 'repeat(var(--mux-grid-column-count, 3), 1fr)',
            gap: '10px',
            padding: '14px',
            overflowY: 'auto',
            overflowX: 'hidden',
          }}
        >
          {SAMPLE_APPS.map((app, idx) => {
            const glyphUrl = findImage(images, resolution, `glyph/muxapp/${app.id}.png`);
            return (
              <div
                key={app.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  borderRadius: '8px',
                  background: idx === 0
                    ? 'var(--mux-cell-focus-bg, rgba(108,99,255,0.35))'
                    : 'var(--mux-cell-default-bg, rgba(255,255,255,0.06))',
                  padding: '10px 6px',
                  aspectRatio: '1',
                }}
              >
                {glyphUrl ? (
                  <img src={glyphUrl} alt="" style={{ width: '44px', height: '44px', objectFit: 'contain' }} />
                ) : (
                  <div style={{ fontSize: '28px' }}>{app.emoji}</div>
                )}
                <span style={{
                  fontSize: '10px',
                  color: 'var(--mux-list-text, #fff)',
                  textAlign: 'center',
                  lineHeight: 1.2,
                  opacity: idx === 0 ? 1 : 0.8,
                  overflow: 'hidden',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical' as const,
                }}>
                  {app.label}
                </span>
              </div>
            );
          })}
        </div>
      ) : (
        <div
          style={{
            position: 'absolute',
            top: 'var(--mux-header-height, 48px)',
            bottom: 'var(--mux-footer-height, 48px)',
            left: 0,
            right: 0,
            overflowY: 'auto',
            padding: '4px 0',
          }}
        >
          {SAMPLE_APPS.map((app, idx) => {
            const glyphUrl = findImage(
              images, resolution,
              `glyph/muxapp/${app.id}.png`,
            );
            return (
              <ListItem
                key={app.id}
                text={app.label}
                focused={idx === 0}
                glyphSrc={glyphUrl}
                fallbackText={app.emoji}
              />
            );
          })}
        </div>
      )}

      <Footer navA="Launch" navB="Back" />
    </div>
  );
}
