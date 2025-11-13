import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import eyeClosed from '../assets/eyeClosed.svg';
import eyeOpen from '../assets/eyeOpen.svg';
import './Form.css';

const schema = z
  .object({
    username: z
      .string()
      .min(1, 'Username is required')
      .regex(/^[a-zA-Z0-9]+$/, 'Alphabets and number only')
      .refine((val) => val !== 'irina', {
        message: 'An account using this username already exists.',
      }),
    email: z
      .string()
      .email('Please enter a valid email address')
      .refine((val) => val !== 'test@exemple.com', {
        message: 'An account using this email address already exists',
      }),
    password: z.string().min(8, 'Password must contain at least 8 symbols'),
    confirmPassword: z.string().min(8, 'Confirm your password'),
    agree: z.boolean().refine((val) => val === true, {
      message: 'You must agree to the terms.',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match.',
  });

export default function FormRHF() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  const onSubmit = (data) => {
    console.log(data);
    alert('Registered!');
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <label>
        Username*
        <input
          type="text"
          {...register('username')}
          className={errors.username ? 'error' : ''}
          placeholder="Enter your username"
        />
        {errors.username && <p className="error-text">{errors.username.message}</p>}
      </label>

      <label>
        Email*
        <input
          type="email"
          {...register('email')}
          className={errors.email ? 'error' : ''}
          placeholder="Enter your email"
        />
        {errors.email && <p className="error-text">{errors.email.message}</p>}
      </label>

      <label className="input-wrapper">
        Password*
        <div className="input-container">
          <input
            type={showPassword ? 'text' : 'password'}
            {...register('password')}
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
        {errors.password && <p className="error-text">{errors.password.message}</p>}
      </label>

      <label className="input-wrapper">
        Confirm Password*
        <div className="input-container">
          <input
            type={showConfirm ? 'text' : 'password'}
            {...register('confirmPassword')}
            className={errors.confirmPassword ? 'error' : ''}
            placeholder="Confirm password"
          />
          <img
            src={showConfirm ? eyeOpen : eyeClosed}
            alt="Toggle visibility"
            title="Toggle visibility"
            className="eye-icon"
            onClick={() => setShowConfirm(!showConfirm)}
          />
        </div>
        {errors.confirmPassword && <p className="error-text">{errors.confirmPassword.message}</p>}
      </label>

      <label className="checkbox-label">
        <input type="checkbox" {...register('agree')} />I agree to the terms and conditions.
      </label>
      {errors.agree && <p className="error-text">{errors.agree.message}</p>}

      <button type="submit" className="register-btn" disabled={!isValid}>
        Register
      </button>
      <p className="text">*Required field</p>
    </form>
  );
}
