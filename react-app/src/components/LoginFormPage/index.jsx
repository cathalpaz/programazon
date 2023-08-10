import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import './LoginForm.css';
import { useHistory } from "react-router-dom";

function LoginFormPage() {
  const dispatch = useDispatch();
  const history = useHistory()
  const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  if (sessionUser) return <Redirect to="/" />;

  const demoLogin = () => {
    dispatch(login('Demo', 'password'))
  }

  const sendToHome = () => {
    history.push('/')
  }

  const sendToSignUp = () => {
    history.push('/signup')
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(credential, password));
    if (data && data.errors) {
      setErrors(data.errors);
    }
  };

  return (
    <div className="login__container">
      <img src='/images/programazon-dark.png' alt="logo-dark" onClick={sendToHome}></img>
      <div className="login__form">
        <span className="login__form-title">Sign in</span>
        <form onSubmit={handleSubmit}>

          <label>
            Username or email
            <input
              type="text"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              required
              />
          </label>
          {Object.values(errors).length > 0 && <p className="errors"><span> ! </span>Username/Email or password is incorrect</p>}
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <button type="submit">Log In</button>
        </form>
        <p>By continuing, you agree to Programazon's <span>Conditions of Use</span> and <span>Privacy Notice.</span></p>
        <span className="login__demo" onClick={demoLogin}><i className="fa-solid fa-caret-right" /> Log in as Demo?</span>
      </div>
      <div className="login__signup-btn">
        <div className="login__separator">
          <span className="login__sep-border"></span>
          <span className="login__sep-text">New to Programazon?</span>
          <span className="login__sep-border"></span>
        </div>
        <button onClick={sendToSignUp}>Create your Programazon account</button>
      </div>
      <div className="login__footer">
        <div className="login__footer-links">
          <a href="https://www.linkedin.com/in/cathal-paz-052239263/" rel="noreferrer" target="_blank">Linkedin</a>
          <a href="https://github.com/cathalpaz" target="_blank" rel="noreferrer">Github</a>
          <a href="https://www.amazon.com/" target="_blank" rel="noreferrer">Portfolio</a>
        </div>
        <div className="login__copyright">©Programazon by Cathal Paz</div>
      </div>

    </div>
  );
}

export default LoginFormPage;
