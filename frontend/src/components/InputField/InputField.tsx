import { useField } from 'formik';
import React, { InputHTMLAttributes, ReactElement } from 'react';

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  type: string;
  placeholder: string;
  onChange: any;
  label: string | ReactElement;
  htmlFor: string;
  name: string;
};

export const InputField: React.FC<InputFieldProps> = ({
  type,
  placeholder,
  onChange,
  label,
  htmlFor,
  ...props
}) => {
  const [field, { error }] = useField(props);
  return (
    <>
      <label
        className='block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase'
        htmlFor={htmlFor}
      >
        {label}
      </label>
      <input
        className={`${
          error && 'border-red-500 focus:ring-2 focus:ring-red-200 focus:outline-none'
        } border w-full text-base placeholder-gray-400 rounded py-1.5 px-3`}
        type={type}
        placeholder={placeholder}
        value={field.value}
        onChange={onChange}
        name={field.name}
      />
      {error ? <span className='text-sm text-red-600'>{error}</span> : null}
    </>
  );
};
