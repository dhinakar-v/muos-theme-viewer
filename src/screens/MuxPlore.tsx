import { useTheme } from '../context/ThemeContext';
import { useUIState } from '../context/UIStateContext';
import { findImage } from '../lib/themeLoader';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ListItem from '../components/ListItem';

const SAMPLE_FILES = [
  { name: 'Nintendo - Game Boy', type: 'folder', emoji: '🟢' },
  { name: 'Nintendo - GBA', type: 'folder', emoji: '🟣' },
  { name: 'Nintendo - NES', type: 'folder', emoji: '🔴' },
  { name: 'Sega - Genesis', type: 'folder', emoji: '🔵' },
  { name: 'Sega - Game Gear', type: 'folder', emoji: '🟡' },
  { name: 'Sony - PSP', type: 'folder', emoji: '⚫' },
  { name: 'Super Nintendo', type: 'folder', emoji: '🟤' },
  { name: 'Arcade (MAME)', type: 'folder', emoji: '🔶' },
];

export default function MuxPlore() {
  const theme = useTheme();
  const { viewMode } = useUIState();
  const images = theme?.images ?? new Map();
  const resolution = theme?.resolution ?? '720x480';

  const wallUrl = findImage(images, resolution, 'image/wall/muxplore.png', 'wall/muxplore.png');

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
      <Header title="EXPLORE CONTENT" />

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
          {SAMPLE_FILES.map((file, idx) => {
            const folderImg = findImage(
              images, resolution,
              `catalogue/${file.name}/grid/default.png`,
              `glyph/muxplore/${file.type}.png`,
              'glyph/muxplore/folder.png'
            );
            return (
              <div
                key={file.name}
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
                {folderImg ? (
                  <img src={folderImg} alt="" style={{ width: '44px', height: '44px', objectFit: 'contain' }} />
                ) : (
                  <div style={{ fontSize: '28px' }}>{file.emoji}</div>
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
                  {file.name}
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
          {SAMPLE_FILES.map((file, idx) => {
            const glyphUrl = findImage(
              images, resolution,
              `glyph/muxplore/${file.type}.png`,
              `glyph/muxplore/folder.png`
            );
            return (
              <ListItem
                key={file.name}
                text={file.name}
                focused={idx === 0}
                glyphSrc={glyphUrl}
              />
            );
          })}
        </div>
      )}

      <Footer navA="Open" navB="Back" navX="Options" />
    </div>
  );
}
