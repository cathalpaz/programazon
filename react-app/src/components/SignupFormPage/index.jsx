import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  if (sessionUser) return <Redirect to="/" />;

  const sendToHome = () => {
    history.push("/");
  };

  const sendToLogIn = () => {
    history.push("/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {

      const data = await dispatch(signUp(username, email, address, password));
      if (data && data.errors) {
        setErrors(data.errors);
      }
    } else {
      setErrors({confirmPassword: 'Confirm Password field must be the same as the Password field'})
    }
  };

  return (
    <div className="login__container">
      <img
        src="/images/programazon-dark.png"
        alt="logo-dark"
        onClick={sendToHome}
      ></img>
      <div className="login__form">
        <span className="login__form-title">Create account</span>
        <form onSubmit={handleSubmit}>
          <label>
            Email
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          {errors.email && <p className="errors"><span> ! </span>{errors.email}</p>}
          <label>
            Username
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          {errors.username && <p className="errors"><span> ! </span>{errors.username}</p>}
          <label>
            Address
            <input
              type="text"
              value={address}
              placeholder="ex: 123 Demo Ave"
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              placeholder="At least 6 characters"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          {errors.password && <p className="errors"><span> ! </span>{errors.password}</p>}
          <label>
            Re-enter Password
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>
          {errors.confirmPassword && <p className="errors"><span> ! </span>{errors.confirmPassword}</p>}
          <button type="submit">Sign Up</button>
        </form>
        <p>
          By continuing, you agree to Programazon's{" "}
          <span>Conditions of Use</span> and <span>Privacy Notice.</span>
        </p>

        <span className="signup__login">
          Already have an account? <span onClick={sendToLogIn}>Sign in</span>{" "}
          <i className="fa-solid fa-caret-right" />
        </span>
      </div>
      <div className="login__footer">
        <div className="login__footer-links">
          <a
            href="https://www.linkedin.com/in/cathal-paz-052239263/"
            rel="noreferrer"
            target="_blank"
          >
            Linkedin
          </a>
          <a
            href="https://github.com/cathalpaz"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
          <a href="#" target="_blank" rel="noreferrer">
            Portfolio
          </a>
        </div>
        <div className="login__copyright">©Programazon by Cathal Paz</div>
      </div>
    </div>
  );
}

export default SignupFormPage;
