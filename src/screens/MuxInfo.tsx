import Header from '../components/Header';
import Footer from '../components/Footer';

const INFO_ROWS = [
  { label: 'Device', value: 'RG34xxSP' },
  { label: 'Resolution', value: '720x480' },
  { label: 'muOS Version', value: '2501.1' },
  { label: 'Kernel', value: 'Linux 5.10.0' },
  { label: 'CPU', value: 'Cortex-A9 @ 1.2GHz' },
  { label: 'RAM', value: '256MB' },
  { label: 'Storage', value: '64GB' },
  { label: 'Battery', value: '82%' },
  { label: 'Temperature', value: '42°C' },
];

export default function MuxInfo() {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: 'var(--mux-bg, #121212)',
        position: 'relative',
      }}
    >
      <Header title="Information" />

      <div
        style={{
          position: 'absolute',
          top: 'var(--mux-header-height, 48px)',
          bottom: 'var(--mux-footer-height, 48px)',
          left: 0,
          right: 0,
          padding: '8px 20px',
          overflowY: 'auto',
        }}
      >
        {INFO_ROWS.map((row) => (
          <div
            key={row.label}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '6px 12px',
              color: 'var(--mux-list-default-text, #ffffff)',
              borderBottom: '1px solid rgba(255,255,255,0.05)',
            }}
          >
            <span style={{ opacity: 0.7, fontSize: '13px' }}>{row.label}</span>
            <span style={{ fontWeight: 600, fontSize: '13px' }}>{row.value}</span>
          </div>
        ))}
      </div>

      <Footer navB="Back" />
    </div>
  );
}
