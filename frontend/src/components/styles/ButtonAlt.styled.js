import styled from 'styled-components'

export const ButtonAlt = styled.button`
    border-radius: 50px;
    border: none;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
    cursor: pointer;
    font-size: 16px;
    font-weight: 700;
    padding: 15px 20px;
    background-color: ${({ theme }) => theme.colors.secondaryContent || '#fff'};
    color: ${({ theme }) => theme.colors.secondary || '#333'};

    &:hover {
        opacity: 0.9;
        transform: scale(0.98);
    }
`
// Reuses code from regular styled button. Could have one component that checks if a prop is provided for color and falls back to the theme and finally to the default color