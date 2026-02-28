import { useTheme } from '../context/ThemeContext';
import { useUIState } from '../context/UIStateContext';
import { findImage } from '../lib/themeLoader';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ListItem from '../components/ListItem';

const SAMPLE_COLLECTIONS = [
  { name: 'Favourites', count: 12, emoji: '⭐' },
  { name: 'Best RPGs', count: 8, emoji: '🗡' },
  { name: 'Platformers', count: 25, emoji: '🎮' },
  { name: 'Racing', count: 6, emoji: '🏎' },
  { name: 'Action', count: 31, emoji: '💥' },
];

export default function MuxCollect() {
  const theme = useTheme();
  const { viewMode } = useUIState();
  const images = theme?.images ?? new Map();
  const resolution = theme?.resolution ?? '720x480';

  const wallUrl = findImage(images, resolution, 'image/wall/muxcollect.png', 'wall/muxcollect.png');

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
      <Header title="COLLECTION" />

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
          {SAMPLE_COLLECTIONS.map((col, idx) => {
            const glyphUrl = findImage(images, resolution, 'glyph/muxcollect/collection.png');
            return (
              <div
                key={col.name}
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
                  padding: '12px 6px',
                  aspectRatio: '1',
                }}
              >
                {glyphUrl ? (
                  <img src={glyphUrl} alt="" style={{ width: '44px', height: '44px', objectFit: 'contain' }} />
                ) : (
                  <div style={{ fontSize: '28px' }}>{col.emoji}</div>
                )}
                <span style={{
                  fontSize: '10px',
                  color: 'var(--mux-list-text, #fff)',
                  textAlign: 'center',
                  lineHeight: 1.2,
                  opacity: idx === 0 ? 1 : 0.8,
                }}>
                  {col.name}
                </span>
                <span style={{ fontSize: '10px', opacity: 0.6, color: 'var(--mux-list-text, #fff)' }}>
                  {col.count}
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
            overflow: 'hidden',
          }}
        >
          {/* Left: List items */}
          <div style={{ flex: '0 0 55%', overflowY: 'auto', padding: '4px 0' }}>
            {SAMPLE_COLLECTIONS.map((col, idx) => (
              <ListItem
                key={col.name}
                text={col.name}
                focused={idx === 0}
                fallbackText="○"
                value={`${col.count}`}
              />
            ))}
          </div>

          {/* Right: Boxart for focused item */}
          {(() => {
            const focusedCol = SAMPLE_COLLECTIONS[0];
            const boxartSrc = findImage(
              images, resolution,
              `catalogue/${focusedCol.name}/box.png`,
              `catalogue/${focusedCol.name}/preview.png`,
            );
            return boxartSrc ? (
              <div style={{
                flex: 1,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: 12,
              }}>
                <img
                  src={boxartSrc}
                  alt=""
                  style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', borderRadius: 4 }}
                />
              </div>
            ) : null;
          })()}
        </div>
      )}

      <Footer navA="Open" navB="Back" navY="New" />
    </div>
  );
}
