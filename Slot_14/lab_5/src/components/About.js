import React from 'react';

function About() {
  return (
    <div style={{ maxWidth: 700, margin: '40px auto', padding: 24, background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
      <h1>About This Project</h1>
     
      <h3>Features:</h3>
      <ul>
        <li>Home, News, About, Contact, and Quiz pages</li>
        <li>Interactive quiz with scoring</li>
        <li>Contact form with validation</li>
        <li>Responsive design using Bootstrap</li>
      </ul>
      <h3>Team Members:</h3>
      <ul>
        <li>Tran Nguyen Phong (DE180075)</li>
      </ul>
      <p style={{ marginTop: 24 }}>
        Thank you for visiting our website!
      </p>
    </div>
  );
}

export default About;