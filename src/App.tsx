import React from 'react';
import SearchList from './components/SearchList';
import SearchForm from './components/SearchForm';
import styled from 'styled-components';

const Title = styled.h1`
  font-size: 32px;
  text-align: center;
`;

function App() {
  return (
    <>
      <Title>
        국내 모든 임상시험 검색하고
        <br />
        온라인으로 참여하기
      </Title>
      <SearchForm />
      <SearchList />
    </>
  );
}

export default App;
