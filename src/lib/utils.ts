import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility to merge Tailwind CSS classes with clsx and tailwind-merge.
 * This handles conditional classes and ensures that Tailwind classes are merged correctly.
 * 
 * @param inputs - Array of class values (strings, objects, arrays)
 * @returns A single string of merged Tailwind classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

