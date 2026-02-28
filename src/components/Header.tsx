import { useState, useEffect } from 'react';

interface HeaderProps {
  title?: string;
  counter?: { current: number; total: number };
}

function formatTime(d: Date): string {
  return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
}

export default function Header({ title, counter }: HeaderProps) {
  const [time, setTime] = useState(() => formatTime(new Date()));

  useEffect(() => {
    const id = setInterval(() => setTime(formatTime(new Date())), 60_000);
    return () => clearInterval(id);
  }, []);

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
        padding: '0 16px',
        zIndex: 10,
        fontSize: '13px',
      }}
    >
      {/* Left: Clock */}
      <span style={{ color: 'var(--mux-datetime-text, #fff)', fontWeight: 500, minWidth: 48 }}>
        {time}
      </span>

      {/* Center: Screen title */}
      <span
        style={{
          flex: 1,
          textAlign: 'center',
          fontSize: 11,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          opacity: 0.55,
          fontWeight: 600,
        }}
      >
        {title ?? ''}
      </span>

      {/* Right: Counter + WiFi + Battery */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {counter && (
          <span style={{ fontSize: 11, opacity: 0.7, marginRight: 4 }}>
            {counter.current} | {counter.total}
          </span>
        )}

        {/* WiFi icon */}
        <svg width="18" height="14" viewBox="0 0 24 18" fill="currentColor" opacity={0.85}>
          <path d="M12 4C7.6 4 3.6 5.7 0.6 8.4L3 10.9C5.4 8.7 8.6 7.4 12 7.4s6.6 1.3 9 3.5l2.4-2.5C20.4 5.7 16.4 4 12 4z" />
          <path d="M12 8.8c-2.7 0-5.2 1-7.1 2.7l2.4 2.4c1.3-1.1 3-1.8 4.7-1.8s3.4.7 4.7 1.8l2.4-2.4C17.2 9.8 14.7 8.8 12 8.8z" />
          <circle cx="12" cy="17" r="2" />
        </svg>

        {/* Battery icon */}
        <svg width="20" height="12" viewBox="0 0 28 14" fill="none" opacity={0.85}>
          <rect x="1" y="1" width="22" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <rect x="23" y="4" width="4" height="6" rx="1" fill="currentColor" opacity={0.6} />
          <rect
            x="2.5"
            y="2.5"
            width="16"
            height="9"
            rx="1.5"
            fill="var(--mux-battery-normal, currentColor)"
            opacity={0.9}
          />
        </svg>
      </div>
    </div>
  );
}
