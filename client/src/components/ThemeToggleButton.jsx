import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Moon, Sun } from "lucide-react";

function ThemeToggleButton() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-gray-900 dark:bg-gray-800 transition-colors duration-300"
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

export default ThemeToggleButton;