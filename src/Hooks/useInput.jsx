import { filterChange } from 'redux/filterSlice';
import { useDispatch } from 'react-redux';

const useInput = () => {
  const dispatch = useDispatch();

  const onInputChange = e => {
    dispatch(filterChange(e.target.value));
  };

  return { onInputChange };
};

export default useInput;
