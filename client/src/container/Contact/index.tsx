"use client"
import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="bg-white py-10">
      <div className="contact-container" id='contact'>
      <h2 className='text-center'>Contact Us</h2> 
      <form onSubmit={handleSubmit} className="space-y-">
        {/* Name Input */}
        <div>
          <label htmlFor="name" className="block text-lg font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="contact-input" 
            placeholder="Enter your full name"
          />
        </div>

        {/* Email Input */}
        <div>
          <label htmlFor="email" className="block text-lg font-medium text-gray-700">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="contact-input"
            placeholder="Enter your email address"
          />
        </div>

        {/* Message Textarea */}
        <div>
          <label htmlFor="message" className="block text-lg font-medium text-gray-700">Your Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            className="contact-textarea"
            placeholder="Write your message here"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="contact-button" 
        >
          Send Message
        </button>
      </form>
    </div>
    </div>
  );
};

export default Contact;
