import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Menu, X, Home, Users, LogOut, UserPlus, FileText, Upload, MapPin } from 'lucide-react';
import useLogout from '../../utils/useLogout';
import logo from '../../assets/logo.png';
import ROUTE_CONSTANT from '@/Routers/routeConstants';

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { userLogout } = useLogout();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user.userData);
  const isAdmin = useSelector((state) => state.user.isAdmin);
  const PortalCheck = userData?.[0]?.portalRole;

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const NavItem = ({ icon: Icon, label, onClick }) => (
    <button
      onClick={() => {
        onClick();
        setSidebarOpen(false); // Close sidebar on mobile on any click
      }}
      className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
    >
      <Icon className="w-5 h-5 mr-3" />
      <span className="font-medium">{label}</span>
    </button>
  );

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar Backdrop (Mobile) */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex items-center justify-center h-16 border-b border-gray-200 px-4">
           <img src={logo} alt="Logo" className="h-8 mr-2" />
           <span className="text-xl font-bold text-gray-800">V-List Portal</span>
        </div>

        <nav className="mt-4 overflow-y-auto h-[calc(100vh-4rem)]">
          {!isAdmin ? (
            <>
              <NavItem icon={Home} label="Home" onClick={() => navigate('/')} />
              <NavItem icon={Users} label="View Voters" onClick={() => navigate('/voter')} />
            </>
          ) : (
             <>
              <NavItem icon={Home} label="Admin Home" onClick={() => {}} />
              <NavItem icon={UserPlus} label="Create User" onClick={() => navigate('/createUser')} />
              <NavItem icon={Users} label="View User" onClick={() => navigate('/viewUser')} />
              <NavItem icon={FileText} label="Extract Voter List" onClick={() => navigate('/extractVoterList')} />
              <NavItem icon={Upload} label="Create Voter List" onClick={() => navigate('/adminUpload')} />
              <NavItem icon={MapPin} label="Create Polling Stations" onClick={() => navigate('/createPollingStations')} />
              <NavItem icon={MapPin} label="Assign Constituency" onClick={() => navigate('/assignConstituency')} />
              <NavItem icon={MapPin} label="Roles" onClick={() => navigate('/roles')} />
            </>
          )}
          
          <div className="mt-auto border-t border-gray-100">
             <NavItem icon={LogOut} label="Logout" onClick={userLogout} />
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar (Mobile Menu Trigger) */}
        <header className="flex items-center justify-between h-16 px-4 bg-white border-b border-gray-200 lg:hidden">
          <button onClick={toggleSidebar} className="p-2 text-gray-600 focus:outline-none">
            <Menu className="w-6 h-6" />
          </button>
          <span className="font-bold text-lg text-gray-800">V-List Portal</span>
          <div className="w-8"></div> {/* Spacer for centering */}
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-4 md:p-6 text-left">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
