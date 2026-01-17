import { useState } from 'react';
import './Profile.css';

function Profile() {
  const [formData, setFormData] = useState({
    businessName: '',
    businessEmail: '',
    businessPhone: '',
    businessAddress: '',
    businessCategory: '',
    hourlyRate: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Submit to backend
    console.log('Profile data:', formData);
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>Complete Your Profile</h2>
        <p className="profile-subtitle">Tell us about your business</p>

        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-group">
            <label htmlFor="businessName">Business Name</label>
            <input
              type="text"
              id="businessName"
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
              placeholder="Your business name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="businessEmail">Business Email</label>
            <input
              type="email"
              id="businessEmail"
              name="businessEmail"
              value={formData.businessEmail}
              onChange={handleChange}
              placeholder="email@business.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="businessPhone">Business Phone</label>
            <input
              type="tel"
              id="businessPhone"
              name="businessPhone"
              value={formData.businessPhone}
              onChange={handleChange}
              placeholder="+1 (555) 000-0000"
            />
          </div>

          <div className="form-group">
            <label htmlFor="businessAddress">Business Address</label>
            <input
              type="text"
              id="businessAddress"
              name="businessAddress"
              value={formData.businessAddress}
              onChange={handleChange}
              placeholder="123 Main St, City, State"
            />
          </div>

          <div className="form-group">
            <label htmlFor="businessCategory">Business Category</label>
            <select
              id="businessCategory"
              name="businessCategory"
              value={formData.businessCategory}
              onChange={handleChange}
            >
              <option value="">Select a category</option>
              <option value="Construction">Construction</option>
              <option value="Consulting">Consulting</option>
              <option value="Design">Design</option>
              <option value="Development">Development</option>
              <option value="Photography">Photography</option>
              <option value="Marketing">Marketing</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="hourlyRate">Hourly Rate ($)</label>
            <input
              type="number"
              id="hourlyRate"
              name="hourlyRate"
              value={formData.hourlyRate}
              onChange={handleChange}
              placeholder="75.00"
              min="0"
              step="0.01"
            />
          </div>

          <button type="submit" className="submit-button">
            Save Profile
          </button>
        </form>
      </div>
    </div>
  );
}

export default Profile;
