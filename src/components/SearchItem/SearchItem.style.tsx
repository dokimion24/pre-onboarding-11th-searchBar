import { styled } from 'styled-components';

interface ItemProps {
  $isFocus: boolean;
}

export const Item = styled.li<ItemProps>`
  padding: 12px 20px;
  background-color: ${(props) => (props.$isFocus ? '#efeeee' : 'transparent')};

  &:hover {
    background-color: #efeeee;
  }
`;
