import React from "react";

export const Dropdown = ({ title, options, func }) => {
  return (
    <div className="relative group">
      {/* Glassmorphism Container */}
      <div className="glass-container backdrop-blur-lg bg-surface-200/50 border border-surface-300/20 rounded-lg shadow-depth-2 hover:shadow-glow transition-shadow duration-300">
        <select
          defaultValue="0"
          onChange={func}
          name="format"
          id="format"
          className="w-full bg-transparent px-4 py-2.5 text-sm text-primary-300 font-medium appearance-none focus:outline-none focus:ring-2 focus:ring-primary-500/50 rounded-lg cursor-pointer"
        >
          {/* Default Option */}
          <option value="0" disabled className="text-surface-400">
            {title}
          </option>
          {/* Dynamic Options */}
          {options.map((o, i) => {
            // Handling string and object options
            const label = typeof o === "object" ? o.label : o;
            const value = typeof o === "object" ? o.value : o;

            return (
              <option
                key={i}
                value={value}
                className="bg-surface-500 text-primary-100 hover:bg-primary-500 hover:text-surface-900"
              >
                {label.toString().toUpperCase()}
              </option>
            );
          })}
        </select>
      </div>

      {/* Custom Dropdown Icon */}
      <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
        <svg
          className="w-5 h-5 text-primary-400 group-hover:text-primary-300 transition-colors duration-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  );
};
