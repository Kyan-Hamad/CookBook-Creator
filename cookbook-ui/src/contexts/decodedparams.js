import { useParams } from 'react-router-dom';

const useDecodedParams = () => { // This hook is used to decode the URL parameters
  const params = useParams();
  const decodedParams = Object.keys(params).reduce((acc, key) => {
    acc[key] = decodeURIComponent(params[key]);
    return acc;
  }, {});

  return decodedParams;
}

export default useDecodedParams;
