import { createSlice } from '@reduxjs/toolkit'
import quizService from '../services/quizzes'

const activeQuizSlice = createSlice({
  name: 'quiz',
  initialState: [],
  reducers: {
    setQuiz(state, action) {
      return action.payload
    },
    update(state, action) {
      return { ...state, ...action.payload }
    },
  },
})

export const { setQuiz, update } = activeQuizSlice.actions

export const initializeQuiz = (id) => {
  return async (dispatch) => {
    const quiz = await quizService.getIndividual(id)
    dispatch(setQuiz(quiz))
  }
}

export const newLike = (id) => {
  return async (dispatch) => {
    try {
      const updatedQuiz = await quizService.addLike(id)
      dispatch(setQuiz(updatedQuiz))
    } catch (error) {
      // Handle error
      console.log('Error adding like:', error)
    }
  }
}

export const unLike = (id) => {
  return async (dispatch) => {
    try {
      const updatedQuiz = await quizService.removeLike(id)
      dispatch(setQuiz(updatedQuiz))
    } catch (error) {
      // Handle error
      console.log('Error removing like:', error)
    }
  }
}

export const newComment = (id, content) => {
  return async (dispatch) => {
    try {
      const addedComment = await quizService.createComment(id, { content: content })
      dispatch(setQuiz(addedComment))
    } catch (error) {
      // Handle error
      console.log('Error adding comment:', error)
    }
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

export default activeQuizSlice.reducer