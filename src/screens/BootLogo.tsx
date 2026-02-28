import { useTheme, useImage } from '../context/ThemeContext';

export default function BootLogo() {
  const theme = useTheme();
  const logoUrl = useImage('image/bootlogo.bmp', 'bootlogo.bmp');

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: '#000000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '16px',
      }}
    >
      {logoUrl ? (
        <img
          src={logoUrl}
          alt="Boot Logo"
          style={{ maxWidth: '80%', maxHeight: '80%', objectFit: 'contain' }}
        />
      ) : (
        <div style={{ color: '#ffffff', fontSize: '28px', fontWeight: 700, letterSpacing: '0.1em' }}>
          muOS
        </div>
      )}
      {!theme && (
        <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px' }}>No theme loaded</div>
      )}
    </div>
  );
}
