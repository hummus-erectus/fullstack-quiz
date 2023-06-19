import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Button } from './styles/Button.styled'
import { ButtonAlt } from './styles/ButtonAlt.styled'

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
    if (props.onToggle) {
      props.onToggle(!visible)
    }
  }

  const isVisible = () => {
    return visible
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
      isVisible,
    }
  })

  const renderButton = () => {
    if (props.buttonIcon) {
      return <span onClick={toggleVisibility}><props.buttonIcon className="buttonIcon"/></span>
    }
    return <Button onClick={toggleVisibility}>{props.buttonLabel}</Button>
  }

  return (
    <>
      <div className="openButtonContainer" style={hideWhenVisible}>
        {renderButton()}
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <ButtonAlt onClick={toggleVisibility}>{props.closeButtonLabel || 'Cancel'}</ButtonAlt>
      </div>
    </>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  buttonIcon: PropTypes.elementType,
}

Togglable.displayName = 'Togglable'

export default Togglable
