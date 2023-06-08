import { useState } from 'react'
import { Button } from './styles/Button.styled'
import { Form } from './styles/Form.styled'
import { FiEdit2 } from 'react-icons/fi'
import { StyledEditableField } from './styles/EditableField.styled'

const EditableField = ({ initialValue, onChange, tagName, originalValue, required, placeholder }) => {

  const [isEditing, setIsEditing] = useState(false)
  const [value, setValue] = useState(initialValue)

  const handleEditClick = () => {
    setIsEditing(true)
  }

  const handleBlur = () => {
    const trimmedValue = value.trim()
    if (required && trimmedValue === '') {
      setValue(originalValue || '')
    } else if (
      (originalValue && value && trimmedValue === originalValue) ||
      (originalValue && value && trimmedValue === '') ||
      (!originalValue && !value) ||
      (!originalValue && value && trimmedValue === '')
    ) {
      setIsEditing(false)
      setValue(originalValue || '')
    } else {
      onChange(value)
      setIsEditing(false)
    }
  }

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  if (isEditing) {
    return (
      <Form>
        <input
          type="text"
          value={value || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          autoFocus
        />
        <Button type="button" onClick={handleBlur}>Save</Button>
      </Form>
    )
  }

  const Tag = tagName

  return (
    <StyledEditableField>
      {!value && placeholder?
        <Tag className="placeholder">{placeholder}</Tag>
        :
        <Tag>{value}</Tag>
      }
      <span onClick={handleEditClick} className="clickable-icon">
        <FiEdit2 />
      </span>
    </StyledEditableField>
  )
}

export default EditableField
