import { useTheme } from '../context/ThemeContext';
import { findImage } from '../lib/themeLoader';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ListItem from '../components/ListItem';

const SAMPLE_HISTORY = [
  { name: 'Super Mario World', system: 'SNES' },
  { name: 'Pokémon Emerald', system: 'GBA' },
  { name: 'Sonic the Hedgehog', system: 'Genesis' },
  { name: 'Tetris', system: 'Game Boy' },
  { name: 'Metal Slug', system: 'MAME' },
  { name: 'Castlevania', system: 'NES' },
];

export default function MuxHistory() {
  const theme = useTheme();
  const images = theme?.images ?? new Map();
  const resolution = theme?.resolution ?? '720x480';

  const wallUrl = findImage(images, resolution, 'image/wall/muxhistory.png', 'wall/muxhistory.png');

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
      <Header title="History" />

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
        {SAMPLE_HISTORY.map((game, idx) => (
          <ListItem
            key={game.name}
            text={game.name}
            focused={idx === 0}
            value={game.system}
          />
        ))}
      </div>

      <Footer navA="Launch" navB="Back" navX="Remove" />
    </div>
  );
}
