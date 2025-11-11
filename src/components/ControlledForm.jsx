import React, { useState } from 'react';
import eyeClosed from '../assets/eyeClosed.svg';
import eyeOpen from '../assets/eyeOpen.svg';
import './Form.css';

export default function ControlledForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    agree: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const validate = () => {
    const newErrors = {};

    if (!/^[a-zA-Z0-9]+$/.test(formData.username)) {
      newErrors.username = 'Alphabets and number only';
    } else if (formData.username === 'irina') {
      newErrors.username = 'An account using this username already exists.';
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    } else if (formData.email === 'test@example.com') {
      newErrors.email = 'An account using this email address already exists';
    }

    if (formData.password.length < 8)
      newErrors.password = 'Password must contain at least 8 symbols';
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match.';
    if (!formData.agree) newErrors.agree = 'You must agree to the terms.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log(formData);
      alert('Registered!');
      setErrors({});

      setFormData({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        agree: false,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <label>
        Username*
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className={errors.username ? 'error' : ''}
          placeholder="Enter your username"
        />
        {errors.username && <p className="error-text">{errors.username}</p>}
      </label>

      <label>
        Email*
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={errors.email ? 'error' : ''}
          placeholder="Enter your email"
        />
        {errors.email && <p className="error-text">{errors.email}</p>}
      </label>

      <label className="input-wrapper">
        Password*
        <div className="input-container">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className={errors.password ? 'error' : ''}
            placeholder="Enter password"
          />
          <img
            src={showPassword ? eyeOpen : eyeClosed}
            alt="Toggle visibility"
            title="Toggle visibility"
            className="eye-icon"
            onClick={() => setShowPassword(!showPassword)}
          />
        </div>
        {errors.password && <p className="error-text">{errors.password}</p>}
      </label>

      <label className="input-wrapper">
        Confirm Password*
        <div className="input-container">
          <input
            type={showConfirm ? 'text' : 'password'}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            className={errors.confirmPassword ? 'error' : ''}
            placeholder="Confirm password"
          />
          <img
            src={showConfirm ? eyeOpen : eyeClosed}
            alt="Toggle visibility"
            title="Togle visibility"
            className="eye-icon"
            onClick={() => setShowConfirm(!showConfirm)}
          />
        </div>
        {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}
      </label>

      <label className="checkbox-label">
        <input type="checkbox" name="agree" checked={formData.agree} onChange={handleChange} />I
        agree to the terms and conditions.
      </label>
      {errors.agree && <p className="error-text">{errors.agree}</p>}

      <button
        type="submit"
        className="register-btn"
        disabled={
          !formData.username ||
          !formData.email ||
          !formData.password ||
          !formData.confirmPassword ||
          !formData.agree
        }
      >
        Register
      </button>
      <p className="text">*Required field</p>
    </form>
  );
}
