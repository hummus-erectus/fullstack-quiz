import { createSlice } from '@reduxjs/toolkit'
import quizService from '../services/quizzes'

const quizSlice = createSlice({
  name: 'quizzes',
  initialState: [],
  reducers: {
    setQuizzes(state, action) {
      return action.payload
    },
    appendQuiz(state, action) {
      state.push(action.payload)
    },
    update(state, action) {
      const { id, changedQuiz } = action.payload
      return state.map((quiz) => (quiz.id !== id ? quiz : changedQuiz))
    },
    deleteQuiz(state, action) {
      const id = action.payload.id
      return state.filter((quiz) => quiz.id !== id)
    },
  },
})

export const { setQuizzes, appendQuiz, update, deleteQuiz } = quizSlice.actions

export const initializeQuizzes = () => {
  return async (dispatch) => {
    const quizzes = await quizService.getAll()
    const sortedQuizzes = quizzes.sort((a, b) => b.likes - a.likes)
    dispatch(setQuizzes(sortedQuizzes))
  }
}

export const createQuiz = (content) => {
  return async (dispatch) => {
    const newQuiz = await quizService.create(content)
    dispatch(appendQuiz(newQuiz))
  }
}

export const newLike = (id) => {
  return async (dispatch) => {
    const updatedQuiz = await quizService.addLike(id)
    dispatch(update({ id, changedQuiz: updatedQuiz }))
  }
}

export const unLike = (id) => {
  return async (dispatch) => {
    const updatedQuiz = await quizService.removeLike(id)
    dispatch(update({ id, changedQuiz: updatedQuiz }))
  }
}

export const newComment = (id, content) => {
  return async (dispatch) => {
    const addedComment = await quizService.createComment(id, { content: content })
    dispatch(update({ id, changedQuiz: addedComment }))
  }
}

export const removeQuiz = (id) => {
  return async (dispatch) => {
    const quizzes = await quizService.getAll()
    const quizToDelete = quizzes.find((a) => a.id === id)
    await quizService.remove(id)
    dispatch(deleteQuiz(quizToDelete))
  }
}

export const updateQuiz = (id, changedQuiz) => {
  return async (dispatch) => {
    try {
      const updatedQuiz = await quizService.update(id, changedQuiz)
      dispatch(update({ id, changedQuiz: updatedQuiz }))
    } catch (error) {
      // Handle error, e.g., display a notification or show an error message
      console.log('Error updating quiz:', error)
    }
  }
}


export default quizSlice.reducer
