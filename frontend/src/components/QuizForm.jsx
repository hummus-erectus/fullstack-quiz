import { useState } from 'react'
import { Button } from './styles/Button.styled'
import { Form } from './styles/Form.styled'

const QuizForm = ({ createQuiz }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')

  const addQuiz = async (event) => {
    event.preventDefault()
    createQuiz({
      title: title,
      author: author,
    })

    setTitle('')
    setAuthor('')
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
        <div className='input'>
          author:
          <input
            id="authorInput"
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
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
