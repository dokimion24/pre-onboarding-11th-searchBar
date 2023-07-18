import React, { useState } from 'react';
import SearchForm from './components/SearchForm/SearchForm';
import SearchItem from './components/SearchItem/SearchItem';
import { Sick } from './service/axios';
import GlobalStyle from './components/GlobalStyle';
import * as S from './App.style';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [sicks, setSicks] = useState<Sick[]>([]);

  return (
    <>
      <GlobalStyle />
      <S.Main>
        <S.Title>
          국내 모든 임상시험 검색하고
          <br />
          온라인으로 참여하기
        </S.Title>
        <SearchForm
          inputValue={inputValue}
          setInputValue={setInputValue}
          setSicks={setSicks}
        />
        {inputValue && (
          <S.Wrapper>
            {sicks.length > 0 ? (
              <ul>
                <S.SearchText>{inputValue}</S.SearchText>
                {sicks.length > 0 && (
                  <S.SuggestionText>추천 검색어</S.SuggestionText>
                )}
                {sicks.map((item) => (
                  <SearchItem key={item.sickCd} sicks={item} />
                ))}
              </ul>
            ) : (
              <>
                <S.SearchText>{inputValue}</S.SearchText>
                <S.NotSearchText>검색어 없음</S.NotSearchText>
              </>
            )}
          </S.Wrapper>
        )}
      </S.Main>
    </>
  );
}

export default App;
