import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import { ADD_USER, LOGIN } from '../utils/mutations';

function AuthPage() {
  const [signupFormState, setSignupFormState] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  });
  
  const [loginFormState, setLoginFormState] = useState({
    email: '',
    password: ''
  });

  const [addUser] = useMutation(ADD_USER);
  const [login, { error }] = useMutation(LOGIN);

  // Signup form submission
  const handleSignupSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await addUser({
        variables: {
          email: signupFormState.email,
          password: signupFormState.password,
          firstName: signupFormState.firstName,
          lastName: signupFormState.lastName
        }
      });
      const token = mutationResponse.data.addUser.token;
      Auth.login(token);
    } catch (e) {
      console.log(e);
    }
  };

  // Login form submission
  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: {
          email: loginFormState.email,
          password: loginFormState.password
        }
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e);
    }
  };

  // Handle Signup form input change
  const handleSignupChange = (event) => {
    const { name, value } = event.target;
    setSignupFormState({
      ...signupFormState,
      [name]: value
    });
  };

  // Handle Login form input change
  const handleLoginChange = (event) => {
    const { name, value } = event.target;
    setLoginFormState({
      ...loginFormState,
      [name]: value
    });
  };

  return (
    <div className="container my-1">
      <div className="flex-row">
        {/* Signup Form */}
        <div className="signup-container">
          <h2>Signup</h2>
          <form onSubmit={handleSignupSubmit}>
            <div className="flex-row space-between my-2">
              <label htmlFor="firstName">First Name:</label>
              <input
                placeholder="First"
                name="firstName"
                type="text"
                id="firstName"
                onChange={handleSignupChange}
              />
            </div>
            <div className="flex-row space-between my-2">
              <label htmlFor="lastName">Last Name:</label>
              <input
                placeholder="Last"
                name="lastName"
                type="text"
                id="lastName"
                onChange={handleSignupChange}
              />
            </div>
            <div className="flex-row space-between my-2">
              <label htmlFor="email">Email:</label>
              <input
                placeholder="youremail@test.com"
                name="email"
                type="email"
                id="email"
                onChange={handleSignupChange}
              />
            </div>
            <div className="flex-row space-between my-2">
              <label htmlFor="password">Password:</label>
              <input
                placeholder="******"
                name="password"
                type="password"
                id="password"
                onChange={handleSignupChange}
              />
            </div>
            <div className="flex-row flex-end">
              <button type="submit">Signup</button>
            </div>
          </form>
        </div>

        {/* Login Form */}
        <div className="login-container">
          <h2>Login</h2>
          <form onSubmit={handleLoginSubmit}>
            <div className="flex-row space-between my-2">
              <label htmlFor="email">Email address:</label>
              <input
                placeholder="youremail@test.com"
                name="email"
                type="email"
                id="email"
                onChange={handleLoginChange}
              />
            </div>
            <div className="flex-row space-between my-2">
              <label htmlFor="password">Password:</label>
              <input
                placeholder="******"
                name="password"
                type="password"
                id="password"
                onChange={handleLoginChange}
              />
            </div>
            {error && (
              <div>
                <p className="error-text">The provided credentials are incorrect</p>
              </div>
            )}
            <div className="flex-row flex-end">
              <button type="submit">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
