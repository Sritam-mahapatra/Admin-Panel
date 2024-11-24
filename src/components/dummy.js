import { Activity, DollarSign, Key, ShieldCheck, ShoppingCart, TrendingUp, UserPlus, Users } from 'lucide-react';
import React from 'react';

export function Dashboard() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <Card title="Total Users" value="1,234" icon={Users} change="+20.1%" color="bg-blue-500" />
      <Card title="New Users" value="+48" icon={UserPlus} change="+12.5%" color="bg-green-500" />
      <Card title="Active Roles" value="7" icon={ShieldCheck} change="+2" color="bg-yellow-500" />
      <Card title="Total Permissions" value="32" icon={Key} change="+5" color="bg-purple-500" />
      
    </div>
  );
}

function Card({ title, value, icon: Icon, change, color }) {
  return (
    <div className={`${color} p-6 rounded-lg shadow-lg text-white`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">{title}</h3>
        <Icon className="h-8 w-8 opacity-75" />
      </div>
      <div className="text-3xl font-bold mb-2">{value}</div>
      <p className="text-sm opacity-75">{change} from last period</p>
    </div>
  );
}

function Chart({ title, icon: Icon, color }) {
  return (
    <div className={`${color} p-6 rounded-lg shadow-lg text-white`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">{title}</h3>
        <Icon className="h-8 w-8 opacity-75" />
      </div>
      <div className="h-40 flex items-end justify-between">
        {[...Array(7)].map((_, i) => (
          <div key={i} className="w-8 bg-white bg-opacity-25" style={{height: `${Math.random() * 100}%`}}></div>
        ))}
      </div>
    </div>
  );
}

