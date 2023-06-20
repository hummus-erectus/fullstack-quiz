import styled from 'styled-components'

export const StyledQuizView = styled.div`
    display: flex;
    flex-direction: column;

    .description {
        font-weight: 600;
    }

    .username {
        font-weight: 600;
        color: ${({ theme }) => theme.colors.primaryContent || '#000'};
        text-decoration: none;
    }

    ul {
        list-style: none;
        margin: 0;
        padding: 0;
    }

    .commentsContainer {
        margin-top: 30px;
    }

    .userComment {
        background-color: ${({ theme }) => theme.colors.primary || '#FFF'};
        border: 1px solid #ddd;
        border-radius: 10px;
        padding: 10px;
        margin-bottom: 20px;
        margin-left: 20px;
        max-width: 70%;
    }

    .noComments {
        margin-top: 0px;
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    input {
        margin-left: 20px;
        width: 70%;
        height: 2rem;
    }

    Button {
        margin-top: 15px;
        align-self: flex-start;
    }

    .openButtonContainer {
        display: inline;
    }
    .clickableIcon {
        cursor: pointer;
        font-size: 1.2em;
    }

`