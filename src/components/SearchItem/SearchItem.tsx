import React from 'react';
import { Sick } from '../../apis/search';
import * as S from './SearchItem.style';

interface Props {
  sicks: Sick;
}

const SearchItem = ({ sicks }: Props) => {
  return <S.Item>{sicks.sickNm}</S.Item>;
};

export default SearchItem;
