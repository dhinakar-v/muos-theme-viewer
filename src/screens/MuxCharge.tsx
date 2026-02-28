import { useTheme } from '../context/ThemeContext';
import { findImage } from '../lib/themeLoader';

export default function MuxCharge() {
  const theme = useTheme();
  const images = theme?.images ?? new Map();
  const resolution = theme?.resolution ?? '720x480';

  const wallUrl = findImage(images, resolution, 'image/wall/muxcharge.png', 'wall/muxcharge.png');

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: 'var(--mux-charger-bg, var(--mux-bg, #121212))',
        backgroundImage: wallUrl ? `url(${wallUrl})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Charging indicator banner */}
      <div
        style={{
          position: 'absolute',
          bottom: 'var(--mux-charger-y, 165px)',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        {/* Battery charging icon */}
        <svg width="48" height="24" viewBox="0 0 48 24" fill="var(--mux-charger-text, #ffffff)">
          <rect x="0" y="2" width="40" height="20" rx="3" fill="none" stroke="currentColor" strokeWidth="2"/>
          <rect x="2" y="4" width="30" height="16" rx="2" fill="currentColor" opacity="0.9"/>
          <rect x="40" y="8" width="8" height="8" rx="2" fill="currentColor" opacity="0.6"/>
          <text x="24" y="16" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#000">⚡</text>
        </svg>
        <div
          style={{
            color: 'var(--mux-charger-text, #ffffff)',
            fontSize: '14px',
            opacity: 0.85,
          }}
        >
          Charging...
        </div>
      </div>
    </div>
  );
}
