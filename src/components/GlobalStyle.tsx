import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  display: flex;
  justify-content: center;
  height:100vh;
  background-color: #d0e8fd;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
}

button {
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
}

li {
    list-style:none
}
`;

export default GlobalStyle;
