import { ChangeEvent, useState } from 'react';

const useForm = <T>(initialState = {}) => {
  const [values, setValues] = useState<T>(initialState as T);

  const handleInputChange = ({
    target,
  }: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    setValues((state) => ({
      ...state,
      [target.name]: target.value,
    }));
  };

  const resetForm = (newState = initialState) => {
    setValues(newState as T);
  };

  return [values, handleInputChange, resetForm] as const;
};

export default useForm;
