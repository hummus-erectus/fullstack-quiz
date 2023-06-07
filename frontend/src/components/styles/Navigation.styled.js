import styled from 'styled-components'

export const StyledNavigation = styled.div`
    background-color: ${({ theme }) => theme.colors.primary || '#ADD8E6'};

    nav {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    span {
        font-weight: 700;
    }

    a{
        color: ${({ theme }) => theme.colors.primaryContent || '#000'};
        text-decoration: none;
        font-weight: 700;
    }

    .logo {
        font-size: 2rem;
    }

`
