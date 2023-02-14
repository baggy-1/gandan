import { useState } from 'react';

const useInput = (initValue: HTMLInputElement['value']) => {
  const [value, setValue] = useState(initValue);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    const {
      target: { value: newValue },
    } = event;

    setValue(newValue);
  };

  return {
    value,
    onChange,
  };
};

export default useInput;
