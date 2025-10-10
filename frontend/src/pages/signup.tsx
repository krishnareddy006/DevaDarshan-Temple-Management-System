import { useState, ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom';

interface FormData {
  fullName: string;
  email: string;
  password: string;
}

export function Signup() {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    password: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3000/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      alert(data.message);
    } catch (err) {
      alert('Signup failed. Please try again.');
      console.error(err);
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
        <h2 className="text-2xl font-bold text-center text-gray-900">Sign Up</h2>
        <form className="mt-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700">Full Name</label>
            <input
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border-gray-300 shadow-sm p-2 focus:ring-orange-500 focus:border-orange-500"
              placeholder="Enter your full name"
              required
            />
          </div>
          <div className="mt-4">
            <label className="block text-gray-700">Email</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border-gray-300 shadow-sm p-2 focus:ring-orange-500 focus:border-orange-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mt-4">
            <label className="block text-gray-700">Password</label>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border-gray-300 shadow-sm p-2 focus:ring-orange-500 focus:border-orange-500"
              placeholder="Create a password"
              required
            />
          </div>
          <button
            type="submit"
            className="mt-6 w-full bg-orange-600 hover:bg-orange-500 text-white font-semibold py-2 rounded-md"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-orange-600 font-medium hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
