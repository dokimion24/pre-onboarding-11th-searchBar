import React, { ChangeEvent } from 'react';
import styled from 'styled-components';
import { getSicks } from '../apis/search';

const Wrapper = styled.div`
  position: relative;
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  font-size: 24px;
  border-radius: 24px;
  padding: 8px 12px;
  outline: none;
  border-color: #fff;
`;

const Button = styled.button`
  font-size: 24px;
  color: #fff;
  position: absolute;
  padding: 8px 12px;
  background-color: #357ae1;
  right: 0;
  border-radius: 0 24px 24px 0;
`;

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
    <Wrapper>
      <Input onChange={handleChange} value={inputValue} />
      <Button>검색</Button>
    </Wrapper>
  );
};

export default SearchForm;
