import React from 'react';
import * as S from './SearchItem.style';
import { Sick } from '../../types';

interface Props {
  sicks: Sick;
  isFocus: boolean;
}

const SearchItem = ({ sicks, isFocus }: Props) => {
  return <S.Item $isFocus={isFocus}>{sicks.sickNm}</S.Item>;
};

export default SearchItem;
