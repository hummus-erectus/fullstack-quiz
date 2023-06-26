import styled from 'styled-components'

export const Form = styled.div`
  margin-bottom: 10px;

  a {
    color: ${({ theme }) => theme.colors.primaryContent || '#000'};
    text-decoration: none;
    font-weight: 700;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .input {
    font-weight: 600;
    display: flex;
    justify-content: space-between;
    width: 300px;
  }

  input {
    background-color: ${({ theme }) => theme.colors.primary || '#FFF'};
    color: ${({ theme }) => theme.colors.primaryContent || '#000'};
    font-weight: 600;
  }

  Button {
    align-self: flex-start;
    margin-bottom: 16px;
  }
`