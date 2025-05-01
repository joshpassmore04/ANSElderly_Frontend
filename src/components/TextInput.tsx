import React, { forwardRef } from 'react';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  password?: boolean;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ password = false, ...props }, ref) => {
    return (
      <input
        type={password ? 'password' : 'text'}
        className="border border-gray-300 rounded text-2xl px-4 py-2 bg-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        ref={ref}
        {...props} // Spread remaining props (e.g., name, disabled, etc.)
      />
    );
  }
);
