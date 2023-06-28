import styled from 'styled-components'

export const StyledPlayQuiz = styled.div`
  .options-container{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
  }

  .option-button{
    flex-basis: 100%;
  }

  @media (min-width: ${({ theme }) => theme.mobile || '600px'}) {
    .options-container{
      justify-content: flex-start;
    }

    .option-button{
      flex-basis: calc(50% - 5px);
    }
  }
`