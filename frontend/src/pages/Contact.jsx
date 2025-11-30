import React, { useState } from 'react';
import api from '../services/api';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const validate = () => {
    if (!name || name.trim().length < 2) return 'Please enter your name (2+ characters).';
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i;
    if (!email || !re.test(email)) return 'Please enter a valid email address.';
    if (!subject || subject.trim().length < 3) return 'Please provide a subject (3+ characters).';
    if (!message || message.trim().length < 10) return 'Message must be at least 10 characters.';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    try {
      // Try to send to backend contact endpoint. If not available, fallback will be shown.
      await api.post('/contact', { name, email, subject, message });
      setSuccess('Thanks — your message has been sent. We will reply soon.');
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch (err) {
      // Fallback: show helpful mailto link message
      console.warn('Contact API failed:', err?.message || err);
      setError('Unable to send via server. You can email us directly using the link below.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Contact info */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Contact Us</h2>
            <p className="text-gray-600 dark:text-gray-300">Have questions, feedback or need help with an order? Our support team is here to help — reach out and we'll respond as soon as possible.</p>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-3 bg-yellow-100 text-yellow-600 rounded-lg">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="font-semibold">Phone</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-3 bg-yellow-100 text-yellow-600 rounded-lg">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="font-semibold">Email</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">support@famazon.example</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-3 bg-yellow-100 text-yellow-600 rounded-lg">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="font-semibold">Address</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">123 Market Street, Suite 100<br />San Francisco, CA 94103</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-3 bg-yellow-100 text-yellow-600 rounded-lg">
                  <Clock size={20} />
                </div>
                <div>
                  <h4 className="font-semibold">Hours</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Mon–Fri: 9am — 6pm<br />Sat: 10am — 4pm</p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <h4 className="font-semibold mb-2">Follow us</h4>
              <div className="flex items-center gap-3">
                <a href="https://x.com/Mohamedfaris07" className="text-gray-600 hover:text-gray-900 dark:hover:text-white">Twitter</a>
                <a href="https://www.facebook.com/people/Mohamed-Faris/pfbid02tPadLEzbxMGvTr357PU1oSsdMXBDzbmNCoQRiGfWPhxQhRryx24eKPgy6JGJ8dPGl/?rdid=95lbKisgBCzisMC0&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F15tGrynVye%2F" className="text-gray-600 hover:text-gray-900 dark:hover:text-white">Facebook</a>
                <a href="https://www.instagram.com/faaaris.k/profilecard/" className="text-gray-600 hover:text-gray-900 dark:hover:text-white">Instagram</a>
              </div>
            </div>
          </div>

          {/* Right: Form + Map (span two columns) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold mb-4">Send us a message</h3>

              {error && <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded mb-4">{error} {error && error.includes('mailto') && (<a className="underline" href={error}>Send email</a>)}</div>}
              {success && <div className="bg-green-50 border border-green-200 text-green-700 p-3 rounded mb-4">{success}</div>}

              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-1">
                  <label className="block text-sm font-medium mb-1">Your name</label>
                  <input value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded border p-2 dark:bg-gray-700" placeholder="Mohamed Faris" />
                </div>

                <div className="md:col-span-1">
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded border p-2 dark:bg-gray-700" placeholder="faris@example.com" />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Subject</label>
                  <input value={subject} onChange={(e) => setSubject(e.target.value)} className="w-full rounded border p-2 dark:bg-gray-700" placeholder="What is this about?" />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Message</label>
                  <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={6} className="w-full rounded border p-2 dark:bg-gray-700" placeholder="Tell us more..." />
                </div>

                <div className="md:col-span-2 flex items-center justify-between">
                  <div className="text-sm text-gray-500">We typically reply within 1 business day.</div>
                  <button type="submit" disabled={loading} className="inline-flex items-center gap-2 bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500 disabled:opacity-60">
                    <Send size={16} />
                    {loading ? 'Sending...' : 'Send Message'}
                  </button>
                </div>
              </form>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
              {/* Simple responsive map embed (no API key) */}
              <iframe
                title="Famazon HQ"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019302648387!2d-122.4194150846818!3d37.77492927975944!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808c2f3e3e5f%3A0x8b0d1b2a1d3f9b!2sMarket%20St%2C%20San%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1610000000000!5m2!1sen!2sus"
                className="w-full h-64 border-0"
                allowFullScreen=""
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
