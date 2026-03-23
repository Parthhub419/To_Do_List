import React, { useState, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useGamification } from '../../context/GamificationContext';
import { useTasks } from '../../context/TaskContext';
import { User, Award, Flame, Calendar, CheckCircle, Edit2, Camera, X, Check } from 'lucide-react';

const ProfileView = () => {
  const { user, updateProfile } = useAuth();
  const { points, currentStreak, bestStreak } = useGamification();
  const { tasks } = useTasks();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ 
    name: user?.name || '', 
    bio: user?.bio || '', 
    profilePic: user?.profilePic || null 
  });
  const fileInputRef = useRef(null);

  const completedTasks = tasks.filter(t => t.completed).length;

  const handleSave = () => {
    updateProfile(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({ name: user?.name || '', bio: user?.bio || '', profilePic: user?.profilePic || null });
    setIsEditing(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, profilePic: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', height: '100%', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ textAlign: 'left' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>User Profile</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Manage your account and view your progress.</p>
        </div>
        {!isEditing && (
          <button onClick={() => setIsEditing(true)} className="neumorphic-btn" style={{ padding: '0.8rem 1.5rem' }}>
            <Edit2 size={18} /> Edit Profile
          </button>
        )}
      </div>

      {/* User Info Card */}
      <div className="glass-card" style={{ padding: '2.5rem', display: 'flex', alignItems: 'flex-start', gap: '3rem' }}>
        
        {/* Avatar Section */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
          <div style={{ 
            width: '130px', height: '130px', borderRadius: '50%', background: 'var(--glass-bg)', border: '4px solid var(--accent-color)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', boxShadow: '0 10px 25px rgba(229, 9, 20, 0.4)',
            position: 'relative'
          }}>
            {(isEditing ? formData.profilePic : user?.profilePic) ? (
              <img src={isEditing ? formData.profilePic : user?.profilePic} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <User size={60} color="var(--text-secondary)" />
            )}
            
            {isEditing && (
              <div 
                onClick={() => fileInputRef.current.click()}
                style={{ 
                  position: 'absolute', bottom: 0, width: '100%', background: 'rgba(0,0,0,0.6)', color: '#fff', 
                  padding: '8px 0', textAlign: 'center', cursor: 'pointer', fontSize: '0.8rem',
                  display: 'flex', justifyContent: 'center'
                }}
              >
                <Camera size={18} />
              </div>
            )}
            <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" style={{ display: 'none' }} />
          </div>
        </div>

        {/* Info Section */}
        <div style={{ flex: 1 }}>
          {isEditing ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <input 
                className="neumorphic-inset" style={{ width: '100%', padding: '0.8rem 1rem', border: 'none', color: 'var(--text-primary)', fontSize: '1.5rem', fontWeight: 700, borderRadius: '8px', outline: 'none' }}
                value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Your Name"
              />
              <textarea 
                className="neumorphic-inset" style={{ width: '100%', padding: '1rem', border: 'none', color: 'var(--text-primary)', fontSize: '1rem', minHeight: '120px', resize: 'vertical', borderRadius: '8px', outline: 'none' }}
                value={formData.bio} onChange={e => setFormData({...formData, bio: e.target.value})} placeholder="Tell us a little about yourself..."
              />
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button onClick={handleSave} className="neumorphic-btn" style={{ background: 'var(--success-color)', color: '#fff', padding: '0.8rem 1.5rem', border: 'none' }}><Check size={18}/> Save Changes</button>
                <button onClick={handleCancel} className="neumorphic-btn" style={{ padding: '0.8rem 1.5rem' }}><X size={18}/> Cancel</button>
              </div>
            </div>
          ) : (
            <div>
              <h2 style={{ fontSize: '2.2rem', fontWeight: 800, margin: 0 }}>{user?.name || 'User'}</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', margin: '0.3rem 0 1.5rem 0' }}>{user?.email || 'email@example.com'}</p>
              
              {user?.bio && (
                <div style={{ background: 'var(--bg-color)', padding: '1.2rem', borderRadius: '12px', marginBottom: '1.5rem', fontStyle: 'italic', borderLeft: '4px solid var(--accent-color)', color: 'var(--text-secondary)' }}>
                  "{user.bio}"
                </div>
              )}
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                <Calendar size={16} /> 
                <span>Joined: {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Unknown'}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginTop: '1rem' }}>Your Progress</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
        <div className="neumorphic" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', textAlign: 'center' }}>
          <CheckCircle size={40} color="var(--success-color)" />
          <div>
            <span style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>{completedTasks}</span>
            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Tasks Completed</p>
          </div>
        </div>
        
        <div className="neumorphic" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', textAlign: 'center' }}>
          <Award size={40} color="gold" />
          <div>
            <span style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>{points}</span>
            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Total Points</p>
          </div>
        </div>

        <div className="neumorphic" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', textAlign: 'center' }}>
          <Flame size={40} color="#ff6b6b" />
          <div>
            <span style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>{currentStreak} <span style={{fontSize:'1rem', color:'var(--text-secondary)'}}>(Best: {bestStreak})</span></span>
            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Day Streak</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
