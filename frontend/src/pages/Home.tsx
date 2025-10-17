// import { Calendar, Gift, Users, Clock, Mail, Phone, MapPin, IndianRupee, Instagram, Facebook, Youtube, ChevronLeft, ChevronRight } from "lucide-react";
// import { useState, useEffect } from "react";

// // Environment variable for API URL
// const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// export function Home() {
//   const [donationData, setDonationData] = useState({
//     totalDonated: 0,
//     totalUsed: 0,
//     remainingBalance: 0,
//     donationUsage: [],
//   });
//   const [loading, setLoading] = useState(true);
//   const [showEventCalendar, setShowEventCalendar] = useState(false);
//   const [events, setEvents] = useState([]);
//   const [feedback, setFeedback] = useState({ name: "", email: "", message: "" });
//   const [feedbackStatus, setFeedbackStatus] = useState("");
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [progress, setProgress] = useState(0);

//   // Carousel images from assets
//   const carouselImages = [
//     {
//       src: "/assets/DevaDarshanHome1.webp",
//       alt: "Shiva Temple Main View",
//       title: "Divine Serenity Awaits"
//     },
//     {
//       src: "/assets/DevaDarshanHome2.webp",
//       alt: "Shiva Statue",
//       title: "Divine Serenity Awaits"
//     },
//     {
//       src: "/assets/DevaDarshanHome3.webp",
//       alt: "Temple Interior",
//       title: "Sacred Spiritual Space"
//     },
//     {
//       src: "/assets/DevaDarshanHome4.webp",
//       alt: "Temple Night View",
//       title: "Moments of Devotion"
//     },
//     {
//       src: "/assets/DevaDarshanHome5.webp",
//       alt: "Temple Main Gopuram",
//       title: "Moments of Devotion"
//     }
//   ];

//   // Auto-advance carousel with visible progress
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setProgress((prev) => {
//         if (prev >= 100) {
//           setCurrentSlide((curr) => (curr + 1) % carouselImages.length);
//           return 0;
//         }
//         return prev + 1;
//       });
//     }, 50);

//     return () => clearInterval(interval);
//   }, [currentSlide, carouselImages.length]);

//   // Navigate to previous slide
//   const prevSlide = () => {
//     setCurrentSlide((curr) => (curr - 1 + carouselImages.length) % carouselImages.length);
//     setProgress(0);
//   };

//   // Navigate to next slide
//   const nextSlide = () => {
//     setCurrentSlide((curr) => (curr + 1) % carouselImages.length);
//     setProgress(0);
//   };

//   // Reset progress when slide changes manually
//   const handleSlideChange = (index: number) => {
//     setCurrentSlide(index);
//     setProgress(0);
//   };

//   // Fetch donation data
//   useEffect(() => {
//     const fetchDonationData = async () => {
//       setLoading(true);
//       try {
//         const [donationsRes, usageRes] = await Promise.all([
//           fetch(`${API_URL}/api/donations`, {
//             headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
//           }),
//           fetch(`${API_URL}/api/donation-usage`, {
//             headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
//           }),
//         ]);

//         const donations = await donationsRes.json();
//         const donationUsage = await usageRes.json();

//         const totalDonated = donations.reduce((sum: number, donation: any) => sum + donation.amount, 0);
//         const totalUsed = donationUsage.reduce((sum: number, usage: any) => sum + usage.amountSpent, 0);
//         const remainingBalance = totalDonated - totalUsed;

//         setDonationData({ totalDonated, totalUsed, remainingBalance, donationUsage });
//       } catch (err) {
//         console.error("Failed to fetch donation data:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDonationData();
//   }, []);

//   // Fetch events data
//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         const response = await fetch(`${API_URL}/api/events`);
//         const eventsData = await response.json();
//         setEvents(eventsData);
//       } catch (err) {
//         console.error("Failed to fetch events:", err);
//       }
//     };

//     fetchEvents();
//   }, []);

//   const toggleEventCalendar = () => {
//     setShowEventCalendar(!showEventCalendar);
//   };

//   const handleFeedbackChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setFeedback({ ...feedback, [e.target.name]: e.target.value });
//   };

//   const handleFeedbackSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const response = await fetch(`${API_URL}/api/feedback`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(feedback),
//       });

//       if (response.ok) {
//         setFeedbackStatus("Feedback submitted successfully!");
//         setFeedback({ name: "", email: "", message: "" });
//         setTimeout(() => setFeedbackStatus(""), 3000);
//       } else {
//         setFeedbackStatus("Failed to submit feedback. Please try again.");
//       }
//     } catch (err) {
//       console.error("Error submitting feedback:", err);
//       setFeedbackStatus("Failed to submit feedback. Please try again.");
//     }
//   };

//   return (
//     <main className="bg-gradient-to-b from-orange-50 to-white">
//       {/* Hero Carousel Section */}
//       <div className="relative h-screen overflow-hidden">
//         {/* Carousel Images */}
//         <div className="relative h-full">
//           {carouselImages.map((image, index) => (
//             <div
//               key={index}
//               className={`absolute inset-0 transition-opacity duration-1000 ${
//                 index === currentSlide ? 'opacity-100' : 'opacity-0'
//               }`}
//             >
//               <img
//                 className="w-full h-full object-cover"
//                 src={image.src}
//                 alt={image.alt}
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
//             </div>
//           ))}
//         </div>

//         {/* Navigation Arrows
//         <button
//           onClick={prevSlide}
//           className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-full transition-all duration-300 z-10"
//           aria-label="Previous slide"
//         >
//           <ChevronLeft className="h-6 w-6 text-white" />
//         </button>
//         <button
//           onClick={nextSlide}
//           className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-full transition-all duration-300 z-10"
//           aria-label="Next slide"
//         >
//           <ChevronRight className="h-6 w-6 text-white" />
//         </button> */}

//         {/* Carousel Indicators - Thin lines */}
//         <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-2 z-10">
//           {carouselImages.map((_, index) => (
//             <button
//               key={index}
//               onClick={(e) => {
//                 e.preventDefault();
//                 handleSlideChange(index);
//               }}
//               className="relative group focus:outline-none"
//               aria-label={`Go to slide ${index + 1}`}
//             >
//               <div
//                 className={`h-1 rounded-full transition-all duration-300 ${
//                   index === currentSlide
//                     ? 'w-16 bg-orange-500'
//                     : 'w-8 bg-white/40 hover:bg-white/60'
//                 }`}
//               >
//                 {index === currentSlide && (
//                   <div
//                     className="absolute left-0 top-0 h-full bg-orange-600 rounded-full transition-all duration-100 ease-linear"
//                     style={{ width: `${progress}%` }}
//                   />
//                 )}
//               </div>
//             </button>
//           ))}
//         </div>

//         {/* Overlay Content */}
//         <div className="absolute inset-0 flex items-center justify-center">
//           <div className="text-center text-white px-4 max-w-4xl mx-auto">
//             <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 animate-fade-in">
//               Shiva Temple
//             </h1>
//             <p className="text-xl md:text-2xl text-gray-200 leading-relaxed max-w-3xl mx-auto animate-fade-in">
//               {carouselImages[currentSlide].title}
//             </p>
//             <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto animate-fade-in">
//               Embrace divine serenity and spiritual bliss. Join our vibrant community in sacred worship and devotion.
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Features Section */}
//       <div className="bg-white py-24 sm:py-32">
//         <div className="mx-auto max-w-7xl px-6 lg:px-8">
//           <div className="text-center">
//             <h2 className="text-4xl font-extrabold text-gray-900 bg-clip-text bg-gradient-to-r from-orange-600 to-yellow-500">
//               Our Sacred Offerings
//             </h2>
//             <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
//               Discover the spiritual services that connect you closer to divinity.
//             </p>
//           </div>
//           <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
//             {[
//               {
//                 icon: <Clock className="h-8 w-8 text-orange-600" />,
//                 title: "Online Darshan Booking",
//                 description: "Reserve your sacred darshan slot effortlessly and avoid waiting in long queues.",
//                 link: "/bookdarshan",
//               },
//               {
//                 icon: <Gift className="h-8 w-8 text-orange-600" />,
//                 title: "Online Donations",
//                 description: "Support temple initiatives with secure donations and receive instant acknowledgments.",
//                 link: "/donations",
//               },
//               {
//                 icon: <Calendar className="h-8 w-8 text-orange-600" />,
//                 title: "Event Calendar",
//                 description: "Stay informed about upcoming festivals, poojas, and special temple events.",
//                 onClick: toggleEventCalendar,
//               },
//               {
//                 icon: <Users className="h-8 w-8 text-orange-600" />,
//                 title: "Community Membership",
//                 description: "Join our spiritual community for exclusive benefits and divine experiences.",
//                 link: "/community",
//               },
//             ].map((feature, index) => (
//               <div
//                 key={index}
//                 onClick={feature.onClick}
//                 className="relative bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
//               >
//                 {feature.link ? (
//                   <a href={feature.link} className="block">
//                     <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 rounded-full bg-orange-100 p-3">
//                       {feature.icon}
//                     </div>
//                     <h3 className="mt-12 text-lg font-semibold text-gray-900">{feature.title}</h3>
//                     <p className="mt-2 text-gray-600">{feature.description}</p>
//                   </a>
//                 ) : (
//                   <>
//                     <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 rounded-full bg-orange-100 p-3">
//                       {feature.icon}
//                     </div>
//                     <h3 className="mt-12 text-lg font-semibold text-gray-900">{feature.title}</h3>
//                     <p className="mt-2 text-gray-600">{feature.description}</p>
//                   </>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Event Calendar Modal */}
//       {showEventCalendar && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-2xl p-8 max-w-4xl w-full mx-4 max-h-[80vh] overflow-y-auto">
//             <div className="flex justify-between items-center mb-6">
//               <h2 className="text-3xl font-bold text-orange-600">Temple Event Calendar</h2>
//               <button
//                 onClick={toggleEventCalendar}
//                 className="text-gray-500 hover:text-gray-700 text-2xl font-bold w-8 h-8 flex items-center justify-center"
//               >
//                 ×
//               </button>
//             </div>
//             <div className="grid grid-cols-1 gap-6">
//               {events.length === 0 ? (
//                 <div className="text-center py-12">
//                   <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
//                   <p className="text-xl text-gray-500 mb-2">No events scheduled</p>
//                   <p className="text-gray-400">Events added by the admin will appear here</p>
//                 </div>
//               ) : (
//                 events.map((event: any, index) => (
//                   <div key={index} className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-6 border-l-4 border-orange-600 hover:shadow-lg transition-all duration-300">
//                     <div className="flex items-start justify-between">
//                       <div className="flex-1">
//                         <h3 className="text-xl font-semibold text-gray-900 mb-2">{event.title}</h3>
//                         <div className="flex items-center gap-2 mb-3">
//                           <Calendar className="h-4 w-4 text-orange-600" />
//                           <p className="text-sm font-medium text-orange-700">{event.date}</p>
//                         </div>
//                         <p className="text-gray-700 leading-relaxed">{event.description}</p>
//                       </div>
//                     </div>
//                     <div className="mt-4 pt-4 border-t border-orange-200">
//                       <p className="text-xs text-gray-500">
//                         Added on: {new Date(event.createdAt).toLocaleDateString('en-IN', {
//                           year: 'numeric',
//                           month: 'long',
//                           day: 'numeric'
//                         })}
//                       </p>
//                     </div>
//                   </div>
//                 ))
//               )}
//             </div>
//             <div className="mt-8 text-center">
//               <button
//                 onClick={toggleEventCalendar}
//                 className="rounded-xl bg-orange-600 px-9 py-2 text-base font-semibold text-white hover:bg-orange-700 transition-all duration-300"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Donation Summary Section */}
//       <div className="bg-gradient-to-r from-orange-100 to-yellow-100 py-24">
//         <div className="mx-auto max-w-7xl px-6 lg:px-8">
//           <div className="text-center">
//             <h2 className="text-4xl font-extrabold text-gray-900">Donation Impact</h2>
//             <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
//               Your contributions help sustain and enhance our temple's sacred mission.
//             </p>
//           </div>
//           <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
//             <div className="bg-white rounded-2xl p-8 shadow-xl text-center">
//               <IndianRupee className="h-10 w-10 text-green-600 mx-auto" />
//               <p className="mt-4 text-sm font-medium text-gray-600">Total Donated</p>
//               <p className="text-3xl font-bold text-green-700">
//                 ₹{loading ? "Loading..." : donationData.totalDonated.toFixed(2)}
//               </p>
//             </div>
//             <div className="bg-white rounded-2xl p-8 shadow-xl text-center">
//               <IndianRupee className="h-10 w-10 text-red-600 mx-auto" />
//               <p className="mt-4 text-sm font-medium text-gray-600">Total Used</p>
//               <p className="text-3xl font-bold text-red-700">
//                 ₹{loading ? "Loading..." : donationData.totalUsed.toFixed(2)}
//               </p>
//             </div>
//             <div className="bg-white rounded-2xl p-8 shadow-xl text-center">
//               <IndianRupee className="h-10 w-10 text-blue-600 mx-auto" />
//               <p className="mt-4 text-sm font-medium text-gray-600">Remaining Balance</p>
//               <p className="text-3xl font-bold text-blue-700">
//                 ₹{loading ? "Loading..." : donationData.remainingBalance.toFixed(2)}
//               </p>
//             </div>
//           </div>
//           <div className="mt-12">
//             <h3 className="text-2xl font-semibold text-gray-900 text-center">How Your Donations Are Used</h3>
//             <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
//               {loading ? (
//                 <p className="text-center text-gray-600 col-span-full">Loading donation usage...</p>
//               ) : donationData.donationUsage.length === 0 ? (
//                 <p className="text-center text-gray-600 col-span-full">No donation usage records available.</p>
//               ) : (
//                 donationData.donationUsage.slice(0, 3).map((usage: any, index: number) => (
//                   <div
//                     key={index}
//                     className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-shadow duration-300"
//                   >
//                     <p className="text-lg font-semibold text-orange-600">{usage.purpose}</p>
//                     <p className="mt-2 text-gray-600">₹{usage.amountSpent.toFixed(2)}</p>
//                     <p className="mt-2 text-sm text-gray-500">{usage.description}</p>
//                     <p className="mt-2 text-sm text-gray-400">Date: {usage.date}</p>
//                   </div>
//                 ))
//               )}
//             </div>
//             <div className="mt-8 text-center">
//               <a
//                 href="/donations"
//                 className="inline-flex items-center rounded-xl bg-orange-600 px-6 py-3 text-base font-semibold text-white shadow-lg hover:bg-orange-700 transition-all duration-300"
//               >
//                 Contribute Now
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Community Information Section */}
//       <div className="bg-gray-50 py-24">
//         <div className="mx-auto max-w-7xl px-6 lg:px-8">
//           <div className="text-center">
//             <h2 className="text-4xl font-extrabold text-gray-900">Our Spiritual Community</h2>
//             <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
//               Join a vibrant community dedicated to spiritual growth and service.
//             </p>
//           </div>
//           <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
//             <div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-shadow duration-300">
//               <h3 className="text-lg font-semibold text-orange-600">Weekly Satsangs</h3>
//               <p className="mt-2 text-gray-600">
//                 Participate in our weekly gatherings for bhajans, discourses, and meditation every Sunday at 6 PM.
//               </p>
//             </div>
//             <div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-shadow duration-300">
//               <h3 className="text-lg font-semibold text-orange-600">Volunteer Opportunities</h3>
//               <p className="mt-2 text-gray-600">
//                 Contribute your time and skills to temple activities, from event planning to community outreach.
//               </p>
//             </div>
//             <div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-shadow duration-300">
//               <h3 className="text-lg font-semibold text-orange-600">Youth Programs</h3>
//               <p className="mt-2 text-gray-600">
//                 Engage young minds with our cultural and spiritual classes held every Saturday for children and teens.
//               </p>
//             </div>
//           </div>
//           <div className="mt-8 text-center">
//             <a
//               href="/community"
//               className="inline-flex items-center rounded-xl bg-orange-600 px-6 py-3 text-base font-semibold text-white shadow-lg hover:bg-orange-700 transition-all duration-300"
//             >
//               Join Our Community
//             </a>
//           </div>
//         </div>
//       </div>

//       {/* Latest Updates Section */}
//       <div className="bg-white py-24">
//         <div className="mx-auto max-w-7xl px-6 lg:px-8">
//           <div className="text-center">
//             <h2 className="text-4xl font-extrabold text-gray-900">Latest Temple Updates</h2>
//             <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
//               Stay connected with the latest happenings at Shiva Temple.
//             </p>
//           </div>
//           <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
//             {[
//               {
//                 title: "Temple Renovation",
//                 description: "Support our ongoing temple renovation project with your generous donations. Help us preserve our sacred heritage.",
//                 date: "Ongoing",
//               },
//               {
//                 title: "Diwali Celebration",
//                 description: "Celebrate the Festival of Lights with us. Special abhishekams, poojas, and prasadam distribution for all devotees.",
//                 date: "October 2025",
//               },
//               {
//                 title: "Karthika Deepotsavam",
//                 description: "Join us for the grand Karthika Deepotsavam celebration. Special poojas and rituals will be conducted throughout the month.",
//                 date: "November 2025",
//               },
//             ].map((update, index) => (
//               <div
//                 key={index}
//                 className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-orange-100"
//               >
//                 <h3 className="text-lg font-semibold text-orange-600">{update.title}</h3>
//                 <p className="mt-2 text-gray-600">{update.description}</p>
//                 <p className="mt-4 text-sm text-gray-400">{update.date}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Connect With Us Section */}
//       <div id="connect-section" className="bg-gradient-to-r from-orange-50 to-yellow-50 py-24">
//         <div className="mx-auto max-w-7xl px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl font-extrabold text-gray-900 bg-clip-text bg-gradient-to-r from-orange-600 to-yellow-500">
//               Connect With Us
//             </h2>
//             <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
//               We're here to guide you on your spiritual journey. Reach out to us for inquiries, blessings, or to share your thoughts.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
//             {/* Contact Information */}
//             <div className="rounded-2xl p-8">
//               <h3 className="text-2xl font-semibold text-gray-900 mb-8">Get In Touch</h3>
//               <div className="space-y-6">
//                 <div className="flex items-start gap-4">
//                   <MapPin className="h-6 w-6 text-orange-600 flex-shrink-0 mt-1" />
//                   <div>
//                     <p className="font-medium text-gray-900">Temple Address</p>
//                     <p className="mt-1 text-gray-600">Shiva Temple, Bangalore, Karnataka, India - 560001</p>
//                   </div>
//                 </div>
//                 <div className="flex items-start gap-4">
//                   <Phone className="h-6 w-6 text-orange-600 flex-shrink-0 mt-1" />
//                   <div>
//                     <p className="font-medium text-gray-900">Phone Support</p>
//                     <p className="mt-1 text-gray-600">+91 98765 43210</p>
//                     <p className="text-sm text-gray-500">Available 6 AM - 9 PM</p>
//                   </div>
//                 </div>
//                 <div className="flex items-start gap-4">
//                   <Mail className="h-6 w-6 text-orange-600 flex-shrink-0 mt-1" />
//                   <div>
//                     <p className="font-medium text-gray-900">Email Us</p>
//                     <p className="mt-1 text-gray-600">contact@shivatemple.org</p>
//                     <p className="mt-1 text-gray-600">info@shivatemple.org</p>
//                   </div>
//                 </div>

//                 {/* Social Media */}
//                 <div className="pt-6 border-t border-gray-200">
//                   <p className="font-medium text-gray-900 mb-4">Follow Us</p>
//                   <div className="flex gap-4">
//                     <a
//                       href="https://instagram.com"
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="bg-orange-100 p-3 rounded-full text-orange-600 hover:bg-orange-200 transition-colors duration-300"
//                     >
//                       <Instagram className="h-5 w-5" />
//                     </a>
//                     <a
//                       href="https://youtube.com"
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="bg-orange-100 p-3 rounded-full text-orange-600 hover:bg-orange-200 transition-colors duration-300"
//                     >
//                       <Youtube className="h-5 w-5" />
//                     </a>
//                     <a
//                       href="https://facebook.com"
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="bg-orange-100 p-3 rounded-full text-orange-600 hover:bg-orange-200 transition-colors duration-300"
//                     >
//                       <Facebook className="h-5 w-5" />
//                     </a>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Feedback Form */}
//             <div className="bg-white rounded-2xl p-8 shadow-xl">
//               <h3 className="text-2xl font-semibold text-gray-900 mb-6">Share Your Feedback</h3>
//               <form onSubmit={handleFeedbackSubmit} className="space-y-6">
//                 <div>
//                   <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
//                     Your Name *
//                   </label>
//                   <input
//                     type="text"
//                     name="name"
//                     id="name"
//                     value={feedback.name}
//                     onChange={handleFeedbackChange}
//                     className="w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 transition-colors duration-300"
//                     placeholder="Enter your full name"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
//                     Email Address *
//                   </label>
//                   <input
//                     type="email"
//                     name="email"
//                     id="email"
//                     value={feedback.email}
//                     onChange={handleFeedbackChange}
//                     className="w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 transition-colors duration-300"
//                     placeholder="Enter your email address"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
//                     Your Message *
//                   </label>
//                   <textarea
//                     name="message"
//                     id="message"
//                     rows={5}
//                     value={feedback.message}
//                     onChange={handleFeedbackChange}
//                     className="w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 transition-colors duration-300"
//                     placeholder="Share your thoughts, feedback, or inquiries..."
//                     required
//                   />
//                 </div>
//                 <div>
//                   <button
//                     type="submit"
//                     className="w-full rounded-xl bg-gradient-to-r from-orange-600 to-yellow-500 px-6 py-3 text-base font-semibold text-white shadow-lg"
//                   >
//                     Send Message
//                   </button>
//                 </div>
//                 {feedbackStatus && (
//                   <div className={`text-center p-3 rounded-lg ${
//                     feedbackStatus.includes("success")
//                       ? "bg-green-100 text-green-700"
//                       : "bg-red-100 text-red-700"
//                   }`}>
//                     {feedbackStatus}
//                   </div>
//                 )}
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Footer Section */}
//       <footer className="bg-gradient-to-r from-orange-700 to-yellow-600 py-16">
//         <div className="mx-auto max-w-7xl px-6 lg:px-8">
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 text-white">
//             {/* First Services Column */}
//             <div className="text-center sm:text-left">
//               <h3 className="text-xl font-semibold mb-4 text-orange-100">Services</h3>
//               <ul className="space-y-2">
//                 <li>
//                   <a href="/templepoojas" className="hover:text-orange-200 transition-colors duration-300">
//                     Poojas
//                   </a>
//                 </li>
//                 <li>
//                   <a href="/bookdarshan" className="hover:text-orange-200 transition-colors duration-300">
//                     Book Darshan
//                   </a>
//                 </li>
//                 <li>
//                   <a href="/donations" className="hover:text-orange-200 transition-colors duration-300">
//                     Donations
//                   </a>
//                 </li>
//                 <li>
//                   <a href="/accommodation" className="hover:text-orange-200 transition-colors duration-300">
//                     Accommodation
//                   </a>
//                 </li>
//               </ul>
//             </div>

//             {/* Second Services Column */}
//             <div className="text-center sm:text-left">
//               <h3 className="text-xl font-semibold mb-4 text-orange-100">Services</h3>
//               <ul className="space-y-2">
//                 <li>
//                   <button
//                     onClick={toggleEventCalendar}
//                     className="hover:text-orange-200 transition-colors duration-300"
//                   >
//                     Events & Calendar
//                   </button>
//                 </li>
//                 <li>
//                   <a href="/community" className="hover:text-orange-200 transition-colors duration-300">
//                     Join Community
//                   </a>
//                 </li>
//                 <li>
//                   <a href="/gallery" className="hover:text-orange-200 transition-colors duration-300">
//                     Photo Gallery
//                   </a>
//                 </li>
//               </ul>
//             </div>

//             {/* Account Column */}
//             <div className="text-center sm:text-left">
//               <h3 className="text-xl font-semibold mb-4 text-orange-100">Account</h3>
//               <ul className="space-y-2">
//                 {typeof window !== 'undefined' && localStorage.getItem("userToken") ? (
//                   <>
//                     <li>
//                       <a href="/profile" className="hover:text-orange-200 transition-colors duration-300">
//                         My Profile
//                       </a>
//                     </li>
//                     <li>
//                       <a href="/my-bookings" className="hover:text-orange-200 transition-colors duration-300">
//                         My Bookings
//                       </a>
//                     </li>
//                     <li>
//                       <button
//                         onClick={() => {
//                           localStorage.removeItem("userToken");
//                           window.location.reload();
//                         }}
//                         className="hover:text-orange-200 transition-colors duration-300"
//                       >
//                         Logout
//                       </button>
//                     </li>
//                   </>
//                 ) : (
//                   <>
//                     <li>
//                       <a href="/login" className="hover:text-orange-200 transition-colors duration-300">
//                         Login
//                       </a>
//                     </li>
//                     <li>
//                       <a href="/signup" className="hover:text-orange-200 transition-colors duration-300">
//                         Sign Up
//                       </a>
//                     </li>
//                   </>
//                 )}
//                 <li>
//                   <a href="/admin-login" className="hover:text-orange-200 transition-colors duration-300">
//                     Admin Panel
//                   </a>
//                 </li>
//               </ul>
//             </div>

//             {/* Connect Column */}
//             <div className="text-center sm:text-left">
//               <h3 className="text-xl font-semibold mb-4 text-orange-100">Connect</h3>
//               <ul className="space-y-2 mb-4">
//                 <li>
//                   <a href="#connect-section" className="hover:text-orange-200 transition-colors duration-300">
//                     Contact Us
//                   </a>
//                 </li>
//                 <li>
//                   <a href="/about" className="hover:text-orange-200 transition-colors duration-300">
//                     About Temple
//                   </a>
//                 </li>
//               </ul>

//               {/* Social Media Links */}
//               <div className="flex gap-4 justify-center sm:justify-start">
//                 <a
//                   href="https://instagram.com"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="hover:text-orange-200 transition-colors duration-300"
//                 >
//                   <Instagram className="h-6 w-6" />
//                 </a>
//                 <a
//                   href="https://youtube.com"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="hover:text-orange-200 transition-colors duration-300"
//                 >
//                   <Youtube className="h-6 w-6" />
//                 </a>
//                 <a
//                   href="https://facebook.com"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="hover:text-orange-200 transition-colors duration-300"
//                 >
//                   <Facebook className="h-6 w-6" />
//                 </a>
//               </div>
//             </div>
//           </div>

//           {/* Bottom Copyright Section */}
//           <div className="mt-12 pt-8 border-t border-orange-600 text-center text-white">
//             <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
//               <p className="text-base lg:text-lg">
//                 © 2025 Shiva Temple. All Rights Reserved.
//               </p>
//               <div className="flex gap-6 text-sm">
//                 <a href="/privacy" className="hover:text-orange-200 transition-colors duration-300">
//                   Privacy Policy
//                 </a>
//                 <a href="/terms" className="hover:text-orange-200 transition-colors duration-300">
//                   Terms of Service
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//       </footer>

//       {/* Custom CSS for animations */}
//       <style jsx>{`
//         @keyframes fadeIn {
//           from { opacity: 0; transform: translateY(20px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         .animate-fade-in {
//           animation: fadeIn 1s ease-out;
//         }
//       `}</style>
//     </main>
//   );
// }


import { Calendar, Gift, Users, Clock, Mail, Phone, MapPin, IndianRupee, Instagram, Facebook, Youtube, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

interface HomeProps {
  showEventCalendar: boolean;
  toggleEventCalendar: () => void;
}

// Interface for donation data
interface DonationData {
  totalDonated: number;
  totalUsed: number;
  remainingBalance: number;
  donationUsage: DonationUsage[];
}

interface DonationUsage {
  purpose: string;
  amountSpent: number;
  description: string;
  date: string;
}

// Interface for events
interface TempleEvent {
  title: string;
  description: string;
  date: string;
  createdAt: string;
}

// Environment variable for API URL
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export function Home({ showEventCalendar, toggleEventCalendar }: HomeProps) {
  const [donationData, setDonationData] = useState<DonationData>({
    totalDonated: 0,
    totalUsed: 0,
    remainingBalance: 0,
    donationUsage: [],
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [events, setEvents] = useState<TempleEvent[]>([]);
  const [feedback, setFeedback] = useState({ name: "", email: "", message: "" });
  const [feedbackStatus, setFeedbackStatus] = useState<string>("");
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);

  // Carousel images from assets
  const carouselImages = [
    {
      src: "/assets/DevaDarshanHome1.webp",
      alt: "Shiva Temple Main View",
      title: "Divine Serenity Awaits"
    },
    {
      src: "/assets/DevaDarshanHome2.webp",
      alt: "Shiva Statue",
      title: "Divine Serenity Awaits"
    },
    {
      src: "/assets/DevaDarshanHome3.webp",
      alt: "Temple Interior",
      title: "Sacred Spiritual Space"
    },
    {
      src: "/assets/DevaDarshanHome4.webp",
      alt: "Temple Night View",
      title: "Moments of Devotion"
    },
    {
      src: "/assets/DevaDarshanHome5.webp",
      alt: "Temple Main Gopuram",
      title: "Moments of Devotion"
    }
  ];

  // Auto-advance carousel with visible progress
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentSlide((curr) => (curr + 1) % carouselImages.length);
          return 0;
        }
        return prev + 1;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [currentSlide, carouselImages.length]);

  // Navigate to previous slide
  const prevSlide = (): void => {
    setCurrentSlide((curr) => (curr - 1 + carouselImages.length) % carouselImages.length);
    setProgress(0);
  };

  // Navigate to next slide
  const nextSlide = (): void => {
    setCurrentSlide((curr) => (curr + 1) % carouselImages.length);
    setProgress(0);
  };

  // Reset progress when slide changes manually
  const handleSlideChange = (index: number): void => {
    setCurrentSlide(index);
    setProgress(0);
  };

  // Fetch donation data
  useEffect(() => {
    const fetchDonationData = async (): Promise<void> => {
      setLoading(true);
      try {
        const adminToken = localStorage.getItem("adminToken");
        const [donationsRes, usageRes] = await Promise.all([
          fetch(`${API_URL}/api/donations`, {
            headers: { 
              'Content-Type': 'application/json',
              ...(adminToken && { Authorization: `Bearer ${adminToken}` })
            },
          }),
          fetch(`${API_URL}/api/donation-usage`, {
            headers: { 
              'Content-Type': 'application/json',
              ...(adminToken && { Authorization: `Bearer ${adminToken}` })
            },
          }),
        ]);

        if (!donationsRes.ok || !usageRes.ok) {
          throw new Error('Failed to fetch data');
        }

        const donations: any[] = await donationsRes.json();
        const donationUsage: DonationUsage[] = await usageRes.json();

        const totalDonated = donations.reduce((sum: number, donation: { amount: number }) => sum + donation.amount, 0);
        const totalUsed = donationUsage.reduce((sum: number, usage: { amountSpent: number }) => sum + usage.amountSpent, 0);
        const remainingBalance = totalDonated - totalUsed;

        setDonationData({ totalDonated, totalUsed, remainingBalance, donationUsage });
      } catch (err) {
        console.error("Failed to fetch donation data:", err);
        setDonationData({
          totalDonated: 0,
          totalUsed: 0,
          remainingBalance: 0,
          donationUsage: []
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDonationData();
  }, []);

  // Fetch events data
  useEffect(() => {
    const fetchEvents = async (): Promise<void> => {
      try {
        const response = await fetch(`${API_URL}/api/events`, {
          headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }

        const eventsData: TempleEvent[] = await response.json();
        setEvents(eventsData);
      } catch (err) {
        console.error("Failed to fetch events:", err);
        setEvents([]);
      }
    };

    fetchEvents();
  }, []);

  const handleFeedbackChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setFeedback({ ...feedback, [e.target.name]: e.target.value });
  };

  const handleFeedbackSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/api/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(feedback),
      });

      if (response.ok) {
        setFeedbackStatus("Feedback submitted successfully!");
        setFeedback({ name: "", email: "", message: "" });
        setTimeout(() => setFeedbackStatus(""), 3000);
      } else {
        const errorData = await response.json();
        setFeedbackStatus(errorData.message || "Failed to submit feedback. Please try again.");
        setTimeout(() => setFeedbackStatus(""), 5000);
      }
    } catch (err) {
      console.error("Error submitting feedback:", err);
      setFeedbackStatus("Failed to submit feedback. Please try again.");
      setTimeout(() => setFeedbackStatus(""), 5000);
    }
  };

  // Event Calendar Modal
  const renderEventCalendar = (): JSX.Element | null => {
    if (!showEventCalendar) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl p-8 max-w-4xl w-full max-h-[80vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-orange-600">Temple Event Calendar</h2>
            <button
              onClick={toggleEventCalendar}
              className="text-gray-500 hover:text-gray-700 text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Close calendar"
            >
              ×
            </button>
          </div>
          <div className="grid grid-cols-1 gap-6">
            {events.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-xl text-gray-500 mb-2">No events scheduled</p>
                <p className="text-gray-400">Events added by the admin will appear here</p>
              </div>
            ) : (
              events.map((event: TempleEvent, index: number) => (
                <div key={index} className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-6 border-l-4 border-orange-600 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{event.title}</h3>
                      <div className="flex items-center gap-2 mb-3">
                        <Calendar className="h-4 w-4 text-orange-600" />
                        <p className="text-sm font-medium text-orange-700">{event.date}</p>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{event.description}</p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-orange-200">
                    <p className="text-xs text-gray-500">
                      Added on: {new Date(event.createdAt).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="mt-8 text-center">
            <button
              onClick={toggleEventCalendar}
              className="rounded-xl bg-orange-600 px-9 py-2 text-base font-semibold text-white hover:bg-orange-700 transition-all duration-300"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <main className="bg-gradient-to-b from-orange-50 to-white">
      {/* Hero Carousel Section */}
      <div className="relative h-screen overflow-hidden">
        {/* Carousel Images */}
        <div className="relative h-full">
          {carouselImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                className="w-full h-full object-cover"
                src={image.src}
                alt={image.alt}
                loading={index === 0 ? 'eager' : 'lazy'}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            </div>
          ))}
        </div>

        {/* Navigation Arrows - Uncomment if needed */}
        {/* 
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-full transition-all duration-300 z-10"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-6 w-6 text-white" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-full transition-all duration-300 z-10"
          aria-label="Next slide"
        >
          <ChevronRight className="h-6 w-6 text-white" />
        </button>
        */}

        {/* Carousel Indicators - Thin lines */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-2 z-10">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.preventDefault();
                handleSlideChange(index);
              }}
              className="relative group focus:outline-none"
              aria-label={`Go to slide ${index + 1}`}
            >
              <div
                className={`h-1 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'w-16 bg-orange-500'
                    : 'w-8 bg-white/40 hover:bg-white/60'
                }`}
              >
                {index === currentSlide && (
                  <div
                    className="absolute left-0 top-0 h-full bg-orange-600 rounded-full transition-all duration-100 ease-linear"
                    style={{ width: `${progress}%` }}
                  />
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Overlay Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4 max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 animate-fade-in">
              Shiva Temple
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 leading-relaxed max-w-3xl mx-auto animate-fade-in">
              {carouselImages[currentSlide].title}
            </p>
            <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto animate-fade-in">
              Embrace divine serenity and spiritual bliss. Join our vibrant community in sacred worship and devotion.
            </p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-extrabold text-gray-900 bg-clip-text bg-gradient-to-r from-orange-600 to-yellow-500">
              Our Sacred Offerings
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
              Discover the spiritual services that connect you closer to divinity.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: <Clock className="h-8 w-8 text-orange-600" />,
                title: "Online Darshan Booking",
                description: "Reserve your sacred darshan slot effortlessly and avoid waiting in long queues.",
                link: "/bookdarshan",
              },
              {
                icon: <Gift className="h-8 w-8 text-orange-600" />,
                title: "Online Donations",
                description: "Support temple initiatives with secure donations and receive instant acknowledgments.",
                link: "/donations",
              },
              {
                icon: <Calendar className="h-8 w-8 text-orange-600" />,
                title: "Event Calendar",
                description: "Stay informed about upcoming festivals, poojas, and special temple events.",
                onClick: toggleEventCalendar,
              },
              {
                icon: <Users className="h-8 w-8 text-orange-600" />,
                title: "Community Membership",
                description: "Join our spiritual community for exclusive benefits and divine experiences.",
                link: "/community",
              },
            ].map((feature, index) => (
              <div
                key={index}
                onClick={feature.onClick}
                className="relative bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-shadow duration-300 cursor-pointer group"
                role={feature.link ? "link" : "button"}
              >
                {feature.link ? (
                  <a href={feature.link} className="block h-full">
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 rounded-full bg-orange-100 p-3 group-hover:bg-orange-200 transition-colors">
                      {feature.icon}
                    </div>
                    <h3 className="mt-12 text-lg font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">{feature.title}</h3>
                    <p className="mt-2 text-gray-600 group-hover:text-gray-800 transition-colors">{feature.description}</p>
                  </a>
                ) : (
                  <>
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 rounded-full bg-orange-100 p-3 hover:bg-orange-200 transition-colors">
                      {feature.icon}
                    </div>
                    <h3 className="mt-12 text-lg font-semibold text-gray-900 hover:text-orange-600 transition-colors">{feature.title}</h3>
                    <p className="mt-2 text-gray-600 hover:text-gray-800 transition-colors">{feature.description}</p>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Event Calendar Modal - Rendered here for Home-specific context */}
      {renderEventCalendar()}

      {/* Donation Summary Section */}
      <div className="bg-gradient-to-r from-orange-100 to-yellow-100 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-extrabold text-gray-900">Donation Impact</h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
              Your contributions help sustain and enhance our temple's sacred mission.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="bg-white rounded-2xl p-8 shadow-xl text-center">
              <IndianRupee className="h-10 w-10 text-green-600 mx-auto" />
              <p className="mt-4 text-sm font-medium text-gray-600">Total Donated</p>
              <p className="text-3xl font-bold text-green-700">
                ₹{loading ? "0.00" : donationData.totalDonated.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-xl text-center">
              <IndianRupee className="h-10 w-10 text-red-600 mx-auto" />
              <p className="mt-4 text-sm font-medium text-gray-600">Total Used</p>
              <p className="text-3xl font-bold text-red-700">
                ₹{loading ? "0.00" : donationData.totalUsed.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-xl text-center">
              <IndianRupee className="h-10 w-10 text-blue-600 mx-auto" />
              <p className="mt-4 text-sm font-medium text-gray-600">Remaining Balance</p>
              <p className="text-3xl font-bold text-blue-700">
                ₹{loading ? "0.00" : donationData.remainingBalance.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
              </p>
            </div>
          </div>
          <div className="mt-12">
            <h3 className="text-2xl font-semibold text-gray-900 text-center">How Your Donations Are Used</h3>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {loading ? (
                <div className="col-span-full text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading donation usage...</p>
                </div>
              ) : donationData.donationUsage.length === 0 ? (
                <p className="text-center text-gray-600 col-span-full py-8">No donation usage records available.</p>
              ) : (
                donationData.donationUsage.slice(0, 3).map((usage: DonationUsage, index: number) => (
                  <div
                    key={index}
                    className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-shadow duration-300"
                  >
                    <p className="text-lg font-semibold text-orange-600">{usage.purpose}</p>
                    <p className="mt-2 text-gray-600 font-medium">₹{usage.amountSpent.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</p>
                    <p className="mt-2 text-sm text-gray-500 leading-relaxed">{usage.description}</p>
                    <p className="mt-2 text-sm text-gray-400">Date: {new Date(usage.date).toLocaleDateString('en-IN')}</p>
                  </div>
                ))
              )}
            </div>
            <div className="mt-8 text-center">
              <a
                href="/donations"
                className="inline-flex items-center rounded-xl bg-gradient-to-r from-orange-600 to-yellow-500 px-6 py-3 text-base font-semibold text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                aria-label="Contribute to temple donations"
              >
                <IndianRupee className="h-5 w-5 mr-2" />
                Contribute Now
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Community Information Section */}
      <div className="bg-gray-50 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-extrabold text-gray-900">Our Spiritual Community</h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
              Join a vibrant community dedicated to spiritual growth and service.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <h3 className="text-lg font-semibold text-orange-600 mb-3">Weekly Satsangs</h3>
              <p className="text-gray-600 leading-relaxed">
                Participate in our weekly gatherings for bhajans, discourses, and meditation every Sunday at 6 PM.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <h3 className="text-lg font-semibold text-orange-600 mb-3">Volunteer Opportunities</h3>
              <p className="text-gray-600 leading-relaxed">
                Contribute your time and skills to temple activities, from event planning to community outreach.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <h3 className="text-lg font-semibold text-orange-600 mb-3">Youth Programs</h3>
              <p className="text-gray-600 leading-relaxed">
                Engage young minds with our cultural and spiritual classes held every Saturday for children and teens.
              </p>
            </div>
          </div>
          <div className="mt-8 text-center">
            <a
              href="/community"
              className="inline-flex items-center rounded-xl bg-gradient-to-r from-orange-600 to-yellow-500 px-6 py-3 text-base font-semibold text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              aria-label="Join our spiritual community"
            >
              <Users className="h-5 w-5 mr-2" />
              Join Our Community
            </a>
          </div>
        </div>
      </div>

      {/* Latest Updates Section */}
      <div className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-extrabold text-gray-900">Latest Temple Updates</h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
              Stay connected with the latest happenings at Shiva Temple.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Temple Renovation",
                description: "Support our ongoing temple renovation project with your generous donations. Help us preserve our sacred heritage.",
                date: "Ongoing",
                icon: "🏗️"
              },
              {
                title: "Diwali Celebration",
                description: "Celebrate the Festival of Lights with us. Special abhishekams, poojas, and prasadam distribution for all devotees.",
                date: "October 2025",
                icon: "🪔"
              },
              {
                title: "Karthika Deepotsavam",
                description: "Join us for the grand Karthika Deepotsavam celebration. Special poojas and rituals will be conducted throughout the month.",
                date: "November 2025",
                icon: "🪔"
              },
            ].map((update, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 border border-orange-100 group"
              >
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-2xl group-hover:scale-110 transition-transform">{update.icon}</span>
                  <h3 className="text-lg font-semibold text-orange-600 flex-1">{update.title}</h3>
                </div>
                <p className="text-gray-600 leading-relaxed mb-4">{update.description}</p>
                <p className="text-sm text-gray-400 font-medium">{update.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Connect With Us Section */}
      <div id="connect-section" className="bg-gradient-to-r from-orange-50 to-yellow-50 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 bg-clip-text bg-gradient-to-r from-orange-600 to-yellow-500">
              Connect With Us
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
              We're here to guide you on your spiritual journey. Reach out to us for inquiries, blessings, or to share your thoughts.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Contact Information */}
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <h3 className="text-2xl font-semibold text-gray-900 mb-8">Get In Touch</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-orange-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">Temple Address</p>
                    <p className="mt-1 text-gray-600">Shiva Temple, Bangalore, Karnataka, India - 560001</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="h-6 w-6 text-orange-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">Phone Support</p>
                    <p className="mt-1 text-gray-600">+91 98765 43210</p>
                    <p className="text-sm text-gray-500">Available 6 AM - 9 PM</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="h-6 w-6 text-orange-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">Email Us</p>
                    <p className="mt-1 text-gray-600">contact@shivatemple.org</p>
                    <p className="mt-1 text-gray-600">info@shivatemple.org</p>
                  </div>
                </div>

                {/* Social Media */}
                <div className="pt-6 border-t border-gray-200">
                  <p className="font-medium text-gray-900 mb-4">Follow Us</p>
                  <div className="flex gap-4">
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-orange-100 p-3 rounded-full text-orange-600 hover:bg-orange-200 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      aria-label="Follow us on Instagram"
                    >
                      <Instagram className="h-5 w-5" />
                    </a>
                    <a
                      href="https://youtube.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-orange-100 p-3 rounded-full text-orange-600 hover:bg-orange-200 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      aria-label="Subscribe to our YouTube channel"
                    >
                      <Youtube className="h-5 w-5" />
                    </a>
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-orange-100 p-3 rounded-full text-orange-600 hover:bg-orange-200 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      aria-label="Like us on Facebook"
                    >
                      <Facebook className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Feedback Form */}
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Share Your Feedback</h3>
              <form onSubmit={handleFeedbackSubmit} className="space-y-6" noValidate>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={feedback.name}
                    onChange={handleFeedbackChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 transition-colors duration-300 focus:outline-none"
                    placeholder="Enter your full name"
                    required
                    aria-required="true"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={feedback.email}
                    onChange={handleFeedbackChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 transition-colors duration-300 focus:outline-none"
                    placeholder="Enter your email address"
                    required
                    aria-required="true"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Message *
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    rows={5}
                    value={feedback.message}
                    onChange={handleFeedbackChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 transition-colors duration-300 focus:outline-none resize-vertical"
                    placeholder="Share your thoughts, feedback, or inquiries..."
                    required
                    aria-required="true"
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full rounded-xl bg-gradient-to-r from-orange-600 to-yellow-500 px-6 py-3 text-base font-semibold text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={feedbackStatus.includes("submitting")}
                  >
                    Send Message
                  </button>
                </div>
                {feedbackStatus && (
                  <div className={`text-center p-3 rounded-lg ${
                    feedbackStatus.includes("successfully")
                      ? "bg-green-100 text-green-700 border border-green-200"
                      : "bg-red-100 text-red-700 border border-red-200"
                  }`}>
                    {feedbackStatus}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </main>
  );
}
