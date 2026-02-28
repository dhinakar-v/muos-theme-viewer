import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useUIState } from '../context/UIStateContext';
import { findImage } from '../lib/themeLoader';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ListItem from '../components/ListItem';

const MENU_ITEMS = [
  { id: 'explore', label: 'Explore Content', emoji: '🗂' },
  { id: 'collection', label: 'Collections', emoji: '📁' },
  { id: 'history', label: 'History', emoji: '🕐' },
  { id: 'apps', label: 'Applications', emoji: '🎮' },
  { id: 'info', label: 'Information', emoji: 'ℹ' },
  { id: 'config', label: 'Configuration', emoji: '⚙' },
  { id: 'reboot', label: 'Reboot', emoji: '🔄' },
  { id: 'shutdown', label: 'Shutdown', emoji: '⏻' },
];

export default function MuxLaunch() {
  const [focusedIdx] = useState(0);
  const theme = useTheme();
  const { viewMode } = useUIState();
  const focused = MENU_ITEMS[focusedIdx];

  const images = theme?.images ?? new Map();
  const resolution = theme?.resolution ?? '720x480';

  const wallUrl = findImage(images, resolution,
    `image/wall/muxlaunch/${focused.id}.png`,
    `wall/muxlaunch/${focused.id}.png`,
    'image/wall/muxlaunch/explore.png',
    'wall/muxlaunch/explore.png'
  );

  const overlayUrl = findImage(images, resolution, 'image/overlay.png', 'overlay.png');

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
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />
      )}

      <Header title="muOS" />

      {viewMode === 'grid' ? (
        <div
          style={{
            position: 'absolute',
            top: 'var(--mux-header-height, 48px)',
            bottom: 'var(--mux-footer-height, 48px)',
            left: 0,
            right: 0,
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gridTemplateRows: 'repeat(2, 1fr)',
            gap: '12px',
            padding: '16px',
            zIndex: 2,
            overflowX: 'hidden',
          }}
        >
          {MENU_ITEMS.map((item, idx) => {
            const glyphUrl = findImage(images, resolution, `glyph/muxlaunch/${item.id}.png`);
            const isFocused = idx === focusedIdx;
            return (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  borderRadius: '8px',
                  background: isFocused
                    ? 'var(--mux-cell-focus-bg, rgba(108,99,255,0.35))'
                    : 'var(--mux-cell-default-bg, rgba(255,255,255,0.06))',
                  padding: '8px',
                }}
              >
                {glyphUrl ? (
                  <img src={glyphUrl} alt="" style={{ width: '48px', height: '48px', objectFit: 'contain' }} />
                ) : (
                  <div style={{
                    width: '48px',
                    height: '48px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '26px',
                  }}>
                    {item.emoji}
                  </div>
                )}
                <span style={{
                  fontSize: '11px',
                  color: 'var(--mux-list-text, #fff)',
                  textAlign: 'center',
                  lineHeight: 1.2,
                  opacity: isFocused ? 1 : 0.8,
                  fontWeight: isFocused ? 600 : 400,
                  overflow: 'hidden',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical' as const,
                }}>
                  {item.label}
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
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '8px 0',
            zIndex: 2,
          }}
        >
          {MENU_ITEMS.map((item, idx) => {
            const glyphUrl = findImage(images, resolution, `glyph/muxlaunch/${item.id}.png`);
            return (
              <ListItem
                key={item.id}
                text={item.label}
                focused={idx === focusedIdx}
                glyphSrc={glyphUrl}
              />
            );
          })}
        </div>
      )}

      <Footer navA="Select" navB="Back" />
    </div>
  );
}
