// import { useState } from 'react'
// import { useDispatch } from 'react-redux'
// import { addQuestion } from '../reducers/quizReducer'

// const QuestionForm = ({ quizId }) => {
//   const [question, setQuestion] = useState('')
//   const dispatch = useDispatch()

//   const handleSubmit = (event) => {
//     event.preventDefault()
//     dispatch(addQuestion(quizId, question))
//     setQuestion('')
//   }

//   return (
//     <div>
//       <h2>Add Question</h2>
//       <form onSubmit={handleSubmit}>
//         <label htmlFor="questionInput">Question:</label>
//         <input
//           id="questionInput"
//           type="text"
//           value={question}
//           onChange={(event) => setQuestion(event.target.value)}
//         />
//         <button type="submit">Add Question</button>
//       </form>
//     </div>
//   )
// }

// export default QuestionForm