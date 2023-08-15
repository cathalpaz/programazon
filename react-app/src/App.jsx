import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage";
import AllProducts from "./components/AllProducts";
import ProductInfo from "./components/ProductInfo";
import PostProduct from "./components/PostProduct";
import CreateReview from "./components/CreateReview";
import UserProducts from "./components/UserProducts";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            <Navigation />
            <LandingPage />
          </Route>
          <Route exact path="/products/new" >
            <Navigation />
            <PostProduct />
          </Route>
          <Route path='/products/my-products'>
            <Navigation />
            <UserProducts />
          </Route>
          <Route exact path="/products/:productId" >
            <Navigation />
            <ProductInfo />
          </Route>
          <Route exact path="/products/:productId/review" >
            <Navigation />
            <CreateReview />
          </Route>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/products">
            <Navigation />
            <AllProducts />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
