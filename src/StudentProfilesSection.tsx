import React, { useState } from 'react';
import AnimatedSection from './AnimatedSection';
import StudentCard from './StudentCard';

const StudentProfilesSection = ({ students }: { students: any[] }) => {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    fullName: '',
    companyName: '',
    designation: '',
    email: '',
    contact: '',
    interestedIn: 'fulltime',
  });
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('idle');
    
    // Show loading state
    const submitButton = e.currentTarget.querySelector('button[type="submit"]') as HTMLButtonElement;
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    try {
      console.log('Submitting form data:', form);
      
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: form.fullName,
          companyName: form.companyName,
          designation: form.designation,
          email: form.email,
          contact: form.contact,
          interestedIn: form.interestedIn,
        })
      });
      
      const data = await res.json();
      console.log('API Response:', data);
      
      if (res.ok && data.success) {
        setStatus('success');
        setForm({ fullName: '', companyName: '', designation: '', email: '', contact: '', interestedIn: 'fulltime' });
      } else {
        console.error('API Error:', data);
        setStatus('error');
        // Show more specific error message if available
        if (data.message) {
          alert(`Error: ${data.message}`);
        }
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setStatus('error');
      alert('Network error. Please check your connection and try again.');
    } finally {
      // Reset button state
      submitButton.textContent = originalText;
      submitButton.disabled = false;
    }
  };

  const handleExternalLinkClick = (type: 'github' | 'linkedin' | 'portfolio', student: any) => {
    setShowModal(true);
    // Optionally, prefill a field or log the student/link type
  };

  return (
    <section className="py-20 bg-white" id='students'>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 hover:text-red-600 transition-colors duration-500">
              Meet Our <span className="text-red-600">Students</span>
            </h2>
            <p className="text-xl text-gray-600">
              Industry-ready talent from engineering colleges across India
            </p>
          </div>
        </AnimatedSection>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {students.map((student, index) => (
            <StudentCard
              key={index}
              name={student.name}
              college={student.college}
              year={student.passingOutYear}
              image={student.photo}
              github={student.github}
              linkedin={student.linkedin || student.Linkedin}
              portfolio={student.portfolio}
              index={index}
              onExternalLinkClick={handleExternalLinkClick}
            />
          ))}
        </div>
        <div className="flex justify-center mt-10">
          <button
            className="bg-red-600 text-white px-8 py-3 rounded-full text-lg font-bold shadow-lg transition-all duration-500 hover:bg-red-700 hover:scale-110 animate-pulse"
            onClick={() => setShowModal(true)}
          >
            See All Portfolios...
          </button>
        </div>
        {showModal && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0,0,0,0.45)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            {status === 'success' ? (
              <div style={{ background: '#fff', borderRadius: '18px', padding: '2.5rem 2rem', minWidth: 340, boxShadow: '0 8px 40px 0 rgba(0,0,0,0.18)', border: '2px solid #22c55e', fontFamily: 'Inter, Segoe UI, Arial, sans-serif', maxWidth: 400, textAlign: 'center' }}>
                <h2 style={{ color: '#22c55e', fontWeight: 800, fontSize: '1.3rem', marginBottom: '1.2rem' }}>Thank you!</h2>
                <div style={{ color: '#111', fontWeight: 600, fontSize: '1.1rem' }}>Our team will get back to you on your email within 24 to 48 hrs.</div>
                <button onClick={() => { setStatus('idle'); setShowModal(false); }} style={{ marginTop: 24, background: '#ef4444', color: '#fff', border: 'none', borderRadius: 6, padding: '0.8rem 1.5rem', fontWeight: 700, fontSize: '1.1rem', cursor: 'pointer' }}>Close</button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                style={{
                  background: '#fff',
                  borderRadius: '18px',
                  padding: '2.5rem 2rem',
                  minWidth: 340,
                  boxShadow: '0 8px 40px 0 rgba(0,0,0,0.18)',
                  border: '2px solid #ef4444',
                  fontFamily: 'Inter, Segoe UI, Arial, sans-serif',
                  maxWidth: 400,
                }}
              >
                <h2 style={{ fontWeight: 800, fontSize: '1.5rem', color: '#111', marginBottom: '1.5rem', textAlign: 'center' }}>
                  Submit your Interest to hire validated, skilled tech talent at ZERO cost
                </h2>
                <input name="fullName" value={form.fullName} onChange={handleChange} required placeholder="Full Name" style={{ width: '100%', marginBottom: 12, padding: 10, borderRadius: 6, border: '1.5px solid #ef4444' }} />
                <input name="companyName" value={form.companyName} onChange={handleChange} required placeholder="Company Name" style={{ width: '100%', marginBottom: 12, padding: 10, borderRadius: 6, border: '1.5px solid #ef4444' }} />
                <input name="designation" value={form.designation} onChange={handleChange} required placeholder="Designation" style={{ width: '100%', marginBottom: 12, padding: 10, borderRadius: 6, border: '1.5px solid #ef4444' }} />
                <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="Official E-mail ID" style={{ width: '100%', marginBottom: 12, padding: 10, borderRadius: 6, border: '1.5px solid #ef4444' }} />
                <input name="contact" value={form.contact} onChange={handleChange} required placeholder="Contact No" style={{ width: '100%', marginBottom: 12, padding: 10, borderRadius: 6, border: '1.5px solid #ef4444' }} />
                <div style={{ marginBottom: 12 }}>
                  <label style={{ fontWeight: 600, color: '#ef4444', marginRight: 8 }}>Interested in:</label>
                  <label style={{ marginRight: 12 }}>
                    <input type="radio" name="interestedIn" value="fulltime" checked={form.interestedIn === 'fulltime'} onChange={handleChange} required /> Full Time
                  </label>
                  <label>
                    <input type="radio" name="interestedIn" value="interns" checked={form.interestedIn === 'interns'} onChange={handleChange} required /> Interns
                  </label>
                </div>
                <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                  <button type="submit" style={{ flex: 1, background: '#ef4444', color: '#fff', border: 'none', borderRadius: 6, padding: '0.8rem', fontWeight: 700, fontSize: '1.1rem', cursor: 'pointer' }}>Submit Interest</button>
                  <button type="button" onClick={() => setShowModal(false)} style={{ flex: 1, background: '#fff', color: '#ef4444', border: '1.5px solid #ef4444', borderRadius: 6, padding: '0.8rem', fontWeight: 700, fontSize: '1.1rem', cursor: 'pointer' }}>Cancel</button>
                </div>
                {status === 'error' && <div style={{ color: '#dc2626', marginTop: 12, textAlign: 'center', fontWeight: 600 }}>Failed to submit. Please try again.</div>}
              </form>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default StudentProfilesSection; 