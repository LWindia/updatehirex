import React, { useState } from 'react';

const COMPANY_CREDENTIALS = [
  { email: 'prateek@curiousai.in', password: 'prateek@hirex2025', redirectUrl: 'https://curiousai.in/' },
  { email: 'jibbran@gmail.com', password: '1234', redirectUrl: 'https://www.google.com/' },
  // Add more users as needed
];

const Login = ({ onLoginSuccess, onCancel }: { onLoginSuccess?: (email: string) => void; onCancel?: () => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const found = COMPANY_CREDENTIALS.find(
      (c) => c.email.toLowerCase() === email.toLowerCase() && c.password === password
    );
    if (found) {
      setError('');
      if (onLoginSuccess) onLoginSuccess(found.email);
      // Only redirect if not prateek@curiousai.in
      if (found.email.toLowerCase() !== 'prateek@curiousai.in') {
        window.location.href = found.redirectUrl;
      }
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'rgba(255,255,255,0.35)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
    }}>
      <form
        onSubmit={handleSubmit}
        style={{
          background: '#fff',
          padding: '2.7rem 2.2rem',
          borderRadius: '28px',
          minWidth: '350px',
          boxShadow: '0 8px 40px 0 rgba(0,0,0,0.18)',
          border: '2.5px solid #000',
          fontFamily: 'Inter, Segoe UI, Arial, sans-serif',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '1.7rem' }}>
          <div style={{
            background: '#fff',
            padding: '0.5rem 1.1rem',
            borderRadius: '16px',
            boxShadow: '0 2px 12px rgba(0,0,0,0.10)',
            marginBottom: '0.7rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <img src="/assets/logo.png" alt="Hirex Logo" style={{ width: '48px', height: '48px', objectFit: 'contain', display: 'block' }} />
          </div>
          <h2 style={{ 
            marginBottom: '0.5rem', 
            textAlign: 'center', 
            color: '#111',
            fontWeight: 900,
            fontSize: '2rem',
            letterSpacing: '0.01em',
            textShadow: '0 1px 0 #fff',
          }}>
            Company Login
          </h2>
        </div>
        <div style={{ marginBottom: '1.75rem', position: 'relative' }}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ 
              width: '100%', 
              padding: '1.1rem 0.75rem 0.4rem 0.75rem',
              border: '1.5px solid #ef4444',
              borderRadius: '8px',
              outline: 'none',
              background: 'transparent',
              color: '#111',
              fontWeight: 500,
              fontSize: '1.05rem',
              transition: 'border 0.18s, box-shadow 0.18s',
              boxSizing: 'border-box',
              boxShadow: email ? '0 0 0 2px #ef4444' : 'none',
            }}
            required
            onFocus={e => { e.currentTarget.style.border = '1.5px solid #b91c1c'; e.currentTarget.style.boxShadow = '0 0 0 2px #ef4444'; }}
            onBlur={e => { e.currentTarget.style.border = '1.5px solid #ef4444'; e.currentTarget.style.boxShadow = 'none'; }}
          />
          <label style={{
            position: 'absolute',
            left: '0.85rem',
            top: email ? '0.25rem' : '1.1rem',
            fontSize: email ? '0.85rem' : '1.05rem',
            color: email ? '#b91c1c' : '#991b1b',
            fontWeight: 700,
            pointerEvents: 'none',
            background: '#fff',
            padding: email ? '0 0.2rem' : '0',
            transition: 'all 0.18s cubic-bezier(.4,0,.2,1)',
            letterSpacing: '0.01em',
          }}>Email</label>
        </div>
        <div style={{ marginBottom: '1.75rem', position: 'relative' }}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ 
              width: '100%', 
              padding: '1.1rem 0.75rem 0.4rem 0.75rem',
              border: '1.5px solid #ef4444',
              borderRadius: '8px',
              outline: 'none',
              background: 'transparent',
              color: '#111',
              fontWeight: 500,
              fontSize: '1.05rem',
              transition: 'border 0.18s, box-shadow 0.18s',
              boxSizing: 'border-box',
              boxShadow: password ? '0 0 0 2px #ef4444' : 'none',
            }}
            required
            onFocus={e => { e.currentTarget.style.border = '1.5px solid #b91c1c'; e.currentTarget.style.boxShadow = '0 0 0 2px #ef4444'; }}
            onBlur={e => { e.currentTarget.style.border = '1.5px solid #ef4444'; e.currentTarget.style.boxShadow = 'none'; }}
          />
          <label style={{
            position: 'absolute',
            left: '0.85rem',
            top: password ? '0.25rem' : '1.1rem',
            fontSize: password ? '0.85rem' : '1.05rem',
            color: password ? '#b91c1c' : '#991b1b',
            fontWeight: 700,
            pointerEvents: 'none',
            background: '#fff',
            padding: password ? '0 0.2rem' : '0',
            transition: 'all 0.18s cubic-bezier(.4,0,.2,1)',
            letterSpacing: '0.01em',
          }}>Password</label>
        </div>
        {error && <div style={{ color: '#dc2626', marginBottom: '1.2rem', fontWeight: 700, textAlign: 'center', letterSpacing: '0.01em' }}>{error}</div>}
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1.2rem' }}>
          <button
            type="submit"
            style={{ 
              flex: 1,
              padding: '0.85rem', 
              background: '#ef4444',
              color: '#fff', 
              border: 'none', 
              borderRadius: '18px',
              fontWeight: 800,
              fontSize: '1.1rem',
              letterSpacing: '0.01em',
              boxShadow: '0 8px 24px 0 rgba(59,130,246,0.18), 0 2px 12px rgba(220,38,38,0.10)', // blue-500 and red-600
              position: 'relative',
              overflow: 'hidden',
              transition: 'transform 0.18s cubic-bezier(.4,0,.2,1), box-shadow 0.18s',
              cursor: 'pointer',
            }}
            onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 16px 32px 0 rgba(59,130,246,0.22), 0 2px 12px rgba(220,38,38,0.12)'; }}
            onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 24px 0 rgba(59,130,246,0.18), 0 2px 12px rgba(220,38,38,0.10)'; }}
            onMouseDown={e => e.currentTarget.style.transform = 'scale(0.97)'}
            onMouseUp={e => e.currentTarget.style.transform = 'translateY(-6px)'}
          >
            <span style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              borderRadius: '18px',
              background: 'linear-gradient(120deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.08) 100%)',
              pointerEvents: 'none',
              zIndex: 1,
            }} />
            <span style={{ position: 'relative', zIndex: 2 }}>Login</span>
          </button>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              style={{
                flex: 1,
                padding: '0.85rem',
                background: '#fff',
                color: '#ef4444',
                border: '1.5px solid #ef4444',
                borderRadius: '8px',
                fontWeight: 800,
                fontSize: '1.1rem',
                letterSpacing: '0.01em',
                boxShadow: '0 2px 12px rgba(220,38,38,0.06)',
                transition: 'background 0.2s, color 0.2s',
                cursor: 'pointer',
              }}
              onMouseOver={e => {
                e.currentTarget.style.background = '#ef4444';
                e.currentTarget.style.color = '#fff';
              }}
              onMouseOut={e => {
                e.currentTarget.style.background = '#fff';
                e.currentTarget.style.color = '#ef4444';
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login; 