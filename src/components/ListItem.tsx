import React from 'react';

interface ListItemProps {
  text: string;
  focused?: boolean;
  glyphSrc?: string;
  fallbackText?: string;
  value?: string;
  style?: React.CSSProperties;
}

export default function ListItem({ text, focused = false, glyphSrc, fallbackText, value, style }: ListItemProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        height: 40,
        paddingLeft: 'var(--mux-list-pad-left, 45px)',
        paddingRight: 'var(--mux-list-pad-right, 15px)',
        ...style,
      }}
    >
      {/* Pill highlight wraps the content row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flex: 1,
          height: '100%',
          paddingLeft: 10,
          paddingRight: 10,
          borderRadius: focused ? 30 : 0,
          background: focused
            ? 'var(--mux-list-focus-bg, rgba(255,255,255,0.12))'
            : 'transparent',
          color: focused
            ? 'var(--mux-list-focus-text, #ffffff)'
            : 'var(--mux-list-default-text, rgba(255,255,255,0.75))',
          transition: 'background 0.15s',
          gap: 10,
        }}
      >
        {/* Glyph */}
        <div
          style={{
            width: 24,
            height: 24,
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {glyphSrc ? (
            <img
              src={glyphSrc}
              alt=""
              style={{
                width: 24,
                height: 24,
                objectFit: 'contain',
                filter: 'brightness(0) invert(1)',
              }}
            />
          ) : fallbackText ? (
            <span style={{ fontSize: 16 }}>{fallbackText}</span>
          ) : null}
        </div>

        {/* Text */}
        <span
          style={{
            flex: 1,
            fontSize: 13,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {text}
        </span>

        {/* Optional right value */}
        {value && (
          <span style={{ fontSize: 12, opacity: 0.6, flexShrink: 0 }}>{value}</span>
        )}
      </div>
    </div>
  );
}
