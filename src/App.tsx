import { useState, useEffect, useRef } from 'react';
import { ThemeContext } from './context/ThemeContext';
import type { ThemeData } from './context/ThemeContext';
import { UIStateProvider, useUIState } from './context/UIStateContext';
import DeviceFrame from './components/DeviceFrame';
import ThemeLoader from './components/ThemeLoader';
import SchemeInspector from './components/SchemeInspector';
import AudioPanel from './components/AudioPanel';
import AltSchemesPanel from './components/AltSchemesPanel';
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

const GRID_SCREENS: ScreenId[] = ['muxlaunch', 'muxplore', 'muxcollect', 'muxapp', 'muxhistory'];

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

type LeftTab = 'theme' | 'audio' | 'schemes';

function AppInner({
  theme,
  handleThemeLoad,
}: {
  theme: ThemeData | null;
  handleThemeLoad: (data: ThemeData) => void;
}) {
  const [activeScreen, setActiveScreen] = useState<ScreenId>('muxlaunch');
  const [scale, setScale] = useState(1);
  const [activeTab, setActiveTab] = useState<LeftTab>('theme');
  const centerRef = useRef<HTMLDivElement>(null);
  const { viewMode, setViewMode } = useUIState();

  const showViewToggle = GRID_SCREENS.includes(activeScreen);

  // Responsive scaling for the device frame
  useEffect(() => {
    function updateScale() {
      if (!centerRef.current) return;
      const available = centerRef.current.getBoundingClientRect();
      const maxW = available.width - 80;
      const maxH = available.height - 48;
      const scaleW = maxW / DEVICE_WIDTH;
      const scaleH = maxH / DEVICE_HEIGHT;
      setScale(Math.min(1, scaleW, scaleH));
    }
    updateScale();
    const ro = new ResizeObserver(updateScale);
    if (centerRef.current) ro.observe(centerRef.current);
    return () => ro.disconnect();
  }, []);

  const tabStyle = (tab: LeftTab) => ({
    flex: 1,
    padding: '6px 4px',
    fontSize: '11px',
    fontWeight: activeTab === tab ? 600 : 400,
    background: activeTab === tab ? 'rgba(108,99,255,0.15)' : 'transparent',
    color: activeTab === tab ? '#6c63ff' : '#555',
    border: 'none',
    borderBottom: `2px solid ${activeTab === tab ? '#6c63ff' : 'transparent'}`,
    cursor: 'pointer',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.06em',
  });

  const toggleBtnStyle = (active: boolean) => ({
    padding: '5px 12px',
    fontSize: '12px',
    background: active ? '#6c63ff' : 'rgba(0,0,0,0.08)',
    color: active ? '#fff' : '#555',
    border: `1px solid ${active ? '#6c63ff' : 'rgba(0,0,0,0.15)'}`,
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: active ? 600 : 400,
  });

  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
        background: '#f5f5f7',
        color: '#1a1a1a',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      {/* Left panel */}
      <div
        style={{
          width: '220px',
          flexShrink: 0,
          borderRight: '1px solid rgba(0,0,0,0.08)',
          overflowY: 'auto',
          background: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header */}
        <div style={{ padding: '16px 12px 12px' }}>
          <div style={{ fontSize: '15px', fontWeight: 700, marginBottom: '2px', color: '#1a1a1a' }}>
            muOS Theme Viewer
          </div>
          {theme ? (
            <div style={{ fontSize: '11px', color: '#888' }}>
              {theme.name} · {theme.resolution}
            </div>
          ) : (
            <div style={{ fontSize: '11px', color: '#aaa' }}>No theme loaded</div>
          )}
        </div>

        {/* Tab bar */}
        <div style={{ display: 'flex', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
          <button style={tabStyle('theme')} onClick={() => setActiveTab('theme')}>Theme</button>
          <button style={tabStyle('audio')} onClick={() => setActiveTab('audio')}>Audio</button>
          <button style={tabStyle('schemes')} onClick={() => setActiveTab('schemes')}>Schemes</button>
        </div>

        {/* Tab content */}
        <div style={{ padding: '12px', flex: 1, overflowY: 'auto' }}>
          {activeTab === 'theme' && <ThemeLoader onLoad={handleThemeLoad} />}
          {activeTab === 'audio' && <AudioPanel />}
          {activeTab === 'schemes' && <AltSchemesPanel />}
        </div>
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
          padding: '16px 16px 12px',
          overflow: 'hidden',
          gap: '12px',
        }}
      >
        <div style={{ width: DEVICE_WIDTH * scale, height: DEVICE_HEIGHT * scale, position: 'relative' }}>
          <DeviceFrame scale={scale}>
            {getScreenComponent(activeScreen)}
          </DeviceFrame>
        </div>

        {/* Screen navigation — bottom center */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <ScreenNav active={activeScreen} onChange={setActiveScreen} />
          {/* View toggle — only for grid-capable screens */}
          {showViewToggle && (
            <div style={{ display: 'flex', gap: '6px' }}>
              <button style={toggleBtnStyle(viewMode === 'list')} onClick={() => setViewMode('list')}>
                ☰ List
              </button>
              <button style={toggleBtnStyle(viewMode === 'grid')} onClick={() => setViewMode('grid')}>
                ⊞ Grid
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Right panel */}
      <div
        style={{
          width: '240px',
          flexShrink: 0,
          padding: '12px',
          borderLeft: '1px solid rgba(0,0,0,0.08)',
          overflowY: 'auto',
          background: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}
      >
        <SchemeInspector />
      </div>
    </div>
  );
}

export default function App() {
  const [theme, setTheme] = useState<ThemeData | null>(null);

  function handleThemeLoad(data: ThemeData) {
    if (theme) {
      for (const url of theme.images.values()) {
        URL.revokeObjectURL(url);
      }
      for (const url of theme.audio.values()) {
        URL.revokeObjectURL(url);
      }
    }
    setTheme(data);
  }

  return (
    <UIStateProvider>
      <ThemeContext.Provider value={theme}>
        <AppInner theme={theme} handleThemeLoad={handleThemeLoad} />
      </ThemeContext.Provider>
    </UIStateProvider>
  );
}
