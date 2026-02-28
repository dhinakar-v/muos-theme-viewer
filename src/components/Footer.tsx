interface FooterProps {
  navA?: string;
  navB?: string;
  navX?: string;
  navY?: string;
}

interface NavButtonProps {
  label: string;
  text: string;
  color?: string;
}

function NavButton({ label, text, color = 'var(--mux-nav-a-glyph, #ffffff)' }: NavButtonProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
      <div
        style={{
          width: '18px',
          height: '18px',
          borderRadius: '50%',
          background: color,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '10px',
          fontWeight: 700,
          color: '#000',
          flexShrink: 0,
        }}
      >
        {label}
      </div>
      <span style={{ color: 'var(--mux-nav-a-text, #ffffff)', opacity: 0.85, fontSize: '12px' }}>
        {text}
      </span>
    </div>
  );
}

export default function Footer({ navA = 'Select', navB = 'Back', navX, navY }: FooterProps) {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 'var(--mux-footer-height, 48px)',
        background: 'var(--mux-footer-bg, transparent)',
        color: 'var(--mux-footer-text, #ffffff)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 16px',
        gap: '16px',
        zIndex: 10,
      }}
    >
      {navY && <NavButton label="Y" text={navY} color="#9b59b6" />}
      {navX && <NavButton label="X" text={navX} color="#2980b9" />}
      <NavButton label="B" text={navB} color="var(--mux-nav-b-glyph, #e74c3c)" />
      <NavButton label="A" text={navA} color="var(--mux-nav-a-glyph, #27ae60)" />
    </div>
  );
}
