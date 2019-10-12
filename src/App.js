import React from 'react'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import './App.css'
import HomePage from './pages/homepage/homepage.component'
import ShopPage from './pages/shop/shop.component'
import CheckoutPage from './pages/checkout/checkout.component'
import SignInAndSignUp from './components/sign-in-and-sign-up/sign-in-and-sign-up.component'

import Header from './components/header/header.component'

import { auth, createUserProfileDocument } from './firebase/firebase.utils'
import { setCurrentUser } from './redux/user/user.actions'
import { selectCurrentUser } from './redux/user/user.selector'

class App extends React.Component {
  unsubscribeFromAuth = null

  componentDidMount() {
    const { setCurrentUser } = this.props

    // console.log('Calling componentDidMount')

    // auth.onAuthStateChanged sets up a listener for authn changes
    // we pass the 'next' function and returns a function to unsubscribe user
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      // console.log('userAuth:: ', userAuth)
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth)

        // attach listener with onNext
        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          })
        })
      } else {
        setCurrentUser(null)
      }
    })
  }

  componentWillUnmount() {
    // console.log('Calling componentWillUnmount')
    this.unsubscribeFromAuth()
  }

  render() {
    // console.log('Props:: ', this.props)
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route
            exact
            path='/signin'
            render={
              () => {
                if (this.props.currentUser) {
                  //this.props.history.push('/')
                  // console.log('Redirecting to /')
                  return <Redirect to='/' />
                  //return <HomePage />
                } else {
                  return <SignInAndSignUp />
                }
              }
              //   this.props.currentUser ? <Redirect to='/' /> : <SignInAndSignUp />
            }
          />
          <Route component={NoMatch} />
        </Switch>
      </div>
    )
  }
}

const NoMatch = props => {
  const { location } = props
  console.log('No Route: ', props)
  return (
    <div>
      <h3>
        No match for <code>{location.pathname}</code>.
      </h3>
    </div>
  )
}

// const mapStateToProps = ({ user }) => ({
//   currentUser: user.currentUser,
// })

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
})

// const mapDispatchToProps = dispatch => ({
//   setCurrentUser: user => dispatch(setCurrentUser(user)),
// })
const mapDispatchToProps = { setCurrentUser }

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
)
