// import { useState, FormEvent, ChangeEvent, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// // API configuration from environment variables
// const API_URL = import.meta.env.VITE_API_URL;

// const AdminLogin = () => {
//   const [formData, setFormData] = useState<{ email: string; password: string }>({
//     email: "",
//     password: "",
//   });

//   const [error, setError] = useState<string>("");
//   const [message, setMessage] = useState<string>("");
//   const [loading, setLoading] = useState<boolean>(true);

//   const navigate = useNavigate();

//   // Verify existing admin token on component mount
//   useEffect(() => {
//     const checkAuth = async () => {
//       const token = localStorage.getItem("adminToken");
      
//       if (token) {
//         try {
//           const response = await fetch(`${API_URL}/api/verify-admin`, {
//             headers: { Authorization: `Bearer ${token}` },
//           });

//           if (response.ok) {
//             navigate("/admin", { replace: true });
//             return;
//           } else {
//             localStorage.removeItem("adminToken");
//           }
//         } catch (err) {
//           console.error("Token verification failed:", err);
//           localStorage.removeItem("adminToken");
//         }
//       }
      
//       setLoading(false);
//     };

//     checkAuth();
//   }, [navigate]);

//   // Handle form input changes
//   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // Handle admin login form submission
//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setError("");
//     setMessage("");

//     try {
//       const response = await fetch(`${API_URL}/api/admin-login`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       const result = await response.json();

//       if (!response.ok) {
//         throw new Error(result.message || "Login failed");
//       }

//       localStorage.setItem("adminToken", result.token);
//       setMessage("Login successful! Redirecting...");
      
//       setTimeout(() => {
//         navigate("/admin", { replace: true });
//       }, 1000);
//     } catch (err: unknown) {
//       if (err instanceof Error) {
//         setError(err.message);
//       } else {
//         setError("Something went wrong.");
//       }
//     }
//   };

//   // Navigate to admin signup page
//   const handleSignupRedirect = () => {
//     navigate("/admin-signup");
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-orange-50 flex items-center justify-center">
//         <div className="bg-white p-8 rounded-lg shadow-lg">
//           <div className="animate-spin h-8 w-8 border-4 border-orange-500 border-t-transparent rounded-full mx-auto"></div>
//           <p className="mt-4 text-gray-600">Checking authentication...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-orange-50 flex items-center justify-center">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
//         <h1 className="text-2xl font-bold text-orange-900 mb-6">Admin Login</h1>
//         <form onSubmit={handleSubmit}>
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
//             className="w-full bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 mb-4 transition-all duration-200"
//           >
//             Login
//           </button>
//           <button
//             type="button"
//             onClick={handleSignupRedirect}
//             className="w-full bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-200"
//           >
//             Don't have an account? Sign Up
//           </button>
//           {message && <p className="text-green-600 mt-3 animate-pulse">{message}</p>}
//           {error && <p className="text-red-600 mt-3 animate-pulse">{error}</p>}
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AdminLogin;

import { useState, FormEvent, ChangeEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// API configuration from environment variables
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const AdminLogin = () => {
  const [formData, setFormData] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });

  const [error, setError] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const navigate = useNavigate();

  // Verify existing admin token on component mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("adminToken");
      
      if (token) {
        try {
          const response = await fetch(`${API_URL}/api/verify-admin`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (response.ok) {
            navigate("/admin", { replace: true });
            return;
          } else {
            localStorage.removeItem("adminToken");
          }
        } catch (err) {
          console.error("Token verification failed:", err);
          localStorage.removeItem("adminToken");
        }
      }
      
      setLoading(false);
    };

    checkAuth();
  }, [navigate]);

  // Handle form input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle admin login form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/admin-login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Login failed");
      }

      localStorage.setItem("adminToken", result.token);
      setMessage("Login successful! Redirecting...");
      
      setTimeout(() => {
        navigate("/admin", { replace: true });
      }, 1000);
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

  // Navigate to admin signup page
  const handleSignupRedirect = () => {
    navigate("/admin-signup");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-orange-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <div className="animate-spin h-8 w-8 border-4 border-orange-500 border-t-transparent rounded-full mx-auto"></div>
          <p className="mt-4 text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-orange-900 mb-6">Admin Login</h1>
        <form onSubmit={handleSubmit}>
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
            className="w-full bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 mb-4 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
          <button
            type="button"
            onClick={handleSignupRedirect}
            disabled={loading}
            className="w-full bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-200 disabled:opacity-50"
          >
            Don't have an account? Sign Up
          </button>
          {message && <p className="text-green-600 mt-3 animate-pulse">{message}</p>}
          {error && <p className="text-red-600 mt-3 animate-pulse">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
