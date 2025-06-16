'use client';
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Bed, 
  Users, 
  Calendar, 
  CreditCard, 
  Settings, 
  Bell, 
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Eye,
  TrendingUp,
  TrendingDown,
  MapPin,
  Star,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  BarChart3,
  PieChart,
  User,
  Phone,
  Mail,
  DollarSign,
  Calendar as CalendarIcon,
  Wifi,
  Car,
  Coffee,
  Dumbbell,
  ShoppingBag,
  Utensils,
  LogOut,
  Menu,
  X
} from 'lucide-react';

const HotelAdminPanel = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDateRange, setSelectedDateRange] = useState('7days');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Sample data - in real app, this would come from API
  const [dashboardData] = useState({
    totalRevenue: 245680,
    totalBookings: 1248,
    occupancyRate: 85.5,
    averageRating: 4.8,
    revenueGrowth: 12.5,
    bookingsGrowth: 8.3,
    occupancyGrowth: -2.1,
    ratingGrowth: 0.2
  });

  const [rooms] = useState([
    { id: 1, number: '101', type: 'Deluxe Suite', status: 'Occupied', guest: 'John Smith', checkIn: '2024-06-10', checkOut: '2024-06-15', price: 299, floor: 1 },
    { id: 2, number: '102', type: 'Standard Room', status: 'Available', guest: null, checkIn: null, checkOut: null, price: 199, floor: 1 },
    { id: 3, number: '201', type: 'Presidential Villa', status: 'Maintenance', guest: null, checkIn: null, checkOut: null, price: 599, floor: 2 },
    { id: 4, number: '202', type: 'Ocean View Room', status: 'Reserved', guest: 'Sarah Johnson', checkIn: '2024-06-14', checkOut: '2024-06-18', price: 349, floor: 2 },
    { id: 5, number: '301', type: 'Deluxe Suite', status: 'Occupied', guest: 'Mike Wilson', checkIn: '2024-06-12', checkOut: '2024-06-16', price: 299, floor: 3 }
  ]);

  const [bookings] = useState([
    { id: 1, guestName: 'John Smith', room: '101', checkIn: '2024-06-10', checkOut: '2024-06-15', status: 'Checked In', total: 1495, guests: 2 },
    { id: 2, guestName: 'Sarah Johnson', room: '202', checkIn: '2024-06-14', checkOut: '2024-06-18', status: 'Confirmed', total: 1396, guests: 1 },
    { id: 3, guestName: 'Mike Wilson', room: '301', checkIn: '2024-06-12', checkOut: '2024-06-16', status: 'Checked In', total: 1196, guests: 2 },
    { id: 4, guestName: 'Emma Davis', room: '105', checkIn: '2024-06-16', checkOut: '2024-06-20', status: 'Pending', total: 796, guests: 1 },
    { id: 5, guestName: 'Robert Brown', room: '203', checkIn: '2024-06-18', checkOut: '2024-06-22', status: 'Confirmed', total: 1596, guests: 3 }
  ]);

  const [guests] = useState([
    { id: 1, name: 'John Smith', email: 'john@email.com', phone: '+1-555-0123', totalStays: 5, totalSpent: 7450, vipStatus: 'Gold', lastVisit: '2024-06-10' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah@email.com', phone: '+1-555-0124', totalStays: 3, totalSpent: 4200, vipStatus: 'Silver', lastVisit: '2024-05-20' },
    { id: 3, name: 'Mike Wilson', email: 'mike@email.com', phone: '+1-555-0125', totalStays: 8, totalSpent: 12500, vipStatus: 'Platinum', lastVisit: '2024-06-12' },
    { id: 4, name: 'Emma Davis', email: 'emma@email.com', phone: '+1-555-0126', totalStays: 2, totalSpent: 1800, vipStatus: 'Regular', lastVisit: '2024-04-15' },
    { id: 5, name: 'Robert Brown', email: 'robert@email.com', phone: '+1-555-0127', totalStays: 6, totalSpent: 8900, vipStatus: 'Gold', lastVisit: '2024-05-30' }
  ]);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'occupied': case 'checked in': return 'bg-green-100 text-green-800';
      case 'available': return 'bg-blue-100 text-blue-800';
      case 'maintenance': return 'bg-red-100 text-red-800';
      case 'reserved': case 'confirmed': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getVipStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'platinum': return 'bg-purple-100 text-purple-800';
      case 'gold': return 'bg-yellow-100 text-yellow-800';
      case 'silver': return 'bg-gray-100 text-gray-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const StatCard = ({ title, value, change, icon: Icon, trend }) => (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all">
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-sm ${trend === 'up' ? 'bg-green-100 text-green-600' : trend === 'down' ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'}`}>
          {trend === 'up' ? <TrendingUp className="w-4 h-4" /> : trend === 'down' ? <TrendingDown className="w-4 h-4" /> : null}
          {change}%
        </div>
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-1">{value}</h3>
      <p className="text-gray-600">{title}</p>
    </div>
  );

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Revenue" 
          value={`$${dashboardData.totalRevenue.toLocaleString()}`} 
          change={dashboardData.revenueGrowth} 
          icon={DollarSign}
          trend="up"
        />
        <StatCard 
          title="Total Bookings" 
          value={dashboardData.totalBookings.toLocaleString()} 
          change={dashboardData.bookingsGrowth} 
          icon={Calendar}
          trend="up"
        />
        <StatCard 
          title="Occupancy Rate" 
          value={`${dashboardData.occupancyRate}%`} 
          change={dashboardData.occupancyGrowth} 
          icon={Bed}
          trend="down"
        />
        <StatCard 
          title="Average Rating" 
          value={dashboardData.averageRating} 
          change={dashboardData.ratingGrowth} 
          icon={Star}
          trend="up"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            Revenue Analytics
          </h3>
          <div className="h-64 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="w-16 h-16 mx-auto text-blue-400 mb-2" />
              <p className="text-gray-500">Revenue Chart</p>
              <p className="text-sm text-gray-400">Interactive chart would go here</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <PieChart className="w-5 h-5 text-purple-600" />
            Room Occupancy
          </h3>
          <div className="h-64 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <PieChart className="w-16 h-16 mx-auto text-purple-400 mb-2" />
              <p className="text-gray-500">Occupancy Chart</p>
              <p className="text-sm text-gray-400">Interactive chart would go here</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-green-600" />
          Recent Activity
        </h3>
        <div className="space-y-3">
          {[
            { action: 'New booking received', details: 'Room 105 - Emma Davis', time: '5 minutes ago', type: 'booking' },
            { action: 'Payment completed', details: '$1,495 - John Smith', time: '15 minutes ago', type: 'payment' },
            { action: 'Guest checked out', details: 'Room 204 - Michael Johnson', time: '1 hour ago', type: 'checkout' },
            { action: 'Maintenance completed', details: 'Room 301 - AC repair', time: '2 hours ago', type: 'maintenance' }
          ].map((activity, index) => (
            <div key={index} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg">
              <div className={`w-2 h-2 rounded-full ${activity.type === 'booking' ? 'bg-blue-500' : activity.type === 'payment' ? 'bg-green-500' : activity.type === 'checkout' ? 'bg-yellow-500' : 'bg-purple-500'}`}></div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">{activity.action}</p>
                <p className="text-sm text-gray-600">{activity.details}</p>
              </div>
              <span className="text-sm text-gray-500">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

{
  const renderRooms = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Room Management</h2>
        <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Room
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search rooms..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="w-4 h-4" />
              Filter
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Guest</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dates</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {rooms.map((room) => (
                <tr key={room.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">#{room.number}</div>
                    <div className="text-sm text-gray-500">Floor {room.floor}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{room.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(room.status)}`}>
                      {room.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{room.guest || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {room.checkIn && room.checkOut ? `${room.checkIn} - ${room.checkOut}` : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${room.price}/night</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button className="text-blue-600 hover:text-blue-900"><Eye className="w-4 h-4" /></button>
                    <button className="text-green-600 hover:text-green-900"><Edit className="w-4 h-4" /></button>
                    <button className="text-red-600 hover:text-red-900"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderBookings = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Booking Management</h2>
        <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all flex items-center gap-2">
          <Plus className="w-4 h-4" />
          New Booking
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Guest</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dates</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Guests</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {bookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{booking.id.toString().padStart(4, '0')}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                        {booking.guestName.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="text-sm font-medium text-gray-900">{booking.guestName}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">#{booking.room}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.checkIn} - {booking.checkOut}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.guests}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${booking.total.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button className="text-blue-600 hover:text-blue-900"><Eye className="w-4 h-4" /></button>
                    <button className="text-green-600 hover:text-green-900"><Edit className="w-4 h-4" /></button>
                    <button className="text-red-600 hover:text-red-900"><XCircle className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderGuests = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Guest Management</h2>
        <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Guest
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Guest</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">VIP Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Stays</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Spent</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Visit</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {guests.map((guest) => (
                <tr key={guest.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-medium">
                        {guest.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{guest.name}</div>
                        <div className="text-sm text-gray-500">ID: {guest.id.toString().padStart(4, '0')}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 flex items-center gap-1">
                      <Mail className="w-4 h-4 text-gray-400" />
                      {guest.email}
                    </div>
                    <div className="text-sm text-gray-500 flex items-center gap-1">
                      <Phone className="w-4 h-4 text-gray-400" />
                      {guest.phone}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getVipStatusColor(guest.vipStatus)}`}>
                      {guest.vipStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{guest.totalStays}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${guest.totalSpent.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{guest.lastVisit}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button className="text-blue-600 hover:text-blue-900"><Eye className="w-4 h-4" /></button>
                    <button className="text-green-600 hover:text-green-900"><Edit className="w-4 h-4" /></button>
                    <button className="text-purple-600 hover:text-purple-900"><Mail className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

 const renderAnalytics = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
    
    {/* Analytics Stats */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-green-100 rounded-lg">
            <TrendingUp className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Revenue Trend</h3>
            <p className="text-2xl font-bold text-green-600">+15.2%</p>
            <p className="text-sm text-gray-500">vs last month</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-100 rounded-lg">
            <Users className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Guest Satisfaction</h3>
            <p className="text-2xl font-bold text-blue-600">4.8/5</p>
            <p className="text-sm text-gray-500">Average rating</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-purple-100 rounded-lg">
            <Bed className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Avg Stay Duration</h3>
            <p className="text-2xl font-bold text-purple-600">3.2 days</p>
            <p className="text-sm text-gray-500">per booking</p>
          </div>
        </div>
      </div>
    </div>

    {/* Occupancy Rate Chart */}
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Occupancy Rate</h3>
      <div className="grid grid-cols-12 gap-2 items-end h-32">
        {[65, 72, 68, 80, 85, 90, 88, 92, 78, 82, 87, 94].map((rate, index) => (
          <div key={index} className="flex flex-col items-center">
            <div 
              className="bg-gradient-to-t from-blue-500 to-blue-300 rounded-t w-full transition-all duration-300 hover:from-blue-600 hover:to-blue-400"
              style={{ height: `${(rate / 100) * 100}%` }}
            ></div>
            <span className="text-xs text-gray-500 mt-1">
              {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][index]}
            </span>
          </div>
        ))}
      </div>
    </div>

    {/* Revenue Breakdown */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Sources</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Room Bookings</span>
            <div className="flex items-center gap-2">
              <div className="w-24 bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '78%' }}></div>
              </div>
              <span className="text-sm font-semibold text-gray-900">78%</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Food & Beverage</span>
            <div className="flex items-center gap-2">
              <div className="w-24 bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '15%' }}></div>
              </div>
              <span className="text-sm font-semibold text-gray-900">15%</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Spa & Wellness</span>
            <div className="flex items-center gap-2">
              <div className="w-24 bg-gray-200 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: '7%' }}></div>
              </div>
              <span className="text-sm font-semibold text-gray-900">7%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Metrics</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Average Daily Rate (ADR)</span>
            <span className="text-lg font-semibold text-gray-900">$245</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Revenue Per Available Room</span>
            <span className="text-lg font-semibold text-gray-900">$196</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Total Bookings (This Month)</span>
            <span className="text-lg font-semibold text-gray-900">1,247</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Cancellation Rate</span>
            <span className="text-lg font-semibold text-red-600">3.2%</span>
          </div>
        </div>
      </div>
    </div>

    {/* Placeholder for more detailed analytics */}
    <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
      <div className="text-center">
        <BarChart3 className="w-16 h-16 mx-auto text-gray-400 mb-4" />
        <h3 className="text-xl font-semibold text-gray-600 mb-2">Detailed Analytics</h3>
        <p className="text-gray-500">Advanced analytics and reporting features would be implemented here</p>
        <p className="text-sm text-gray-400 mt-2">Including guest demographics, seasonal trends, and predictive analytics</p>
        <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          View Full Report
        </button>
      </div>
    </div>
  </div>

);
}

  // Navigation items
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'rooms', label: 'Rooms', icon: Bed },
    { id: 'bookings', label: 'Bookings', icon: Calendar },
    { id: 'guests', label: 'Guests', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  // Render content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboard();
      case 'rooms':
        return renderRooms();
      case 'bookings':
        return renderBookings();
      case 'guests':
        return renderGuests();
      case 'analytics':
        return renderAnalytics();
      case 'settings':
        return (
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Settings</h2>
            <p className="text-gray-600">Settings and configuration options will be available here.</p>
          </div>
        );
      default:
        return null;
    }
  };

  // Main component render
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg border-r border-gray-100 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-200 lg:static lg:translate-x-0`}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <span className="text-2xl font-bold text-blue-700 tracking-tight">Grand Hotel</span>
          <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`flex items-center w-full px-4 py-2 rounded-lg gap-3 text-lg font-medium transition-colors ${
                activeTab === item.id
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => {
                setActiveTab(item.id);
                setSidebarOpen(false);
              }}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="px-6 py-4 border-t border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
              A
            </div>
            <div>
              <p className="font-semibold text-gray-900">Admin</p>
              <p className="text-xs text-gray-500">admin@luxstay.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              {navItems.find((item) => item.id === activeTab)?.label}
            </h2>
            <p className="text-gray-500">
              {activeTab === 'dashboard' && 'Overview of hotel performance and activity'}
              {activeTab === 'rooms' && 'Manage all rooms and their statuses'}
              {activeTab === 'bookings' && 'View and manage bookings'}
              {activeTab === 'guests' && 'Manage guest information and history'}
              {activeTab === 'analytics' && 'View analytics and reports'}
              {activeTab === 'settings' && 'Configure hotel system settings'}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-full hover:bg-gray-100">
              <Bell className="w-6 h-6 text-gray-500" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100">
              <User className="w-6 h-6 text-gray-500" />
            </button>
            <button className="lg:hidden p-2 rounded-full hover:bg-gray-100" onClick={() => setSidebarOpen(true)}>
              <Menu className="w-6 h-6 text-gray-500" />
            </button>
          </div>
        </div>
        {/* Tab Content */}
        {renderContent()}
      </div>
    </div>
  );
};

export default HotelAdminPanel;

