import { UserIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer 
      style={{
        position: 'fixed',
        bottom: 0,
        width: '100%',
        height: '350px',
        backgroundColor: '#fc7168',
        boxShadow: '0 -2px 4px rgba(0,0,0,0.1)'
      }}
    >
      <div 
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 1rem'
        }}
      >
        <div style={{ textAlign: 'center', color: 'white' }}>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Joby</p>
          <p style={{ marginTop: '0.5rem' }}>© 2025 Joby. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
} 