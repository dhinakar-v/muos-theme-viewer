import { useTheme } from '../context/ThemeContext';
import { useUIState } from '../context/UIStateContext';
import { findImage } from '../lib/themeLoader';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ListItem from '../components/ListItem';

const ITEMS = [
  { id: 'explore',    label: 'Explore',       emoji: '🗺️' },
  { id: 'collection', label: 'Collections',   emoji: '📦' },
  { id: 'history',    label: 'History',       emoji: '📜' },
  { id: 'apps',       label: 'Applications',  emoji: '📱' },
  { id: 'info',       label: 'Information',   emoji: 'ℹ️' },
  { id: 'config',     label: 'Configuration', emoji: '⚙️' },
  { id: 'reboot',     label: 'Reboot',        emoji: '🔄' },
  { id: 'shutdown',   label: 'Shutdown',      emoji: '⏻' },
];

// Per-item accent colors (OneTwo signature feature)
const ITEM_COLORS: Record<string, string> = {
  explore:    '#6147FF',
  collection: '#E0457B',
  history:    '#E0802A',
  apps:       '#3DB85B',
  info:       '#3BBFE0',
  config:     '#E0C040',
  reboot:     '#8FD63A',
  shutdown:   '#E04040',
};

interface MuxLaunchProps {
  focusedIdx?: number;
}

export default function MuxLaunch({ focusedIdx = 0 }: MuxLaunchProps) {
  const theme = useTheme();
  const { viewMode } = useUIState();

  const images = theme?.images ?? new Map();
  const resolution = theme?.resolution ?? '720x480';

  const focused = ITEMS[focusedIdx];

  const wallUrl = findImage(
    images, resolution,
    `image/wall/muxlaunch/${focused.id}.png`,
    `wall/muxlaunch/${focused.id}.png`,
    'image/wall/muxlaunch/explore.png',
    'wall/muxlaunch/explore.png',
  );

  const overlayUrl = findImage(images, resolution, 'image/overlay.png', 'overlay.png');

  const primaryItems = ITEMS.slice(0, 3);
  const secondaryItems = ITEMS.slice(3);

  if (viewMode === 'list') {
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
        {overlayUrl && (
          <img
            src={overlayUrl}
            alt=""
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%',
              objectFit: 'cover', pointerEvents: 'none', zIndex: 1,
            }}
          />
        )}
        <Header />
        <div
          style={{
            position: 'absolute',
            top: 'var(--mux-header-height, 48px)',
            bottom: 'var(--mux-footer-height, 48px)',
            left: 0, right: 0,
            display: 'flex', flexDirection: 'column', justifyContent: 'center',
            padding: '8px 0',
            zIndex: 2,
          }}
        >
          {ITEMS.map((item, idx) => {
            const glyphUrl = findImage(images, resolution, `glyph/muxlaunch/${item.id}.png`);
            return (
              <ListItem
                key={item.id}
                text={item.label}
                focused={idx === focusedIdx}
                glyphSrc={glyphUrl}
                fallbackText={item.emoji}
              />
            );
          })}
        </div>
        <Footer navA="Select" navB="Back" />
      </div>
    );
  }

  // Grid mode — two-tier layout
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
      {overlayUrl && (
        <img
          src={overlayUrl}
          alt=""
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover', pointerEvents: 'none', zIndex: 1,
          }}
        />
      )}
      <Header />

      <div
        style={{
          position: 'absolute',
          top: 'var(--mux-header-height, 48px)',
          bottom: 'var(--mux-footer-height, 48px)',
          left: 0, right: 0,
          display: 'flex', flexDirection: 'column',
          justifyContent: 'center',
          padding: '8px 16px',
          zIndex: 2,
          gap: 12,
        }}
      >
        {/* Top tier: 3 large cards */}
        <div style={{ display: 'flex', gap: 12 }}>
          {primaryItems.map((item, i) => {
            const glyphSrc = findImage(images, resolution, `glyph/muxlaunch/${item.id}.png`);
            const accentColor = ITEM_COLORS[item.id];
            const isFocused = i === focusedIdx;
            return (
              <div
                key={item.id}
                style={{
                  flex: 1,
                  borderRadius: 12,
                  background: isFocused ? `${accentColor}55` : 'rgba(255,255,255,0.06)',
                  border: isFocused ? `2px solid ${accentColor}` : '2px solid transparent',
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center',
                  padding: '18px 8px', gap: 8,
                  minHeight: 110,
                }}
              >
                {glyphSrc ? (
                  <img
                    src={glyphSrc}
                    alt=""
                    style={{ width: 48, height: 48, objectFit: 'contain', filter: 'brightness(0) invert(1)' }}
                  />
                ) : (
                  <span style={{ fontSize: 32 }}>{item.emoji}</span>
                )}
                <span style={{ fontSize: 12, fontWeight: 500, opacity: 0.9 }}>{item.label}</span>
              </div>
            );
          })}
        </div>

        {/* Bottom tier: 5 small circular buttons */}
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center' }}>
          {secondaryItems.map((item, i) => {
            const glyphSrc = findImage(images, resolution, `glyph/muxlaunch/${item.id}.png`);
            const accentColor = ITEM_COLORS[item.id];
            const isFocused = (i + 3) === focusedIdx;
            return (
              <div
                key={item.id}
                style={{
                  width: 72, height: 72, borderRadius: '50%',
                  background: isFocused ? `${accentColor}55` : 'rgba(255,255,255,0.06)',
                  border: isFocused ? `2px solid ${accentColor}` : '2px solid transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                {glyphSrc ? (
                  <img
                    src={glyphSrc}
                    alt=""
                    style={{ width: 32, height: 32, objectFit: 'contain', filter: 'brightness(0) invert(1)' }}
                  />
                ) : (
                  <span style={{ fontSize: 22 }}>{item.emoji}</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <Footer navA="Select" navB="Back" />
    </div>
  );
}
