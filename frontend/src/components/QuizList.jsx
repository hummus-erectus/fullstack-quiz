import Quiz from './Quiz'
import { StyledQuizList } from './styles/QuizList.styled'

const QuizList = ({ quizzes }) => {
  return (
    <StyledQuizList>
      <h2>Quiz list</h2>
      <ul>
        {quizzes
          .map((quiz) => (
            <Quiz
              key={quiz.id}
              quiz={quiz}
            />
          ))}
      </ul>
    </StyledQuizList>
  )
}

export default QuizList

