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
import ProductForm from "./components/ProductForm";
import ReviewForm from "./components/ReviewForm";
import UserProducts from "./components/UserProducts";
import Footer from "./components/Footer";
import Page404 from "./components/404Page";
import Cart from "./components/Cart";

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
            <Footer />
          </Route>
          <Route exact path="/products/new" >
            <Navigation />
            <ProductForm />
          </Route>
          <Route path='/products/my-products'>
            <Navigation />
            <UserProducts />
          </Route>
          <Route exact path="/products/:productId" >
            <Navigation />
            <ProductInfo />
            <Footer />
          </Route>
          <Route exact path="/products/:productId/review" >
            <Navigation />
            <ReviewForm />
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
            <Footer />
          </Route>
          <Route path='/cart'>
            <Navigation />
            <Cart />
          </Route>
          <Route>
            <Navigation />
            <Page404 />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
