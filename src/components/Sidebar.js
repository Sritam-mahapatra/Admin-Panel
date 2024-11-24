import React from 'react';

export function Sidebar({ isOpen, toggleSidebar, activeTab, setActiveTab }) {
  return (
    <>
      {/* Dark overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleSidebar} // Close sidebar when clicking on the overlay
      ></div>

      {/* Floating Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-lg transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 w-64`}
      >
        <div className="p-4">
          <h2 className="text-lg font-bold mb-4">Menu</h2>
          <button
            className={`block w-full text-left px-4 py-2 rounded ${
              activeTab === 'dashboard' ? 'bg-gray-200' : ''
            }`}
            onClick={() => {
              setActiveTab('dashboard');
              toggleSidebar(); // Close sidebar after selecting
            }}
          >
            Dashboard
          </button>
          <button
            className={`block w-full text-left px-4 py-2 rounded ${
              activeTab === 'users' ? 'bg-gray-200' : ''
            }`}
            onClick={() => {
              setActiveTab('users');
              toggleSidebar();
            }}
          >
            Users
          </button>
          <button
            className={`block w-full text-left px-4 py-2 rounded ${
              activeTab === 'roles' ? 'bg-gray-200' : ''
            }`}
            onClick={() => {
              setActiveTab('roles');
              toggleSidebar();
            }}
          >
            Roles
          </button>
          <button
            className={`block w-full text-left px-4 py-2 rounded ${
              activeTab === 'permissions' ? 'bg-gray-200' : ''
            }`}
            onClick={() => {
              setActiveTab('permissions');
              toggleSidebar();
            }}
          >
            Permissions
          </button>
        </div>
      </div>
    </>
  );
}
