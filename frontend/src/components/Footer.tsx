import { NavLink } from 'react-router-dom';
import { Instagram, Youtube, Facebook, User, Calendar as CalendarIcon, LogOut } from 'lucide-react';
import { useState } from 'react';

interface FooterProps {
  toggleEventCalendar: () => void;
  showEventCalendar?: boolean;
}

export function Footer({ toggleEventCalendar }: FooterProps) {
  const [isLoggedIn] = useState(() => {
    if (typeof window !== 'undefined') {
      return !!localStorage.getItem("userToken");
    }
    return false;
  });

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem("userToken");
      window.location.reload();
    }
  };

  const handleEventsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleEventCalendar();
  };

  return (
    <footer className="bg-gradient-to-r from-orange-700 to-yellow-600 py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 text-white">
          {/* First Services Column */}
          <div className="text-center sm:text-left">
            <h3 className="text-xl font-semibold mb-4 text-orange-100">Services</h3>
            <ul className="space-y-2">
              <li>
                <NavLink 
                  to="/templepoojas" 
                  className="hover:text-orange-200 transition-colors duration-300"
                >
                  Poojas
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/bookdarshan" 
                  className="hover:text-orange-200 transition-colors duration-300"
                >
                  Book Darshan
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/donations" 
                  className="hover:text-orange-200 transition-colors duration-300"
                >
                  Donations
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/accommodation" 
                  className="hover:text-orange-200 transition-colors duration-300"
                >
                  Accommodation
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Second Services Column */}
          <div className="text-center sm:text-left">
            <h3 className="text-xl font-semibold mb-4 text-orange-100">More Services</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={handleEventsClick}
                  className="hover:text-orange-200 transition-colors duration-300 text-left w-full py-1 text-white border-none bg-transparent cursor-pointer p-0 focus:outline-none"
                >
                  Events & Calendar
                </button>
              </li>
              <li>
                <NavLink 
                  to="/community" 
                  className="hover:text-orange-200 transition-colors duration-300"
                >
                  Join Community
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/gallery" 
                  className="hover:text-orange-200 transition-colors duration-300"
                >
                  Photo Gallery
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Account Column */}
          <div className="text-center sm:text-left">
            <h3 className="text-xl font-semibold mb-4 text-orange-100">Account</h3>
            <ul className="space-y-2">
              {isLoggedIn ? (
                <>
                  <li>
                    <NavLink 
                      to="/profile" 
                      className="flex items-center gap-2 hover:text-orange-200 transition-colors duration-300"
                    >
                      My Profile
                    </NavLink>
                  </li>
                  <li>
                    <NavLink 
                      to="/my-bookings" 
                      className="flex items-center gap-2 hover:text-orange-200 transition-colors duration-300"
                    >
                      My Bookings
                    </NavLink>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 hover:text-orange-200 transition-colors duration-300 text-left w-full py-1 text-white border-none bg-transparent cursor-pointer p-0 focus:outline-none"
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <NavLink 
                      to="/login" 
                      className="hover:text-orange-200 transition-colors duration-300"
                    >
                      Login
                    </NavLink>
                  </li>
                  <li>
                    <NavLink 
                      to="/signup" 
                      className="hover:text-orange-200 transition-colors duration-300"
                    >
                      Sign Up
                    </NavLink>
                  </li>
                </>
              )}
              <li>
                <NavLink 
                  to="/admin-login" 
                  className="hover:text-orange-200 transition-colors duration-300"
                >
                  Admin Panel
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Connect Column */}
          <div className="text-center sm:text-left">
            <h3 className="text-xl font-semibold mb-4 text-orange-100">Connect</h3>
            <ul className="space-y-2 mb-4">
              <li>
                <a 
                  href="#connect-section" 
                  className="hover:text-orange-200 transition-colors duration-300"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <NavLink 
                  to="/about" 
                  className="hover:text-orange-200 transition-colors duration-300"
                >
                  About Temple
                </NavLink>
              </li>
            </ul>

            {/* Social Media Links */}
            <div className="flex gap-4 justify-center sm:justify-start mt-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-orange-200 transition-colors duration-300 p-2 rounded-full hover:bg-white/10 text-white"
                aria-label="Instagram"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-orange-200 transition-colors duration-300 p-2 rounded-full hover:bg-white/10 text-white"
                aria-label="YouTube"
              >
                <Youtube className="h-6 w-6" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-orange-200 transition-colors duration-300 p-2 rounded-full hover:bg-white/10 text-white"
                aria-label="Facebook"
              >
                <Facebook className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Section */}
        <div className="mt-12 pt-8 border-t border-orange-600 text-center text-white">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            <p className="text-base lg:text-lg text-white">
              © 2025 Shiva Temple. All Rights Reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <NavLink 
                to="/privacy" 
                className="hover:text-orange-200 transition-colors duration-300 text-white"
              >
                Privacy Policy
              </NavLink>
              <NavLink 
                to="/terms" 
                className="hover:text-orange-200 transition-colors duration-300 text-white"
              >
                Terms of Service
              </NavLink>
            </div>
          </div>
        </div>
      </div>

      {/* Clean CSS - Only for focus management */}
      <style jsx>{`
        a:focus, button:focus {
          outline: 2px solid rgba(255, 165, 0, 0.5);
          outline-offset: 2px;
        }
        
        /* Ensure buttons look like regular links */
        button {
          font-family: inherit;
          font-size: inherit;
          color: inherit;
        }
      `}</style>
    </footer>
  );
}
