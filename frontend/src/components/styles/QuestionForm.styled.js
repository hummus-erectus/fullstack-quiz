import styled from 'styled-components'

export const StyledQuestionForm = styled.div`

.inline-icon {
  margin: 0.2em;
}

.block-icon {
  margin-left: 1em;
}

.clickable-icon {
  color: ${({ theme }) => theme.colors.secondaryContent || '#000'};
  font-size: 1.2em;
  font-weight: 500;
  cursor: pointer;
}



`