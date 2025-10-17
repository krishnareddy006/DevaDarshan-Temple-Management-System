// import { Menu, X, BookTemplate as Temple } from 'lucide-react';
// import { useState } from 'react';
// import { NavLink } from 'react-router-dom';

// // Navigation menu items configuration
// const navigation = [
//   { name: 'Home', href: '/' },
//   { name: 'Poojas', href: '/templepoojas' },
//   { name: 'Donations', href: '/donations' },
//   { name: 'Book Darshan', href: '/bookdarshan' },
//   { name: 'Accommodation', href: '/accommodation' },
//   { name: 'Admin', href: '/admin-login' },
// ];

// export function Navbar() {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   return (
//     <header className="bg-gradient-to-r from-orange-50 via-white to-orange-100 shadow-md sticky top-0 z-50">
//       <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 py-3" aria-label="Main Navigation">
        
//         <div className="flex items-center lg:flex-1">
//            <NavLink to="/" className="flex items-center gap-2 ">
//            <img
//                 src="/project-logo.png" 
//                 alt="Temple Logo"
//                 className="h-16 w-auto"
//            />
//            </NavLink>
//         </div>

//         <div className="lg:hidden">
//           <button
//             type="button"
//             className="inline-flex items-center justify-center p-2 text-gray-700"
//             aria-label="Open menu"
//             onClick={() => setMobileMenuOpen(true)}
//           >
//             <Menu className="h-6 w-6" />
//           </button>
//         </div>

//         <div className="hidden lg:flex lg:gap-x-8">
//           {navigation.map((item) => (
//             <NavLink
//               key={item.name}
//               to={item.href}
//               className={({ isActive }) => 
//                 isActive 
//                   ? "text-sm font-medium text-orange-600 transition-colors" 
//                   : "text-sm font-medium text-gray-800 hover:text-orange-600 transition-colors"
//               }
//             >
//               {item.name}
//             </NavLink>
//           ))}
//         </div>

//         <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-3">
//           <NavLink to="/login">
//             <button className="text-sm font-medium text-gray-800 hover:text-orange-600 px-4 py-2 rounded-md border border-gray-300 transition-all">
//               Log in
//             </button>
//           </NavLink>
//           <NavLink to="/signup">
//             <button className="text-sm font-medium text-white bg-orange-600 hover:bg-orange-500 px-4 py-2 rounded-md transition-all">
//               Sign up
//             </button>
//           </NavLink>
//         </div>
//       </nav>

//       {mobileMenuOpen && (
//         <div className="lg:hidden fixed inset-0 z-50">
//           <div className="fixed inset-0 bg-white w-full h-full overflow-y-auto">
//             <div className="px-6 py-6">
//               <div className="flex items-center justify-between">
//                 <NavLink to="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
//                   <Temple className="h-8 w-8 text-orange-600" />
//                   <span className="text-xl font-bold text-gray-900">Shiva Temple</span>
//                 </NavLink>
//                 <button
//                   type="button"
//                   className="p-2 text-gray-700 hover:bg-gray-100 rounded-md"
//                   aria-label="Close menu"
//                   onClick={() => setMobileMenuOpen(false)}
//                 >
//                   <X className="h-6 w-6" />
//                 </button>
//               </div>
//               <div className="mt-6 space-y-2">
//                 {navigation.map((item) => (
//                   <NavLink
//                     key={item.name}
//                     to={item.href}
//                     onClick={() => setMobileMenuOpen(false)}
//                     className={({ isActive }) =>
//                       isActive
//                         ? "block text-base font-medium text-orange-600 bg-orange-50 px-3 py-3 rounded-md transition-colors"
//                         : "block text-base font-medium text-gray-800 hover:bg-orange-50 px-3 py-3 rounded-md transition-colors"
//                     }
//                   >
//                     {item.name}
//                   </NavLink>
//                 ))}
//                 <div className="pt-4 border-t border-gray-200 space-y-2">
//                   <NavLink to="/login" onClick={() => setMobileMenuOpen(false)}>
//                     <button className="w-full text-base font-medium text-gray-800 hover:text-orange-600 px-4 py-3 border border-gray-300 rounded-md transition-all text-left">
//                       Log in
//                     </button>
//                   </NavLink>
//                   <NavLink to="/signup" onClick={() => setMobileMenuOpen(false)}>
//                     <button className="w-full text-base font-medium text-white bg-orange-600 hover:bg-orange-500 px-4 py-3 rounded-md transition-all text-left">
//                       Sign up
//                     </button>
//                   </NavLink>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </header>
//   );
// }





import { Menu, X, BookTemplate as Temple } from 'lucide-react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

// Fixed navigation items - consistent with App.tsx routes
const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Poojas', href: '/templepoojas' },
  { name: 'Donations', href: '/donations' },
  { name: 'Book Darshan', href: '/bookdarshan' },
  { name: 'Accommodation', href: '/accommodation' },
  { name: 'Admin', href: '/admin-login' },
  // { name: 'Gallery', href: '/gallery' }, 
  // { name: 'Community', href: '/community' }, 
  // { name: 'About', href: '/about' }, 
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-orange-50 via-white to-orange-100 shadow-md sticky top-0 z-50">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 py-3" aria-label="Main Navigation">
        <div className="flex items-center lg:flex-1">
          <NavLink to="/" className="flex items-center gap-2">
            <img
              src="/project-logo.png" 
              alt="Temple Logo"
              className="h-16 w-auto"
              onError={(e) => {
                // Fallback if logo fails to load
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          </NavLink>
        </div>

        <div className="lg:hidden">
          <button
            type="button"
            className="inline-flex items-center justify-center p-2 text-gray-700"
            aria-label="Open menu"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) => 
                isActive 
                  ? "text-sm font-medium text-orange-600 transition-colors" 
                  : "text-sm font-medium text-gray-800 hover:text-orange-600 transition-colors"
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-3">
          <NavLink to="/login">
            <button className="text-sm font-medium text-gray-800 hover:text-orange-600 px-4 py-2 rounded-md border border-gray-300 transition-all">
              Log in
            </button>
          </NavLink>
          <NavLink to="/signup">
            <button className="text-sm font-medium text-white bg-orange-600 hover:bg-orange-500 px-4 py-2 rounded-md transition-all">
              Sign up
            </button>
          </NavLink>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="fixed inset-0 bg-white w-full h-full overflow-y-auto">
            <div className="px-6 py-6">
              <div className="flex items-center justify-between">
                <NavLink to="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                  <Temple className="h-8 w-8 text-orange-600" />
                  <span className="text-xl font-bold text-gray-900">Shiva Temple</span>
                </NavLink>
                <button
                  type="button"
                  className="p-2 text-gray-700 hover:bg-gray-100 rounded-md"
                  aria-label="Close menu"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="mt-6 space-y-2">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      isActive
                        ? "block text-base font-medium text-orange-600 bg-orange-50 px-3 py-3 rounded-md transition-colors"
                        : "block text-base font-medium text-gray-800 hover:bg-orange-50 px-3 py-3 rounded-md transition-colors"
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}
                <div className="pt-4 border-t border-gray-200 space-y-2">
                  <NavLink to="/login" onClick={() => setMobileMenuOpen(false)}>
                    <button className="w-full text-base font-medium text-gray-800 hover:text-orange-600 px-4 py-3 border border-gray-300 rounded-md transition-all text-left">
                      Log in
                    </button>
                  </NavLink>
                  <NavLink to="/signup" onClick={() => setMobileMenuOpen(false)}>
                    <button className="w-full text-base font-medium text-white bg-orange-600 hover:bg-orange-500 px-4 py-3 rounded-md transition-all text-left">
                      Sign up
                    </button>
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
