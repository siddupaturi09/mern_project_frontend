import React from 'react';

const contactInfo = {
  phone: '+1 (089) 123-4567',
  email: 'etts@example.com',
};

function Contactus() {
  const handleEmailClick = () => {
    window.location.href = `mailto:${contactInfo.email}`;
  };

  return (
    <div className="col-lg-12 col-md-12 col-sm-2 centered-container">
      <div className="contact-us-container">
        <div className="contact-section">
          <h1>Contact Us</h1>
          <br/><br/>
        </div>
        <div className="contact-info-section">
          <div className="contact-section">
            <h3 class="text-center">Address</h3>
            <br/>
            <h5>City: Vijayawada</h5>
            <h5>State: AndhraPradesh</h5>
            <h5>Pincode: 521108</h5>
          </div>
          &emsp;&emsp;&emsp;

          <div className="contact-section">
            <h3 class="text-center">Phone</h3>
            <br/>
            <h5 class="text-center">Dial us at:</h5>
            <h5>{contactInfo.phone}</h5>
          </div>

          &emsp;&emsp;&emsp;
          <div className="contact-section" onClick={handleEmailClick}>
            <h3 class="text-center">Email</h3>
            <br/>
            <h5 class="text-center">Send us an email at:</h5>
            <h5><a id="email-link" href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a></h5>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contactus;
