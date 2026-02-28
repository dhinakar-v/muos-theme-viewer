import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

function isHexColor(value: string): boolean {
  return /^[0-9a-fA-F]{6}$/.test(value.trim());
}

function ColorSwatch({ hex }: { hex: string }) {
  return (
    <div
      title={`#${hex}`}
      style={{
        width: '14px',
        height: '14px',
        borderRadius: '3px',
        background: `#${hex}`,
        border: '1px solid rgba(255,255,255,0.15)',
        flexShrink: 0,
        cursor: 'help',
      }}
    />
  );
}

interface SectionProps {
  name: string;
  values: Record<string, string>;
}

function Section({ name, values }: SectionProps) {
  const [open, setOpen] = useState(false);
  const entries = Object.entries(values);

  return (
    <div style={{ marginBottom: '4px' }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          width: '100%',
          background: 'rgba(255,255,255,0.05)',
          border: 'none',
          borderRadius: '4px',
          color: 'rgba(255,255,255,0.9)',
          padding: '5px 8px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '11px',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          fontWeight: 600,
        }}
        onMouseOver={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.09)')}
        onMouseOut={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
      >
        <span>{name}</span>
        <span style={{ opacity: 0.5 }}>{open ? '▾' : '▸'} {entries.length}</span>
      </button>

      {open && (
        <div
          style={{
            padding: '4px 0 4px 4px',
            display: 'flex',
            flexDirection: 'column',
            gap: '1px',
          }}
        >
          {entries.map(([key, value]) => (
            <div
              key={key}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '2px 6px',
                fontSize: '11px',
                borderRadius: '3px',
                background: 'rgba(255,255,255,0.02)',
              }}
            >
              {isHexColor(value) && <ColorSwatch hex={value} />}
              <span style={{ opacity: 0.6, minWidth: '0', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: '10px' }}>
                {key}
              </span>
              <span style={{ opacity: 0.9, flexShrink: 0, fontSize: '10px', fontFamily: 'monospace' }}>
                {value.length > 16 ? value.slice(0, 16) + '…' : value}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function SchemeInspector() {
  const theme = useTheme();

  if (!theme) {
    return (
      <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '12px', textAlign: 'center', padding: '24px 0' }}>
        Load a theme to inspect its scheme values
      </div>
    );
  }

  const sections = Object.entries(theme.scheme);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
      <div style={{ fontSize: '11px', opacity: 0.5, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
        Scheme Inspector
      </div>
      <div style={{ fontSize: '11px', opacity: 0.4, marginBottom: '6px' }}>
        {sections.length} sections · {theme.resolution}
      </div>
      {sections.map(([name, values]) => (
        <Section key={name} name={name} values={values} />
      ))}
    </div>
  );
}
