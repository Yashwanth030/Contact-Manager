import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
import reportWebVitals from './reportWebVitals';

reportWebVitals(console.log);


function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [user, setUser] = useState(null);
  const [token, setToken] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:5001/api/users/register', {
        username,
        email,
        password,
      });
      console.log('Registration successful', response.data);
    } catch (error) {
      console.error('Error registering user', error);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5001/api/users/login', {
        username,
        password,
      });
      setToken(response.data.token);
      console.log('Login successful', response.data);
    } catch (error) {
      console.error('Error logging in', error);
    }
  };

  const getProfile = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/users/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data.user);
      console.log('User profile:', response.data);
    } catch (error) {
      console.error('Error fetching profile', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>My Contacts App</h1>

        {/* Registration Form */}
        <div>
          <h2>Register</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleRegister}>Register</button>
        </div>

        {/* Login Form */}
        <div>
          <h2>Login</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
        </div>

        {/* Profile Section */}
        <div>
          <h2>Profile</h2>
          {user ? (
            <div>
              <h3>Welcome, {user.username}</h3>
              <p>Email: {user.email}</p>
              {/* Add other profile details here */}
            </div>
          ) : (
            <button onClick={getProfile}>Get Profile</button>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
