import styled from 'styled-components'

export const StyledQuizList = styled.div`
    margin-bottom: 16px;

    ul {
        list-style: none;
        margin: 0;
        padding: 0;
    }

    li {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .quiz:nth-child(odd) {
        background: ${({ theme }) => theme.colors.baseHighlight || '#EFEAE6'};
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

    .clickable-icon {
        color: ${({ theme }) => theme.colors.secondaryContent || '#000'};
        margin-top: 5px;
        margin-right: 5px;
        font-size: 1.2em;
        font-weight: 500;
        cursor: pointer;
    }
`