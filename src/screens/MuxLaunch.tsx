import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { findImage } from '../lib/themeLoader';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ListItem from '../components/ListItem';

const MENU_ITEMS = [
  { id: 'explore', label: 'Explore Content' },
  { id: 'collection', label: 'Collections' },
  { id: 'history', label: 'History' },
  { id: 'apps', label: 'Applications' },
  { id: 'info', label: 'Information' },
  { id: 'config', label: 'Configuration' },
  { id: 'reboot', label: 'Reboot' },
  { id: 'shutdown', label: 'Shutdown' },
];

export default function MuxLaunch() {
  const [focusedIdx] = useState(0);
  const theme = useTheme();
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

      <Footer navA="Select" navB="Back" />
    </div>
  );
}
