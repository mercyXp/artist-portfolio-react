'use client';

import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Moon, Sun } from "lucide-react";

export default function ThemeToggleButton() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 transition-colors duration-300 cursor-pointer"
      aria-label="Toggle theme"
    >
      {isDark ? (
         <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </button>
  );
}
