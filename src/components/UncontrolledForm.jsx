import { useRef, useState } from "react";
import eyeClosed from "../assets/eyeClosed.svg";
import eyeOpen from "../assets/eyeOpen.svg";
import "./Form.css";

export default function UncontrolledForm() {
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmRef = useRef();
  const agreeRef = useRef();
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const username = usernameRef.current.value.trim();
    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value;
    const confirmPassword = confirmRef.current.value;
    const agree = agreeRef.current.checked;

    const newErrors = {};

    if (!/^[a-zA-Z0-9]+$/.test(username)) {
      newErrors.username = "Alphabets and number only";
    } else if (username === "irina") {
      newErrors.username = "An account using this username already exists";
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    } else if (email === "inglik85@gmail.com") {
      newErrors.email = "An account using this email address alredy exists";
    }

    if (password.length < 8) {
      newErrors.password = "Password must contain at least 8 symbols";
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    if (!agree) {
      newErrors.agree = "You must agree to the terms.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      alert("Registered!");
      console.log({ username, email, password, confirm, agree });
      e.target.reset();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <label>
        Username*
        <input
          ref={usernameRef}
          type="text"
          placeholder="Enter your username"
        />
        {errors.username && <p className="error-text">{errors.username}</p>}
      </label>

      <label>
        Email*
        <input ref={emailRef} type="email" placeholder="Enter your email" />
        {errors.email && <p className="error-text">{errors.email}</p>}
      </label>

      <label className="input-wrapper">
        Password*
        <div className="input-container">
          <input
            ref={passwordRef}
            type={showPassword ? "text" : "password"}
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
            ref={confirmRef}
            type={showConfirm ? "text" : "password"}
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
        {errors.confirmPassword && (
          <p className="error-text">{errors.confirmPassword}</p>
        )}
      </label>

      <label className="checkbox-label">
        <input ref={agreeRef} type="checkbox" />I agree to the terms and
        conditions.
      </label>
      {errors.agree && <p className="error-text">{errors.agree}</p>}

      <button type="submit" className="register-btn">
        Register
      </button>
      <p className="text">*Required field</p>
    </form>
  );
}
