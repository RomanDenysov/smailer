import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  /* Ваши глобальные стили здесь */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    font-family: 'Poppins', sans-serif;
    position: relative;
    background-color: ${props => props.theme.colors.background};
    filter: brightness(1.2) contrast(0.9) saturate(1.2);
    &::before {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      background: linear-gradient(45deg, #f3f3f3 25%, transparent 25%, transparent 75%, #f3f3f3 75%, #f3f3f3);
      background-size: 1rem 1rem;
      opacity: 0.1;
      pointer-events: none;
    }
  }

  a, Link, .link {
    color: ${props => props.theme.colors.text};
    text-decoration: none;
  }

  /* Дополнительные глобальные стили, если необходимо */
`;

export default GlobalStyles;