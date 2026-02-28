import { useTheme } from '../context/ThemeContext';
import { findImage } from '../lib/themeLoader';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ListItem from '../components/ListItem';

const INFO_ITEMS = [
  { id: 'news',       label: 'Community News',  emoji: '📰' },
  { id: 'tracker',    label: 'Activity Tracker', emoji: '📊' },
  { id: 'screenshot', label: 'Screenshots',      emoji: '📷' },
  { id: 'storage',    label: 'Storage Space',    emoji: '💾' },
  { id: 'input',      label: 'Input Tester',     emoji: '🕹️' },
  { id: 'system',     label: 'System Details',   emoji: '🖥️' },
  { id: 'network',    label: 'Network Details',  emoji: '🌐' },
];

export default function MuxInfo() {
  const theme = useTheme();
  const images = theme?.images ?? new Map();
  const resolution = theme?.resolution ?? '720x480';

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: 'var(--mux-bg, #121212)',
        position: 'relative',
      }}
    >
      <Header title="INFORMATION" counter={{ current: 1, total: 7 }} />

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
        {INFO_ITEMS.map((item, i) => (
          <ListItem
            key={item.id}
            text={item.label}
            focused={i === 0}
            glyphSrc={findImage(images, resolution, `glyph/muxinfo/${item.id}.png`)}
            fallbackText={item.emoji}
          />
        ))}
      </div>

      <Footer navA="Select" navB="Back" />
    </div>
  );
}
