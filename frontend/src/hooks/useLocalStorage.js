import { useState, useEffect } from 'react';

const useLocalStorage = (key) => {
  const [value, setValue] = useState(() => {
    const data = JSON.parse(localStorage.getItem(key));
    return data || null;
  });
  useEffect(() => localStorage.setItem(key, JSON.stringify(value)), [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
