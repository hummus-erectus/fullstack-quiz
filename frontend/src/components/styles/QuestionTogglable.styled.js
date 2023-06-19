import styled from 'styled-components'

export const StyledQuestionTogglable = styled.div`

.label{
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
}

.question{
  background-color: #EFEAE6;
  margin-bottom:0;
}

.childContents{
  display: flex;
}

.options {
  width: 100%;
  display: inline-flex;
  gap: 2em;
  justify-content: space-between;
  color: red;
  background: lightblue;
}

.option {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.removeIcon{
  color: ${({ theme }) => theme.colors.secondaryContent || '#000'};
  font-size: 1.2em;
  font-weight: 500;
  cursor: pointer;
}

.buttonIcon{
  font-size: 1.2em;
  font-weight: 500;
  cursor: pointer;
}
`