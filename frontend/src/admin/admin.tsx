import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Wallet, TrendingUp, Users, Calendar, DollarSign, Home as HomeIcon, Bed, HandHeart } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Error Boundary
const ErrorBoundary: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const errorHandler = (error: any) => {
      console.error('ErrorBoundary caught:', error);
      setHasError(true);
    };

    window.addEventListener('error', errorHandler);
    return () => window.removeEventListener('error', errorHandler);
  }, []);

  if (hasError) {
    return (
      <div className="text-red-600 text-center p-8">
        Something went wrong. Please refresh the page or contact support.
      </div>
    );
  }

  return <>{children}</>;
};

// Interfaces
interface Pooja {
  _id?: string;
  id?: string;
  name: string;
  date: string;
  time: string;
  thingsNeeded?: string;
  image?: string;
}

interface Accommodation {
  _id?: string;
  id?: string;
  fullName: string;
  email: string;
  phone: string;
  checkInDate: string;
  checkOutDate: string;
  numberOfPeople: number;
  roomType: string;
  bookedAt: string;
  status: string;
  confirmedAt?: string;
  totalPrice: number;
}

interface Darshan {
  _id?: string;
  id?: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  date: string;
  time: string;
  type: string;
  numberOfPeople: number;
  totalCost: number;
  status: string;
  bookedAt: string;
}

interface Donation {
  _id?: string;
  id?: string;
  donationType: string;
  amount: number;
  paymentMethod: string;
  createdAt: string;
}

interface DonationUsage {
  _id?: string;
  id?: string;
  purpose: string;
  amountSpent: number;
  date: string;
  description: string;
}

interface Event {
  _id?: string;
  id?: string;
  title: string;
  date: string;
  description: string;
  createdAt: string;
}

interface Membership {
  _id?: string;
  id?: string;
  fullName: string;
  email: string;
  phone: string;
  membershipType: string;
  status: string;
  createdAt: string;
}

interface Admin {
  _id?: string;
  id?: string;
  email: string;
  createdAt: string;
}

interface AnalyticsData {
  totalRevenue: number;
  totalBookings: number;
  totalMembers: number;
  totalEvents: number;
  pendingApprovals: number;
}

const Admin: React.FC = () => {
  const navigate = useNavigate();
  
  // Navigation state
  const [activeSection, setActiveSection] = useState<string>('dashboard');
  
  // Data states
  const [poojas, setPoojas] = useState<Pooja[]>([]);
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
  const [darshanBookings, setDarshanBookings] = useState<Darshan[]>([]);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [donationUsage, setDonationUsage] = useState<DonationUsage[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [memberships, setMemberships] = useState<Membership[]>([]);
  const [admins, setAdmins] = useState<Admin[]>([]);
  
  // Analytics state
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalRevenue: 0,
    totalBookings: 0,
    totalMembers: 0,
    totalEvents: 0,
    pendingApprovals: 0,
  });
  
  // Form states
  const [newPooja, setNewPooja] = useState<Partial<Pooja>>({
    name: '',
    date: '',
    time: '',
    thingsNeeded: '',
    image: '',
  });
  
  const [newEvent, setNewEvent] = useState<Partial<Event>>({
    title: '',
    date: '',
    description: '',
  });
  
  const [newDonationUsage, setNewDonationUsage] = useState<Partial<DonationUsage>>({
    purpose: '',
    amountSpent: 0,
    date: '',
    description: '',
  });
  
  // const [newAdmin, setNewAdmin] = useState({ email: '', password: '' });
  
  // Loading and message states
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Check authentication on mount
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin-login');
    } else {
      fetchAllData();
    }
  }, [navigate]);

  // Fetch all data
  const fetchAllData = async () => {
    await Promise.all([
      fetchPoojas(),
      fetchAccommodations(),
      fetchDarshanBookings(),
      fetchDonations(),
      fetchDonationUsage(),
      fetchEvents(),
      fetchMemberships(),
      fetchAdmins(),
    ]);
    calculateAnalytics();
  };

  const calculateTotalRevenue = () => {
    const darshanRevenue = darshanBookings
      .filter(d => d.status === "confirmed")
      .reduce((sum, d) => sum + (d.totalCost || 0), 0);

    const membershipRevenue = memberships
      .filter(m => m.status === "approved")
      .reduce((sum, m) => sum + (m.amount || 0), 0);

    const accommodationRevenue = accommodations
      .filter(a => a.status === "confirmed")
      .reduce((sum, a) => sum + (a.totalPrice || 0), 0);

    const donationRevenue = donations.reduce((sum, d) => sum + (d.amount || 0), 0);

    const donationSpent = donationUsage.reduce((sum, u) => sum + (u.amountSpent || 0), 0);

    // Bank balance logic: Total incoming minus funds used (donation usage)
    return darshanRevenue + membershipRevenue + accommodationRevenue + donationRevenue - donationSpent;
  };

  const calculateAnalytics = () => {
    const revenue = calculateTotalRevenue();

    const bookings =
      accommodations.length +
      darshanBookings.length;

    const pending =
      accommodations.filter(a => a.status === 'pending').length +
      memberships.filter(m => m.status === 'pending').length;

    setAnalytics({
      totalRevenue: revenue,
      totalBookings: bookings,
      totalMembers: memberships.filter(m => m.status === 'approved').length,
      totalEvents: events.length,
      pendingApprovals: pending,
    });
  };


  // Update analytics whenever data changes
  useEffect(() => {
    calculateAnalytics();
  }, [donations, accommodations, darshanBookings, memberships, events]);
  // Fetch functions
  const fetchPoojas = async () => {
    try {
      const response = await fetch(`${API_URL}/api/poojas`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` },
      });
      if (response.ok) {
        const data = await response.json();
        setPoojas(data);
      }
    } catch (err) {
      console.error('Error fetching poojas:', err);
    }
  };

  const fetchAccommodations = async () => {
    try {
      const response = await fetch(`${API_URL}/api/accommodations`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` },
      });
      if (response.ok) {
        const data = await response.json();
        setAccommodations(data);
      }
    } catch (err) {
      console.error('Error fetching accommodations:', err);
    }
  };

  const fetchDarshanBookings = async () => {
    try {
      const response = await fetch(`${API_URL}/api/darshan`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` },
      });
      if (response.ok) {
        const data = await response.json();
        setDarshanBookings(data);
      }
    } catch (err) {
      console.error('Error fetching darshan bookings:', err);
    }
  };

  const fetchDonations = async () => {
    try {
      const response = await fetch(`${API_URL}/api/donations`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` },
      });
      if (response.ok) {
        const data = await response.json();
        setDonations(data);
      }
    } catch (err) {
      console.error('Error fetching donations:', err);
    }
  };

  const fetchDonationUsage = async () => {
    try {
      const response = await fetch(`${API_URL}/api/donation-usage`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` },
      });
      if (response.ok) {
        const data = await response.json();
        setDonationUsage(data);
      }
    } catch (err) {
      console.error('Error fetching donation usage:', err);
    }
  };

  const fetchEvents = async () => {
    try {
      const response = await fetch(`${API_URL}/api/events`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` },
      });
      if (response.ok) {
        const data = await response.json();
        setEvents(data);
      }
    } catch (err) {
      console.error('Error fetching events:', err);
    }
  };

  const fetchMemberships = async () => {
    try {
      const response = await fetch(`${API_URL}/api/membership`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` },
      });
      if (response.ok) {
        const data = await response.json();
        setMemberships(data);
      }
    } catch (err) {
      console.error('Error fetching memberships:', err);
    }
  };

  const fetchAdmins = async () => {
    try {
      const response = await fetch(`${API_URL}/api/admin`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` },
      });
      if (response.ok) {
        const data = await response.json();
        setAdmins(data);
      }
    } catch (err) {
      console.error('Error fetching admins:', err);
    }
  };

  // Handle functions for Pooja
  const handleAddPooja = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      const response = await fetch(`${API_URL}/api/poojas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
        body: JSON.stringify(newPooja),
      });

      if (response.ok) {
        setMessage('Pooja added successfully!');
        setNewPooja({ name: '', date: '', time: '', thingsNeeded: '', image: '' });
        fetchPoojas();
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to add pooja');
      }
    } catch (err) {
      setError('Error adding pooja');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePooja = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this pooja?')) return;

    try {
      const response = await fetch(`${API_URL}/api/poojas/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` },
      });

      if (response.ok) {
        setMessage('Pooja deleted successfully!');
        fetchPoojas();
      } else {
        setError('Failed to delete pooja');
      }
    } catch (err) {
      setError('Error deleting pooja');
      console.error(err);
    }
  };

  // Handle functions for Events
  const handleAddEvent = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      const response = await fetch(`${API_URL}/api/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
        body: JSON.stringify(newEvent),
      });

      if (response.ok) {
        setMessage('Event added successfully!');
        setNewEvent({ title: '', date: '', description: '' });
        fetchEvents();
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to add event');
      }
    } catch (err) {
      setError('Error adding event');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEvent = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;

    try {
      const response = await fetch(`${API_URL}/api/events/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` },
      });

      if (response.ok) {
        setMessage('Event deleted successfully!');
        fetchEvents();
      } else {
        setError('Failed to delete event');
      }
    } catch (err) {
      setError('Error deleting event');
      console.error(err);
    }
  };

  // Handle functions for Donation Usage
  const handleAddDonationUsage = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      const response = await fetch(`${API_URL}/api/donation-usage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
        body: JSON.stringify(newDonationUsage),
      });

      if (response.ok) {
        setMessage('Donation usage recorded successfully!');
        setNewDonationUsage({ purpose: '', amountSpent: 0, date: '', description: '' });
        fetchDonationUsage();
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to add donation usage');
      }
    } catch (err) {
      setError('Error adding donation usage');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Handle accommodation confirmation - FIXED ID VALIDATION
  const handleConfirmAccommodation = async (id: string | undefined) => {
    if (!id) {
      setError('Invalid accommodation ID');
      return;
    }

    if (!window.confirm('Confirm this accommodation booking?')) return;

    setLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await fetch(`${API_URL}/api/accommodations/confirm/${id}`, {
        method: 'PUT',
        headers: { 
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
          'Content-Type': 'application/json'
        },
      });

      if (response.ok) {
        const data = await response.json();
        setMessage('Accommodation confirmed successfully! Email sent to guest.');
      } else {
        // Try to parse error message from response
        let errorMessage = 'Failed to confirm accommodation';
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch (parseErr) {
          // If response is HTML (404 page), show custom message
          if (response.status === 404) {
            errorMessage = 'Backend route not found. Please check server configuration.';
          }
        }
        setError(errorMessage);
      }
    } catch (err) {
      console.error('Error confirming accommodation:', err);
      setError('Network error. Please check if backend server is running.');
    } finally {
      setLoading(false);
    }
  };


  // Handle membership approval - FIXED ID VALIDATION
  const handleApproveMembership = async (id: string | undefined) => {
    if (!id) {
      setError('Invalid membership ID');
      return;
    }

    if (!window.confirm('Approve this membership?')) return;

    try {
      const response = await fetch(`${API_URL}/api/membership/approve/${id}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` },
      });

      if (response.ok) {
        setMessage('Membership approved successfully!');
        fetchMemberships();
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to approve membership');
      }
    } catch (err) {
      setError('Error approving membership');
      console.error(err);
    }
  };

  // Handle admin creation
  // const handleAddAdmin = async (e: FormEvent) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   setMessage('');
  //   setError('');

  //   try {
  //     const response = await fetch(`${API_URL}/api/admin-signup`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
  //       },
  //       body: JSON.stringify(newAdmin),
  //     });

  //     if (response.ok) {
  //       setMessage('Admin added successfully!');
  //       setNewAdmin({ email: '', password: '' });
  //       fetchAdmins();
  //     } else {
  //       const errorData = await response.json();
  //       setError(errorData.message || 'Failed to add admin');
  //     }
  //   } catch (err) {
  //     setError('Error adding admin');
  //     console.error(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin-login');
  };
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 overflow-x-hidden">
        {/* Header */}
        <header className="bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-xl">
          <div className="container mx-auto px-6 py-6 flex justify-between items-center">
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Wallet className="h-8 w-8" />
              Admin Dashboard
            </h1>
            <button
              onClick={handleLogout}
              className="bg-white text-orange-600 px-6 py-2 rounded-lg font-semibold hover:bg-orange-50 transition-all duration-300 shadow-md"
            >
              Logout
            </button>
          </div>
        </header>

        <div className="container mx-auto px-6 py-8">
          {/* Messages */}
          {message && (
            <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
              {message}
            </div>
          )}
          {error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {/* Navigation Tabs */}
          <div className="bg-white rounded-xl shadow-lg p-2 mb-8 overflow-x-auto">
            <div className="flex gap-2 min-w-max">
              {[
                { id: 'dashboard', label: 'Dashboard', icon: <TrendingUp className="h-4 w-4" /> },
                { id: 'poojas', label: 'Poojas', icon: <HomeIcon className="h-4 w-4" /> },
                { id: 'accommodations', label: 'Accommodations', icon: <Bed className="h-4 w-4" /> },
                { id: 'darshan', label: 'Darshan Bookings', icon: <Calendar className="h-4 w-4" /> },
                { id: 'donations', label: 'Donations', icon: <DollarSign className="h-4 w-4" /> },
                { id: 'donation-usage', label: 'Donation Usage', icon: <HandHeart className="h-4 w-4" /> },
                { id: 'events', label: 'Events', icon: <Calendar className="h-4 w-4" /> },
                { id: 'memberships', label: 'Memberships', icon: <Users className="h-4 w-4" /> },
                { id: 'admins', label: 'Admins', icon: <Users className="h-4 w-4" /> },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveSection(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 whitespace-nowrap ${
                    activeSection === tab.id
                      ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Dashboard Section - NEW */}
          {activeSection === 'dashboard' && (
            <div className="space-y-8">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                  <TrendingUp className="h-8 w-8 text-orange-600" />
                  Analytics Dashboard
                </h2>
                
                {/* Analytics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                  <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105">
                    <div className="flex items-center justify-between mb-4">
                      <DollarSign className="h-12 w-12 opacity-80" />
                      <span className="text-3xl font-bold">₹{analytics.totalRevenue.toLocaleString()}</span>
                    </div>
                    <h3 className="text-xl font-semibold">Total Revenue</h3>
                    <p className="text-green-100 mt-2">From {donations.length} donations</p>
                  </div>

                  <div 
                    onClick={() => setActiveSection('accommodations')}
                    className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <Calendar className="h-12 w-12 opacity-80" />
                      <span className="text-3xl font-bold">{analytics.totalBookings}</span>
                    </div>
                    <h3 className="text-xl font-semibold">Total Bookings</h3>
                    <p className="text-blue-100 mt-2">Accommodations & Darshan</p>
                  </div>

                  <div 
                    onClick={() => setActiveSection('memberships')}
                    className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <Users className="h-12 w-12 opacity-80" />
                      <span className="text-3xl font-bold">{analytics.totalMembers}</span>
                    </div>
                    <h3 className="text-xl font-semibold">Active Members</h3>
                    <p className="text-purple-100 mt-2">Approved memberships</p>
                  </div>

                  <div 
                    onClick={() => setActiveSection('events')}
                    className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <Calendar className="h-12 w-12 opacity-80" />
                      <span className="text-3xl font-bold">{analytics.totalEvents}</span>
                    </div>
                    <h3 className="text-xl font-semibold">Total Events</h3>
                    <p className="text-orange-100 mt-2">Scheduled events</p>
                  </div>

                  <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105">
                    <div className="flex items-center justify-between mb-4">
                      <TrendingUp className="h-12 w-12 opacity-80" />
                      <span className="text-3xl font-bold">{analytics.pendingApprovals}</span>
                    </div>
                    <h3 className="text-xl font-semibold">Pending Approvals</h3>
                    <p className="text-red-100 mt-2">Awaiting action</p>
                  </div>
                </div> 

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-amber-50 rounded-xl p-6 border-l-4 border-amber-500">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Pending Accommodations</span>
                        <span className="font-bold text-orange-600">
                          {accommodations.filter(a => a.status === 'pending').length}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Pending Memberships</span>
                        <span className="font-bold text-orange-600">
                          {memberships.filter(m => m.status === 'pending').length}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Total Darshan Bookings</span>
                        <span className="font-bold text-orange-600">{darshanBookings.length}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-xl p-6 border-l-4 border-blue-500">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Donation Overview</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Total Donated</span>
                        <span className="font-bold text-green-600">
                          ₹{donations.reduce((sum, d) => sum + d.amount, 0).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Total Used</span>
                        <span className="font-bold text-red-600">
                          ₹{donationUsage.reduce((sum, u) => sum + u.amountSpent, 0).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Remaining Amount</span>
                        <span className="font-bold text-blue-600">
                          ₹{(donations.reduce((sum, d) => sum + d.amount, 0) - 
                             donationUsage.reduce((sum, u) => sum + u.amountSpent, 0)).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Poojas Section */}
          {activeSection === 'poojas' && (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Manage Poojas</h2>
              
              {/* Add Pooja Form */}
              <form onSubmit={handleAddPooja} className="mb-8 p-6 bg-orange-50 rounded-xl border-2 border-orange-200">
                <h3 className="text-xl font-semibold mb-4 text-orange-800">Add New Pooja</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="Pooja Name"
                    value={newPooja.name}
                    onChange={(e) => setNewPooja({ ...newPooja, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    required
                  />
                  <input
                    type="date"
                    value={newPooja.date}
                    onChange={(e) => setNewPooja({ ...newPooja, date: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    required
                  />
                  <input
                    type="time"
                    value={newPooja.time}
                    onChange={(e) => setNewPooja({ ...newPooja, time: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Things Needed"
                    value={newPooja.thingsNeeded}
                    onChange={(e) => setNewPooja({ ...newPooja, thingsNeeded: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-orange-600 to-amber-600 text-white py-3 rounded-lg font-semibold hover:from-orange-700 hover:to-amber-700 transition-all duration-300 disabled:opacity-50"
                >
                  {loading ? 'Adding...' : 'Add Pooja'}
                </button>
              </form>

              {/* Poojas List */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {poojas.map((pooja) => (
                  <div key={pooja._id || pooja.id} className="p-6 border border-orange-100 rounded-xl hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-orange-50">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{pooja.name}</h3>
                    <div className="space-y-2 text-gray-700 mb-4">
                      <p><strong>Date:</strong> {pooja.date}</p>
                      <p><strong>Time:</strong> {pooja.time}</p>
                      {pooja.thingsNeeded && <p><strong>Things Needed:</strong> {pooja.thingsNeeded}</p>}
                      {pooja.image && (
                        <img src={pooja.image} alt={pooja.name} className="w-full h-48 object-cover rounded-lg mt-3" />
                      )}
                    </div>
                    <button
                      onClick={() => handleDeletePooja(pooja._id || pooja.id || '')}
                      className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-all duration-300"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Accommodations Section */}
          {activeSection === 'accommodations' && (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Accommodation Bookings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {accommodations.map((booking) => (
                  <div key={booking._id || booking.id} className="p-6 border border-orange-100 rounded-xl hover:shadow-xl transition-all duration-300">
                    <div className={`mb-4 px-3 py-1 rounded-full text-sm font-semibold inline-block ${
                      booking.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {booking.status}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{booking.fullName}</h3>
                    <div className="space-y-2 text-gray-700 mb-4">
                      <p>
                        <strong>Email:</strong>
                        <span 
                          className="inline-block max-w-[180px] whitespace-nowrap overflow-hidden text-ellipsis align-bottom ml-1 cursor-pointer"
                          title={booking.email}
                        >
                          {booking.email}
                        </span>
                      </p>
                      <p><strong>Phone:</strong> {booking.phone}</p>
                      <p><strong>Room Type:</strong> {booking.roomType}</p>
                      <p><strong>Check-in:</strong> {booking.checkInDate}</p>
                      <p><strong>Check-out:</strong> {booking.checkOutDate}</p>
                      <p><strong>Guests:</strong> {booking.numberOfPeople}</p>
                      <p><strong>Total Price:</strong> ₹{booking.totalPrice}</p>
                      <p className="text-sm text-gray-500">Booked: {new Date(booking.bookedAt).toLocaleString()}</p>
                    </div>
                    {booking.status === 'pending' && (
                      <button
                        onClick={() => handleConfirmAccommodation(booking._id || booking.id)}
                        className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-all duration-300"
                      >
                        Confirm Booking
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Darshan Bookings Section */}
          {activeSection === 'darshan' && (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Darshan Bookings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {darshanBookings.map((booking) => (
                  <div key={booking._id || booking.id} className="p-6 border border-orange-100 rounded-xl hover:shadow-xl transition-all duration-300">
                    <div className="mb-4 px-3 py-1 rounded-full text-sm font-semibold inline-block bg-green-100 text-green-700">
                      {booking.status}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{booking.name}</h3>
                    <div className="space-y-2 text-gray-700">
                      <p>
                        <strong>Email:</strong>
                        <span 
                          className="inline-block max-w-[180px] whitespace-nowrap overflow-hidden text-ellipsis align-bottom ml-1 cursor-pointer"
                          title={booking.email}
                        >
                          {booking.email}
                        </span>
                      </p>
                      <p><strong>Phone:</strong> {booking.phone}</p>
                      <p className="break-words whitespace-normal">
                        <strong>Address:</strong> {booking.address}
                      </p>
                      <p><strong>Date:</strong> {booking.date}</p>
                      <p><strong>Time:</strong> {booking.time}</p>
                      <p><strong>Type:</strong> {booking.type}</p>
                      <p><strong>People:</strong> {booking.numberOfPeople}</p>
                      <p><strong>Total Cost:</strong> ₹{booking.totalCost}</p>
                      <p className="text-sm text-gray-500">Booked: {new Date(booking.bookedAt).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Donations Section */}
          {activeSection === 'donations' && (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Donations</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {donations.map((donation) => (
                  <div key={donation._id || donation.id} className="p-6 border border-green-100 rounded-xl hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-green-50">
                    <h3 className="text-2xl font-bold text-green-600 mb-3">₹{donation.amount.toLocaleString()}</h3>
                    <div className="space-y-2 text-gray-700">
                      <p><strong>Type:</strong> {donation.donationType}</p>
                      <p><strong>Payment Method:</strong> {donation.paymentMethod}</p>
                      <p className="text-sm text-gray-500">Date: {new Date(donation.createdAt).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Donation Usage Section */}
          {activeSection === 'donation-usage' && (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Donation Usage</h2>
              
              {/* Add Donation Usage Form */}
              <form onSubmit={handleAddDonationUsage} className="mb-8 p-6 bg-orange-50 rounded-xl border-2 border-orange-200">
                <h3 className="text-xl font-semibold mb-4 text-orange-800">Record Donation Usage</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="Purpose"
                    value={newDonationUsage.purpose}
                    onChange={(e) => setNewDonationUsage({ ...newDonationUsage, purpose: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    required
                  />
                  <input
                    type="number"
                    placeholder="Amount Spent"
                    value={newDonationUsage.amountSpent}
                    onChange={(e) => setNewDonationUsage({ ...newDonationUsage, amountSpent: parseFloat(e.target.value) })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    required
                  />
                  <input
                    type="date"
                    value={newDonationUsage.date}
                    onChange={(e) => setNewDonationUsage({ ...newDonationUsage, date: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    required
                  />
                  <textarea
                    placeholder="Description"
                    value={newDonationUsage.description}
                    onChange={(e) => setNewDonationUsage({ ...newDonationUsage, description: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    rows={1}
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-orange-600 to-amber-600 text-white py-3 rounded-lg font-semibold hover:from-orange-700 hover:to-amber-700 transition-all duration-300 disabled:opacity-50"
                >
                  {loading ? 'Recording...' : 'Record Usage'}
                </button>
              </form>

              {/* Donation Usage List */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {donationUsage.map((usage) => (
                  <div key={usage._id || usage.id} className="p-6 border border-orange-100 rounded-xl hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-red-50">
                    <h3 className="text-2xl font-bold text-red-600 mb-3">₹{usage.amountSpent.toLocaleString()}</h3>
                    <div className="space-y-2 text-gray-700">
                      <p><strong>Purpose:</strong> {usage.purpose}</p>
                      <p><strong>Date:</strong> {usage.date}</p>
                      {usage.description && <p><strong>Description:</strong> {usage.description}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Events Section */}
          {activeSection === 'events' && (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Manage Events</h2>
              
              {/* Add Event Form */}
              <form onSubmit={handleAddEvent} className="mb-8 p-6 bg-orange-50 rounded-xl border-2 border-orange-200">
                <h3 className="text-xl font-semibold mb-4 text-orange-800">Add New Event</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="Event Title"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    required
                  />
                  <input
                    type="date"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    required
                  />
                  <textarea
                    placeholder="Event Description"
                    value={newEvent.description}
                    onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 md:col-span-2"
                    rows={3}
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-orange-600 to-amber-600 text-white py-3 rounded-lg font-semibold hover:from-orange-700 hover:to-amber-700 transition-all duration-300 disabled:opacity-50"
                >
                  {loading ? 'Adding...' : 'Add Event'}
                </button>
              </form>

              {/* Events List */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event) => (
                  <div key={event._id || event.id} className="p-6 border border-orange-100 rounded-xl hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-blue-50">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{event.title}</h3>
                    <div className="space-y-2 text-gray-700 mb-4">
                      <p><strong>Date:</strong> {event.date}</p>
                      <p><strong>Description:</strong> {event.description}</p>
                      <p className="text-sm text-gray-500">Created: {new Date(event.createdAt).toLocaleString()}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteEvent(event._id || event.id || '')}
                      className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-all duration-300"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Memberships Section */}
          {activeSection === 'memberships' && (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Membership Applications</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {memberships.map((membership) => (
                  <div key={membership._id || membership.id} className="p-6 border border-orange-100 rounded-xl hover:shadow-xl transition-all duration-300">
                    <div className={`mb-4 px-3 py-1 rounded-full text-sm font-semibold inline-block ${
                      membership.status === 'approved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {membership.status}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{membership.fullName}</h3>
                    <div className="space-y-2 text-gray-700 mb-4">
                      <p>
                        <strong>Email:</strong>
                        <span 
                          className="inline-block max-w-[180px] whitespace-nowrap overflow-hidden text-ellipsis align-bottom ml-1 cursor-pointer"
                          title={membership.email}
                        >
                          {membership.email}
                        </span>
                      </p>
                      <p><strong>Phone:</strong> {membership.phone}</p>
                      <p><strong>Type:</strong> {membership.membershipType}</p>
                      <p className="text-sm text-gray-500">Applied: {new Date(membership.createdAt).toLocaleString()}</p>
                    </div>
                    {membership.status === 'pending' && (
                      <button
                        onClick={() => handleApproveMembership(membership._id || membership.id)}
                        className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-all duration-300"
                      >
                        Approve
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Admins Section */}
          {activeSection === 'admins' && (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Admins</h2>
              
              {/* Admins List */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {admins.map((admin) => (
                  <div key={admin._id || admin.id} className="p-6 border border-orange-100 rounded-xl hover:shadow-xl transition-all duration-300">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{admin.email}</h3>
                    <p className="text-sm text-gray-500">Created: {new Date(admin.createdAt).toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default Admin;
