import { useState, useEffect, useRef } from 'react';
import { ThemeContext } from './context/ThemeContext';
import type { ThemeData } from './context/ThemeContext';
import DeviceFrame from './components/DeviceFrame';
import ThemeLoader from './components/ThemeLoader';
import SchemeInspector from './components/SchemeInspector';
import ScreenNav from './components/ScreenNav';
import type { ScreenId } from './components/ScreenNav';

// Screen imports
import BootLogo from './screens/BootLogo';
import MuxStart from './screens/MuxStart';
import MuxLaunch from './screens/MuxLaunch';
import MuxCharge from './screens/MuxCharge';
import MuxPlore from './screens/MuxPlore';
import MuxCollect from './screens/MuxCollect';
import MuxApp from './screens/MuxApp';
import MuxHistory from './screens/MuxHistory';
import MuxInfo from './screens/MuxInfo';
import MuxConfig from './screens/MuxConfig';

const DEVICE_WIDTH = 720;
const DEVICE_HEIGHT = 480;

function getScreenComponent(id: ScreenId) {
  switch (id) {
    case 'boot':       return <BootLogo />;
    case 'muxstart':   return <MuxStart />;
    case 'muxlaunch':  return <MuxLaunch />;
    case 'muxcharge':  return <MuxCharge />;
    case 'muxplore':   return <MuxPlore />;
    case 'muxcollect': return <MuxCollect />;
    case 'muxapp':     return <MuxApp />;
    case 'muxhistory': return <MuxHistory />;
    case 'muxinfo':    return <MuxInfo />;
    case 'muxconfig':  return <MuxConfig />;
  }
}

export default function App() {
  const [theme, setTheme] = useState<ThemeData | null>(null);
  const [activeScreen, setActiveScreen] = useState<ScreenId>('muxlaunch');
  const [scale, setScale] = useState(1);
  const centerRef = useRef<HTMLDivElement>(null);

  // Responsive scaling for the device frame
  useEffect(() => {
    function updateScale() {
      if (!centerRef.current) return;
      const available = centerRef.current.getBoundingClientRect();
      const maxW = available.width - 32;
      const maxH = available.height - 80;
      const scaleW = maxW / DEVICE_WIDTH;
      const scaleH = maxH / DEVICE_HEIGHT;
      setScale(Math.min(1, scaleW, scaleH));
    }
    updateScale();
    const ro = new ResizeObserver(updateScale);
    if (centerRef.current) ro.observe(centerRef.current);
    return () => ro.disconnect();
  }, []);

  function handleThemeLoad(data: ThemeData) {
    if (theme) {
      for (const url of theme.images.values()) {
        URL.revokeObjectURL(url);
      }
    }
    setTheme(data);
  }

  return (
    <ThemeContext.Provider value={theme}>
      <div
        style={{
          display: 'flex',
          height: '100vh',
          width: '100vw',
          overflow: 'hidden',
          background: '#0f0f1a',
          color: '#ffffff',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Left panel */}
        <div
          style={{
            width: '220px',
            flexShrink: 0,
            padding: '16px 12px',
            borderRight: '1px solid rgba(255,255,255,0.06)',
            overflowY: 'auto',
            background: '#111120',
          }}
        >
          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontSize: '16px', fontWeight: 700, marginBottom: '2px' }}>
              muOS Theme Viewer
            </div>
            {theme ? (
              <div style={{ fontSize: '11px', opacity: 0.5 }}>
                {theme.name} · {theme.resolution}
              </div>
            ) : (
              <div style={{ fontSize: '11px', opacity: 0.35 }}>No theme loaded</div>
            )}
          </div>
          <ThemeLoader onLoad={handleThemeLoad} />
        </div>

        {/* Center panel */}
        <div
          ref={centerRef}
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
            gap: '12px',
            overflow: 'hidden',
          }}
        >
          <div style={{ width: DEVICE_WIDTH * scale, height: DEVICE_HEIGHT * scale, position: 'relative' }}>
            <DeviceFrame scale={scale}>
              {getScreenComponent(activeScreen)}
            </DeviceFrame>
          </div>
          <ScreenNav active={activeScreen} onChange={setActiveScreen} />
        </div>

        {/* Right panel */}
        <div
          style={{
            width: '260px',
            flexShrink: 0,
            padding: '16px 12px',
            borderLeft: '1px solid rgba(255,255,255,0.06)',
            overflowY: 'auto',
            background: '#111120',
          }}
        >
          <SchemeInspector />
        </div>
      </div>
    </ThemeContext.Provider>
  );
}
