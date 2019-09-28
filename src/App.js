import React from 'react'
import { Switch, Route } from 'react-router-dom'

import './App.css'
import HomePage from './pages/homepage/homepage.component'
import ShopPage from './pages/shop/shop.component'
import SignInAndSignUp from './components/sign-in-and-sign-up/sign-in-and-sign-up.component'
import Header from './components/header/header.component'
import { auth } from './firebase/firebase.utils'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      currentUser: null,
    }
  }

  unsubscribeFromAuth = null

  componentDidMount() {
    console.log('Calling componentDidMount')
    // auth.onAuthStateChanged returns a function to unsubscribe user
    this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
      this.setState({ currentUser: user })
      console.log('currentUser is: ', user)
    })
    console.log('unsubscribeFromAuth', this.unsubscribeFromAuth)
  }

  componentWillUnmount() {
    console.log('Calling componentWillUnmount')
    this.unsubscribeFromAuth()
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
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

export default App
