import { useState } from 'react'
import { Button } from './styles/Button.styled'
import { Form } from './styles/Form.styled'

const QuizForm = ({ createQuiz }) => {
  const [title, setTitle] = useState('')

  const addQuiz = async (event) => {
    event.preventDefault()
    createQuiz({
      title: title,
    })

    setTitle('')
  }

  return (
    <Form>
      <h2>Create new entry</h2>

      <form onSubmit={addQuiz}>
        <div className='input'>
          title:
          <input
            id="titleInput"
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
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
