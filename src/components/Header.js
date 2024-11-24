import { Bell, User } from 'lucide-react';
import React from 'react';

export function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="flex items-center justify-end px-6 py-4">
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Bell className="h-5 w-5" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <User className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}

