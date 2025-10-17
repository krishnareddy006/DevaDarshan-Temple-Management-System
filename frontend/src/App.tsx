// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { Navbar } from './components/Navbar';
// import { Home } from './pages/Home' ;
// import { Donations } from './pages/Donations';
// import { Accommodation } from './pages/Accommodation';
// import { Login } from './pages/login';
// import { Signup } from './pages/signup';
// import TemplePoojas from './pages/templepoojas';
// import BookDarshan from './pages/bookdarshan'; 
// import AdminPage from "./admin/admin";
// import { Gallery } from "./pages/Gallery";
// import AdminLogin from "./components/AdminLogin";
// import AdminSignup from "./components/AdminSignup";
// import { Community } from './pages/Community'; 
// import AboutTemple from './pages/AboutTemple';

// function App() {
//   return (
//     <Router>
//       <div className="min-h-screen bg-gray-50">
//         <Navbar />
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/templepoojas" element={<TemplePoojas />} />
//           <Route path="/donations" element={<Donations />} />
//           <Route path="/accommodation" element={<Accommodation />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/bookdarshan" element={<BookDarshan />} /> 
//           <Route path="/admin" element={<AdminPage />} />
//           <Route path="/admin-login" element={<AdminLogin />} />
//           <Route path="/admin-signup" element={<AdminSignup />} />
//           <Route path="/gallery" element={<Gallery />} />
//           <Route path="/community" element={<Community />} />
//           <Route path="/about" element={<AboutTemple />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;


// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { Navbar } from './components/Navbar';
// import { Home } from './pages/Home';
// import { Donations } from './pages/Donations';
// import { Accommodation } from './pages/Accommodation';
// import { Login } from './pages/login';
// import { Signup } from './pages/signup';
// import TemplePoojas from './pages/templepoojas';
// import BookDarshan from './pages/bookdarshan';
// import AdminPage from "./admin/admin";
// import { Gallery } from "./pages/Gallery";
// import AdminLogin from "./components/AdminLogin";
// import AdminSignup from "./components/AdminSignup";
// import { Community } from './pages/Community';
// import AboutTemple from './pages/AboutTemple.tsx';

// function App() {
//   return (
//     <Router basename={import.meta.env.DEV ? undefined : import.meta.env.VITE_BASENAME}>
//       <div className="min-h-screen bg-gray-50">
//         <Navbar />
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/templepoojas" element={<TemplePoojas />} />
//           <Route path="/donations" element={<Donations />} />
//           <Route path="/accommodation" element={<Accommodation />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/bookdarshan" element={<BookDarshan />} />
//           <Route path="/admin" element={<AdminPage />} />
//           <Route path="/admin-login" element={<AdminLogin />} />
//           <Route path="/admin-signup" element={<AdminSignup />} />
//           <Route path="/gallery" element={<Gallery />} />
//           <Route path="/community" element={<Community />} />
//           <Route path="/about" element={<AboutTemple />} />
//           {/* 404 Fallback Route */}
//           <Route path="*" element={
//             <div className="min-h-screen flex items-center justify-center bg-orange-50">
//               <div className="text-center p-8">
//                 <h1 className="text-4xl font-bold text-gray-900 mb-4">404 - Page Not Found</h1>
//                 <p className="text-lg text-gray-600 mb-6">The page you're looking for doesn't exist.</p>
//                 <a 
//                   href="/" 
//                   className="inline-block bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-all duration-300"
//                 >
//                   Go Home
//                 </a>
//               </div>
//             </div>
//           } />
//         </Routes>
//         <footer className="mt-12">
//           {/* Your footer component */}
//         </footer>
//       </div>
//     </Router>
//   );
// }

// export default App;

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Donations } from './pages/Donations';
import { Accommodation } from './pages/Accommodation';
import { Login } from './pages/login';
import { Signup } from './pages/signup';
import TemplePoojas from './pages/templepoojas';
import BookDarshan from './pages/bookdarshan';
import AdminPage from "./admin/admin";
import { Gallery } from "./pages/Gallery";
import AdminLogin from "./components/AdminLogin";
import AdminSignup from "./components/AdminSignup";
import { Community } from './pages/Community';
import AboutTemple from './pages/AboutTemple'; 
import { Footer } from './components/Footer';
import { useState } from 'react';

// Wrapper component to share state between Home and Footer
function App() {
  const [showEventCalendar, setShowEventCalendar] = useState(false);

  const toggleEventCalendar = () => {
    setShowEventCalendar(!showEventCalendar);
  };

  return (
    <Router basename={import.meta.env.DEV ? undefined : '/'}>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route 
            path="/" 
            element={
              <Home 
                showEventCalendar={showEventCalendar} 
                toggleEventCalendar={toggleEventCalendar}
              />
            } 
          />
          <Route path="/templepoojas" element={<TemplePoojas />} />
          <Route path="/donations" element={<Donations />} />
          <Route path="/accommodation" element={<Accommodation />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/bookdarshan" element={<BookDarshan />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin-signup" element={<AdminSignup />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/community" element={<Community />} />
          <Route path="/about" element={<AboutTemple />} />
          
          {/* 404 Fallback Route */}
          <Route path="*" element={
            <div className="min-h-screen flex items-center justify-center bg-orange-50">
              <div className="text-center p-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">404 - Page Not Found</h1>
                <p className="text-lg text-gray-600 mb-6">The page you're looking for doesn't exist.</p>
                <a 
                  href="/" 
                  className="inline-block bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-all duration-300"
                >
                  Go Home
                </a>
              </div>
            </div>
          } />
        </Routes>
        <Footer 
          toggleEventCalendar={toggleEventCalendar}
          showEventCalendar={showEventCalendar}
        />
      </div>
    </Router>
  );
}

export default App;
