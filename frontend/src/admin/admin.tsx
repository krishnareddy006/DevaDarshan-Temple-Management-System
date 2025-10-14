import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Wallet } from "lucide-react";

// Environment variable for API URL
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// ==================== ERROR BOUNDARY ====================
const ErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const errorHandler = (error: any) => {
      console.error("ErrorBoundary caught:", error);
      setHasError(true);
    };
    window.addEventListener("error", errorHandler);
    return () => window.removeEventListener("error", errorHandler);
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

// ==================== INTERFACES ====================
interface Pooja {
  _id: string;
  name: string;
  date: string;
  time: string;
  thingsNeeded?: string;
  image?: string;
}

interface Accommodation {
  _id: string;
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

interface Donation {
  _id: string;
  donationType: string;
  amount: number;
  paymentMethod: string;
  createdAt: string;
  cardNumber?: string;
  expiryDate?: string;
  upiId?: string;
}

interface Event {
  _id: string;
  title: string;
  date: string;
  description: string;
  createdAt: string;
}

interface DonationUsage {
  _id: string;
  purpose: string;
  amountSpent: number;
  date: string;
  description: string;
  createdAt: string;
}

interface AdminUser {
  _id: string;
  fullName: string;
  email: string;
  lastLogin?: string;
}

interface Darshan {
  _id: string;
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
  confirmedAt?: string;
}

interface Membership {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  membershipType: string;
  amount: number;
  status: string;
  createdAt: string;
  approvedAt?: string;
}

// ==================== MAIN ADMIN COMPONENT ====================
const Admin = () => {
  // Navigation and section state
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("poojas");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Data state
  const [poojas, setPoojas] = useState<Pooja[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [donationUsage, setDonationUsage] = useState<DonationUsage[]>([]);
  const [darshanBookings, setDarshanBookings] = useState<Darshan[]>([]);
  const [memberships, setMemberships] = useState<Membership[]>([]);
  const [admins, setAdmins] = useState<AdminUser[]>([]);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    time: "",
    thingsNeeded: "",
    image: "",
  });
  const [eventFormData, setEventFormData] = useState({
    title: "",
    date: "",
    description: "",
  });
  const [usageFormData, setUsageFormData] = useState({
    purpose: "",
    amountSpent: "",
    date: "",
    description: "",
  });

  // UI state
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [totalRevenue, setTotalRevenue] = useState(0);

  // Constants
  const DARSHAN_COSTS = { special: 2000, vip: 1000, regular: 500 };
  const DAILY_SLOT_CAPACITY = 100;

  // ==================== UTILITY FUNCTIONS ====================
  
  // Filter expired poojas based on date and time
  const filterExpiredPoojas = (poojas: Pooja[]) => {
    const now = new Date();
    return poojas.filter((pooja) => {
      const poojaDateTime = new Date(`${pooja.date}T${pooja.time || '23:59'}:00`);
      return poojaDateTime >= now;
    });
  };

  // Filter expired events based on date
  const filterExpiredEvents = (events: Event[]) => {
    const now = new Date();
    return events.filter((event) => {
      const eventDateTime = new Date(`${event.date}T23:59:59`);
      return eventDateTime >= now;
    });
  };

  // Calculate total revenue from all sources
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

    return darshanRevenue + membershipRevenue + accommodationRevenue + donationRevenue;
  };

  // Calculate darshan cost based on type and number of people
  const calculateDarshanCost = (type: string, numberOfPeople: number) => {
    const normalizedType = type?.toLowerCase() || "";
    switch (normalizedType) {
      case "special":
        return DARSHAN_COSTS.special;
      case "vip":
        return DARSHAN_COSTS.vip * numberOfPeople;
      case "regular":
        return DARSHAN_COSTS.regular * (numberOfPeople || 1);
      default:
        return 0;
    }
  };

  // Get available slots for a specific date
  const getAvailableSlots = (date: string) => {
    if (!date) return DAILY_SLOT_CAPACITY;
    const bookingsOnDate = darshanBookings.filter(
      (booking) => booking.date === date && booking.status === "confirmed"
    );
    const totalPeople = bookingsOnDate.reduce(
      (sum, booking) => sum + (booking.numberOfPeople || 0),
      0
    );
    return Math.max(0, DAILY_SLOT_CAPACITY - totalPeople);
  };

  // Get booked date ranges for accommodation
  const getBookedDates = () => {
    const bookedRanges: { start: string; end: string; roomType: string }[] = [];
    accommodations.forEach((booking) => {
      bookedRanges.push({
        start: booking.checkInDate,
        end: booking.checkOutDate,
        roomType: booking.roomType,
      });
    });
    return bookedRanges;
  };

  // Validate URL format
  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  // Format date to readable string
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "Invalid Date";
    }
  };

  // Get donation type display name
  const getDonationTypeName = (type: string) => {
    switch (type) {
      case "annadanam":
        return "Annadanam";
      case "renovation":
        return "Temple Renovation";
      case "pooja":
        return "Special Pooja";
      default:
        return type;
    }
  };

  // ==================== API FUNCTIONS ====================
  
  // Verify admin authentication
  const verifyAdmin = async () => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin-login");
      return;
    }
    try {
      const response = await fetch(`${API_URL}/api/verify-admin`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Admin verification failed");
    } catch (err) {
      console.error("❌ Admin verification error:", err);
      localStorage.removeItem("adminToken");
      setError("Session expired. Please log in again.");
      setTimeout(() => navigate("/admin-login"), 2000);
    }
  };

  // Fetch all poojas
  const fetchPoojas = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/poojas`);
      if (!response.ok) throw new Error("Failed to fetch poojas");
      const data: Pooja[] = await response.json();
      const activePoojas = filterExpiredPoojas(data);
      setPoojas(activePoojas);
    } catch (err) {
      console.error("Poojas fetch error:", err);
      setError("Failed to load poojas.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch all events
  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/events`);
      if (!response.ok) throw new Error("Failed to fetch events");
      const data: Event[] = await response.json();
      const activeEvents = filterExpiredEvents(data);
      setEvents(activeEvents);
    } catch (err) {
      console.error("❌ Events fetch error:", err);
      setError("Failed to load events.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch all accommodations
  const fetchAccommodations = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/accommodations`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
      });
      if (!response.ok) throw new Error("Failed to fetch accommodations");
      const data: Accommodation[] = await response.json();
      setAccommodations(data);
    } catch (err) {
      console.error("❌ Accommodations fetch error:", err);
      setError("Failed to load accommodations.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch all donations
  const fetchDonations = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/donations`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
      });
      if (!response.ok) throw new Error("Failed to fetch donations");
      const data: Donation[] = await response.json();
      setDonations(data);
    } catch (err) {
      console.error("❌ Donations fetch error:", err);
      setError("Failed to load donations.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch donation usage records
  const fetchDonationUsage = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/donation-usage`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
      });
      if (!response.ok) throw new Error("Failed to fetch donation usage");
      const data: DonationUsage[] = await response.json();
      setDonationUsage(data);
    } catch (err) {
      console.error("❌ Donation usage fetch error:", err);
      setError("Failed to load donation usage records.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch all darshan bookings
  const fetchDarshanBookings = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) throw new Error("No admin token found");
      const response = await fetch(`${API_URL}/api/darshan`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error ${response.status}`);
      }
      const data: Darshan[] = await response.json();
      setDarshanBookings(data || []);
    } catch (err: any) {
      console.error("❌ Darshan bookings fetch error:", err);
      setError(`Failed to load darshan bookings: ${err.message}`);
      setDarshanBookings([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch all memberships
  const fetchMemberships = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/membership`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
      });
      if (!response.ok) throw new Error("Failed to fetch memberships");
      const data: Membership[] = await response.json();
      setMemberships(data);
    } catch (err) {
      console.error("❌ Memberships fetch error:", err);
      setError("Failed to load memberships.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch all admin users
  const fetchAdmins = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/admins`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
      });
      if (!response.ok) throw new Error("Failed to fetch admins");
      const data: AdminUser[] = await response.json();
      setAdmins(data);
    } catch (err) {
      console.error("❌ Admins fetch error:", err);
      setError("Failed to load admins.");
    } finally {
      setLoading(false);
    }
  };

  // Delete pooja by ID
  const deletePooja = async (id: string) => {
    if (!confirm("Are you sure you want to delete this pooja?")) return;
    try {
      const response = await fetch(`${API_URL}/api/poojas/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });
      const result = await response.json();
      if (response.ok) {
        setMessage(result.message);
        fetchPoojas();
      } else {
        setError(result.message || "Failed to delete pooja.");
      }
    } catch (err) {
      console.error("❌ Delete pooja error:", err);
      setError("Failed to delete pooja.");
    }
  };

  // Delete event by ID
  const deleteEvent = async (id: string) => {
    if (!confirm("Are you sure you want to delete this event?")) return;
    try {
      const response = await fetch(`${API_URL}/api/events/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });
      const result = await response.json();
      if (response.ok) {
        setMessage(result.message);
        fetchEvents();
      } else {
        setError(result.message || "Failed to delete event.");
      }
    } catch (err) {
      console.error("❌ Delete event error:", err);
      setError("Failed to delete event.");
    }
  };

  // ==================== FORM HANDLERS ====================
  
  // Handle pooja form input changes
  const handlePoojaChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle event form input changes
  const handleEventChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEventFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle donation usage form input changes
  const handleUsageChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUsageFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit new pooja
  const handlePoojaSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");
    if (!formData.name || !formData.date || !formData.time) {
      setError("Name, date, and time are required.");
      return;
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(formData.date)) {
      setError("Date must be in YYYY-MM-DD format.");
      return;
    }
    if (formData.image && !isValidUrl(formData.image)) {
      setError("Invalid image URL.");
      return;
    }
    try {
      const response = await fetch(`${API_URL}/api/poojas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (response.ok) {
        setMessage(result.message);
        setFormData({ name: "", date: "", time: "", thingsNeeded: "", image: "" });
        fetchPoojas();
      } else {
        setError(result.message || "Failed to add pooja.");
      }
    } catch (err) {
      console.error("❌ Pooja submit error:", err);
      setError("Network error. Please try again.");
    }
  };

  // Submit new event
  const handleEventSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");
    if (!eventFormData.title || !eventFormData.date || !eventFormData.description) {
      setError("Title, date, and description are required.");
      return;
    }
    try {
      const response = await fetch(`${API_URL}/api/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
        body: JSON.stringify(eventFormData),
      });
      const result = await response.json();
      if (response.ok) {
        setMessage(result.message);
        setEventFormData({ title: "", date: "", description: "" });
        fetchEvents();
      } else {
        setError(result.message || "Failed to add event.");
      }
    } catch (err) {
      console.error("❌ Event submit error:", err);
      setError("Network error. Please try again.");
    }
  };

  // Submit donation usage record
  const handleUsageSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");
    if (!usageFormData.purpose || !usageFormData.amountSpent || !usageFormData.date) {
      setError("Purpose, amount spent, and date are required.");
      return;
    }
    const amountSpent = parseFloat(usageFormData.amountSpent);
    if (isNaN(amountSpent) || amountSpent <= 0) {
      setError("Amount spent must be a positive number.");
      return;
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(usageFormData.date)) {
      setError("Date must be in YYYY-MM-DD format.");
      return;
    }
    const selectedDate = new Date(usageFormData.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      setError("Date must be today or a future date.");
      return;
    }
    try {
      const response = await fetch(`${API_URL}/api/donation-usage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
        body: JSON.stringify({ ...usageFormData, amountSpent }),
      });
      const result = await response.json();
      if (response.ok) {
        setMessage(result.message);
        setUsageFormData({ purpose: "", amountSpent: "", date: "", description: "" });
        fetchDonationUsage();
      } else {
        setError(result.message || "Failed to record donation usage.");
      }
    } catch (err) {
      console.error("❌ Donation usage submit error:", err);
      setError("Network error. Please try again.");
    }
  };

  // ==================== EFFECTS ====================
  
  // Fetch all data on component mount for revenue calculation
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        if (!token) return;
        const headers = { Authorization: `Bearer ${token}` };
        const [darshanRes, membershipRes, accommodationRes, donationRes] = await Promise.all([
          fetch(`${API_URL}/api/darshan`, { headers }),
          fetch(`${API_URL}/api/membership`, { headers }),
          fetch(`${API_URL}/api/accommodations`, { headers }),
          fetch(`${API_URL}/api/donations`, { headers }),
        ]);
        if (darshanRes.ok) {
          const data = await darshanRes.json();
          setDarshanBookings(data || []);
        }
        if (membershipRes.ok) {
          const data = await membershipRes.json();
          setMemberships(data || []);
        }
        if (accommodationRes.ok) {
          const data = await accommodationRes.json();
          setAccommodations(data || []);
        }
        if (donationRes.ok) {
          const data = await donationRes.json();
          setDonations(data || []);
        }
      } catch (err) {
        console.error("Error fetching revenue data:", err);
      }
    };
    verifyAdmin();
    fetchAllData();
  }, []);

  // Fetch section-specific data when active section changes
  useEffect(() => {
    setMessage("");
    setError("");
    if (activeSection === "poojas") fetchPoojas();
    else if (activeSection === "events") fetchEvents();
    else if (activeSection === "accommodation") fetchAccommodations();
    else if (activeSection === "donations") {
      fetchDonations();
      fetchDonationUsage();
    } else if (activeSection === "admins") fetchAdmins();
    else if (activeSection === "darshan") fetchDarshanBookings();
    else if (activeSection === "memberships") fetchMemberships();
  }, [activeSection]);

  // Calculate total revenue whenever data changes
  useEffect(() => {
    const revenue = calculateTotalRevenue();
    setTotalRevenue(revenue);
  }, [darshanBookings, memberships, accommodations, donations]);

  // Calculate total donation amounts
  const totalDonated = donations.reduce((sum, donation) => sum + donation.amount, 0);
  const totalUsed = donationUsage.reduce((sum, usage) => sum + usage.amountSpent, 0);
  const remainingBalance = totalDonated - totalUsed;

  // ==================== RENDER SECTIONS ====================
  
  const renderSection = () => {
    switch (activeSection) {
      case "poojas":
        return (
          <div className="p-4 md:p-8 animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-yellow-500 leading-snug pb-2 mb-8">
              Manage Poojas
            </h1>
            <form onSubmit={handlePoojaSubmit} className="bg-white p-6 md:p-8 rounded-2xl shadow-xl mb-8 hover:shadow-2xl transition-shadow duration-300">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6">Add New Pooja</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <input
                  type="text"
                  name="name"
                  placeholder="Pooja Name"
                  value={formData.name}
                  onChange={handlePoojaChange}
                  className="border-2 border-orange-200 p-3 rounded-lg focus:ring-4 focus:ring-orange-300 focus:border-orange-500 transition-all duration-200"
                  required
                />
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handlePoojaChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="border-2 border-orange-200 p-3 rounded-lg focus:ring-4 focus:ring-orange-300 focus:border-orange-500 transition-all duration-200"
                  required
                />
                <input
                  type="time"
                  name="time"
                  placeholder="Time (e.g., 6:00 AM)"
                  value={formData.time}
                  onChange={handlePoojaChange}
                  className="border-2 border-orange-200 p-3 rounded-lg focus:ring-4 focus:ring-orange-300 focus:border-orange-500 transition-all duration-200"
                  required
                />
              </div>
              <textarea
                name="thingsNeeded"
                placeholder="Things Needed (e.g., Coconut, Durva, Modak)"
                value={formData.thingsNeeded}
                onChange={handlePoojaChange}
                className="border-2 border-orange-200 p-3 rounded-lg mt-6 w-full focus:ring-4 focus:ring-orange-300 focus:border-orange-500 transition-all duration-200"
              />
              
              <button
                type="submit"
                className="mt-6 w-full md:w-auto bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-6 py-3 rounded-lg hover:shadow-lg focus:ring-4 focus:ring-orange-300 transition-all duration-200"
              >
                Add Pooja
              </button>
              {message && <p className="text-green-600 mt-4 animate-pulse">{message}</p>}
              {error && <p className="text-red-600 mt-4 animate-pulse">{error}</p>}
            </form>
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6">Active Poojas</h2>
              {loading && (
                <div className="flex justify-center">
                  <div className="animate-spin h-8 w-8 border-4 border-orange-500 border-t-transparent rounded-full"></div>
                </div>
              )}
              {!loading && poojas.length === 0 && <p className="text-gray-500">No active poojas</p>}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {poojas.map((pooja) => (
                  <div key={pooja._id} className="p-4 border border-orange-100 rounded-xl hover:shadow-lg transition-shadow duration-300">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold text-orange-700">{pooja.name}</h3>
                      <button
                        onClick={() => deletePooja(pooja._id)}
                        className="text-red-600 hover:text-red-800 font-bold text-sm px-2 py-1 rounded hover:bg-red-50 transition-all duration-200"
                      >
                        Delete
                      </button>
                    </div>
                    <p className="text-gray-600">{pooja.date}, {pooja.time}</p>
                    {pooja.thingsNeeded && <p className="text-sm text-gray-500 mt-2">Things Needed: {pooja.thingsNeeded}</p>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "events":
        return (
          <div className="p-4 md:p-8 animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-yellow-500 leading-snug pb-2 mb-8">
              Manage Events
            </h1>
            <form onSubmit={handleEventSubmit} className="bg-white p-6 md:p-8 rounded-2xl shadow-xl mb-8 hover:shadow-2xl transition-shadow duration-300">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6">Add New Event</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  name="title"
                  placeholder="Event Title"
                  value={eventFormData.title}
                  onChange={handleEventChange}
                  className="border-2 border-orange-200 p-3 rounded-lg focus:ring-4 focus:ring-orange-300 focus:border-orange-500 transition-all duration-200"
                  required
                />
                <input
                  type="date"
                  name="date"
                  value={eventFormData.date}
                  onChange={handleEventChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="border-2 border-orange-200 p-3 rounded-lg focus:ring-4 focus:ring-orange-300 focus:border-orange-500 transition-all duration-200"
                  required
                />
              </div>
              <textarea
                name="description"
                placeholder="Event Description"
                value={eventFormData.description}
                onChange={handleEventChange}
                className="border-2 border-orange-200 p-3 rounded-lg mt-6 w-full focus:ring-4 focus:ring-orange-300 focus:border-orange-500 transition-all duration-200"
                rows={4}
                required
              />
              <button
                type="submit"
                className="mt-6 w-full md:w-auto bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-6 py-3 rounded-lg hover:shadow-lg focus:ring-4 focus:ring-orange-300 transition-all duration-200"
              >
                Add Event
              </button>
              {message && <p className="text-green-600 mt-4 animate-pulse">{message}</p>}
              {error && <p className="text-red-600 mt-4 animate-pulse">{error}</p>}
            </form>
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6">Active Events</h2>
              {loading && (
                <div className="flex justify-center">
                  <div className="animate-spin h-8 w-8 border-4 border-orange-500 border-t-transparent rounded-full"></div>
                </div>
              )}
              {!loading && events.length === 0 && <p className="text-gray-500">No active events</p>}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {events.map((event) => (
                  <div key={event._id} className="p-4 border border-orange-100 rounded-xl hover:shadow-lg transition-shadow duration-300">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold text-orange-700">{event.title}</h3>
                      <button
                        onClick={() => deleteEvent(event._id)}
                        className="text-red-600 hover:text-red-800 font-bold text-sm"
                      >
                        Delete
                      </button>
                    </div>
                    <p className="text-gray-600 mb-2">{event.date}</p>
                    <p className="text-sm text-gray-500">{event.description}</p>
                    <p className="text-xs text-gray-400 mt-2">Created: {formatDate(event.createdAt)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "donations":
        return (
          <div className="p-4 md:p-8 animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-yellow-500 leading-snug pb-2 mb-8">
              Manage Donations
            </h1>
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl mb-8">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6">Donation Summary</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-gradient-to-br from-green-100 to-green-200 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                  <p className="text-sm text-gray-600">Total Donated</p>
                  <p className="text-2xl font-bold text-green-800">₹{totalDonated.toFixed(2)}</p>
                </div>
                <div className="p-6 bg-gradient-to-br from-red-100 to-red-200 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                  <p className="text-sm text-gray-600">Total Used</p>
                  <p className="text-2xl font-bold text-red-800">₹{totalUsed.toFixed(2)}</p>
                </div>
                <div className="p-6 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                  <p className="text-sm text-gray-600">Remaining Balance</p>
                  <p className="text-2xl font-bold text-blue-800">₹{remainingBalance.toFixed(2)}</p>
                </div>
              </div>
            </div>
            <form onSubmit={handleUsageSubmit} className="bg-white p-6 md:p-8 rounded-2xl shadow-xl mb-8 hover:shadow-2xl transition-shadow duration-300">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6">Record Donation Usage</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <input
                  type="text"
                  name="purpose"
                  placeholder="Purpose (e.g., Temple Renovation)"
                  value={usageFormData.purpose}
                  onChange={handleUsageChange}
                  className="border-2 border-orange-200 p-3 rounded-lg focus:ring-4 focus:ring-orange-300 focus:border-orange-500 transition-all duration-200"
                  required
                />
                <input
                  type="number"
                  name="amountSpent"
                  placeholder="Amount Spent (₹)"
                  value={usageFormData.amountSpent}
                  onChange={handleUsageChange}
                  className="border-2 border-orange-200 p-3 rounded-lg focus:ring-4 focus:ring-orange-300 focus:border-orange-500 transition-all duration-200"
                  min="0.01"
                  step="0.01"
                  required
                />
                <input
                  type="date"
                  name="date"
                  value={usageFormData.date}
                  onChange={handleUsageChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="border-2 border-orange-200 p-3 rounded-lg focus:ring-4 focus:ring-orange-300 focus:border-orange-500 transition-all duration-200"
                  required
                />
              </div>
              <textarea
                name="description"
                placeholder="Description (e.g., Materials purchased for roof repair)"
                value={usageFormData.description}
                onChange={handleUsageChange}
                className="border-2 border-orange-200 p-3 rounded-lg mt-6 w-full focus:ring-4 focus:ring-orange-300 focus:border-orange-500 transition-all duration-200"
              />
              <button
                type="submit"
                className="mt-6 w-full md:w-auto bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-6 py-3 rounded-lg hover:shadow-lg focus:ring-4 focus:ring-orange-300 transition-all duration-200"
              >
                Record Usage
              </button>
              {message && <p className="text-green-600 mt-4 animate-pulse">{message}</p>}
              {error && <p className="text-red-600 mt-4 animate-pulse">{error}</p>}
            </form>
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl mb-8">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6">Donation Usage Records</h2>
              {loading && (
                <div className="flex justify-center">
                  <div className="animate-spin h-8 w-8 border-4 border-orange-500 border-t-transparent rounded-full"></div>
                </div>
              )}
              {!loading && donationUsage.length === 0 && <p className="text-gray-500">No donation usage records available.</p>}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {donationUsage.map((usage) => (
                  <div key={usage._id} className="p-4 border border-orange-100 rounded-xl hover:shadow-lg transition-shadow duration-300">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <div>
                        <p className="font-semibold text-orange-700">Purpose: {usage.purpose}</p>
                        <p>Amount Spent: ₹{usage.amountSpent.toFixed(2)}</p>
                      </div>
                      <div>
                        <p>Date: {usage.date}</p>
                        <p>Recorded At: {formatDate(usage.createdAt)}</p>
                        {usage.description && <p className="text-sm text-gray-500">Description: {usage.description}</p>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6">All Donations</h2>
              {loading && (
                <div className="flex justify-center">
                  <div className="animate-spin h-8 w-8 border-4 border-orange-500 border-t-transparent rounded-full"></div>
                </div>
              )}
              {!loading && donations.length === 0 && <p className="text-gray-500">No donations available.</p>}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {donations.map((donation) => (
                  <div key={donation._id} className="p-4 border border-orange-100 rounded-xl hover:shadow-lg transition-shadow duration-300">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <div>
                        <p className="font-semibold text-orange-700">Type: {getDonationTypeName(donation.donationType)}</p>
                        <p>Amount: ₹{donation.amount.toFixed(2)}</p>
                        <p>Method: {donation.paymentMethod === "card" ? "Credit/Debit Card" : donation.paymentMethod === "upi" ? "UPI" : "Net Banking"}</p>
                      </div>
                      <div>
                        {donation.cardNumber && <p>Card Ending: {donation.cardNumber}</p>}
                        {donation.upiId && <p>UPI ID: {donation.upiId}</p>}
                        <p>Donated At: {formatDate(donation.createdAt)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "accommodation":
        return (
          <div className="p-4 md:p-8 animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-yellow-500 leading-snug pb-2 mb-8">
              Manage Accommodation
            </h1>
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl mb-8">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6">Room Availability</h2>
              {loading && (
                <div className="flex justify-center">
                  <div className="animate-spin h-8 w-8 border-4 border-orange-500 border-t-transparent rounded-full"></div>
                </div>
              )}
              {!loading && accommodations.length === 0 && <p className="text-gray-500">No bookings yet.</p>}
              {!loading && accommodations.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {getBookedDates().map((range, index) => {
                    const isBooked = accommodations.some(
                      (booking) =>
                        new Date(booking.checkInDate) <= new Date(range.start) &&
                        new Date(booking.checkOutDate) > new Date(range.start) &&
                        booking.status === "confirmed"
                    );
                    return (
                      <div key={index} className={`p-4 border rounded-xl hover:shadow-lg transition-shadow duration-300 ${isBooked ? "border-red-200 bg-red-50" : "border-green-200 bg-green-50"}`}>
                        <p className="font-semibold text-orange-700">Room Type: {range.roomType}</p>
                        <p className="text-gray-600">From: {range.start}</p>
                        <p className="text-gray-600">To: {range.end}</p>
                        <p className={isBooked ? "text-red-600" : "text-green-600"}>Status: {isBooked ? "Booked" : "Available"}</p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6">All Bookings</h2>
              {loading && (
                <div className="flex justify-center">
                  <div className="animate-spin h-8 w-8 border-4 border-orange-500 border-t-transparent rounded-full"></div>
                </div>
              )}
              {!loading && accommodations.length === 0 && <p className="text-gray-500">No accommodation bookings available.</p>}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {accommodations.map((booking) => (
                  <div key={booking._id} className="p-4 border border-orange-100 rounded-xl hover:shadow-lg transition-shadow duration-300">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <div className="break-words w-full overflow-hidden text-ellipsis">
                        <p className="font-semibold text-orange-700">Name: {booking.fullName}</p>
                        <p className="truncate text-gray-800" title={booking.email}>
                          Email: {booking.email}
                        </p>
                        <p>Phone: {booking.phone}</p>
                      </div>

                      <div>
                        <p>Room Type: {booking.roomType}</p>
                        <p>Check-in Date: {booking.checkInDate}</p>
                        <p>Check-out Date: {booking.checkOutDate}</p>
                        <p>Guests: {booking.numberOfPeople}</p>
                        <p>Total Price: ₹{(booking.totalPrice || 0).toFixed(2)}</p>
                        <p>
                          Status:{" "}
                          <span className={booking.status === "confirmed" ? "text-green-600" : "text-yellow-600"}>
                            {booking.status?.charAt(0).toUpperCase() + booking.status?.slice(1) || "Pending"}
                          </span>
                        </p>
                        <p>Booked At: {formatDate(booking.bookedAt)}</p>
                        {booking.confirmedAt && <p>Confirmed At: {formatDate(booking.confirmedAt)}</p>}
                      </div>
                    </div>
                    {booking.status === "pending" && (
                      <button
                        onClick={async () => {
                          try {
                            const response = await fetch(`${API_URL}/api/accommodations/confirm/${booking._id}`, {
                              method: "POST",
                              headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
                              },
                            });
                            const result = await response.json();
                            if (response.ok) {
                              setMessage(`Booking confirmed for ${booking.fullName}.`);
                              fetchAccommodations();
                            } else {
                              setError(result.message || "Failed to confirm booking");
                            }
                          } catch (err) {
                            console.error("❌ Confirm booking error:", err);
                            setError("Failed to confirm booking");
                          }
                        }}
                        className="w-full mt-4 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg hover:shadow-lg focus:ring-4 focus:ring-green-300 transition-all duration-200"
                      >
                        Approve Booking
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "darshan":
        return (
          <ErrorBoundary>
            <div className="p-4 md:p-8 animate-fade-in">
              <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-yellow-500 leading-snug pb-2 mb-8">
                Darshan Bookings
              </h1>
              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl mb-8">
                <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6">Available Darshan Slots</h2>
                {loading && (
                  <div className="flex justify-center">
                    <div className="animate-spin h-8 w-8 border-4 border-orange-500 border-t-transparent rounded-full"></div>
                  </div>
                )}
                {!loading && darshanBookings.length === 0 && <p className="text-gray-500">No bookings yet to show availability.</p>}
                {!loading && darshanBookings.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...new Set(darshanBookings.map((booking) => booking.date))].map((date) => {
                      const availableSlots = getAvailableSlots(date);
                      return (
                        <div key={date} className="p-4 border border-orange-100 rounded-xl hover:shadow-lg transition-shadow duration-300">
                          <p className="font-semibold text-orange-700">Date: {date || "N/A"}</p>
                          <p>
                            Available Slots:{" "}
                            <span className={availableSlots > 0 ? "text-green-600" : "text-red-600"}>
                              {availableSlots > 0 ? availableSlots : "Fully Booked"}
                            </span>
                          </p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl">
                <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6">All Darshan Bookings</h2>
                {loading && (
                  <div className="flex justify-center">
                    <div className="animate-spin h-8 w-8 border-4 border-orange-500 border-t-transparent rounded-full"></div>
                  </div>
                )}
                {error && <p className="text-red-600 text-center mb-4 animate-pulse">{error}</p>}
                {!loading && !error && darshanBookings.length === 0 && <p className="text-gray-500 text-center">No darshan bookings available.</p>}
                {!loading && !error && darshanBookings.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {darshanBookings.map((booking) => (
                      <div key={booking._id} className="p-4 border border-orange-100 rounded-xl hover:shadow-lg transition-shadow duration-300">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="break-words w-full overflow-hidden text-ellipsis">
                            <p className="font-semibold text-orange-700">Name: {booking.name || "N/A"}</p>
                            <p className="truncate text-gray-800" title={booking.email}>Email: {booking.email || "N/A"}</p>
                            <p>Phone: {booking.phone || "N/A"}</p>
                            <p className="text-gray-800 break-words whitespace-normal hyphens-auto">Address: {booking.address || "N/A"}</p>
                          </div>
                          <div>
                            <p>Date: {booking.date || "N/A"}</p>
                            <p>Time: {booking.time || "N/A"}</p>
                            <p>Type: {(booking.type && booking.type.charAt(0).toUpperCase() + booking.type.slice(1)) || "N/A"}</p>
                            <p>Guests: {booking.numberOfPeople || 0}</p>
                            <p className="font-bold text-orange-600">
                              Cost: ₹{(booking.totalCost || 0).toFixed(2)}
                              {booking.type?.toLowerCase() === "regular" && <span className="text-xs text-gray-500"> (₹500/person)</span>}
                              {booking.type?.toLowerCase() === "vip" && <span className="text-xs text-gray-500"> (₹1,000/person)</span>}
                              {booking.type?.toLowerCase() === "special" && <span className="text-xs text-gray-500"> (₹2,000/person)</span>}
                            </p>
                            <p>Status: <span className="text-green-600 font-semibold">Confirmed</span></p>
                            <p>Booked At: {formatDate(booking.bookedAt)}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </ErrorBoundary>
        );

      case "memberships":
        return (
          <div className="p-4 md:p-8 animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-yellow-500 leading-snug pb-2 mb-8">
              Manage Memberships
            </h1>
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6">All Membership Applications</h2>
              {loading && (
                <div className="flex justify-center">
                  <div className="animate-spin h-8 w-8 border-4 border-orange-500 border-t-transparent rounded-full"></div>
                </div>
              )}
              {error && <p className="text-red-600 text-center mb-4 animate-pulse">{error}</p>}
              {!loading && memberships.length === 0 && <p className="text-gray-500 text-center">No membership applications yet.</p>}
              {!loading && memberships.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {memberships.map((membership) => (
                    <div key={membership._id} className="p-4 border border-orange-100 rounded-xl hover:shadow-lg transition-shadow duration-300">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 gap-2">
                        <div className="min-w-0 break-words whitespace-normal flex-1">
                          <h3 className="text-lg font-bold text-orange-700 break-words whitespace-normal">
                            {membership.fullName}
                          </h3>
                          <p className="text-sm text-gray-600 break-words whitespace-normal">
                            {membership.email}
                          </p>
                          <p className="text-sm text-gray-600 break-words whitespace-normal">
                            {membership.phone}
                          </p>
                        </div>

                        <span
                          className={`self-start sm:self-center px-3 py-1 rounded-full text-xs font-semibold ${
                            membership.status === "approved"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {membership.status.charAt(0).toUpperCase() + membership.status.slice(1)}
                        </span>
                      </div>


                      <div className="space-y-2 mb-4">
                        <p className="text-sm">
                          <strong>Membership Type:</strong> {membership.membershipType.charAt(0).toUpperCase() + membership.membershipType.slice(1)}
                        </p>
                        <p className="text-sm">
                          <strong>Amount:</strong> ₹{membership.amount?.toLocaleString() || "N/A"}
                        </p>
                        <p className="text-sm text-gray-500">Applied on: {formatDate(membership.createdAt)}</p>
                        {membership.approvedAt && <p className="text-sm text-green-600">Approved on: {formatDate(membership.approvedAt)}</p>}
                      </div>
                      {membership.status === "pending" && (
                        <button
                          onClick={async () => {
                            try {
                              const response = await fetch(`${API_URL}/api/membership/approve/${membership._id}`, {
                                method: "POST",
                                headers: {
                                  "Content-Type": "application/json",
                                  Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
                                },
                              });
                              const result = await response.json();
                              if (response.ok) {
                                setMessage(`Membership approved for ${membership.fullName}. Confirmation email sent.`);
                                fetchMemberships();
                              } else {
                                setError(result.message || "Failed to approve membership");
                              }
                            } catch (err) {
                              console.error("❌ Approve membership error:", err);
                              setError("Failed to approve membership");
                            }
                          }}
                          className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg hover:shadow-lg focus:ring-4 focus:ring-green-300 transition-all duration-200"
                        >
                          Approve Membership
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );

      case "admins":
        return (
          <div className="p-4 md:p-8 animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-yellow-500 leading-snug pb-2 mb-8">
              Admin Users
            </h1>
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6">All Admins</h2>
              {loading && (
                <div className="flex justify-center">
                  <div className="animate-spin h-8 w-8 border-4 border-orange-500 border-t-transparent rounded-full"></div>
                </div>
              )}
              {!loading && admins.length === 0 && <p className="text-gray-500">No admins available.</p>}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {admins.map((admin) => (
                  <div key={admin._id} className="p-4 border border-orange-100 rounded-xl hover:shadow-lg transition-shadow duration-300">
                    <p className="font-semibold text-orange-700">Name: {admin.fullName}</p>
                    <p>Email: {admin.email}</p>
                    {admin.lastLogin && <p>Last Login: {formatDate(admin.lastLogin)}</p>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return <div className="p-8 text-gray-600 text-center">Invalid section selected.</div>;
    }
  };

  // ==================== RENDER ====================
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-100 to-yellow-100">
      {/* Desktop Navbar */}
      <nav className="hidden lg:block bg-gradient-to-r from-orange-700 to-yellow-600 text-white p-4 shadow-lg sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight leading-tight">Admin</h1>
              <h1 className="text-2xl font-extrabold tracking-tight leading-tight">Dashboard</h1>
            </div>
            <div className="flex items-center bg-green-600 px-4 py-2 rounded-lg shadow-md">
              <Wallet className="h-5 w-5 mr-2" />
              <span className="font-bold">₹{totalRevenue.toLocaleString()}</span>
            </div>
          </div>
          <div className="flex space-x-3">
            {["poojas", "events", "donations", "accommodation", "darshan", "memberships", "admins"].map((section) => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:shadow-lg ${
                  activeSection === section ? "bg-orange-900 shadow-inner" : "bg-orange-600 hover:bg-orange-500"
                }`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
            <button
              onClick={() => {
                localStorage.removeItem("adminToken");
                setMessage("Logged out successfully.");
                setTimeout(() => navigate("/admin-login"), 1000);
              }}
              className="px-4 py-2 rounded-lg font-medium bg-red-600 hover:bg-red-700 hover:shadow-lg transition-all duration-200 ml-2"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navbar */}
      <nav className="lg:hidden bg-gradient-to-r from-orange-700 to-yellow-600 text-white p-4 shadow-lg sticky top-0 z-10">
        <div className="flex justify-between items-center mb-3">
          <div>
            <h1 className="text-xl font-extrabold tracking-tight leading-tight">Admin</h1>
            <h1 className="text-xl font-extrabold tracking-tight leading-tight">Dashboard</h1>
          </div>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 hover:bg-orange-600 rounded-lg transition-all duration-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        <div className="flex items-center bg-green-600 px-4 py-2 rounded-lg shadow-md w-fit mb-3">
          <Wallet className="h-4 w-4 mr-2" />
          <span className="font-bold text-sm">₹{totalRevenue.toLocaleString()}</span>
        </div>
        {mobileMenuOpen && (
          <div className="mt-4 space-y-2">
            {["poojas", "events", "donations", "accommodation", "darshan", "memberships", "admins"].map((section) => (
              <button
                key={section}
                onClick={() => {
                  setActiveSection(section);
                  setMobileMenuOpen(false);
                }}
                className={`w-full px-4 py-2 rounded-lg font-medium transition-all duration-200 text-left hover:shadow-lg ${
                  activeSection === section ? "bg-orange-900 shadow-inner" : "bg-orange-600 hover:bg-orange-500"
                }`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
            <button
              onClick={() => {
                localStorage.removeItem("adminToken");
                setMessage("Logged out successfully.");
                setTimeout(() => navigate("/admin-login"), 1000);
              }}
              className="w-full px-4 py-2 rounded-lg font-medium bg-red-600 hover:bg-red-700 hover:shadow-lg transition-all duration-200 text-left"
            >
              Logout
            </button>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8">
        {message && <p className="text-green-600 text-center mb-4 animate-pulse">{message}</p>}
        {error && !activeSection && <p className="text-red-600 text-center mb-4 animate-pulse">{error}</p>}
        <ErrorBoundary>{renderSection()}</ErrorBoundary>
      </main>

      {/* Styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Admin;