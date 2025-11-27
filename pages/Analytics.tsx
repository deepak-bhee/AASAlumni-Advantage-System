import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { UserRole } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export const Analytics = () => {
  const { user } = useAuth();

  if (user?.role !== UserRole.ADMIN) {
    return <div className="p-8 text-center text-red-500">Access Denied: Admin only area.</div>;
  }

  const engagementData = [
    { name: 'Jan', activeUsers: 400 },
    { name: 'Feb', activeUsers: 450 },
    { name: 'Mar', activeUsers: 600 },
    { name: 'Apr', activeUsers: 550 },
    { name: 'May', activeUsers: 700 },
    { name: 'Jun', activeUsers: 800 },
  ];

  const placementData = [
    { name: 'Software', value: 45 },
    { name: 'Data Science', value: 25 },
    { name: 'Core Eng', value: 20 },
    { name: 'Management', value: 10 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
        <p className="text-gray-500 mt-1">Real-time insights on alumni engagement and placements.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Engagement Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold mb-6">User Engagement Trend</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={engagementData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip cursor={{fill: '#f3f4f6'}} />
                <Legend />
                <Bar dataKey="activeUsers" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Active Users" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Placement Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold mb-6">Placements by Industry</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={placementData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label
                >
                  {placementData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold mb-4">Detailed Reports</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Report Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Generated</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Annual Placement Report 2024</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Oct 15, 2025</td>
                <td className="px-6 py-4 whitespace-nowrap"><span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Ready</span></td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-900 cursor-pointer">Download</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Alumni Feedback Summary</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Oct 10, 2025</td>
                <td className="px-6 py-4 whitespace-nowrap"><span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Processing</span></td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">Wait</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};