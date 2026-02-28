import { useTheme } from '../context/ThemeContext';
import { useUIState } from '../context/UIStateContext';

export default function AltSchemesPanel() {
  const theme = useTheme();
  const { activeAltScheme, setActiveAltScheme } = useUIState();

  const altSchemes = theme?.altSchemes ?? [];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <div style={{ fontSize: '11px', opacity: 0.5, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>
        Alternate Schemes
      </div>

      {/* Base theme reset */}
      <button
        onClick={() => setActiveAltScheme(null)}
        style={{
          width: '100%',
          padding: '7px 10px',
          textAlign: 'left',
          borderRadius: '6px',
          border: `1px solid ${activeAltScheme === null ? '#6c63ff' : 'rgba(0,0,0,0.12)'}`,
          background: activeAltScheme === null ? 'rgba(108,99,255,0.15)' : 'rgba(0,0,0,0.05)',
          cursor: 'pointer',
          fontSize: '12px',
          fontWeight: activeAltScheme === null ? 600 : 400,
          color: 'inherit',
        }}
      >
        Base theme
      </button>

      {altSchemes.length === 0 && (
        <div style={{ fontSize: '12px', opacity: 0.5, padding: '6px 0' }}>
          No alternate schemes in this theme.
        </div>
      )}

      {altSchemes.map((alt) => {
        const isActive = activeAltScheme === alt.scheme;
        return (
          <button
            key={alt.name}
            onClick={() => setActiveAltScheme(isActive ? null : alt.scheme)}
            style={{
              width: '100%',
              padding: '7px 10px',
              textAlign: 'left',
              borderRadius: '6px',
              border: `1px solid ${isActive ? '#6c63ff' : 'rgba(0,0,0,0.12)'}`,
              background: isActive ? 'rgba(108,99,255,0.15)' : 'rgba(0,0,0,0.05)',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: isActive ? 600 : 400,
              color: 'inherit',
            }}
          >
            {alt.name}
          </button>
        );
      })}
    </div>
  );
}
