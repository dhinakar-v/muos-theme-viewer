interface FooterProps {
  hints?: Array<{ label: string; action: string }>;
  navA?: string;
  navB?: string;
  navX?: string;
  navY?: string;
}

export default function Footer({ hints, navA, navB, navX, navY }: FooterProps) {
  const items = hints ?? [
    ...(navY ? [{ label: 'Y', action: navY }] : []),
    ...(navX ? [{ label: 'X', action: navX }] : []),
    ...(navB ? [{ label: 'B', action: navB }] : []),
    ...(navA ? [{ label: 'A', action: navA }] : []),
  ];

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
        padding: '0 16px',
        zIndex: 10,
        fontSize: 12,
      }}
    >
      {items.map((item, i) => (
        <span key={i} style={{ marginRight: 16 }}>
          <span style={{ opacity: 0.8 }}>◦</span>
          {' '}{item.action}
        </span>
      ))}
    </div>
  );
}
