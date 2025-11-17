// import { useState, FormEvent, ChangeEvent } from "react";
// import { useNavigate } from "react-router-dom";

// // API configuration from environment variables
// const API_URL = import.meta.env.VITE_API_URL;

// const AdminSignup = () => {
//   const [formData, setFormData] = useState<{
//     fullName: string;
//     email: string;
//     password: string;
//   }>({
//     fullName: "",
//     email: "",
//     password: "",
//   });

//   const [error, setError] = useState<string>("");
//   const [message, setMessage] = useState<string>("");

//   const navigate = useNavigate();

//   // Handle form input changes
//   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // Handle admin signup form submission
//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setError("");
//     setMessage("");

//     try {
//       const response = await fetch(`${API_URL}/api/admin-signup`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       const result = await response.json();

//       if (!response.ok) {
//         throw new Error(result.message || "Signup failed");
//       }

//       setMessage("Signup successful! Redirecting to login...");
//       setTimeout(() => navigate("/admin-login"), 2000);
//     } catch (err: unknown) {
//       if (err instanceof Error) {
//         setError(err.message);
//       } else {
//         setError("Something went wrong.");
//       }
//     }
//   };

//   return (
//     <div className="min-h-screen bg-orange-50 flex items-center justify-center">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
//         <h1 className="text-2xl font-bold text-orange-900 mb-6">Admin Signup</h1>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label htmlFor="fullName" className="block text-gray-700 mb-2">
//               Full Name
//             </label>
//             <input
//               type="text"
//               name="fullName"
//               id="fullName"
//               value={formData.fullName}
//               onChange={handleChange}
//               className="w-full border p-2 rounded focus:ring-orange-500 focus:border-orange-500"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="email" className="block text-gray-700 mb-2">
//               Email
//             </label>
//             <input
//               type="email"
//               name="email"
//               id="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full border p-2 rounded focus:ring-orange-500 focus:border-orange-500"
//               required
//             />
//           </div>
//           <div className="mb-6">
//             <label htmlFor="password" className="block text-gray-700 mb-2">
//               Password
//             </label>
//             <input
//               type="password"
//               name="password"
//               id="password"
//               value={formData.password}
//               onChange={handleChange}
//               className="w-full border p-2 rounded focus:ring-orange-500 focus:border-orange-500"
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
//           >
//             Signup
//           </button>
//           {message && <p className="text-green-600 mt-3">{message}</p>}
//           {error && <p className="text-red-600 mt-3">{error}</p>}
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AdminSignup;


import { useState, FormEvent, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";

// API configuration from environment variables
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const AdminSignup = () => {
  const [formData, setFormData] = useState<{
    fullName: string;
    email: string;
    password: string;
  }>({
    fullName: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle admin signup form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/admin-signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Signup failed");
      }

      setMessage("Signup successful! Redirecting to login...");
      setTimeout(() => navigate("/admin-login"), 2000);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-orange-900 mb-6">Admin Signup</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="fullName" className="block text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              id="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full border p-2 rounded focus:ring-orange-500 focus:border-orange-500 disabled:opacity-50"
              required
              disabled={loading}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border p-2 rounded focus:ring-orange-500 focus:border-orange-500 disabled:opacity-50"
              required
              disabled={loading}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border p-2 rounded focus:ring-orange-500 focus:border-orange-500 disabled:opacity-50"
              required
              disabled={loading}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            {loading ? 'Creating Account...' : 'Signup'}
          </button>
          {message && <p className="text-green-600 mt-3 animate-pulse">{message}</p>}
          {error && <p className="text-red-600 mt-3 animate-pulse">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default AdminSignup;
