import styled from 'styled-components'

export const Table = styled.table`
  tbody tr {
    cursor: pointer;
  }


  tbody tr:nth-child(odd) {
    background: ${({ theme }) => theme.colors.baseHighlight || '#EFEAE6'};
  }

  tbody tr:hover {
    background-color: #EEAF3A;
  }

  .username{
    font-weight: 600;
  }

  .count{
    text-align: center;
  }
`