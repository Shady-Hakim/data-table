import { useSelector } from 'react-redux';
import { selectDataByItem } from '../redux/data/tableSlice';

const useInputTypes = (type) => {
  const inputTypes = useSelector((state) => selectDataByItem(state, type));
  const filteredInputTypes = inputTypes.filter(
    (el, idx) => el != null && inputTypes.indexOf(el) === idx
  );

  return filteredInputTypes;
};

export default useInputTypes;
