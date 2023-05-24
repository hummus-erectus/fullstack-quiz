import { Link } from 'react-router-dom'

const Quiz = ({ quiz }) => {
  return (
    <li className='quiz'>
      <Link to={`/quizzes/${quiz.id}`}><span className="quizTitle">{quiz.title}</span> by <span className="quizAuthor">{quiz.author}</span></Link>
    </li>
  )
}

export default Quiz
