import { useImage } from '../context/ThemeContext';

export default function MuxStart() {
  const wallUrl = useImage('image/wall/muxstart.png', 'wall/muxstart.png');

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: 'var(--mux-bg, #121212)',
        backgroundImage: wallUrl ? `url(${wallUrl})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        padding: '24px',
        background: 'rgba(0,0,0,0.45)',
        borderRadius: '8px',
      }}>
        <div style={{ color: 'rgba(255,255,255,0.95)', fontSize: '22px', fontWeight: 700, letterSpacing: '0.06em' }}>
          muOS
        </div>
        <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: '13px' }}>
          muOS is starting…
        </div>
        <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px', marginTop: '4px' }}>
          v2501.1
        </div>
      </div>
    </div>
  );
}
