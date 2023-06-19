import styled from 'styled-components'

export const StyledQuestionTogglable = styled.div`

.label{

  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
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
`