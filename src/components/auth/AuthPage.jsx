import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { LogIn, UserPlus } from 'lucide-react';

const AuthPage = () => {
  const { login, register } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (isLogin) {
      if (!formData.email || !formData.password) {
        setError('Please fill in all fields.');
        return;
      }
      const res = login(formData.email, formData.password);
      if (!res.success) setError(res.message);
    } else {
      if (!formData.name || !formData.email || !formData.password) {
        setError('Please fill in all fields.');
        return;
      }
      const res = register(formData.name, formData.email, formData.password);
      if (!res.success) setError(res.message);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      background: 'var(--bg-color)',
      color: 'var(--text-primary)'
    }}>
      <div className="glass-card" style={{
        width: '100%',
        maxWidth: '450px',
        padding: '3rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        alignItems: 'center',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
      }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--accent-color)', marginBottom: '0.5rem' }}>
            Taskify Ai
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            {isLogin ? 'Welcome back! Please enter your details.' : 'Create an account to get started.'}
          </p>
        </div>

        {error && <div style={{ color: '#fff', background: 'var(--danger-color)', padding: '0.8rem', borderRadius: '8px', width: '100%', textAlign: 'center', fontSize: '0.9rem' }}>{error}</div>}

        <form onSubmit={handleSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {!isLogin && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.9rem', fontWeight: 600 }}>Full Name</label>
              <input 
                type="text"
                placeholder="John Doe"
                className="neumorphic-inset"
                style={{ width: '100%', padding: '1rem', border: 'none', color: 'var(--text-primary)', outline: 'none' }}
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
          )}
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.9rem', fontWeight: 600 }}>Email Address</label>
            <input 
              type="email"
              placeholder="you@example.com"
              className="neumorphic-inset"
              style={{ width: '100%', padding: '1rem', border: 'none', color: 'var(--text-primary)', outline: 'none' }}
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.9rem', fontWeight: 600 }}>Password</label>
            <input 
              type="password"
              placeholder="••••••••"
              className="neumorphic-inset"
              style={{ width: '100%', padding: '1rem', border: 'none', color: 'var(--text-primary)', outline: 'none' }}
              value={formData.password}
              onChange={e => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <button type="submit" className="neumorphic-btn" style={{ 
            marginTop: '1rem', width: '100%', padding: '1rem', background: 'var(--accent-gradient)', color: '#fff', border: 'none', fontSize: '1.1rem', cursor: 'pointer' 
          }}>
            {isLogin ? <><LogIn size={20}/> Sign In</> : <><UserPlus size={20}/> Create Account</>}
          </button>
        </form>

        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span 
            onClick={() => { setIsLogin(!isLogin); setError(''); setFormData({name: '', email: '', password: ''}); }}
            style={{ color: 'var(--accent-color)', fontWeight: 600, cursor: 'pointer' }}
          >
            {isLogin ? 'Sign up' : 'Log in'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
