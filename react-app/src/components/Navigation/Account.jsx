import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../../store/session";

function Account({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogin = () => {
    history.push("/login");
  };

  const handleSignUp = () => {
    history.push("/signup");
  };

  const handleLogOut = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  return (
    <div>
      {!user ? (
        <div className="account__login-container">
          <button onClick={handleLogin}>Sign in</button>
          <p>
            New customer? <span onClick={handleSignUp}>Start here.</span>
          </p>
        </div>
      ) : (
        <div className="account__container">
          <div className="account__info">
            <h4>Your Products</h4>
            <span>Product List</span>
          </div>
          <div className="account__info account__right">
            <h4>Your Account</h4>
            <div className="account__info-right">
              <div className="account__info">
                <span>Account</span>
                <p>{user?.email}</p>
                <p>{user?.address}</p>
              </div>
              <span>Orders</span>
              <span onClick={handleLogOut}>Sign Out</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Account;
