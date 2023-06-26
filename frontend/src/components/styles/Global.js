import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`

    * {
        box-sizing: border-box;
    }

    body {
        color: ${({ theme }) => theme.colors.primaryContent || '#000'};
        background: ${({ theme }) => theme.colors.base || '#FAF7F5'};
        font-family: 'Poppins', sans-serif;
        margin: 0;
    }

`

export default GlobalStyles