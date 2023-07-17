import React from 'react';
import { Sick } from '../apis/search';
import { styled } from 'styled-components';

const Item = styled.li`
  padding: 8px 0;
`;
interface Props {
  sicks: Sick;
}

const SearchItem = ({ sicks }: Props) => {
  return <Item>{sicks.sickNm}</Item>;
};

export default SearchItem;
