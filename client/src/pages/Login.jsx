// client/src/pages/Login.jsx

import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';

function Login() {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log('error', e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-3xl font-bold text-center text-forest-green mb-6">Login</h2>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
            <input
              placeholder="youremail@test.com"
              name="email"
              type="email"
              id="email"
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-forest-green focus:ring focus:ring-forest-green focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="pwd" className="block text-sm font-medium text-gray-700">Password:</label>
            <input
              placeholder="******"
              name="password"
              type="password"
              id="pwd"
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-forest-green focus:ring focus:ring-forest-green focus:ring-opacity-50"
            />
          </div>
          {error ? (
            <div className="my-3 p-3 bg-red-200 text-red-800 rounded">
              The provided credentials are incorrect
            </div>
          ) : null}
          <button type="submit" className="w-full bg-sunflower hover:bg-terracotta text-forest-green font-bold py-2 px-4 rounded transition duration-300">
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <Link to="/signup" className="text-forest-green hover:text-terracotta">← Go to Signup</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;