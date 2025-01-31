import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FilterDropdownProps {
  options: string[];
  selectedOption: string;
  onSelect: (option: string) => void;
  label: string;
}

export default function FilterDropdown({ options, selectedOption, onSelect, label }: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative shrink-0" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-3 py-2 rounded-lg border border-[color-mix(in_oklch,var(--color-primary)_20%,transparent)] 
                 hover:border-[color-mix(in_oklch,var(--color-primary)_40%,transparent)] transition-colors
                 flex items-center justify-between min-w-[120px] sm:min-w-[160px] bg-background text-sm sm:text-base"
      >
        <span className="mr-2 truncate">{label}:</span>
        <span className="font-medium truncate">{selectedOption || 'All'}</span>
        <svg
          className={`w-4 h-4 ml-2 transition-transform shrink-0 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-[1] w-full mt-2 bg-background
                     border border-[color-mix(in_oklch,var(--color-primary)_20%,transparent)] rounded-lg shadow-lg"
          >
            <ul className="py-1 max-h-[60vh] overflow-y-auto">
              <li>
                <button
                  onClick={() => {
                    onSelect('');
                    setIsOpen(false);
                  }}
                  className={`w-full px-4 py-2 text-left hover:bg-[color-mix(in_oklch,var(--color-primary)_10%,transparent)] text-sm sm:text-base
                           ${!selectedOption ? 'bg-[color-mix(in_oklch,var(--color-primary)_5%,transparent)]' : ''}`}
                >
                  All
                </button>
              </li>
              {options.map((option) => (
                <li key={option}>
                  <button
                    onClick={() => {
                      onSelect(option);
                      setIsOpen(false);
                    }}
                    className={`w-full px-4 py-2 text-left hover:bg-[color-mix(in_oklch,var(--color-primary)_10%,transparent)] text-sm sm:text-base
                             ${selectedOption === option ? 'bg-[color-mix(in_oklch,var(--color-primary)_5%,transparent)]' : ''}`}
                  >
                    {option}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 
