// import React, { useState, useEffect } from 'react';
// import axios, { AxiosError } from 'axios';
// import { Clock, Star, Crown, CheckCircle } from "lucide-react";

// // API configuration from environment variables
// const API_URL = import.meta.env.VITE_API_URL;

// interface FormData {
//   name: string;
//   email: string;
//   phone: string;
//   address: string;
//   date: string;
//   time: string;
//   type: string;
//   numberOfPeople: number;
// }

// export function BookDarshan() {
//   const [formData, setFormData] = useState<FormData>({
//     name: '',
//     email: '',
//     phone: '',
//     address: '',
//     date: '',
//     time: '',
//     type: 'regular',
//     numberOfPeople: 1,
//   });
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');
//   const [isSuccess, setIsSuccess] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [activeDetail, setActiveDetail] = useState("");
//   const [minDate, setMinDate] = useState('');

//   // Initialize minimum date to today's date
//   useEffect(() => {
//     const today = new Date();
//     const yyyy = today.getFullYear();
//     const mm = String(today.getMonth() + 1).padStart(2, '0');
//     const dd = String(today.getDate()).padStart(2, '0');
//     setMinDate(`${yyyy}-${mm}-${dd}`);
//   }, []);

//   // Darshan type details with pricing and benefits
//   const darshanDetails = {
//     regular: {
//       price: "₹500/person",
//       description: "Standard darshan experience with access to main temple rituals.",
//       benefits: "Queue-based entry, basic facilities",
//     },
//     vip: {
//       price: "₹1,000/person",
//       description: "Priority darshan with shorter wait times and special seating.",
//       benefits: "Dedicated queue, air-conditioned waiting area",
//     },
//     special: {
//       price: "₹2,000/person",
//       description: "Premium darshan including special pooja and personalized blessings.",
//       benefits: "VIP entry, guided tour, commemorative certificate",
//     },
//   };

//   // Handle form input changes
//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: name === 'numberOfPeople' ? parseInt(value) || 1 : value,
//     }));
//   };

//   // Handle form submission and API call
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setMessage('');
//     setError('');
//     setIsSuccess(false);
//     setIsLoading(true);

//     // Validate required fields
//     if (!formData.name || !formData.email || !formData.phone || !formData.address || !formData.date || !formData.time) {
//       setError('All fields are required.');
//       setIsLoading(false);
//       return;
//     }

//     // Validate booking date is not in the past
//     const selectedDate = new Date(formData.date);
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);
    
//     if (selectedDate < today) {
//       setError('Cannot book darshan for past dates. Please select today or a future date.');
//       setIsLoading(false);
//       return;
//     }

//     try {
//       const response = await axios.post(`${API_URL}/api/book-darshan`, formData, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       if (response.data?.success) {
//         setIsSuccess(true);
//         setMessage('Darshan booked successfully! A confirmation email has been sent to your email address with all booking details.');
//         setFormData({
//           name: '',
//           email: '',
//           phone: '',
//           address: '',
//           date: '',
//           time: '',
//           type: 'regular',
//           numberOfPeople: 1,
//         });
        
//         // Auto-hide success message after 8 seconds
//         setTimeout(() => {
//           setMessage('');
//           setIsSuccess(false);
//         }, 8000);
//       } else {
//         setError(response.data?.message || 'Something went wrong.');
//       }
//     } catch (err) {
//       const axiosError = err as AxiosError<{ message: string }>;
//       const apiError = axiosError.response?.data?.message || 'Error submitting form. Please try again later.';
//       setError(apiError);
//       console.error('Booking Error:', axiosError);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Toggle darshan type details visibility
//   const toggleDetails = (type: string) => {
//     setActiveDetail(prev => (prev === type ? "" : type));
//   };

//   // Render expanded details for selected darshan type
//   const renderDetail = (type: string) =>
//     activeDetail === type && (
//       <div className="mt-4 bg-orange-50 p-4 rounded-xl text-sm text-gray-700 border border-orange-200 shadow-inner transition-all duration-300">
//         <p><strong>Price:</strong> {darshanDetails[type].price}</p>
//         <p><strong>Benefits:</strong> {darshanDetails[type].benefits}</p>
//       </div>
//     );

//   return (
//     <main className="bg-gradient-to-b from-orange-50 to-white py-12">
//       <div className="mx-auto max-w-7xl px-6 lg:px-8">
//         <div className="text-center">
//           <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl bg-gradient-to-r from-orange-600 to-yellow-500 bg-clip-text text-transparent">
//             Book a Darshan
//           </h1>
//           <p className="mt-4 text-xl text-gray-600 font-light max-w-3xl mx-auto">
//             Reserve your sacred darshan slot at Shiva Temple. Choose from various darshan types and enjoy a divine experience.
//           </p>
//         </div>

//         <div className="mt-16 pt-2 grid grid-cols-1 gap-8 lg:grid-cols-2">
//           <div className="space-y-8">
//             <h2 className="text-3xl font-semibold text-gray-900">Darshan Types</h2>
            
//             <div
//               className="relative rounded-xl border p-6 shadow-md cursor-pointer hover:shadow-xl transition-all duration-300 border-gray-200 bg-white"
//               onClick={() => toggleDetails("regular")}
//             >
//               <div className="flex items-center space-x-3 mb-3">
//                 <Clock className="h-6 w-6 text-orange-600 flex-shrink-0" />
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-900">Regular Darshan</h3>
//                   <p className="text-gray-600">{darshanDetails.regular.description}</p>
//                 </div>
//               </div>
//               <p className="text-sm text-gray-500 font-medium">{darshanDetails.regular.price}</p>
//               {renderDetail("regular")}
//             </div>

//             <div
//               className="relative rounded-xl border p-6 shadow-md cursor-pointer hover:shadow-xl transition-all duration-300 border-gray-200 bg-white"
//               onClick={() => toggleDetails("vip")}
//             >
//               <div className="flex items-center space-x-3 mb-3">
//                 <Star className="h-6 w-6 text-orange-600 flex-shrink-0" />
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-900">VIP Darshan</h3>
//                   <p className="text-gray-600">{darshanDetails.vip.description}</p>
//                 </div>
//               </div>
//               <p className="text-sm text-gray-500 font-medium">{darshanDetails.vip.price}</p>
//               {renderDetail("vip")}
//             </div>

//             <div
//               className="relative rounded-xl border p-6 shadow-md cursor-pointer hover:shadow-xl transition-all duration-300 border-gray-200 bg-white"
//               onClick={() => toggleDetails("special")}
//             >
//               <div className="flex items-center space-x-3 mb-3">
//                 <Crown className="h-6 w-6 text-orange-600 flex-shrink-0" />
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-900">Special Darshan</h3>
//                   <p className="text-gray-600">{darshanDetails.special.description}</p>
//                 </div>
//               </div>
//               <p className="text-sm text-gray-500 font-medium">{darshanDetails.special.price}</p>
//               {renderDetail("special")}
//             </div>
//           </div>

//           <div className="bg-white rounded-2xl shadow-2xl p-8">
//             <h2 className="text-3xl font-semibold text-gray-900 mb-6">Book Your Darshan</h2>
//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
//                     Full Name
//                   </label>
//                   <input
//                     type="text"
//                     id="name"
//                     name="name"
//                     value={formData.name}
//                     required
//                     onChange={handleChange}
//                     placeholder="Your Full Name"
//                     className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-3 transition-all duration-200 hover:border-orange-400"
//                   />
//                 </div>
//                 <div>
//                   <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
//                     Email
//                   </label>
//                   <input
//                     type="email"
//                     id="email"
//                     name="email"
//                     value={formData.email}
//                     required
//                     onChange={handleChange}
//                     placeholder="Your Email"
//                     className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-3 transition-all duration-200 hover:border-orange-400"
//                   />
//                 </div>
//                 <div>
//                   <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
//                     Phone Number
//                   </label>
//                   <input
//                     type="tel"
//                     id="phone"
//                     name="phone"
//                     value={formData.phone}
//                     required
//                     onChange={handleChange}
//                     placeholder="Your Phone Number"
//                     className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-3 transition-all duration-200 hover:border-orange-400"
//                   />
//                 </div>
//                 <div>
//                   <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
//                     Address
//                   </label>
//                   <input
//                     type="text"
//                     id="address"
//                     name="address"
//                     value={formData.address}
//                     required
//                     onChange={handleChange}
//                     placeholder="Your Address"
//                     className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-3 transition-all duration-200 hover:border-orange-400"
//                   />
//                 </div>
//                 <div>
//                   <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
//                     Date
//                   </label>
//                   <input
//                     type="date"
//                     id="date"
//                     name="date"
//                     value={formData.date}
//                     min={minDate}
//                     required
//                     onChange={handleChange}
//                     className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-3 transition-all duration-200 hover:border-orange-400"
//                   />
//                 </div>
//                 <div>
//                   <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-2">
//                     Time
//                   </label>
//                   <input
//                     type="time"
//                     id="time"
//                     name="time"
//                     value={formData.time}
//                     required
//                     onChange={handleChange}
//                     className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-3 transition-all duration-200 hover:border-orange-400"
//                   />
//                 </div>
//                 <div>
//                   <label htmlFor="numberOfPeople" className="block text-sm font-medium text-gray-700 mb-2">
//                     Number of People
//                   </label>
//                   <input
//                     type="number"
//                     id="numberOfPeople"
//                     name="numberOfPeople"
//                     value={formData.numberOfPeople}
//                     required
//                     min="1"
//                     onChange={handleChange}
//                     className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-3 transition-all duration-200 hover:border-orange-400"
//                   />
//                 </div>
//                 <div>
//                   <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
//                     Darshan Type
//                   </label>
//                   <select
//                     id="type"
//                     name="type"
//                     value={formData.type}
//                     onChange={handleChange}
//                     className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-3 transition-all duration-200 hover:border-orange-400"
//                   >
//                     <option value="regular">Regular - ₹500/person</option>
//                     <option value="vip">VIP - ₹1,000/person</option>
//                     <option value="special">Special - ₹2,000/person</option>
//                   </select>
//                 </div>
//               </div>

//               <div>
//                 <button
//                   type="submit"
//                   disabled={isLoading}
//                   className={`w-full rounded-lg bg-gradient-to-r from-orange-600 to-yellow-500 px-6 py-3 text-lg font-medium text-white shadow-md hover:from-orange-700 hover:to-yellow-600 transition-all duration-300 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 ${
//                     isLoading ? 'opacity-50 cursor-not-allowed' : ''
//                   }`}
//                 >
//                   {isLoading ? 'Booking...' : 'Book Now'}
//                 </button>
//               </div>

//               {error && (
//                 <div className="rounded-lg bg-red-50 p-4 border border-red-200 animate-fade-in">
//                   <p className="text-sm text-red-800 font-medium">{error}</p>
//                 </div>
//               )}

//               {message && (
//                 <div className="rounded-lg p-4 border animate-fade-in bg-green-50 border-green-200">
//                   <div className="flex items-start">
//                     {isSuccess && (
//                       <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
//                     )}
//                     <p className="text-sm font-medium text-green-800">
//                       {message}
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

// export default BookDarshan;


import React, { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { Clock, Star, Crown, CheckCircle } from "lucide-react";

// API configuration from environment variables
const API_URL=import.meta.env.VITE_API_URL || "http://localhost:3000";
console.log('BookDarshan API_URL:', API_URL);

interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  date: string;
  time: string;
  type: string;
  numberOfPeople: number;
}

export function BookDarshan() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    date: '',
    time: '',
    type: 'regular',
    numberOfPeople: 1,
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeDetail, setActiveDetail] = useState("");
  const [minDate, setMinDate] = useState('');

  // Initialize minimum date to today's date
  useEffect(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    setMinDate(`${yyyy}-${mm}-${dd}`);
  }, []);

  // Darshan type details with pricing and benefits
  const darshanDetails = {
    regular: {
      price: "₹500/person",
      description: "Standard darshan experience with access to main temple rituals.",
      benefits: "Queue-based entry, basic facilities",
    },
    vip: {
      price: "₹1,000/person",
      description: "Priority darshan with shorter wait times and special seating.",
      benefits: "Dedicated queue, air-conditioned waiting area",
    },
    special: {
      price: "₹2,000/person",
      description: "Premium darshan including special pooja and personalized blessings.",
      benefits: "VIP entry, guided tour, commemorative certificate",
    },
  };

  // Handle form input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'numberOfPeople' ? parseInt(value) || 1 : value,
    }));
  };

  // Handle form submission and API call
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setIsSuccess(false);
    setIsLoading(true);

    // Validate required fields
    if (!formData.name || !formData.email || !formData.phone || !formData.address || !formData.date || !formData.time) {
      setError('All fields are required.');
      setIsLoading(false);
      return;
    }

    // Validate email format
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Please enter a valid email address.');
      setIsLoading(false);
      return;
    }

    // Validate phone number
    if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      setError('Please enter a valid 10-digit phone number.');
      setIsLoading(false);
      return;
    }

    // Validate booking date is not in the past
    const selectedDate = new Date(formData.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
      setError('Cannot book darshan for past dates. Please select today or a future date.');
      setIsLoading(false);
      return;
    }

    // Check available slots before submission
    try {
      const availableSlots = await fetchAvailableSlots(formData.date);
      if (availableSlots < formData.numberOfPeople) {
        setError(`Sorry, only ${availableSlots} slots available for ${formData.date}. Please choose a different date or reduce the number of people.`);
        setIsLoading(false);
        return;
      }
    } catch (slotErr) {
      console.error('Error checking slots:', slotErr);
      // Continue with booking even if slot check fails
    }

    try {
      const response = await axios.post(`${API_URL}/api/darshan/book`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data?.success) {
        setIsSuccess(true);
        setMessage('Darshan booked successfully! A confirmation email has been sent to your email address with all booking details.');
        setFormData({
          name: '',
          email: '',
          phone: '',
          address: '',
          date: '',
          time: '',
          type: 'regular',
          numberOfPeople: 1,
        });
        
        // Auto-hide success message after 8 seconds
        setTimeout(() => {
          setMessage('');
          setIsSuccess(false);
        }, 8000);
      } else {
        setError(response.data?.message || 'Something went wrong.');
      }
    } catch (err) {
      const axiosError = err as AxiosError<{ message: string }>;
      const apiError = axiosError.response?.data?.message || 'Error submitting form. Please try again later.';
      setError(apiError);
      console.error('Booking Error:', axiosError);
    } finally {
      setIsLoading(false);
    }
  };

  // Check available slots for selected date
  const fetchAvailableSlots = async (date: string) => {
    try {
      const response = await fetch(`${API_URL}/api/darshan/availability?date=${date}`);
      if (!response.ok) throw new Error('Failed to check availability');
      const data = await response.json();
      return data.availableSlots || 100; // Default to max capacity if no data
    } catch (err) {
      console.error('Error fetching availability:', err);
      return 100; // Fallback to max capacity
    }
  };

  // Toggle darshan type details visibility
  const toggleDetails = (type: string) => {
    setActiveDetail(prev => (prev === type ? "" : type));
  };

  // Render expanded details for selected darshan type
  const renderDetail = (type: string) =>
    activeDetail === type && (
      <div className="mt-4 bg-orange-50 p-4 rounded-xl text-sm text-gray-700 border border-orange-200 shadow-inner transition-all duration-300">
        <p><strong>Price:</strong> {darshanDetails[type].price}</p>
        <p><strong>Benefits:</strong> {darshanDetails[type].benefits}</p>
      </div>
    );

  return (
    <main className="bg-gradient-to-b from-orange-50 to-white py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl bg-gradient-to-r from-orange-600 to-yellow-500 bg-clip-text text-transparent">
            Book a Darshan
          </h1>
          <p className="mt-4 text-xl text-gray-600 font-light max-w-3xl mx-auto">
            Reserve your sacred darshan slot at Shiva Temple. Choose from various darshan types and enjoy a divine experience.
          </p>
        </div>

        <div className="mt-16 pt-2 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="space-y-8">
            <h2 className="text-3xl font-semibold text-gray-900">Darshan Types</h2>
            
            <div
              className="relative rounded-xl border p-6 shadow-md cursor-pointer hover:shadow-xl transition-all duration-300 border-gray-200 bg-white"
              onClick={() => toggleDetails("regular")}
            >
              <div className="flex items-center space-x-3 mb-3">
                <Clock className="h-6 w-6 text-orange-600 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Regular Darshan</h3>
                  <p className="text-gray-600">{darshanDetails.regular.description}</p>
                </div>
              </div>
              <p className="text-sm text-gray-500 font-medium">{darshanDetails.regular.price}</p>
              {renderDetail("regular")}
            </div>

            <div
              className="relative rounded-xl border p-6 shadow-md cursor-pointer hover:shadow-xl transition-all duration-300 border-gray-200 bg-white"
              onClick={() => toggleDetails("vip")}
            >
              <div className="flex items-center space-x-3 mb-3">
                <Star className="h-6 w-6 text-orange-600 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">VIP Darshan</h3>
                  <p className="text-gray-600">{darshanDetails.vip.description}</p>
                </div>
              </div>
              <p className="text-sm text-gray-500 font-medium">{darshanDetails.vip.price}</p>
              {renderDetail("vip")}
            </div>

            <div
              className="relative rounded-xl border p-6 shadow-md cursor-pointer hover:shadow-xl transition-all duration-300 border-gray-200 bg-white"
              onClick={() => toggleDetails("special")}
            >
              <div className="flex items-center space-x-3 mb-3">
                <Crown className="h-6 w-6 text-orange-600 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Special Darshan</h3>
                  <p className="text-gray-600">{darshanDetails.special.description}</p>
                </div>
              </div>
              <p className="text-sm text-gray-500 font-medium">{darshanDetails.special.price}</p>
              {renderDetail("special")}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <h2 className="text-3xl font-semibold text-gray-900 mb-6">Book Your Darshan</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    required
                    onChange={handleChange}
                    placeholder="Your Full Name"
                    disabled={isLoading}
                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-3 transition-all duration-200 hover:border-orange-400 disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    required
                    onChange={handleChange}
                    placeholder="Your Email"
                    disabled={isLoading}
                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-3 transition-all duration-200 hover:border-orange-400 disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    required
                    onChange={handleChange}
                    placeholder="Your Phone Number"
                    disabled={isLoading}
                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-3 transition-all duration-200 hover:border-orange-400 disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    required
                    onChange={handleChange}
                    placeholder="Your Address"
                    disabled={isLoading}
                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-3 transition-all duration-200 hover:border-orange-400 disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    min={minDate}
                    required
                    onChange={handleChange}
                    disabled={isLoading}
                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-3 transition-all duration-200 hover:border-orange-400 disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
                <div>
                  <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-2">
                    Time
                  </label>
                  <input
                    type="time"
                    id="time"
                    name="time"
                    value={formData.time}
                    required
                    onChange={handleChange}
                    disabled={isLoading}
                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-3 transition-all duration-200 hover:border-orange-400 disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
                <div>
                  <label htmlFor="numberOfPeople" className="block text-sm font-medium text-gray-700 mb-2">
                    Number of People
                  </label>
                  <input
                    type="number"
                    id="numberOfPeople"
                    name="numberOfPeople"
                    value={formData.numberOfPeople}
                    required
                    min="1"
                    onChange={handleChange}
                    disabled={isLoading}
                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-3 transition-all duration-200 hover:border-orange-400 disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                    Darshan Type
                  </label>
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    disabled={isLoading}
                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-3 transition-all duration-200 hover:border-orange-400 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <option value="regular">Regular - ₹500/person</option>
                    <option value="vip">VIP - ₹1,000/person</option>
                    <option value="special">Special - ₹2,000/person</option>
                  </select>
                </div>
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
                      Booking...
                    </>
                  ) : (
                    'Book Now'
                  )}
                </button>
              </div>

              {error && (
                <div className="rounded-lg bg-red-50 p-4 border border-red-200 animate-fade-in">
                  <p className="text-sm text-red-800 font-medium">{error}</p>
                </div>
              )}

              {message && (
                <div className="rounded-lg p-4 border animate-fade-in bg-green-50 border-green-200">
                  <div className="flex items-start">
                    {isSuccess && (
                      <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                    )}
                    <p className="text-sm font-medium text-green-800">
                      {message}
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

export default BookDarshan;
