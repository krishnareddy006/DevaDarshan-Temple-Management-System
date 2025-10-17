// import { MapPin, Clock, Calendar } from "lucide-react";

// const AboutTemple = () => {
//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Hero Section */}
//       <div className="bg-gradient-to-r from-orange-600 to-orange-500 text-white py-16">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center">
//             <h1 className="text-4xl md:text-5xl font-bold mb-3">Shiva Temple</h1>
//             <p className="text-xl md:text-2xl mb-4">The Sacred Abode of Lord Shiva</p>
//             <div className="flex items-center justify-center text-base">
//               <MapPin className="h-5 w-5 mr-2" />
//               <span>Bangalore, Karnataka - 560001, India</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         {/* Introduction */}
//         <section className="mb-12">
//           <div className="bg-white rounded-lg shadow-md p-8">
//             <h2 className="text-3xl font-bold text-gray-900 mb-6">About the Temple</h2>
//             <div className="text-gray-700 leading-relaxed space-y-4">
//               <p>
//                 Shiva Temple is a serene and sacred Hindu temple dedicated to Lord Shiva, located in the heart 
//                 of Bangalore, Karnataka. The temple serves as a spiritual sanctuary for devotees seeking divine 
//                 blessings and peace. With its tranquil atmosphere and beautiful architecture, it attracts 
//                 thousands of devotees and visitors throughout the year.
//               </p>
//               <p>
//                 The temple is renowned for its peaceful ambiance and traditional rituals. Devotees visit to 
//                 offer prayers, participate in sacred ceremonies, and experience the divine presence of Lord Shiva. 
//                 The temple complex features traditional South Indian architecture with intricate carvings and a 
//                 serene prayer hall.
//               </p>
//               <p>
//                 Our temple is committed to preserving ancient Hindu traditions while serving the spiritual needs 
//                 of the modern community. We conduct regular poojas, special festivals, and religious ceremonies 
//                 throughout the year, providing devotees with opportunities for spiritual growth and devotion.
//               </p>
//             </div>
//           </div>
//         </section>

//         {/* Temple Timings */}
//         <section className="mb-12">
//           <div className="bg-white rounded-lg shadow-md p-8">
//             <div className="flex items-center mb-6">
//               <Clock className="h-6 w-6 text-orange-600 mr-3" />
//               <h2 className="text-3xl font-bold text-gray-900">Temple Timings</h2>
//             </div>
//             <div className="bg-orange-50 rounded-lg p-6 border-l-4 border-orange-500">
//               <p className="text-lg font-semibold text-gray-900 mb-3">Daily Opening Hours</p>
//               <p className="text-2xl font-bold text-orange-600">6:00 AM - 9:00 PM</p>
//               <p className="text-gray-700 mt-4">
//                 The temple is open seven days a week for devotees. We conduct multiple poojas and aartis 
//                 throughout the day to serve the spiritual needs of our devotees.
//               </p>
//             </div>
//           </div>
//         </section>

//         {/* Daily Rituals */}
//         <section className="mb-12">
//           <div className="bg-white rounded-lg shadow-md p-8">
//             <h2 className="text-3xl font-bold text-gray-900 mb-6">Daily Worship Schedule</h2>
//             <p className="text-gray-700 mb-6">
//               Our temple conducts regular poojas and rituals throughout the day:
//             </p>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//               <div className="bg-gray-100 rounded-lg p-4">
//                 <p className="font-semibold text-gray-900">Morning Pooja</p>
//                 <p className="text-gray-600">6:00 AM - 7:00 AM</p>
//               </div>
//               <div className="bg-gray-100 rounded-lg p-4">
//                 <p className="font-semibold text-gray-900">Abhishekam</p>
//                 <p className="text-gray-600">8:00 AM - 9:00 AM</p>
//               </div>
//               <div className="bg-gray-100 rounded-lg p-4">
//                 <p className="font-semibold text-gray-900">Mid-day Aarti</p>
//                 <p className="text-gray-600">12:00 PM - 12:30 PM</p>
//               </div>
//               <div className="bg-gray-100 rounded-lg p-4">
//                 <p className="font-semibold text-gray-900">Evening Pooja</p>
//                 <p className="text-gray-600">6:00 PM - 7:00 PM</p>
//               </div>
//               <div className="bg-gray-100 rounded-lg p-4">
//                 <p className="font-semibold text-gray-900">Night Aarti</p>
//                 <p className="text-gray-600">8:00 PM - 8:30 PM</p>
//               </div>
//               <div className="bg-gray-100 rounded-lg p-4">
//                 <p className="font-semibold text-gray-900">Closing Ritual</p>
//                 <p className="text-gray-600">8:45 PM</p>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Services Offered */}
//         <section className="mb-12">
//           <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Temple Services</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             <div className="bg-white rounded-lg shadow-md p-6">
//               <h3 className="text-2xl font-bold text-gray-900 mb-4">Regular Services</h3>
//               <ul className="space-y-3 text-gray-700">
//                 <li>• Daily poojas and abhishekams</li>
//                 <li>• Special darshan arrangements</li>
//                 <li>• Accommodation facilities for pilgrims</li>
//                 <li>• Prasadam distribution</li>
//                 <li>• Religious discourse and bhajans</li>
//               </ul>
//             </div>

//             <div className="bg-white rounded-lg shadow-md p-6">
//               <h3 className="text-2xl font-bold text-gray-900 mb-4">Special Offerings</h3>
//               <ul className="space-y-3 text-gray-700">
//                 <li>• Festival celebrations throughout the year</li>
//                 <li>• Online darshan booking facility</li>
//                 <li>• Donation and sponsorship opportunities</li>
//                 <li>• Educational programs on Hindu philosophy</li>
//                 <li>• Community service initiatives</li>
//               </ul>
//             </div>
//           </div>
//         </section>

//         {/* Major Festivals */}
//         <section className="mb-12">
//           <div className="bg-white rounded-lg shadow-md p-8">
//             <div className="flex items-center mb-6">
//               <Calendar className="h-6 w-6 text-orange-600 mr-3" />
//               <h2 className="text-3xl font-bold text-gray-900">Major Festivals</h2>
//             </div>
            
//             <div className="space-y-6">
//               <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-orange-500">
//                 <h3 className="text-2xl font-bold text-gray-900 mb-3">Maha Shivaratri</h3>
//                 <p className="text-gray-700 leading-relaxed">
//                   The most significant festival dedicated to Lord Shiva, celebrated with great devotion. 
//                   Special poojas, abhishekams, and night-long bhajans are organized. Thousands of devotees 
//                   visit the temple to offer prayers and seek blessings.
//                 </p>
//               </div>

//               <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-orange-500">
//                 <h3 className="text-2xl font-bold text-gray-900 mb-3">Pradosham</h3>
//                 <p className="text-gray-700 leading-relaxed">
//                   Celebrated twice a month during the 13th lunar day. Special evening poojas are performed, 
//                   and devotees gather to participate in this auspicious occasion believed to remove obstacles 
//                   and fulfill desires.
//                 </p>
//               </div>

//               <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-orange-500">
//                 <h3 className="text-2xl font-bold text-gray-900 mb-3">Shravan Month Celebrations</h3>
//                 <p className="text-gray-700 leading-relaxed">
//                   During the holy month of Shravan (July-August), special rituals and abhishekams are 
//                   conducted every Monday. The temple sees increased footfall as devotees perform special 
//                   prayers and offer sacred items to Lord Shiva.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </section>

        

//         {/* Guidelines for Visitors */}
//         <section className="mb-12">
//           <div className="bg-white rounded-lg shadow-md p-8">
//             <h2 className="text-3xl font-bold text-gray-900 mb-6">Visitor Guidelines</h2>
//             <div className="text-gray-700 space-y-3">
//               <p>• Please maintain silence and decorum inside the temple premises</p>
//               <p>• Remove footwear before entering the main prayer hall</p>
//               <p>• Traditional dress code is recommended but not mandatory</p>
//               <p>• Photography may be restricted in certain areas</p>
//               <p>• Mobile phones should be kept on silent mode</p>
//               <p>• Follow the instructions of temple staff and priests</p>
//               <p>• Avoid bringing food items inside the main temple</p>
//             </div>
//           </div>
//         </section>

//         {/* Contact Information */}
//         <section>
//           <div className="bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-lg shadow-md p-8">
//             <h2 className="text-3xl font-bold mb-6 text-center">Visit Us</h2>
//             <div className="text-center space-y-2">
//               <p className="text-xl font-semibold">Shiva Temple</p>
//               <p>Bangalore, Karnataka - 560001</p>
//               <p>India</p>
//             </div>
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default AboutTemple;


import { MapPin, Clock, Calendar, Sparkles } from "lucide-react";

const AboutTemple = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-800 to-teal-700 text-white py-16 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-black opacity-20"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-3 drop-shadow-lg">
              Murudeshwara Temple
            </h1>
            <p className="text-xl md:text-3xl mb-6 drop-shadow-md">
              Abode of the World's Second Tallest Shiva Statue
            </p>
            <div className="flex items-center justify-center text-lg md:text-xl bg-white bg-opacity-20 rounded-full px-6 py-2">
              <MapPin className="h-6 w-6 mr-3" />
              <span>Murudeshwar, Uttara Kannada - 581350, Karnataka, India</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Introduction */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
            <div className="flex items-center mb-8">
              <div className="w-2 h-10 bg-gradient-to-b from-blue-600 to-teal-600 rounded-full mr-4"></div>
              <h2 className="text-4xl font-bold text-gray-900">About Murudeshwara Temple</h2>
            </div>
            <div className="text-gray-700 leading-relaxed space-y-6 text-lg">
              <p>
                Perched majestically on the sacred Kanduka Hill, surrounded by the pristine waters of the 
                Arabian Sea on three sides, Murudeshwara Temple stands as a monumental testament to 
                devotion and architectural brilliance. Located in the coastal town of Murudeshwar, 
                Uttara Kannada district, this revered shrine is one of Karnataka's most iconic spiritual 
                destinations, drawing millions of devotees annually to witness its unparalleled grandeur.
              </p>
              <p>
                The temple's crowning glory is the magnificent **123-foot-tall statue of Lord Shiva**, 
                recognized as the second tallest Shiva statue in the world and the tallest in India. 
                Crafted with exquisite detail, this awe-inspiring monument stands as a symbol of divine 
                protection and spiritual awakening, its serene expression captivating all who behold it 
                against the backdrop of the endless ocean horizon.
              </p>
              <p>
                Murudeshwara Temple is not merely a place of worship but a living embodiment of ancient 
                Shaivite traditions blended seamlessly with modern architectural marvels. The temple 
                complex sprawls across 20 acres, featuring the magnificent **237-foot Raja Gopuram** - 
                the second tallest temple tower in India - accessible via elevator, offering panoramic 
                views of the sea and the towering Shiva statue that leave visitors spellbound.
              </p>
            </div>
          </div>
        </section>

        {/* Temple History */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl shadow-lg p-8 md:p-12 border border-blue-100">
            <div className="flex items-center mb-8">
              <div className="w-2 h-10 bg-gradient-to-b from-indigo-600 to-purple-600 rounded-full mr-4"></div>
              <h2 className="text-4xl font-bold text-gray-800">The Legend of Murudeshwara</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <p className="text-gray-700 leading-relaxed text-lg">
                  The sacred history of Murudeshwara traces back to the timeless legend of the 
                  **Atmalinga**, a divine manifestation of Lord Shiva's cosmic energy. According to 
                  ancient scriptures, the demon king Ravana, through intense penance, earned the 
                  boon of the Atmalinga from Lord Shiva himself, granting him unparalleled power.
                </p>
                <p className="text-gray-700 leading-relaxed text-lg">
                  As Ravana carried the sacred lingam towards Lanka, the twilight hour approached. 
                  Lord Ganesha, in the guise of a young shepherd boy, tricked Ravana into placing 
                  the Atmalinga on the ground at dusk, warning that it could not be lifted after 
                  sunset. True to the divine decree, the Atmalinga became immovable, rooted firmly 
                  to this sacred coastal land that came to be known as **Murudeshwara** - "The Face 
                  of the Sea God."
                </p>
                <div className="bg-white p-6 rounded-xl border-l-4 border-indigo-500">
                  <p className="text-indigo-800 font-semibold">
                    <span className="text-2xl">🕉️</span> The sacred **Mridesa Linga**, believed 
                    to be a fragment of the original Atmalinga, is enshrined 2 feet below ground 
                    level in the temple's sanctum sanctorum, illuminated by traditional oil lamps 
                    during special rituals and abhishekams.
                  </p>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="bg-gradient-to-br from-blue-100 to-teal-100 rounded-2xl p-6 text-center">
                  <div className="text-6xl mb-4">🕉️</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Atmalinga Legend</h3>
                  <p className="text-gray-600 text-sm">The divine story that birthed Murudeshwara</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Iconic Features */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">Iconic Architectural Marvels</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center group hover:shadow-2xl transition-all duration-300">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Raja Gopuram</h3>
              <p className="text-gray-600 mb-4">
                At 237 feet tall, this architectural masterpiece is the second tallest 
                temple tower in India, featuring 20 stories accessible by elevator.
              </p>
              <p className="text-blue-600 font-semibold">Panoramic Ocean Views</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 text-center group hover:shadow-2xl transition-all duration-300">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Shiva Statue</h3>
              <p className="text-gray-600 mb-4">
                The 123-foot-tall monolithic statue of Lord Shiva, second tallest globally 
                and India's tallest, stands majestically gazing over the Arabian Sea.
              </p>
              <p className="text-emerald-600 font-semibold">World's 2nd Tallest Shiva</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 text-center group hover:shadow-2xl transition-all duration-300 md:col-span-2 lg:col-span-1">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Mridesa Linga Sanctum</h3>
              <p className="text-gray-600">
                The sacred heart of the temple houses the ancient Mridesa Linga, believed to 
                be a fragment of Ravana's Atmalinga, preserved 2 feet underground in eternal reverence.
              </p>
              <p className="text-purple-600 font-semibold mt-2">Ancient Atmalinga Fragment</p>
            </div>
          </div>
        </section>

        {/* Temple Timings */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
            <div className="flex items-center mb-8">
              <Clock className="h-8 w-8 text-blue-600 mr-4" />
              <h2 className="text-4xl font-bold text-gray-900">Temple Darshan Timings</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-xl p-6 border border-blue-200">
                <h3 className="text-xl font-semibold text-blue-800 mb-4 flex items-center">
                  <span className="w-2 h-6 bg-blue-600 rounded-full mr-3"></span>
                  Daily Darshan Hours
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm">
                    <span className="font-medium text-gray-700">Morning Darshan</span>
                    <span className="font-bold text-blue-600">6:00 AM - 1:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm">
                    <span className="font-medium text-gray-700">Afternoon Darshan</span>
                    <span className="font-bold text-blue-600">3:00 PM - 8:30 PM</span>
                  </div>
                  <div className="text-sm text-gray-600 mt-4 p-3 bg-blue-25 rounded">
                    <strong>Note:</strong> Temple remains closed from 1:00 PM - 3:00 PM for midday rituals
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-200">
                <h3 className="text-xl font-semibold text-emerald-800 mb-4 flex items-center">
                  <span className="w-2 h-6 bg-emerald-600 rounded-full mr-3"></span>
                  Pooja & Aarti Schedule
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-white p-2 rounded text-center">
                      <div className="font-bold text-emerald-700">6:30 AM</div>
                      <div className="text-gray-600">Morning Aarti</div>
                    </div>
                    <div className="bg-white p-2 rounded text-center">
                      <div className="font-bold text-emerald-700">12:15 PM</div>
                      <div className="text-gray-600">Madhyana Pooja</div>
                    </div>
                    <div className="bg-white p-2 rounded text-center">
                      <div className="font-bold text-emerald-700">7:15 PM</div>
                      <div className="text-gray-600">Sandhya Aarti</div>
                    </div>
                    <div className="bg-white p-2 rounded text-center">
                      <div className="font-bold text-emerald-700">8:00 PM</div>
                      <div className="text-gray-600">Dollabhishekam</div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 mt-2">
                    <strong>Rudrabhishekam:</strong> 6:00 AM - 12:00 PM & 3:00 PM - 7:00 PM (Special Tickets Available)
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200">
              <h3 className="text-lg font-semibold text-amber-800 mb-3 flex items-center">
                <Clock className="h-5 w-5 text-amber-600 mr-2" />
                Special Notes
              </h3>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="bg-white p-3 rounded-lg">
                  <strong>Anna Prasadam:</strong><br/>
                  <span className="text-gray-600">12:00 PM - 2:00 PM<br/>7:00 PM - 9:00 PM</span>
                </div>
                <div className="bg-white p-3 rounded-lg">
                  <strong>Raja Gopuram:</strong><br/>
                  <span className="text-gray-600">6:00 AM - 8:00 PM<br/>(Lift Access)</span>
                </div>
                <div className="bg-white p-3 rounded-lg">
                  <strong>Shiva Statue:</strong><br/>
                  <span className="text-gray-600">24 Hours Visible<br/>(No Entry)</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sacred Rituals */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
            <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">Daily Sacred Rituals</h2>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Ushatkalam</h3>
                <p className="text-gray-600 mb-3">5:30 AM - 6:30 AM</p>
                <p className="text-sm text-gray-500">Dawn awakening ceremony with Vedic chants</p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Abhishekam</h3>
                <p className="text-gray-600 mb-3">6:30 AM - 8:00 AM<br/>3:00 PM - 4:30 PM</p>
                <p className="text-sm text-gray-500">Sacred bathing ritual of Mridesa Linga</p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Rudrabhishekam</h3>
                <p className="text-gray-600 mb-3">Special Sessions<br/>(Ticket Required)</p>
                <p className="text-sm text-gray-500">Eleven forms invocation ceremony</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6">
                <h4 className="font-semibold text-blue-800 mb-3">Daily Aarti Schedule</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Kakadarshana</span>
                    <span className="text-blue-600 font-medium">6:00 AM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Udaya Mangala</span>
                    <span className="text-blue-600 font-medium">7:00 AM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Maha Mangalarthi</span>
                    <span className="text-blue-600 font-medium">12:30 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sandhya Aarti</span>
                    <span className="text-blue-600 font-medium">7:30 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Dollabhishekam</span>
                    <span className="text-blue-600 font-medium">8:00 PM</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6">
                <h4 className="font-semibold text-emerald-800 mb-3">Special Sevas Available</h4>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Rudrabhishekam</li>
                  <li>• Panchamrutha Abhishekam</li>
                  <li>• Sahasranama Archana</li>
                  <li>• Kalyanotsavam (Special)</li>
                  <li>• Annadanam Sponsorship</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Visitor Facilities */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">Devotee Amenities & Facilities</h2>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 text-center mb-4">Accessibility</h3>
              <ul className="space-y-3 text-gray-700 text-center">
                <li>• Wheelchair-accessible pathways</li>
                <li>• Dedicated elderly seating areas</li>
                <li>• Elevator access to Raja Gopuram</li>
                <li>• Priority darshan for seniors</li>
                <li>• Baby care facilities available</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 text-center mb-4">Dining & Rest</h3>
              <ul className="space-y-3 text-gray-700 text-center">
                <li>• Free Anna Prasadam (12:00 PM - 2:00 PM)</li>
                <li>• Evening meals (7:00 PM - 9:00 PM)</li>
                <li>• Clean washroom facilities</li>
                <li>• Shoe deposit counters</li>
                <li>• Dedicated rest areas</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 text-center mb-4">Spiritual Services</h3>
              <ul className="space-y-3 text-gray-700 text-center">
                <li>• Online darshan booking system</li>
                <li>• Special pooja arrangements</li>
                <li>• Guided temple tours</li>
                <li>• Accommodation facilities</li>
                <li>• Donation counters</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Major Festivals */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Grand Festival Celebrations</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Murudeshwara comes alive during its vibrant festivals, drawing lakhs of devotees from across India
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="group bg-gradient-to-br from-purple-50 to-indigo-100 rounded-xl p-6 border border-purple-200 hover:shadow-xl transition-all duration-300">
                <div className="flex items-start space-x-3 mb-4">
                  <div className="w-3 h-3 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-purple-800 mb-2">Maha Shivaratri</h3>
                    <p className="text-purple-700 text-sm font-medium mb-1">February-March</p>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed text-sm">
                  The temple's most sacred celebration features continuous 24-hour abhishekam of the 
                  Mridesa Linga. Devotees fast and participate in night-long jagarane with special 
                  Rudra Parayanam and Maha Mangalarathi at dawn.
                </p>
              </div>

              <div className="group bg-gradient-to-br from-orange-50 to-amber-100 rounded-xl p-6 border border-orange-200 hover:shadow-xl transition-all duration-300">
                <div className="flex items-start space-x-3 mb-4">
                  <div className="w-3 h-3 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-orange-800 mb-2">Kartik Purnima</h3>
                    <p className="text-orange-700 text-sm font-medium mb-1">November</p>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed text-sm">
                  The temple is illuminated with thousands of oil lamps creating a divine spectacle. 
                  Special Deepotsava rituals are performed around the Shiva statue and along the 
                  sacred hillock, symbolizing the victory of light over darkness.
                </p>
              </div>

              <div className="group bg-gradient-to-br from-emerald-50 to-teal-100 rounded-xl p-6 border border-emerald-200 hover:shadow-xl transition-all duration-300 md:col-span-2 lg:col-span-1">
                <div className="flex items-start space-x-3 mb-4">
                  <div className="w-3 h-3 bg-emerald-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-emerald-800 mb-2">Shravan Mondays</h3>
                    <p className="text-emerald-700 text-sm font-medium mb-1">July-August</p>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed text-sm">
                  Every Monday during the holy month of Shravan, special Rudrabhishekam and 
                  Panchamrutha Abhishekam are performed. Devotees offer milk, curd, honey, 
                  and bilva leaves to Lord Shiva amidst enchanting Vedic chants and 
                  conch shell sounds echoing across the sea.
                </p>
              </div>

              <div className="group bg-gradient-to-br from-pink-50 to-rose-100 rounded-xl p-6 border border-pink-200 hover:shadow-xl transition-all duration-300">
                <div className="flex items-start space-x-3 mb-4">
                  <div className="w-3 h-3 bg-pink-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-pink-800 mb-2">Pradosham</h3>
                    <p className="text-pink-700 text-sm font-medium mb-1">13th Lunar Day (Bi-weekly)</p>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed text-sm">
                  Celebrated every 13th lunar day, this auspicious twilight ceremony features 
                  special evening aartis and abhishekam. Devotees believe Pradosham rituals 
                  remove obstacles and fulfill heartfelt desires under Lord Shiva's benevolent gaze.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Devotee Guidelines */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">Essential Guidelines for Devotees</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                  <Clock className="h-6 w-6 text-blue-600 mr-3" />
                  Temple Etiquette
                </h3>
                <div className="space-y-4 text-gray-700">
                  <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-red-700">Strict Dress Code:</strong> 
                      Traditional attire mandatory. Men: Shirt/T-shirt with trousers/dhoti. 
                      Women: Saree/Salwar Kameez. Shorts, sleeveless tops, and ripped jeans prohibited.
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-blue-700">Complete Silence:</strong> 
                      Maintain absolute silence in temple premises. No phone conversations, 
                      photography, or videography allowed in sanctum sanctorum.
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-green-700">Footwear Policy:</strong> 
                      Remove footwear at designated areas before entering temple complex. 
                      Leather items strictly prohibited inside premises.
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                  <MapPin className="h-6 w-6 text-green-600 mr-3" />
                  Practical Information
                </h3>
                <div className="space-y-4 text-gray-700">
                  <div className="flex items-start space-x-3 p-3 bg-emerald-50 rounded-lg border-l-4 border-emerald-400">
                    <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-emerald-800">Accessibility:</strong> 
                      Wheelchair ramps, dedicated elevators, priority darshan for elderly, 
                      pregnant women, and differently-abled devotees available throughout complex.
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-blue-800">Prohibited Items:</strong> 
                      Mobile phones on silent/no ring, no plastic bags, no non-vegetarian food, 
                      no tobacco products. Dedicated storage facilities available at entrance.
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-amber-50 rounded-lg border-l-4 border-amber-400">
                    <div className="w-2 h-2 bg-amber-600 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-amber-800">Special Arrangements:</strong> 
                      Group bookings, corporate sponsorships, educational tours, and special 
                      pooja packages can be arranged through temple administration office.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact & Location */}
        <section className="mb-0">
          <div className="bg-gradient-to-r from-blue-900 to-teal-900 text-white rounded-2xl shadow-2xl p-8 md:p-12 text-center relative overflow-hidden">
            <div 
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Cpath d="m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
              }}
            ></div>
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-lg">Plan Your Divine Visit</h2>
              
              <div className="grid md:grid-cols-3 gap-8 mb-8 max-w-4xl mx-auto">
                <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6">
                  <div className="flex items-center justify-center mb-3">
                    <MapPin className="h-8 w-8 mr-3" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Location Details</h3>
                  <p className="text-blue-100 mb-1">
                    <strong>Address:</strong>
                  </p>
                  <p className="text-sm text-blue-50 mb-3">
                    Sri Mukhyaprana Temple Trust<br/>
                    NH-66, Murudeshwar, Bhatkal Taluk<br/>
                    Uttara Kannada District<br/>
                    Karnataka - 581350, India
                  </p>
                  <p className="text-blue-100 text-sm">
                    <strong>Coordinates:</strong> 14.0886°N, 74.4894°E
                  </p>
                </div>

                <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6">
                  <div className="flex items-center justify-center mb-3">
                    <Clock className="h-8 w-8 mr-3" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Contact Information</h3>
                  <p className="text-blue-100 mb-2">
                    <strong>Phone:</strong> +91-8385-268524<br/>
                    <strong>Alternate:</strong> +91-8385-268972
                  </p>
                  <p className="text-blue-100 mb-3">
                    <strong>Email:</strong><br/>
                    info@murudeshwaratemple.org
                  </p>
                  <p className="text-sm text-blue-50">
                    <strong>Website:</strong><br/>
                    www.murudeshwaratemple.com
                  </p>
                </div>

                <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6">
                  <div className="flex items-center justify-center mb-3">
                    <Calendar className="h-8 w-8 mr-3" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Best Time to Visit</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-blue-100">October - March</span>
                      <span className="text-green-200 font-medium">Ideal Season</span>
                    </div>
                    <div className="text-xs text-blue-50">
                      Pleasant weather (15°C - 30°C)
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-100">Maha Shivaratri</span>
                      <span className="text-yellow-200 font-medium">Feb-Mar</span>
                    </div>
                    <div className="text-xs text-blue-50">
                      Grand festival celebrations
                    </div>
                  </div>
                </div>
              </div>

              <div className="max-w-2xl mx-auto mt-8">
                <p className="text-lg text-blue-100 leading-relaxed mb-6">
                  Nestled between the majestic Western Ghats and the boundless Arabian Sea, Murudeshwara 
                  Temple offers an unparalleled spiritual experience where ancient devotion meets 
                  breathtaking natural beauty. Whether you seek divine blessings, architectural wonder, 
                  or simply the serenity of ocean waves, this sacred destination welcomes all with open arms.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a 
                    href="https://maps.google.com/?q=Murudeshwar+Temple" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 flex items-center justify-center"
                  >
                    <MapPin className="h-5 w-5 mr-2" />
                    Get Directions
                  </a>
                  <a 
                    href="tel:+918385268524" 
                    className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-900 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 flex items-center justify-center"
                  >
                    Contact Temple
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutTemple;
