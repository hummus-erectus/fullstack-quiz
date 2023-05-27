import { useState } from 'react'
import { Button } from './styles/Button.styled'

const QuestionForm = ({ addQuestion, quizId }) => {
  const [question, setQuestion] = useState('')
  const [correctAnswer, setCorrectAnswer] = useState('')
  const [incorrectAnswers, setIncorrectAnswers] = useState(['', '', ''])

  const handleCorrectAnswerChange = (value) => {
    setCorrectAnswer(value)
  }

  const handleIncorrectAnswerChange = (index, value) => {
    const updatedIncorrectAnswers = [...incorrectAnswers]
    updatedIncorrectAnswers[index] = value
    setIncorrectAnswers(updatedIncorrectAnswers)
  }

  const handleAddIncorrectAnswer = () => {
    if (incorrectAnswers.length < 10) {
      setIncorrectAnswers([...incorrectAnswers, ''])
    }
  }

  const handleRemoveIncorrectAnswer = (index) => {
    const updatedIncorrectAnswers = [...incorrectAnswers]
    updatedIncorrectAnswers.splice(index, 1)
    setIncorrectAnswers(updatedIncorrectAnswers)
  }

  const submitQuiz = (event) => {
    event.preventDefault()

    // Remove empty incorrect answers
    const filteredIncorrectAnswers = incorrectAnswers.filter((answer) => answer.trim() !== '')

    // Check if there are at least two options (one correct answer and one incorrect answer)
    if (correctAnswer.trim() === '' || filteredIncorrectAnswers.length < 1) {
      // Display an error message or handle it accordingly
      console.log('missing answers')
      return
    }

    const options = [correctAnswer, ...filteredIncorrectAnswers]

    addQuestion(quizId, {
      content: question,
      options: options,
    })

    setQuestion('')
    setCorrectAnswer('')
    setIncorrectAnswers(['', '', ''])
  }

  return (
    <div>
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
              value={answer}
              onChange={(event) => handleIncorrectAnswerChange(index, event.target.value)}
            />
            {index >0 && (
              <Button type="button" onClick={() => handleRemoveIncorrectAnswer(index)}>
                Remove
              </Button>
            )}
          </div>
        ))}

        {incorrectAnswers.length < 10 && (
          <Button type="button" onClick={handleAddIncorrectAnswer}>
            Add Incorrect Answer
          </Button>
        )}

        <Button type="submit" className="submitButton">
          Add question
        </Button>
      </form>
    </div>
  )
}

export default QuestionForm