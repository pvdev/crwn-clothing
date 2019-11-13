import React, { useEffect, lazy, Suspense } from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { auth, createUserProfileDocument } from "./firebase/firebase.utils";

import { setCurrentUser } from "./redux/user/user.actions";
import { selectCurrentUser } from "./redux/user/user.selector";

import "./App.scss";

import Header from "./components/header/header.component";
import Spinner from "./components/spinner/spinner.component";
import ErrorBoundary from "./components/error-boundary/error-boundary-component";

const HomePage = lazy(() => import("./pages/homepage/homepage.component"));
const ShopPage = lazy(() => import("./pages/shop/shop.component"));
const CheckoutPage = lazy(() => import("./pages/checkout/checkout.component"));
const SignInAndSignUp = lazy(() =>
  import("./components/sign-in-and-sign-up/sign-in-and-sign-up.component")
);

const App = ({ setCurrentUser, currentUser }) => {
  useEffect(() => {
    // console.log('Appjs calling useEffect/componentDidMount')

    // auth.onAuthStateChanged sets up a listener for authn changes
    // we pass the 'next' function and returns a function to unsubscribe user
    const unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      // console.log('userAuth:: ', userAuth)
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        // attach listener with onNext
        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
        });
      } else {
        setCurrentUser(null);
      }
    });

    // add cleanup function for willUnmount scenario
    return () => {
      unsubscribeFromAuth();
    };
  }, [setCurrentUser]);

  return (
    <div>
      <Header />
      <Switch>
        <ErrorBoundary>
          <Suspense fallback={<Spinner />}>
            <Route exact path="/" component={HomePage} />
            <Route path="/shop" component={ShopPage} />
            <Route exact path="/checkout" component={CheckoutPage} />
            <Route
              exact
              path="/signin"
              render={
                () => {
                  if (currentUser) {
                    //this.props.history.push('/')
                    // console.log('Redirecting to /')
                    return <Redirect to="/" />;
                    //return <HomePage />
                  } else {
                    return <SignInAndSignUp />;
                  }
                }
                //   this.props.currentUser ? <Redirect to='/' /> : <SignInAndSignUp />
              }
            />
          </Suspense>
        </ErrorBoundary>
      </Switch>
    </div>
  );
};

// eslint-disable-next-line
const NoMatch = props => {
  const { location } = props;
  // console.log('No Route: ', props)
  return (
    <div>
      <h3>
        No match for <code>{location.pathname}</code>.
      </h3>
    </div>
  );
};

// const mapStateToProps = ({ user }) => ({
//   currentUser: user.currentUser,
// })

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

// const mapDispatchToProps = dispatch => ({
//   setCurrentUser: user => dispatch(setCurrentUser(user)),
// })
const mapDispatchToProps = { setCurrentUser };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
