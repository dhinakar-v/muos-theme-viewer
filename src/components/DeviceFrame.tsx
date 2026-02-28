import { useRef, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { schemeToCssVars } from '../lib/cssVariables';

interface DeviceFrameProps {
  children: React.ReactNode;
  scale?: number;
}

const DEVICE_WIDTH = 720;
const DEVICE_HEIGHT = 480;

export default function DeviceFrame({ children, scale = 1 }: DeviceFrameProps) {
  const theme = useTheme();
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!frameRef.current || !theme) return;
    const vars = schemeToCssVars(theme.scheme);
    for (const [key, value] of Object.entries(vars)) {
      frameRef.current.style.setProperty(key, value);
    }
  }, [theme]);

  return (
    <div
      style={{
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
        width: DEVICE_WIDTH,
        height: DEVICE_HEIGHT,
        flexShrink: 0,
      }}
    >
      <div
        ref={frameRef}
        style={{
          width: DEVICE_WIDTH,
          height: DEVICE_HEIGHT,
          position: 'relative',
          overflow: 'hidden',
          background: 'var(--mux-bg, #121212)',
          outline: '2px solid rgba(255,255,255,0.1)',
          borderRadius: '4px',
          fontFamily: 'system-ui, sans-serif',
          fontSize: '14px',
        }}
      >
        {children}
      </div>
    </div>
  );
}
