// // API Configuration
// const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

// export const apiEndpoints = {
//   // Admin endpoints
//   adminLogin: `${API_BASE_URL}/api/admin-login`,
//   adminSignup: `${API_BASE_URL}/api/admin-signup`,
//   verifyAdmin: `${API_BASE_URL}/api/verify-admin`,
//   admins: `${API_BASE_URL}/api/admins`,
  
//   // User endpoints
//   userLogin: `${API_BASE_URL}/api/login`,
//   userSignup: `${API_BASE_URL}/api/signup`,
  
//   // Pooja endpoints
//   poojas: `${API_BASE_URL}/api/poojas`,
  
//   // Accommodation endpoints
//   accommodations: `${API_BASE_URL}/api/accommodations`,
//   accommodationAvailability: `${API_BASE_URL}/api/accommodations/availability`,
//   accommodationCheck: `${API_BASE_URL}/api/accommodations/check`,
//   confirmAccommodation: (id: string) => `${API_BASE_URL}/api/accommodations/confirm/${id}`,
  
//   // Darshan endpoints
//   bookDarshan: `${API_BASE_URL}/api/book-darshan`,
//   darshan: `${API_BASE_URL}/api/darshan`,
//   confirmDarshan: (id: string) => `${API_BASE_URL}/api/confirm-darshan/${id}`,
  
//   // Donation endpoints
//   donations: `${API_BASE_URL}/api/donations`,
//   donationUsage: `${API_BASE_URL}/api/donation-usage`,
  
//   // Event endpoints
//   events: `${API_BASE_URL}/api/events`,
  
//   // Feedback endpoints
//   feedback: `${API_BASE_URL}/api/feedback`,
  
//   // Membership endpoints
//   membership: `${API_BASE_URL}/api/membership`,
// };

// // API Helper function
// export const apiRequest = async (url: string, options: RequestInit = {}) => {
//   const response = await fetch(url, {
//     headers: {
//       'Content-Type': 'application/json',
//       ...options.headers,
//     },
//     ...options,
//   });

//   if (!response.ok) {
//     const errorData = await response.json();
//     throw new Error(errorData.message || `HTTP error ${response.status}`);
//   }

//   return response.json();
// };

// // Auth helper for admin routes
// export const getAuthHeaders = () => ({
//   'Content-Type': 'application/json',
//   'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
// });


// API Configuration - Use Vite environment variables
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const apiEndpoints = {
  // Admin endpoints (preserved as required)
  adminLogin: `${API_BASE_URL}/api/admin-login`,
  adminSignup: `${API_BASE_URL}/api/admin-signup`,
  verifyAdmin: `${API_BASE_URL}/api/verify-admin`,
  admins: `${API_BASE_URL}/api/admins`,
  
  // User endpoints - REMOVED as per prompt (no user auth needed)
  // userLogin: `${API_BASE_URL}/api/login`,
  // userSignup: `${API_BASE_URL}/api/signup`,
  
  // Pooja endpoints
  poojas: `${API_BASE_URL}/api/poojas`,
  
  // Accommodation endpoints - Updated to match backend routes
  accommodations: `${API_BASE_URL}/api/accommodations`,
  bookAccommodation: `${API_BASE_URL}/api/accommodations/book`,
  accommodationAvailability: `${API_BASE_URL}/api/accommodations/availability`,
  accommodationCheckRange: `${API_BASE_URL}/api/accommodations/check-range`,
  confirmAccommodation: (id: string) => `${API_BASE_URL}/api/accommodations/confirm/${id}`,
  
  // Darshan endpoints - Updated to match backend routes
  bookDarshan: `${API_BASE_URL}/api/darshan/book`,
  darshan: `${API_BASE_URL}/api/darshan`,
  
  // Donation endpoints
  donations: `${API_BASE_URL}/api/donations`,
  donationUsage: `${API_BASE_URL}/api/donation-usage`,
  
  // Event endpoints
  events: `${API_BASE_URL}/api/events`,
  
  // Feedback endpoints
  feedback: `${API_BASE_URL}/api/feedback`,
  
  // Membership endpoints - Updated to match backend routes
  membership: `${API_BASE_URL}/api/membership`,
  approveMembership: (id: string) => `${API_BASE_URL}/api/membership/approve/${id}`,
};

// API Helper function
export const apiRequest = async (url: string, options: RequestInit = {}) => {
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP error ${response.status}`);
  }

  return response.json();
};

// Auth helper for admin routes only (user auth removed)
export const getAuthHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('adminToken') || ''}`
});

// Public API helper (no auth needed for user flows)
export const getPublicHeaders = () => ({
  'Content-Type': 'application/json'
});
