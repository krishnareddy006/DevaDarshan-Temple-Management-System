import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/api/login', {
        email,
        password,
      });
      alert(res.data.message);
      navigate('/dashboard'); // Navigate to protected route or homepage
    } catch (err) {
      const axiosError = err as AxiosError<{ message: string }>;
      alert(axiosError.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://static.vecteezy.com/system/resources/previews/011/020/175/original/abstract-white-orange-gradient-liquid-wave-background-free-vector.jpg')",
      }}
    >
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-900">Login</h2>
        <form className="mt-6" onSubmit={handleLogin}>
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="mt-1 w-full rounded-md border-gray-300 shadow-sm p-2 focus:ring-orange-500 focus:border-orange-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mt-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="mt-1 w-full rounded-md border-gray-300 shadow-sm p-2 focus:ring-orange-500 focus:border-orange-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="mt-6 w-full bg-orange-600 hover:bg-orange-500 text-white font-semibold py-2 rounded-md"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
          Don't have an account?{' '}
          <Link to="/signup" className="text-orange-600 font-medium hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
