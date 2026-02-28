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
      {!wallUrl && (
        <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '13px' }}>
          muxstart wallpaper
        </div>
      )}
    </div>
  );
}
