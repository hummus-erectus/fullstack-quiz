import { useState } from 'react'
import { useSelector } from 'react-redux'
import { StyledQuestionTogglable } from './styles/QuestionTogglable.styled'
import Togglable from './Togglable'
import EditQuestionForm from './EditQuestionForm'
import { FiEdit2 } from 'react-icons/fi'
import { MdRemoveCircleOutline } from 'react-icons/md'

const QuestionTogglable = ({ question, label, isOpen, toggleVisibility, updateQuestion, handleDeleteQuestion, handleEditQuestionSave, editQuestionFormRefs }) => {
  const [isQuestionFormVisible, setQuestionFormVisible] = useState(false)

  const user = useSelector(({ user }) => user)
  const quiz = useSelector(({ activeQuiz }) => activeQuiz)

  const hideWhenVisible = { display: isOpen ? 'none' : '' }
  const showWhenVisible = { display: isOpen ? '' : 'none' }

  const toggleQuestionFormVisibility = () => {
    setQuestionFormVisible(!isQuestionFormVisible)
  }

  const shuffleArray = (array) => {
    const newArray = [...array]
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]]
    }
    return newArray
  }

  return (
    <StyledQuestionTogglable>
      <div style={hideWhenVisible}>
        <p className="label" onClick={toggleVisibility}>
          {label}
        </p>
      </div>
      <div style={showWhenVisible}>
        <p onClick={toggleVisibility}>{label}</p>
        {!isQuestionFormVisible && <ul className="options">
          {shuffleArray(question.options).map((option) => (
            <li className="option" key={`${question._id}-${option.optionId}`}>
              {option.content}
            </li>
          ))}
        </ul>}
        {user && quiz.user.username === user.username && (
          <Togglable
            buttonIcon={FiEdit2}
            buttonLabel="Edit question"
            onToggle={toggleQuestionFormVisibility}
            ref={(ref) => (editQuestionFormRefs.current[question._id] = ref)}
          >
            <EditQuestionForm
              question={question}
              updateQuestion={updateQuestion}
              onSave={() => handleEditQuestionSave(question._id)}
            />
          </Togglable>
        )}
        {user && quiz.user.username === user.username && !isQuestionFormVisible &&
                    <span className="clickableIcon" onClick={() => handleDeleteQuestion(question._id, quiz.id)}><MdRemoveCircleOutline /></span>
        }
      </div>
    </StyledQuestionTogglable>
  )
}

QuestionTogglable.displayName = 'QuestionTogglable'

export default QuestionTogglable