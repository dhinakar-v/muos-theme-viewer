import { useTheme } from '../context/ThemeContext';
import { findImage } from '../lib/themeLoader';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ListItem from '../components/ListItem';

const SAMPLE_FILES = [
  { name: 'Nintendo - Game Boy', type: 'folder' },
  { name: 'Nintendo - GBA', type: 'folder' },
  { name: 'Nintendo - NES', type: 'folder' },
  { name: 'Sega - Genesis', type: 'folder' },
  { name: 'Sega - Game Gear', type: 'folder' },
  { name: 'Sony - PSP', type: 'folder' },
  { name: 'Super Nintendo', type: 'folder' },
  { name: 'Arcade (MAME)', type: 'folder' },
];

export default function MuxPlore() {
  const theme = useTheme();
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
      <Header title="Explore Content" />

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

      <Footer navA="Open" navB="Back" navX="Options" />
    </div>
  );
}
