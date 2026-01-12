import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Calendar } from 'lucide-react';
import { personalInfo } from '../data/content';

const GitHubIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
  </svg>
);

const LinkedInIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      // Using Web3Forms - free, no signup required for basic usage
      // Get your access key at https://web3forms.com
      const accessKey = process.env.REACT_APP_WEB3FORMS_KEY || 'YOUR_WEB3FORMS_ACCESS_KEY';

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: accessKey,
          to_email: personalInfo.email,
          from_name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `Portfolio Contact: ${formData.name}`,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setStatus({
          type: 'success',
          message: 'Message sent successfully. I\'ll get back to you soon.',
        });
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error('Failed to send');
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Failed to send message. Please try emailing me directly.',
      });
    }

    setIsSubmitting(false);
  };

  return (
    <section id="contact">
      <div className="container">
        <motion.p
          className="section-title"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          Contact
        </motion.p>

        <motion.p
          className="contact-intro"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          Available for full-stack engineering roles and contract projects.
          Specialized in marketplace platforms, real-time systems, and payment infrastructure.
        </motion.p>

        <motion.div
          className="contact-options"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
        >
          <a
            href="https://cal.com/faqir-abdellah-0hti2u"
            target="_blank"
            rel="noopener noreferrer"
            className="schedule-call-btn"
          >
            <Calendar size={18} />
            <span>Schedule a call</span>
          </a>
          <span className="contact-divider">or send a message below</span>
        </motion.div>

        <motion.form
          className="contact-form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
        >
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell me about your project or opportunity..."
              required
            />
          </div>

          <button 
            type="submit" 
            className="form-submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>

          {status.message && (
            <div className={`form-status ${status.type}`}>
              {status.message}
            </div>
          )}
        </motion.form>

        <div className="contact-alt">
          <p>Or reach out directly:</p>
          <div className="contact-links">
            <a href={`mailto:${personalInfo.email}`}>
              <Mail size={18} />
              <span>{personalInfo.email}</span>
            </a>
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer">
              <GitHubIcon size={18} />
              <span>GitHub</span>
            </a>
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer">
              <LinkedInIcon size={18} />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
