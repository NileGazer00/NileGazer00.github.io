'use client';

import { useState } from 'react';

export default function LeadCapturePage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');

    const formData = new FormData(e.currentTarget);
    const data = {
      fullName: formData.get('fullName'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      timestamp: new Date().toISOString(),
      source: 'Portfolio Form'
    };

    try {
      const response = await fetch('https://hook.eu1.make.com/3k32nh4dtd6k7jaobmhsfi71gcmwxdhc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        setStatus('success');
        (e.target as HTMLFormElement).reset();
        setTimeout(() => setStatus('idle'), 3000);
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  }

  return (
    <main style={{ maxWidth: '600px', margin: '4rem auto', padding: '1rem' }}>
      <h1>📝 Lead Capture</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="fullName" placeholder="Full name" required style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem' }} />
        <input type="email" name="email" placeholder="Email" required style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem' }} />
        <input type="tel" name="phone" placeholder="Phone" style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem' }} />
        <button type="submit" disabled={status === 'loading'} style={{ width: '100%', padding: '0.75rem', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          {status === 'loading' ? 'Submitting...' : 'Submit'}
        </button>
        {status === 'success' && <p style={{ color: 'green', marginTop: '1rem' }}>✓ Lead captured successfully!</p>}
        {status === 'error' && <p style={{ color: 'red', marginTop: '1rem' }}>✗ Something went wrong. Please try again.</p>}
      </form>
    </main>
  );
}