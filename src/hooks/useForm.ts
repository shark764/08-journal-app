import { ChangeEvent, useState } from 'react';

const useForm = <T>(initialState = {}) => {
  const [values, setValues] = useState<T>(initialState as T);

  const handleInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setValues((state) => ({
      ...state,
      [target.name]: target.value,
    }));
  };

  const resetForm = () => {
    setValues(initialState as T);
  };

  return [values, handleInputChange, resetForm] as const;
};

export default useForm;
