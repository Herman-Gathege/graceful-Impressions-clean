import React from 'react';

function ContactUs() {
  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Contact Us</h2>
      
      <div className="row">
        <div className="col-md-6">
          <h4>Get in Touch</h4>
          <p>If you have any questions or need further information, feel free to reach out to us!</p>
          
          <form>
            {/* Name Input */}
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Enter your full name"
              />
            </div>

            {/* Email Input */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email Address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email"
              />
            </div>

            {/* Message Input */}
            <div className="mb-3">
              <label htmlFor="message" className="form-label">Your Message</label>
              <textarea
                className="form-control"
                id="message"
                rows="5"
                placeholder="Write your message here"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn ">Send Message</button>
          </form>
        </div>

        <div className="col-md-6">
          <h4>Our Address</h4>
          <p>123 EduLearn Street,</p>
          <p>City, Country</p>

          <h4>Phone Number</h4>
          <p>+123 456 7890</p>

          <h4>Email</h4>
          <p>contact@edulearn.com</p>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
