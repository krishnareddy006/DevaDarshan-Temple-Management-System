// import { Users, Calendar, Gift, CheckCircle } from "lucide-react";
// import { useState } from "react";

// // API configuration from environment variables
// const API_URL = import.meta.env.VITE_API_URL;

// export function Community() {
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     phone: "",
//     membershipType: "basic",
//   });
//   const [formStatus, setFormStatus] = useState("");
//   const [isSuccess, setIsSuccess] = useState(false);
//   const [activeDetail, setActiveDetail] = useState("");

//   // Handle form input changes
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Handle membership form submission
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setFormStatus("");
//     setIsSuccess(false);

//     try {
//       const response = await fetch(`${API_URL}/api/membership`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setIsSuccess(true);
//         setFormStatus("Membership application submitted successfully! Please check your email for confirmation. Our admin team will review your application shortly.");
//         setFormData({ fullName: "", email: "", phone: "", membershipType: "basic" });
//         setTimeout(() => {
//           setFormStatus("");
//           setIsSuccess(false);
//         }, 8000);
//       } else {
//         setFormStatus(data.message || "Failed to submit application. Please try again.");
//       }
//     } catch (err) {
//       console.error("Error submitting membership:", err);
//       setFormStatus("Failed to submit application. Please check your connection and try again.");
//     }
//   };

//   // Toggle membership details visibility
//   const toggleDetails = (type: string) => {
//     setActiveDetail(prev => (prev === type ? "" : type));
//   };

//   // Membership tier details and pricing
//   const membershipDetails = {
//     basic: {
//       price: "₹4,000/year",
//       visits: "Once every 6 months",
//       members: "Up to 3 members",
//     },
//     premium: {
//       price: "₹7,000/year",
//       visits: "Once every 3 months",
//       members: "Up to 5 members",
//     },
//     patron: {
//       price: "₹10,000/year",
//       visits: "Monthly darshan",
//       members: "Up to 7 members",
//     },
//   };

//   // Render expanded details for selected membership type
//   const renderDetail = (type: string) =>
//     activeDetail === type && (
//       <div className="mt-4 bg-orange-50 p-4 rounded-xl text-sm text-gray-700 border border-orange-200 shadow-inner transition-all duration-300">
//         <p><strong>Price:</strong> {membershipDetails[type].price}</p>
//         <p><strong>Visit Frequency:</strong> {membershipDetails[type].visits}</p>
//         <p><strong>Allowed Members:</strong> {membershipDetails[type].members}</p>
//       </div>
//     );

//   return (
//     <main className="bg-gradient-to-b from-orange-50 to-white py-12">
//       <div className="mx-auto max-w-7xl px-6 lg:px-8">
//         <div className="text-center">
//           <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl bg-gradient-to-r from-orange-600 to-yellow-500 bg-clip-text text-transparent pb-2">
//             <span className="bg-gradient-to-r from-orange-600 to-yellow-500 bg-clip-text text-transparent inline-block">
//               Join Our Spiritual Community
//             </span>
//           </h1>
//           <p className="mt-4 text-xl text-gray-600 font-light max-w-3xl mx-auto">
//             Become a part of Shiva Temple's vibrant community. Choose a membership plan and enjoy exclusive spiritual benefits.
//           </p>
//         </div>

//         <div className="mt-16 pt-2 grid grid-cols-1 gap-8 lg:grid-cols-2">
//           <div className="space-y-8">
//             <h2 className="text-3xl font-semibold text-gray-900">Membership Benefits</h2>
            
//             <div
//               className="relative rounded-xl border p-6 shadow-md cursor-pointer hover:shadow-xl transition-all duration-300 border-gray-200 bg-white"
//               onClick={() => toggleDetails("basic")}
//             >
//               <div className="flex items-center space-x-3 mb-3">
//                 <Users className="h-6 w-6 text-orange-600 flex-shrink-0" />
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-900">Basic Membership</h3>
//                   <p className="text-gray-600">
//                     Access to weekly satsangs, community events, and volunteer opportunities.
//                   </p>
//                 </div>
//               </div>
//               <p className="text-sm text-gray-500 font-medium">
//                 {membershipDetails.basic.price}
//               </p>
//               {renderDetail("basic")}
//             </div>

//             <div
//               className="relative rounded-xl border p-6 shadow-md cursor-pointer hover:shadow-xl transition-all duration-300 border-gray-200 bg-white"
//               onClick={() => toggleDetails("premium")}
//             >
//               <div className="flex items-center space-x-3 mb-3">
//                 <Calendar className="h-6 w-6 text-orange-600 flex-shrink-0" />
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-900">Premium Membership</h3>
//                   <p className="text-gray-600">
//                     Includes Basic benefits plus priority darshan bookings and exclusive festival invites.
//                   </p>
//                 </div>
//               </div>
//               <p className="text-sm text-gray-500 font-medium">
//                 {membershipDetails.premium.price}
//               </p>
//               {renderDetail("premium")}
//             </div>

//             <div
//               className="relative rounded-xl border p-6 shadow-md cursor-pointer hover:shadow-xl transition-all duration-300 border-gray-200 bg-white"
//               onClick={() => toggleDetails("patron")}
//             >
//               <div className="flex items-center space-x-3 mb-3">
//                 <Gift className="h-6 w-6 text-orange-600 flex-shrink-0" />
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-900">Patron Membership</h3>
//                   <p className="text-gray-600">
//                     All Premium benefits plus special recognition in temple publications and VIP events.
//                   </p>
//                 </div>
//               </div>
//               <p className="text-sm text-gray-500 font-medium">
//                 {membershipDetails.patron.price}
//               </p>
//               {renderDetail("patron")}
//             </div>
//           </div>

//           <div className="bg-white rounded-2xl shadow-2xl p-8">
//             <h2 className="text-3xl font-semibold text-gray-900 mb-6">Apply for Membership</h2>
//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div>
//                 <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
//                   Full Name
//                 </label>
//                 <input
//                   type="text"
//                   name="fullName"
//                   id="fullName"
//                   value={formData.fullName}
//                   onChange={handleChange}
//                   placeholder="Your Full Name"
//                   className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-3 transition-all duration-200 hover:border-orange-400"
//                   required
//                 />
//               </div>
//               <div>
//                 <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
//                   Email
//                 </label>
//                 <input
//                   type="email"
//                   name="email"
//                   id="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   placeholder="Your Email"
//                   className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-3 transition-all duration-200 hover:border-orange-400"
//                   required
//                 />
//               </div>
//               <div>
//                 <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
//                   Phone
//                 </label>
//                 <input
//                   type="tel"
//                   name="phone"
//                   id="phone"
//                   value={formData.phone}
//                   onChange={handleChange}
//                   placeholder="Your Phone Number"
//                   className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-3 transition-all duration-200 hover:border-orange-400"
//                   required
//                 />
//               </div>
//               <div>
//                 <label htmlFor="membershipType" className="block text-sm font-medium text-gray-700 mb-2">
//                   Membership Type
//                 </label>
//                 <select
//                   name="membershipType"
//                   id="membershipType"
//                   value={formData.membershipType}
//                   onChange={handleChange}
//                   className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-3 transition-all duration-200 hover:border-orange-400"
//                 >
//                   <option value="basic">Basic Membership - ₹4,000/year</option>
//                   <option value="premium">Premium Membership - ₹7,000/year</option>
//                   <option value="patron">Patron Membership - ₹10,000/year</option>
//                 </select>
//               </div>
//               <div>
//                 <button
//                   type="submit"
//                   className="w-full rounded-lg bg-gradient-to-r from-orange-600 to-yellow-500 px-6 py-3 text-lg font-medium text-white shadow-md hover:from-orange-700 hover:to-yellow-600 transition-all duration-300 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
//                 >
//                   Apply Now
//                 </button>
//               </div>
//               {formStatus && (
//                 <div className={`rounded-lg p-4 border animate-fade-in ${
//                   isSuccess
//                     ? "bg-green-50 border-green-200"
//                     : "bg-red-50 border-red-200"
//                 }`}>
//                   <div className="flex items-start">
//                     {isSuccess && (
//                       <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
//                     )}
//                     <p className={`text-sm font-medium ${
//                       isSuccess ? "text-green-800" : "text-red-800"
//                     }`}>
//                       {formStatus}
//                     </p>
//                   </div>
//                 </div>
//               )}
//             </form>
//           </div>
//         </div>
//       </div>
//       <style jsx>{`
//         @keyframes fadeIn {
//           from { opacity: 0; transform: translateY(10px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         .animate-fade-in {
//           animation: fadeIn 0.5s ease-out;
//         }
//       `}</style>
//     </main>
//   );
// }


import { Users, Calendar, Gift, CheckCircle } from "lucide-react";
import { useState } from "react";

// API configuration from environment variables
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export function Community() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    membershipType: "basic",
  });
  const [formStatus, setFormStatus] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Added loading state
  const [activeDetail, setActiveDetail] = useState("");

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle membership form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("");
    setIsSuccess(false);
    setIsLoading(true); // Set loading state

    // Client-side validation
    if (!formData.fullName.trim()) {
      setFormStatus("Full name is required.");
      setIsLoading(false);
      return;
    }
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      setFormStatus("Please enter a valid email address.");
      setIsLoading(false);
      return;
    }
    if (!formData.phone.trim() || !/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      setFormStatus("Please enter a valid 10-digit phone number.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/membership`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        setFormStatus("Membership application submitted successfully! Please check your email for confirmation. Our admin team will review your application shortly.");
        setFormData({ fullName: "", email: "", phone: "", membershipType: "basic" });
        setTimeout(() => {
          setFormStatus("");
          setIsSuccess(false);
        }, 8000);
      } else {
        setFormStatus(data.message || "Failed to submit application. Please try again.");
      }
    } catch (err) {
      console.error("Error submitting membership:", err);
      setFormStatus("Failed to submit application. Please check your connection and try again.");
    } finally {
      setIsLoading(false); // Clear loading state
    }
  };

  // Toggle membership details visibility
  const toggleDetails = (type: string) => {
    setActiveDetail(prev => (prev === type ? "" : type));
  };

  // Membership tier details and pricing
  const membershipDetails = {
    basic: {
      price: "₹4,000/year",
      visits: "Once every 6 months",
      members: "Up to 3 members",
    },
    premium: {
      price: "₹7,000/year",
      visits: "Once every 3 months",
      members: "Up to 5 members",
    },
    patron: {
      price: "₹10,000/year",
      visits: "Monthly darshan",
      members: "Up to 7 members",
    },
  };

  // Render expanded details for selected membership type
  const renderDetail = (type: string) =>
    activeDetail === type && (
      <div className="mt-4 bg-orange-50 p-4 rounded-xl text-sm text-gray-700 border border-orange-200 shadow-inner transition-all duration-300">
        <p><strong>Price:</strong> {membershipDetails[type].price}</p>
        <p><strong>Visit Frequency:</strong> {membershipDetails[type].visits}</p>
        <p><strong>Allowed Members:</strong> {membershipDetails[type].members}</p>
      </div>
    );

  return (
    <main className="bg-gradient-to-b from-orange-50 to-white py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl bg-gradient-to-r from-orange-600 to-yellow-500 bg-clip-text text-transparent pb-2">
            <span className="bg-gradient-to-r from-orange-600 to-yellow-500 bg-clip-text text-transparent inline-block">
              Join Our Spiritual Community
            </span>
          </h1>
          <p className="mt-4 text-xl text-gray-600 font-light max-w-3xl mx-auto">
            Become a part of Shiva Temple's vibrant community. Choose a membership plan and enjoy exclusive spiritual benefits.
          </p>
        </div>

        <div className="mt-16 pt-2 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="space-y-8">
            <h2 className="text-3xl font-semibold text-gray-900">Membership Benefits</h2>
            
            <div
              className="relative rounded-xl border p-6 shadow-md cursor-pointer hover:shadow-xl transition-all duration-300 border-gray-200 bg-white"
              onClick={() => toggleDetails("basic")}
            >
              <div className="flex items-center space-x-3 mb-3">
                <Users className="h-6 w-6 text-orange-600 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Basic Membership</h3>
                  <p className="text-gray-600">
                    Access to weekly satsangs, community events, and volunteer opportunities.
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-500 font-medium">
                {membershipDetails.basic.price}
              </p>
              {renderDetail("basic")}
            </div>

            <div
              className="relative rounded-xl border p-6 shadow-md cursor-pointer hover:shadow-xl transition-all duration-300 border-gray-200 bg-white"
              onClick={() => toggleDetails("premium")}
            >
              <div className="flex items-center space-x-3 mb-3">
                <Calendar className="h-6 w-6 text-orange-600 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Premium Membership</h3>
                  <p className="text-gray-600">
                    Includes Basic benefits plus priority darshan bookings and exclusive festival invites.
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-500 font-medium">
                {membershipDetails.premium.price}
              </p>
              {renderDetail("premium")}
            </div>

            <div
              className="relative rounded-xl border p-6 shadow-md cursor-pointer hover:shadow-xl transition-all duration-300 border-gray-200 bg-white"
              onClick={() => toggleDetails("patron")}
            >
              <div className="flex items-center space-x-3 mb-3">
                <Gift className="h-6 w-6 text-orange-600 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Patron Membership</h3>
                  <p className="text-gray-600">
                    All Premium benefits plus special recognition in temple publications and VIP events.
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-500 font-medium">
                {membershipDetails.patron.price}
              </p>
              {renderDetail("patron")}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <h2 className="text-3xl font-semibold text-gray-900 mb-6">Apply for Membership</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Your Full Name"
                  disabled={isLoading}
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-3 transition-all duration-200 hover:border-orange-400 disabled:opacity-50 disabled:cursor-not-allowed"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  disabled={isLoading}
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-3 transition-all duration-200 hover:border-orange-400 disabled:opacity-50 disabled:cursor-not-allowed"
                  required
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Your Phone Number"
                  disabled={isLoading}
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-3 transition-all duration-200 hover:border-orange-400 disabled:opacity-50 disabled:cursor-not-allowed"
                  required
                />
              </div>
              <div>
                <label htmlFor="membershipType" className="block text-sm font-medium text-gray-700 mb-2">
                  Membership Type
                </label>
                <select
                  name="membershipType"
                  id="membershipType"
                  value={formData.membershipType}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-3 transition-all duration-200 hover:border-orange-400 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option value="basic">Basic Membership - ₹4,000/year</option>
                  <option value="premium">Premium Membership - ₹7,000/year</option>
                  <option value="patron">Patron Membership - ₹10,000/year</option>
                </select>
              </div>
              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full rounded-lg bg-gradient-to-r from-orange-600 to-yellow-500 px-6 py-3 text-lg font-medium text-white shadow-md hover:from-orange-700 hover:to-yellow-600 transition-all duration-300 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 ${
                    isLoading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Applying...
                    </>
                  ) : (
                    'Apply Now'
                  )}
                </button>
              </div>
              {formStatus && (
                <div className={`rounded-lg p-4 border animate-fade-in ${
                  isSuccess
                    ? "bg-green-50 border-green-200"
                    : "bg-red-50 border-red-200"
                }`}>
                  <div className="flex items-start">
                    {isSuccess && (
                      <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                    )}
                    <p className={`text-sm font-medium ${
                      isSuccess ? "text-green-800" : "text-red-800"
                    }`}>
                      {formStatus}
                    </p>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </main>
  );
}
