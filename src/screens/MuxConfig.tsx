import { useTheme } from '../context/ThemeContext';
import { findImage } from '../lib/themeLoader';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ListItem from '../components/ListItem';

const CONFIG_ITEMS = [
  { id: 'general', label: 'General Settings', emoji: '⚙' },
  { id: 'theme', label: 'Theme', emoji: '🎨' },
  { id: 'language', label: 'Language', emoji: '🌐' },
  { id: 'network', label: 'Network', emoji: '🌐' },
  { id: 'bluetooth', label: 'Bluetooth', emoji: '📡' },
  { id: 'storage', label: 'Storage', emoji: '💾' },
  { id: 'audio', label: 'Audio', emoji: '🔊' },
  { id: 'power', label: 'Power', emoji: '🔋' },
  { id: 'advanced', label: 'Advanced', emoji: '⚡' },
];

export default function MuxConfig() {
  const theme = useTheme();
  const images = theme?.images ?? new Map();
  const resolution = theme?.resolution ?? '720x480';

  const wallUrl = findImage(images, resolution, 'image/wall/muxconfig.png', 'wall/muxconfig.png');

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
      <Header title="CONFIGURATION" counter={{ current: 1, total: 9 }} />

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
        {CONFIG_ITEMS.map((item, idx) => {
          const glyphUrl = findImage(
            images, resolution,
            `glyph/muxconfig/${item.id}.png`,
          );
          return (
            <ListItem
              key={item.id}
              text={item.label}
              focused={idx === 0}
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
