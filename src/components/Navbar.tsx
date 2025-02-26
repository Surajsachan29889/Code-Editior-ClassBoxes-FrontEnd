'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Code2, User } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { getItem, removeItem, setItem } from '@/lib/localStorage';
import { useGetUserMutation } from '@/slices/rtk-query/apis';
import { token, user } from '@/constants/constants';
import { GetUserResponse } from '@/types';
import { useRouter } from 'next/navigation';
const Navbar: React.FC = () => {
  const [getUser] = useGetUserMutation();
  const [userState, setUserState] = useState<GetUserResponse | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const jwtToken = getItem(token);
        console.log({jwtToken});
        if (jwtToken) {
          const response = await getUser(jwtToken);
          if (response.data) {
            setItem(user, JSON.stringify(response.data));
            setUserState(response.data);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = () => {
    removeItem(user);
    removeItem(token);
    router.push('/auth/login');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 w-full bg-white dark:bg-dark-900 shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center"
          >
            <Link href="/" className="flex items-center space-x-2">
              <Code2 className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">CodeFlow</span>
            </Link>
          </motion.div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            {getItem(token) ? (
              <div className="flex items-center space-x-2">
                <User className="w-8 h-8 text-gray-600 dark:text-gray-400" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  {userState?.data?.name || 'User'}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-red-600 dark:hover:text-red-400"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="px-4 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  Login
                </Link>
                <Link
                  href="/auth/signup"
                  className="px-4 py-2 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
