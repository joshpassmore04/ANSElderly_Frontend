// FormContext.tsx
import React, { createContext, useContext, useState } from 'react';

type FormData = { [key: string]: string };

interface FormContextType {
  formData: FormData;
  setField: (name: string, value: string) => void;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export const useFormContext = () => {
  const ctx = useContext(FormContext);
  if (!ctx) throw new Error("useFormContext must be used within a FormProvider");
  return ctx;
};

export const FormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<FormData>({});

  const setField = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <FormContext.Provider value={{ formData, setField, setFormData }}>
      {children}
    </FormContext.Provider>
  );
};
