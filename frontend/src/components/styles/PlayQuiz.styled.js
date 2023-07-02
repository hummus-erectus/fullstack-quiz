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

  .results-announce{
    font-size: 2em;
    text-align: center;
  }

  .score{
    font-weight: 700;
  }

  .action-btn-container{
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 20px;
  }

  .retry-and-new-btn-container{
    display: flex;
    justify-content: center;
    gap: 10px;
  }

  .incorrect-answers-btn{
    display: flex;
    justify-content: center;
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