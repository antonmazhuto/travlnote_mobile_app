import React, {useState} from 'react';

export const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  const onChange = (text) => {
    setValue(text);
  };
  return {value, onChange, setValue};
};
