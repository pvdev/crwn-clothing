import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import './App.css'
import HomePage from './pages/homepage/homepage.component'
import ShopPage from './pages/shop/shop.component'
import SignInAndSignUp from './components/sign-in-and-sign-up/sign-in-and-sign-up.component'
import Header from './components/header/header.component'
import { auth, createUserProfileDocument } from './firebase/firebase.utils'
import { setCurrentUser } from './redux/user/user.actions'

class App extends React.Component {
  unsubscribeFromAuth = null

  componentDidMount() {
    const { setCurrentUser } = this.props

    // console.log('Calling componentDidMount')
    // auth.onAuthStateChanged sets up a listener for authn changes
    // we pass the 'next' function and returns a function to unsubscribe user
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
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
    console.log('Calling componentWillUnmount')
    this.unsubscribeFromAuth()
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/signin' component={SignInAndSignUp} />
          <Route path='/shop' component={ShopPage} />
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
        No match for <code>{location.pathname}</code>
      </h3>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
})

export default connect(
  null,
  mapDispatchToProps
)(App)
