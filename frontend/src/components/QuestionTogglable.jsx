// import { useState, forwardRef, useImperativeHandle } from 'react'
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
      <div className="visibleContents" style={showWhenVisible}>
        <p className="question" onClick={toggleVisibility}>{label}</p>
        {children}
      </div>
    </StyledQuestionTogglable>
  )
}

QuestionTogglable.displayName = 'QuestionTogglable'

export default QuestionTogglable
