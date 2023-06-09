import { useState, forwardRef, useImperativeHandle } from 'react'
// import PropTypes from 'prop-types'
import { StyledQuestionTogglable } from './styles/QuestionTogglable.styled'

const QuestionTogglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const isVisible = () => {
    return visible
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
      isVisible
    }
  })

  return (
    <StyledQuestionTogglable>
      <div style={hideWhenVisible}>
        <p className="label" onClick={toggleVisibility}>{props.label}</p>
      </div>
      <div style={showWhenVisible}>
        <p onClick={toggleVisibility}>{props.label}</p>
        {props.children}
      </div>
    </StyledQuestionTogglable>
  )
})

// QuestionTogglable.propTypes = {
//   buttonLabel: PropTypes.string.isRequired,
// }

QuestionTogglable.displayName = 'QuestionTogglable'

export default QuestionTogglable
