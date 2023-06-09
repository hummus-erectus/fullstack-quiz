import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button } from './styles/Button.styled'
import { MdRemoveCircleOutline, MdAddCircleOutline } from 'react-icons/md'
import { StyledQuestionForm } from './styles/QuestionForm.styled'
import { setNotification } from '../reducers/notificationReducer'

const QuestionForm = ({ addQuestion, quizId }) => {
  const [question, setQuestion] = useState('')
  const [correctAnswer, setCorrectAnswer] = useState('')
  const [incorrectAnswers, setIncorrectAnswers] = useState([{ optionId: 2, content: '' }])

  const dispatch = useDispatch()

  const handleCorrectAnswerChange = (value) => {
    setCorrectAnswer(value)
  }

  const handleIncorrectAnswerChange = (index, value) => {
    const updatedIncorrectAnswers = [...incorrectAnswers]
    updatedIncorrectAnswers[index].content = value
    setIncorrectAnswers(updatedIncorrectAnswers)
  }

  const handleAddIncorrectAnswer = () => {
    if (incorrectAnswers.length < 10) {
      const newOptionId = incorrectAnswers.length + 2
      setIncorrectAnswers([...incorrectAnswers, { optionId: newOptionId, content: '' }])
    }
  }

  const handleRemoveIncorrectAnswer = (index) => {
    const updatedIncorrectAnswers = [...incorrectAnswers]
    updatedIncorrectAnswers.splice(index, 1)
    setIncorrectAnswers(updatedIncorrectAnswers)
  }

  const submitQuiz = (event) => {
    event.preventDefault()

    const filteredIncorrectAnswers = incorrectAnswers.filter((answer) => answer.content.trim() !== '')

    if (correctAnswer.trim() === '' || filteredIncorrectAnswers.length < 1) {
      dispatch(setNotification('You must include a correct answer and at least one incorrect answer', 'error', 5))
      return
    }

    const options = [
      { optionId: 1, content: correctAnswer },
      ...filteredIncorrectAnswers,
    ]

    addQuestion(quizId, {
      questions: [
        {
          content: question,
          options: options,
          correctAnswer: 1
        }
      ]
    })

    setQuestion('')
    setCorrectAnswer('')
    setIncorrectAnswers([{ optionId: 1, content: '' }])
  }

  return (
    <StyledQuestionForm>
      <h2>Add Question</h2>
      <form onSubmit={submitQuiz}>
        <label htmlFor="questionInput">Question:</label>
        <input
          id="questionInput"
          type="text"
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
        />

        <label>Correct Answer:</label>
        <input
          type="text"
          value={correctAnswer}
          onChange={(event) => handleCorrectAnswerChange(event.target.value)}
        />

        <label>Incorrect Answers:</label>
        {incorrectAnswers.map((answer, index) => (
          <div key={index}>
            <input
              type="text"
              value={answer.content}
              onChange={(event) => handleIncorrectAnswerChange(index, event.target.value)}
            />
            {index > 0 && (
              <span onClick={() => handleRemoveIncorrectAnswer(index)} className="inline-icon">
                <MdRemoveCircleOutline className="clickable-icon"/>
              </span>
            )}
          </div>
        ))}

        {incorrectAnswers.length < 10 && (
          <span onClick={handleAddIncorrectAnswer} className="inline-icon">
            <MdAddCircleOutline className="clickable-icon"/>
          </span>
        )}

        <Button type="submit" className="submitButton">
          Add question
        </Button>
      </form>
    </StyledQuestionForm>
  )
}

export default QuestionForm
