import { useState } from 'react'
import { Button } from './styles/Button.styled'
import { Form } from './styles/Form.styled'

const QuizForm = ({ createQuiz }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')


  const addQuiz = async (event) => {
    event.preventDefault()
    createQuiz({
      title: title,
      description: description,
    })

    setTitle('')
    setDescription('')
  }

  return (
    <Form>
      <h2>Create new entry</h2>

      <form onSubmit={addQuiz}>
        <div className='input'>
          Title:
          <input
            id="titleInput"
            type="text"
            value={title}
            name="Title"
            required
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div className='input'>
          Description:
          <input
            id="descriptionInput"
            type="text"
            value={description}
            name="Description"
            onChange={({ target }) => setDescription(target.value)}
          />
        </div>
        <Button type="submit" className="submitButton">
          create
        </Button>
      </form>
    </Form>
  )
}

export default QuizForm
