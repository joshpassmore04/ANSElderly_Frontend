import React, { forwardRef } from 'react';

// Define the props interface, including the new 'password' prop, 'onChange', and 'value'
interface TextInputProps {
  placeholder?: string;
  password?: boolean; // This boolean prop will control whether the input is a password field
  value: string; // The value of the input field
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void; // The function to call when the input changes
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ placeholder, password = false, value, onChange }, ref) => {
    return (
      <input
        type={password ? 'password' : 'text'} // Conditionally set the type based on 'password' prop
        className="border border-gray-300 rounded text-2xl px-4 py-2 bg-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder={placeholder || "Enter text"}
        value={value} // Set the value prop
        onChange={onChange} // Handle change event
        ref={ref}
      />
    );
  }
);