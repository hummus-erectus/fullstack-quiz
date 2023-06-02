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
    update(state, action) {
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

export const { setQuizzes, appendQuiz, update, deleteQuiz } = quizSlice.actions

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
    const updatedQuiz = await quizService.addLike(id)
    dispatch(update(updatedQuiz))
  }
}

export const unLike = id => {
  return async dispatch => {
    const updatedQuiz = await quizService.removeLike(id)
    dispatch(update(updatedQuiz))
  }
}

export const newComment = (id, content) => {
  return async dispatch => {
    const addedComment = await quizService.createComment(id, { content: content })
    dispatch(update(addedComment))
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