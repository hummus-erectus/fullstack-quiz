import styled from 'styled-components'

export const StyledQuizList = styled.div`

    ul {
        list-style: none;
        margin: 0;
        padding: 0;
    }

    .quiz:nth-child(odd) {
        background-color: #EFEAE6;
    }

    .quiz:hover {
        background-color: #EEAF3A;
    }

    a {
        padding-top: 10px;
        padding-left: 2px;
        display: block;
        color: ${({ theme }) => theme.colors.primaryContent || '#000'};
        text-decoration: none;
    }

    .quizTitle {
        font-weight: 700;
    }
`