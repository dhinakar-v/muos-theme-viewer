import { useTheme } from '../context/ThemeContext';
import { findImage } from '../lib/themeLoader';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ListItem from '../components/ListItem';

const SAMPLE_COLLECTIONS = [
  { name: 'Favourites', count: 12 },
  { name: 'Best RPGs', count: 8 },
  { name: 'Platformers', count: 25 },
  { name: 'Racing', count: 6 },
  { name: 'Action', count: 31 },
];

export default function MuxCollect() {
  const theme = useTheme();
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
      <Header title="Collections" />

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
        {SAMPLE_COLLECTIONS.map((col, idx) => (
          <ListItem
            key={col.name}
            text={col.name}
            focused={idx === 0}
            value={`${col.count}`}
          />
        ))}
      </div>

      <Footer navA="Open" navB="Back" navY="New" />
    </div>
  );
}
