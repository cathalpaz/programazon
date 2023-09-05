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
    history.push('/')
    dispatch(logout());
  };
  const sendToUserProducts = () => {
    history.push('/products/my-products')
    // window.location.reload()
  }
  const sendToOrders = () => {
    history.push('/orders')
  }
  const comingSoon = () => {
    alert('Coming soon!')
  }

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
            <span onClick={sendToUserProducts}>Product List</span>
          </div>
          <div className="account__info account__right">
            <h4>Your Account</h4>
            <div className="account__info-right">
              <div className="account__info">
                <div>Account</div>
                <p>{user?.email}</p>
                <p>{user?.address}</p>
              </div>
              <span onClick={sendToOrders}>Orders</span>
              <span onClick={handleLogOut}>Sign Out</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Account;
