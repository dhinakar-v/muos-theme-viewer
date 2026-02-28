interface HeaderProps {
  title?: string;
}

export default function Header({ title = 'muOS' }: HeaderProps) {
  const now = new Date();
  const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 'var(--mux-header-height, 48px)',
        background: 'var(--mux-header-bg, transparent)',
        color: 'var(--mux-header-text, #ffffff)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 16px',
        zIndex: 10,
        fontSize: '13px',
      }}
    >
      <span style={{ fontWeight: 600, letterSpacing: '0.03em' }}>{title}</span>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', opacity: 0.85 }}>
        {/* Bluetooth icon */}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.71 7.71L12 2h-1v7.59L6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 11 14.41V22h1l5.71-5.71-4.3-4.29 4.3-4.29zM13 5.83l1.88 1.88L13 9.59V5.83zm1.88 10.46L13 18.17v-3.76l1.88 1.88z"/>
        </svg>
        {/* WiFi icon */}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/>
        </svg>
        {/* Battery icon */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
          <svg width="18" height="10" viewBox="0 0 24 12" fill="currentColor">
            <rect x="0" y="1" width="20" height="10" rx="2" ry="2" fill="none" stroke="currentColor" strokeWidth="1.5"/>
            <rect x="1.5" y="2.5" width="14" height="7" rx="1" fill="currentColor" opacity="0.9"/>
            <rect x="20" y="4" width="4" height="4" rx="1" fill="currentColor" opacity="0.6"/>
          </svg>
        </div>
        {/* Time */}
        <span style={{ color: 'var(--mux-datetime-text, #ffffff)', minWidth: '40px', textAlign: 'right' }}>
          {time}
        </span>
      </div>
    </div>
  );
}
