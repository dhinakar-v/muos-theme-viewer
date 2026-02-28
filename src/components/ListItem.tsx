interface ListItemProps {
  text: string;
  focused?: boolean;
  glyphSrc?: string;
  value?: string;
  style?: React.CSSProperties;
}

export default function ListItem({ text, focused = false, glyphSrc, value, style }: ListItemProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '0 var(--mux-list-pad-right, 15px) 0 var(--mux-list-pad-left, 45px)',
        height: '40px',
        background: focused ? 'var(--mux-list-focus-bg, rgba(255,255,255,0.1))' : 'var(--mux-list-default-bg, transparent)',
        color: focused ? 'var(--mux-list-focus-text, #ffffff)' : 'var(--mux-list-default-text, #ffffff)',
        borderRadius: focused ? '30px' : '0',
        gap: '10px',
        fontSize: '14px',
        ...style,
      }}
    >
      {glyphSrc && (
        <img
          src={glyphSrc}
          alt=""
          style={{ width: '24px', height: '24px', objectFit: 'contain', flexShrink: 0, opacity: 0.9 }}
        />
      )}
      <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {text}
      </span>
      {value && (
        <span style={{ opacity: 0.7, fontSize: '13px', flexShrink: 0 }}>{value}</span>
      )}
    </div>
  );
}
