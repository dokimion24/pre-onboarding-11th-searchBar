import React, { ChangeEvent } from 'react';
import { getSicks } from '../../service/axios';
import * as S from './SearchForm.style';

interface Props {
  inputValue: string;
  setInputValue: (value: string) => void;
  setSicks: (value: []) => void;
}

const SearchForm = ({ inputValue, setInputValue, setSicks }: Props) => {
  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    const res = await getSicks({ q: e.target.value });
    setSicks(res);
  };

  return (
    <S.Wrapper>
      <S.Input onChange={handleChange} value={inputValue} />
      <S.Button>검색</S.Button>
    </S.Wrapper>
  );
};

export default SearchForm;
