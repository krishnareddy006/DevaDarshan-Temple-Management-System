import { MapPin, Clock, Calendar } from "lucide-react";

const AboutTemple = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-3">Shiva Temple</h1>
            <p className="text-xl md:text-2xl mb-4">The Sacred Abode of Lord Shiva</p>
            <div className="flex items-center justify-center text-base">
              <MapPin className="h-5 w-5 mr-2" />
              <span>Bangalore, Karnataka - 560001, India</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Introduction */}
        <section className="mb-12">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">About the Temple</h2>
            <div className="text-gray-700 leading-relaxed space-y-4">
              <p>
                Shiva Temple is a serene and sacred Hindu temple dedicated to Lord Shiva, located in the heart 
                of Bangalore, Karnataka. The temple serves as a spiritual sanctuary for devotees seeking divine 
                blessings and peace. With its tranquil atmosphere and beautiful architecture, it attracts 
                thousands of devotees and visitors throughout the year.
              </p>
              <p>
                The temple is renowned for its peaceful ambiance and traditional rituals. Devotees visit to 
                offer prayers, participate in sacred ceremonies, and experience the divine presence of Lord Shiva. 
                The temple complex features traditional South Indian architecture with intricate carvings and a 
                serene prayer hall.
              </p>
              <p>
                Our temple is committed to preserving ancient Hindu traditions while serving the spiritual needs 
                of the modern community. We conduct regular poojas, special festivals, and religious ceremonies 
                throughout the year, providing devotees with opportunities for spiritual growth and devotion.
              </p>
            </div>
          </div>
        </section>

        {/* Temple Timings */}
        <section className="mb-12">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="flex items-center mb-6">
              <Clock className="h-6 w-6 text-orange-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-900">Temple Timings</h2>
            </div>
            <div className="bg-orange-50 rounded-lg p-6 border-l-4 border-orange-500">
              <p className="text-lg font-semibold text-gray-900 mb-3">Daily Opening Hours</p>
              <p className="text-2xl font-bold text-orange-600">6:00 AM - 9:00 PM</p>
              <p className="text-gray-700 mt-4">
                The temple is open seven days a week for devotees. We conduct multiple poojas and aartis 
                throughout the day to serve the spiritual needs of our devotees.
              </p>
            </div>
          </div>
        </section>

        {/* Daily Rituals */}
        <section className="mb-12">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Daily Worship Schedule</h2>
            <p className="text-gray-700 mb-6">
              Our temple conducts regular poojas and rituals throughout the day:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-gray-100 rounded-lg p-4">
                <p className="font-semibold text-gray-900">Morning Pooja</p>
                <p className="text-gray-600">6:00 AM - 7:00 AM</p>
              </div>
              <div className="bg-gray-100 rounded-lg p-4">
                <p className="font-semibold text-gray-900">Abhishekam</p>
                <p className="text-gray-600">8:00 AM - 9:00 AM</p>
              </div>
              <div className="bg-gray-100 rounded-lg p-4">
                <p className="font-semibold text-gray-900">Mid-day Aarti</p>
                <p className="text-gray-600">12:00 PM - 12:30 PM</p>
              </div>
              <div className="bg-gray-100 rounded-lg p-4">
                <p className="font-semibold text-gray-900">Evening Pooja</p>
                <p className="text-gray-600">6:00 PM - 7:00 PM</p>
              </div>
              <div className="bg-gray-100 rounded-lg p-4">
                <p className="font-semibold text-gray-900">Night Aarti</p>
                <p className="text-gray-600">8:00 PM - 8:30 PM</p>
              </div>
              <div className="bg-gray-100 rounded-lg p-4">
                <p className="font-semibold text-gray-900">Closing Ritual</p>
                <p className="text-gray-600">8:45 PM</p>
              </div>
            </div>
          </div>
        </section>

        {/* Services Offered */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Temple Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Regular Services</h3>
              <ul className="space-y-3 text-gray-700">
                <li>• Daily poojas and abhishekams</li>
                <li>• Special darshan arrangements</li>
                <li>• Accommodation facilities for pilgrims</li>
                <li>• Prasadam distribution</li>
                <li>• Religious discourse and bhajans</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Special Offerings</h3>
              <ul className="space-y-3 text-gray-700">
                <li>• Festival celebrations throughout the year</li>
                <li>• Online darshan booking facility</li>
                <li>• Donation and sponsorship opportunities</li>
                <li>• Educational programs on Hindu philosophy</li>
                <li>• Community service initiatives</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Major Festivals */}
        <section className="mb-12">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="flex items-center mb-6">
              <Calendar className="h-6 w-6 text-orange-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-900">Major Festivals</h2>
            </div>
            
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-orange-500">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Maha Shivaratri</h3>
                <p className="text-gray-700 leading-relaxed">
                  The most significant festival dedicated to Lord Shiva, celebrated with great devotion. 
                  Special poojas, abhishekams, and night-long bhajans are organized. Thousands of devotees 
                  visit the temple to offer prayers and seek blessings.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-orange-500">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Pradosham</h3>
                <p className="text-gray-700 leading-relaxed">
                  Celebrated twice a month during the 13th lunar day. Special evening poojas are performed, 
                  and devotees gather to participate in this auspicious occasion believed to remove obstacles 
                  and fulfill desires.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-orange-500">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Shravan Month Celebrations</h3>
                <p className="text-gray-700 leading-relaxed">
                  During the holy month of Shravan (July-August), special rituals and abhishekams are 
                  conducted every Monday. The temple sees increased footfall as devotees perform special 
                  prayers and offer sacred items to Lord Shiva.
                </p>
              </div>
            </div>
          </div>
        </section>

        

        {/* Guidelines for Visitors */}
        <section className="mb-12">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Visitor Guidelines</h2>
            <div className="text-gray-700 space-y-3">
              <p>• Please maintain silence and decorum inside the temple premises</p>
              <p>• Remove footwear before entering the main prayer hall</p>
              <p>• Traditional dress code is recommended but not mandatory</p>
              <p>• Photography may be restricted in certain areas</p>
              <p>• Mobile phones should be kept on silent mode</p>
              <p>• Follow the instructions of temple staff and priests</p>
              <p>• Avoid bringing food items inside the main temple</p>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section>
          <div className="bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold mb-6 text-center">Visit Us</h2>
            <div className="text-center space-y-2">
              <p className="text-xl font-semibold">Shiva Temple</p>
              <p>Bangalore, Karnataka - 560001</p>
              <p>India</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutTemple;
