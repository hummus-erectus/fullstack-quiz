import { createSlice } from '@reduxjs/toolkit'
import quizService from '../services/quizzes'

const quizSlice = createSlice({
  name: 'quizzes',
  initialState: [],
  reducers: {
    setQuizzes(state, action) {
      return(action.payload)
    },
    appendQuiz(state, action) {
      state.push(action.payload)
    },
    addLike(state, action) {
      const id = action.payload.id
      const changedQuiz = action.payload
      return state.map(quiz =>
        quiz.id !== id? quiz : changedQuiz
      )
    },
    addComment(state, action) {
      const id = action.payload.id
      const changedQuiz = action.payload
      return state.map(quiz =>
        quiz.id !== id? quiz : changedQuiz
      )
    },
    deleteQuiz(state, action) {
      const id = action.payload.id
      return state.filter((quiz) => quiz.id !== id)
    }
  }
})

export const { setQuizzes, appendQuiz, addLike, addComment, deleteQuiz } = quizSlice.actions

export const initializeQuizzes = () => {
  return async dispatch => {
    const quizzes = await quizService.getAll()
    const sortedQuizzes = quizzes.sort((a, b) => b.likes - a.likes)
    dispatch(setQuizzes(sortedQuizzes))
  }
}

export const createQuiz = content => {
  return async dispatch => {
    const newQuiz = await quizService.create(content)
    dispatch(appendQuiz(newQuiz))
  }
}

export const newLike = id => {
  return async dispatch => {
    const quizzes = await quizService.getAll()
    const quizToChange = quizzes.find(a => a.id === id)
    const changedQuiz = {
      ...quizToChange,
      likes: quizToChange.likes+1
    }
    const result = await quizService.update(id, changedQuiz)
    dispatch(addLike(result))
  }
}

export const newComment = (id, content) => {
  return async dispatch => {
    const addedComment = await quizService.createComment(id, { content: content })
    dispatch(addComment(addedComment))
  }
}

export const removeQuiz = id => {
  return async dispatch => {
    const quizzes = await quizService.getAll()
    const quizToDelete = quizzes.find(a => a.id === id)
    await quizService.remove(id)
    dispatch(deleteQuiz(quizToDelete))
  }
}

export default quizSlice.reducer