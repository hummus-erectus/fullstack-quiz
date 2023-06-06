import { useState } from 'react'
import { Button } from './styles/Button.styled'
import { Form } from './styles/Form.styled'

const EditableField = ({ initialValue, onChange, tagName, originalValue, required }) => {

  const [isEditing, setIsEditing] = useState(false)
  const [value, setValue] = useState(initialValue)

  const handleEditClick = () => {
    setIsEditing(true)
  }

  const handleBlur = () => {
    if (required && value.trim() === '') {
      setValue(originalValue)
    } else if ((originalValue && value.trim() === originalValue) || (!originalValue && value.trim() === '')) {
      setIsEditing(false)
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
          value={value}
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
    <div>
      <Tag>{value}</Tag>
      <button onClick={handleEditClick}>
        Edit
      </button>
    </div>
  )
}

export default EditableField
