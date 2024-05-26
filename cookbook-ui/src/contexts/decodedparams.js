import { useParams } from 'react-router-dom';

const useDecodedParams = () => {
  const params = useParams();
  const decodedParams = Object.keys(params).reduce((acc, key) => {
    acc[key] = decodeURIComponent(params[key]);
    return acc;
  }, {});

  return decodedParams;
}

export default useDecodedParams;
