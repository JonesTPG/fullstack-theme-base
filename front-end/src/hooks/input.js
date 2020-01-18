import { useState } from 'react';

const useField = type => {
  const [value, setValue] = useState('');

  const onChange = event => {
    setValue(event.target.value);
  };

  const resetState = () => {
    setValue('');
  };

  const inputprops = () => {
    return {
      type,
      value,
      onChange
    };
  };

  return {
    type,
    value,
    onChange,
    resetState,
    inputprops
  };
};

export default useField;
