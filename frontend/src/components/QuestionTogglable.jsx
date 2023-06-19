import { StyledQuestionTogglable } from './styles/QuestionTogglable.styled'

const QuestionTogglable = ({ label, isOpen, toggleVisibility, children }) => {
  const hideWhenVisible = { display: isOpen ? 'none' : '' }
  const showWhenVisible = { display: isOpen ? '' : 'none' }

  return (
    <StyledQuestionTogglable>
      <div style={hideWhenVisible}>
        <p className="label" onClick={toggleVisibility}>
          {label}
        </p>
      </div>
      <div style={showWhenVisible}>
        <p onClick={toggleVisibility}>{label}</p>
        {children}
      </div>
    </StyledQuestionTogglable>
  )
}

QuestionTogglable.displayName = 'QuestionTogglable'

export default QuestionTogglable