import React from 'react';
import '../styles/ContactUs.css'; // Import the CSS file

function ContactUs() {
  return (
    <section className="contact-section">
      <div className="contact-container">
        <div className="contact-form">
          <h2 className="contact-title">Contact Us</h2>
          <h4 className="form-heading">Get in Touch</h4>
          <p className="form-description">
            If you have any questions or need further information, feel free to reach out to us!
          </p>
          <form>
            <div className="input-group">
              <label htmlFor="name" className="input-label">Full Name</label>
              <input
                type="text"
                className="input-field"
                id="name"
                placeholder="Enter your full name"
              />
            </div>

            <div className="input-group">
              <label htmlFor="email" className="input-label">Email Address</label>
              <input
                type="email"
                className="input-field"
                id="email"
                placeholder="Enter your email"
              />
            </div>

            <div className="input-group">
              <label htmlFor="message" className="input-label">Your Message</label>
              <textarea
                className="input-textarea"
                id="message"
                rows="5"
                placeholder="Write your message here"
              ></textarea>
            </div>

            <button type="submit" className="submit-btn">Send Message</button>
          </form>
        </div>

        {/* <div className="contact-info">
          <h4 className="info-heading">Our Address</h4>
          <p className="info-text">123 EduLearn Street,</p>
          <p className="info-text">City, Country</p>

          <h4 className="info-heading">Phone Number</h4>
          <p className="info-text">+123 456 7890</p>

          <h4 className="info-heading">Email</h4>
          <p className="info-text">contact@edulearn.com</p>
        </div> */}
      </div>
    </section>
  );
}

export default ContactUs;
