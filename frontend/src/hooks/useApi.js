import { useContext } from 'react';
import ApiContext from '../contexts/ApiContext';

const useApi = () => {
  const { chatApi } = useContext(ApiContext);
  return chatApi;
};

export default useApi;
