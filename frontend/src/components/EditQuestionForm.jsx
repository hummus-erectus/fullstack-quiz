import { useState } from 'react'
import { Button } from './styles/Button.styled'
import { MdRemoveCircleOutline, MdAddCircleOutline } from 'react-icons/md'
import { StyledQuestionForm } from './styles/QuestionForm.styled'

const EditQuestionForm = ({ question, updateQuestion, onSave }) => {

  const correctAnswerOption = question.options.find(
    (option) => option.optionId === question.correctAnswer
  )

  const incorrectAnswerOptions = question.options.filter(
    (option) => option.optionId !== question.correctAnswer
  )

  const incorrectAnswerContents = incorrectAnswerOptions.map((option, index) => ({
    objectId: index + 2,
    content: option.content,
  }))

  const [questionContent, setQuestionContent] = useState(question.content)
  const [correctAnswer, setCorrectAnswer] = useState(correctAnswerOption.content)
  const [incorrectAnswers, setIncorrectAnswers] = useState(incorrectAnswerContents)

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

    // Remove empty incorrect answers
    const filteredIncorrectAnswers = incorrectAnswers.filter((answer) => answer.content.trim() !== '')

    // Check if there are at least two options (one correct answer and one incorrect answer)
    if (correctAnswer.trim() === '' || filteredIncorrectAnswers.length < 1) {
      // Display an error message or handle it accordingly
      console.log('missing answers')
      return
    }

    const options = [
      { optionId: 1, content: correctAnswer },
      ...filteredIncorrectAnswers.map((answer, index) => ({
        optionId: index + 2,
        content: answer.content,
      })),
    ]

    updateQuestion(question._id, {
      content: questionContent,
      options: options,
      correctAnswer: 1
    })

    onSave()
  }

  return (
    <StyledQuestionForm>
      <h2>Edit Question</h2>
      <form onSubmit={submitQuiz}>
        <label htmlFor="questionInput">Question:</label>
        <input
          id="questionInput"
          type="text"
          value={questionContent}
          onChange={(event) => setQuestionContent(event.target.value)}
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
          <span onClick={handleAddIncorrectAnswer} className='block-icon'>
            <MdAddCircleOutline className="clickable-icon"/>
          </span>
        )}

        <Button type="submit" className="submitButton">
          Save question
        </Button>
      </form>
    </StyledQuestionForm>
  )
}

export default EditQuestionForm
