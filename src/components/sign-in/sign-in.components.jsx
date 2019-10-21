import React, { useState } from 'react'

import FormInput from '../../components/form-input/form-input.component'
import CustomButton from '../../components/custom-button/custom-button.component'

import { auth, signInWithGoogle } from '../../firebase/firebase.utils'

import './sign-in.styles.scss'

// use class because we'll be collecting data from user
// changed to function with useState at lesson ~191
const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async event => {
    event.preventDefault()

    try {
      await auth.signInWithEmailAndPassword(email, password)

      setEmail('')
      setPassword('')
    } catch (error) {
      alert(error.message)
      console.error(error)
    }
  }

  const handleChange = event => {
    const { name, value } = event.target

    // dynamically sets the property name with []
    // could have used [userCredential, setUserCredential] = useState({email: '', password: ''})
    // and then setCredential({...userCredential, [name]: value})
    name === 'email' ? setEmail(value) : setPassword(value)
  }

  return (
    <div className='sign-in'>
      <h2 className='title'>I already have an account</h2>
      <span>Sign in with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          name='email'
          type='email'
          label='Email'
          value={email}
          handleChange={handleChange}
          required
        />
        <FormInput
          name='password'
          type='password'
          label='Password'
          value={password}
          handleChange={handleChange}
          required
        />
        <div className='buttons'>
          <CustomButton type='submit'>Sign In</CustomButton>
          <CustomButton isGoogleSignIn onClick={signInWithGoogle}>
            {' '}
            Sign in with Google{' '}
          </CustomButton>
        </div>
      </form>
    </div>
  )
}

export default SignIn
