import React, { useEffect, useState } from "react";
import { Calendar, Clock, Sparkles } from "lucide-react";

// API configuration from environment variables
const API_URL = import.meta.env.VITE_API_URL;

interface Pooja {
  _id: string;
  name: string;
  date: string;
  time: string;
  thingsNeeded?: string;
  image?: string;
}

const TemplePoojas = () => {
  const [poojas, setPoojas] = useState<Pooja[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPooja, setSelectedPooja] = useState<Pooja | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Filter out past poojas based on date and time
  const filterExpiredPoojas = (poojas: Pooja[]) => {
    const now = new Date();
    return poojas.filter((pooja) => {
      const poojaDateTime = new Date(`${pooja.date}T${pooja.time || '23:59'}:00`);
      return poojaDateTime >= now;
    });
  };

  // Fetch all poojas and filter active ones on component mount
  useEffect(() => {
    fetch(`${API_URL}/api/poojas`)
      .then((res) => res.json())
      .then((data: Pooja[]) => {
        const activePoojas = filterExpiredPoojas(data);
        setPoojas(activePoojas);
      })
      .catch((err) => console.error("Failed to fetch poojas:", err))
      .finally(() => setLoading(false));
  }, []);

  // Fetch and display detailed information for selected pooja
  const handleViewDetails = (id: string) => {
    fetch(`${API_URL}/api/poojas/${id}`)
      .then((res) => res.json())
      .then((data: Pooja) => {
        setSelectedPooja(data);
        setShowModal(true);
      })
      .catch((err) => console.error("Error fetching pooja details:", err));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl bg-gradient-to-r from-orange-600 to-yellow-500 bg-clip-text text-transparent leading-snug pb-2">
            Upcoming Poojas & Abhishekam
          </h1>
          <p className="mt-4 text-xl text-gray-600 font-light">
            Explore our sacred temple rituals and ceremonies
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin h-12 w-12 border-4 border-orange-500 border-t-transparent rounded-full mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading poojas...</p>
          </div>
        ) : poojas.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-500">No upcoming poojas scheduled at the moment</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {poojas.map((pooja) => {
              return (
                <div
                  key={pooja._id}
                  className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
                >
                  {pooja.image && (
                    <div className="w-full h-48 overflow-hidden">
                      <img
                        src={pooja.image}
                        alt={pooja.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                  )}

                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">{pooja.name}</h2>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center text-gray-700">
                        <Calendar className="h-5 w-5 text-orange-600 mr-3" />
                        <span className="font-medium">{pooja.date}</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <Clock className="h-5 w-5 text-orange-600 mr-3" />
                        <span className="font-medium">{pooja.time}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleViewDetails(pooja._id)}
                      className="w-full rounded-lg bg-gradient-to-r from-orange-600 to-yellow-500 px-6 py-2 text-base font-semibold text-white shadow-md hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:ring-offset-2"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {showModal && selectedPooja && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              {selectedPooja.image && (
                <div className="relative">
                  <div className="absolute bottom-4 left-4">
                    <h2 className="text-2xl font-bold text-white drop-shadow-lg">{selectedPooja.name}</h2>
                  </div>
                </div>
              )}

              <div className="p-6">
                {!selectedPooja.image && (
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">{selectedPooja.name}</h2>
                )}

                <div className="space-y-4">
                  <div className="bg-orange-50 rounded-xl p-4 border border-orange-200">
                    <h3 className="text-base font-semibold text-gray-900 mb-3">Schedule</h3>
                    <div className="space-y-2">
                      <div className="flex items-center text-gray-700">
                        <Calendar className="h-4 w-4 text-orange-600 mr-2" />
                        <div>
                          <span className="text-xs text-gray-500">Date:</span>
                          <p className="font-semibold text-sm">{selectedPooja.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <Clock className="h-4 w-4 text-orange-600 mr-2" />
                        <div>
                          <span className="text-xs text-gray-500">Time:</span>
                          <p className="font-semibold text-sm">{selectedPooja.time}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {selectedPooja.thingsNeeded && (
                    <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
                      <h3 className="text-base font-semibold text-gray-900 mb-2 flex items-center">
                        <Sparkles className="h-4 w-4 text-yellow-600 mr-2" />
                        Things Needed
                      </h3>
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line text-sm">
                        {selectedPooja.thingsNeeded}
                      </p>
                    </div>
                  )}

                  <div className="pt-2">
                    <button
                      onClick={() => setShowModal(false)}
                      className="w-full rounded-lg border border-gray-300 px-6 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TemplePoojas;
