import React, { useState } from 'react';
import SearchForm from './components/SearchForm';
import styled from 'styled-components';
import SearchItem from './components/SearchItem';
import { Sick } from './apis/search';
import GlobalStyle from './components/GlobalStyle';

const Title = styled.h1`
  font-size: 32px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 24px;
`;

const Wrapper = styled.section`
  background-color: #fff;
  padding: 12px 20px;
  border-radius: 24px;
`;

const Main = styled.main`
  width: 420px;
`;

const SearchText = styled.p`
  padding: 8px 0;
`;

const SuggestionText = styled.p`
  color: #a4a4a4;
  font-size: 12px;
`;

function App() {
  const [inputValue, setInputValue] = useState('');
  const [sicks, setSicks] = useState<Sick[]>([]);

  return (
    <>
      <GlobalStyle />
      <Main>
        <Title>
          국내 모든 임상시험 검색하고
          <br />
          온라인으로 참여하기
        </Title>
        <SearchForm
          inputValue={inputValue}
          setInputValue={setInputValue}
          setSicks={setSicks}
        />
        {inputValue && (
          <Wrapper>
            <ul>
              <SearchText>{inputValue}</SearchText>
              <SuggestionText>추천 검색어</SuggestionText>
              {sicks.map((item) => (
                <SearchItem key={item.sickCd} sicks={item} />
              ))}
            </ul>
          </Wrapper>
        )}
      </Main>
    </>
  );
}

export default App;
