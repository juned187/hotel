'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Menu,
  X,
  Hotel,
  Phone,
  Mail,
  User,
  Home,
  BedDouble,
  ConciergeBell,
  CalendarCheck,
} from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <img src="/logo.png" alt="Lux Stay Logo" className="h-8 w-8" />
              <span className="text-xl font-bold text-gray-800">Lux Stay</span>
            </Link>
          </div>


          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="flex items-center gap-1 text-gray-700 hover:text-blue-600 transition">
              <Home className="h-5 w-5" />
              <span>Home</span>
            </Link>
            <Link href="/room" className="flex items-center gap-1 text-gray-700 hover:text-blue-600 transition">
              <BedDouble className="h-5 w-5" />
              <span>Rooms</span>
            </Link>
            <Link href="/facilities" className="flex items-center gap-1 text-gray-700 hover:text-blue-600 transition">
              <ConciergeBell className="h-5 w-5" />
              <span>Facilities</span>
            </Link>
            <Link href="/contact" className="flex items-center gap-1 text-gray-700 hover:text-blue-600 transition">
              <Phone className="h-5 w-5" />
              <span>Contact</span>
            </Link>
            <Link
              href="/login"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 hover:from-blue-700 hover:to-purple-700 transition"
            >
              <User className="h-4 w-4" />
              <span>Login</span>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-blue-600 p-2 rounded-md"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-50 px-4 py-3 space-y-2">
          <Link href="/" onClick={toggleMenu} className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
            <Home className="h-5 w-5" />
            Home
          </Link>
          <Link href="/room" onClick={toggleMenu} className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
            <BedDouble className="h-5 w-5" />
            Rooms
          </Link>
          <Link href="/facilities" onClick={toggleMenu} className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
            <ConciergeBell className="h-5 w-5" />
            Facilities
          </Link>
          <Link href="/contact" onClick={toggleMenu} className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
            <Phone className="h-5 w-5" />
            Contact
          </Link>
          <Link href="/login" onClick={toggleMenu} className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-2 rounded-md">
            <User className="h-4 w-4" />
            Login
          </Link>
          <Link href="/booking" onClick={toggleMenu} className="flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700">
            <CalendarCheck className="h-4 w-4" />
            Book Now
          </Link>
        </div>
      )}
    </nav>
  );
}
