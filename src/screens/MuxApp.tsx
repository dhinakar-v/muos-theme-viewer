import { useTheme } from '../context/ThemeContext';
import { findImage } from '../lib/themeLoader';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ListItem from '../components/ListItem';

const SAMPLE_APPS = [
  { id: 'retroarch', label: 'RetroArch' },
  { id: 'gmenu2x', label: 'GMenu2X' },
  { id: 'moonlight', label: 'Moonlight' },
  { id: 'drastic', label: 'DraStic' },
  { id: 'ppsspp', label: 'PPSSPP' },
  { id: 'scummvm', label: 'ScummVM' },
  { id: 'gptokeyb', label: 'GpToKeyb' },
  { id: 'portmaster', label: 'PortMaster' },
];

export default function MuxApp() {
  const theme = useTheme();
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
      <Header title="Applications" />

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
            />
          );
        })}
      </div>

      <Footer navA="Launch" navB="Back" />
    </div>
  );
}
