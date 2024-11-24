import React, { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { PermissionManagement } from './components/PermissionManagement';
import { RoleManagement } from './components/RoleManagement';
import { Sidebar } from './components/Sidebar';
import { UserManagement } from './components/UserManagement';


function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false); // Manage sidebar state

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev); // Toggle sidebar
  };

  const handleLogin = () => {
    // Handle login logic here, e.g., redirect to login page or show login modal
    alert('Login functionality will be implemented here!');
  };

  return (
    <div className="relative flex h-screen bg-gray-100">
      {/* Floating Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between bg-blue-600 text-white p-4">
          {/* Hamburger Icon and Project Name */}
          <div className="flex items-center space-x-4">
            {/* Hamburger Icon (3 Bars) */}
            <button onClick={toggleSidebar} className="text-white text-3xl">
              ☰ {/* Hamburger icon symbol */}
            </button>
            {/* Emoji Logo */}
           
            <h1
              className="text-xl font-bold cursor-pointer"
              onClick={toggleSidebar} // Click to toggle sidebar
            >
              Admin Panel
            </h1>
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            className="text-white bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-400"
          >
            Login
          </button>
        </div>

        {/* Main Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-success p-6">
          <div className="container mx-auto">
            {activeTab === 'dashboard' && <Dashboard />}
            {activeTab === 'users' && <UserManagement />}
            {activeTab === 'roles' && <RoleManagement />}
            {activeTab === 'permissions' && <PermissionManagement />}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
