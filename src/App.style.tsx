import styled from 'styled-components';

export const Title = styled.h1`
  font-size: 32px;
  line-height: 1.6;

  font-weight: 600;
  text-align: center;
  margin-bottom: 24px;
`;

export const Wrapper = styled.section`
  padding: 12px 0;
  background-color: #fff;
  border-radius: 16px;
`;

export const Main = styled.main`
  width: 420px;
`;

export const SearchText = styled.p`
  padding: 12px 20px;

  &:hover {
    background-color: #efeeee;
  }
`;

export const NotSearchText = styled.p`
  padding: 0 20px;
`;

export const SuggestionText = styled.p`
  color: #a4a4a4;
  padding: 0 20px;
  font-size: 12px;
`;
