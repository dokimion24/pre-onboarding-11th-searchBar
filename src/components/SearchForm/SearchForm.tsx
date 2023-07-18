import React, { useEffect } from 'react';
import * as S from './SearchForm.style';
import { CacheApiServer } from '../../service/cache';
import useDebounce from '../../hooks/useDeounce';

interface Props {
  inputValue: string;
  setInputValue: (value: string) => void;
  setSicks: (value: []) => void;
}

const SearchForm = ({ inputValue, setInputValue, setSicks }: Props) => {
  const debouncedValue = useDebounce(inputValue);

  useEffect(() => {
    const getSicks = async () => {
      const res = await CacheApiServer.getSearchByQuery(debouncedValue);
      setSicks(res);
    };
    if (debouncedValue) getSicks();
  }, [debouncedValue]);

  return (
    <S.Wrapper>
      <S.Input
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
      />
      <S.Button>검색</S.Button>
    </S.Wrapper>
  );
};

export default SearchForm;
