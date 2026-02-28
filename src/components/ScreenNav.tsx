export type ScreenId =
  | 'boot'
  | 'muxstart'
  | 'muxlaunch'
  | 'muxcharge'
  | 'muxplore'
  | 'muxcollect'
  | 'muxapp'
  | 'muxhistory'
  | 'muxinfo'
  | 'muxconfig';

export const SCREENS: { id: ScreenId; label: string }[] = [
  { id: 'boot', label: 'Boot Logo' },
  { id: 'muxstart', label: 'Start' },
  { id: 'muxlaunch', label: 'Launch' },
  { id: 'muxcharge', label: 'Charge' },
  { id: 'muxplore', label: 'Explorer' },
  { id: 'muxcollect', label: 'Collections' },
  { id: 'muxapp', label: 'Apps' },
  { id: 'muxhistory', label: 'History' },
  { id: 'muxinfo', label: 'Info' },
  { id: 'muxconfig', label: 'Config' },
];

interface ScreenNavProps {
  active: ScreenId;
  onChange: (id: ScreenId) => void;
  disabled?: boolean;
}

export default function ScreenNav({ active, onChange, disabled = false }: ScreenNavProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '4px',
        padding: '8px 0',
        justifyContent: 'center',
      }}
    >
      {SCREENS.map((screen) => (
        <button
          key={screen.id}
          onClick={() => !disabled && onChange(screen.id)}
          disabled={disabled}
          style={{
            padding: '5px 10px',
            borderRadius: '4px',
            border: 'none',
            cursor: disabled ? 'default' : 'pointer',
            fontSize: '12px',
            fontWeight: active === screen.id ? 700 : 400,
            background: active === screen.id
              ? '#6c63ff'
              : 'rgba(255,255,255,0.08)',
            color: disabled
              ? 'rgba(255,255,255,0.3)'
              : active === screen.id
                ? '#ffffff'
                : 'rgba(255,255,255,0.7)',
            transition: 'all 0.15s ease',
            outline: 'none',
          }}
          onMouseOver={(e) => {
            if (!disabled && active !== screen.id) {
              e.currentTarget.style.background = 'rgba(255,255,255,0.14)';
            }
          }}
          onMouseOut={(e) => {
            if (!disabled && active !== screen.id) {
              e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
            }
          }}
        >
          {screen.label}
        </button>
      ))}
    </div>
  );
}
