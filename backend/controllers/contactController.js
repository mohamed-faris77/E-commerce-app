import Contact from '../models/Contact.js';

export const createContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Name, email and message are required.' });
    }

    if (String(name).trim().length < 2) {
      return res.status(400).json({ success: false, message: 'Name must be at least 2 characters.' });
    }

    if (String(message).trim().length < 5) {
      return res.status(400).json({ success: false, message: 'Message must be at least 5 characters.' });
    }

    const contact = new Contact({
      name: String(name).trim(),
      email: String(email).trim(),
      subject: subject ? String(subject).trim() : undefined,
      message: String(message).trim()
    });

    await contact.save();

    // Optional: send an email notification if SMTP env vars are provided
    if (process.env.EMAIL_SMTP_HOST && process.env.EMAIL_USER && process.env.EMAIL_PASS && process.env.EMAIL_TO) {
      try {
        const nodemailer = await import('nodemailer');
        const transporter = nodemailer.createTransport({
          host: process.env.EMAIL_SMTP_HOST,
          port: Number(process.env.EMAIL_SMTP_PORT || 587),
          secure: process.env.EMAIL_SMTP_SECURE === 'true',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
          }
        });

        const mailOptions = {
          from: `"Website Contact" <${process.env.EMAIL_USER}>`,
          to: process.env.EMAIL_TO,
          subject: `Contact form: ${subject || 'No subject'}`,
          text: `You have a new message from ${contact.name} <${contact.email}>:\n\n${contact.message}`
        };

        await transporter.sendMail(mailOptions);
      } catch (err) {
        console.error('Failed to send contact email:', err);
        // don't fail the request if email sending fails
      }
    }

    return res.status(201).json({ success: true, message: 'Contact message received.' });
  } catch (err) {
    console.error('createContact error', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, contacts });
  } catch (err) {
    console.error('getContacts error', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

export default { createContact, getContacts };
