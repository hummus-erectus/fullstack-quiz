import { createSlice } from '@reduxjs/toolkit'
import questionService from '../services/questions'

const questionSlice = createSlice({
  name: 'questions',
  initialState: [],
  reducers: {
    setQuestions(state, action) {
      return action.payload
    },
    appendQuestion(state, action) {
      const question = action.payload[0]
      state.push(question)
    },
    updateQuestion(state, action) {
      const id = action.payload.id
      const updatedQuestion = action.payload
      return state.map((question) =>
        question.id !== id ? question : updatedQuestion
      )
    },
    removeQuestion(state, action) {
      const id = action.payload.id
      return state.filter((question) => question._id !== id)
    },
  },
})

export const {
  setQuestions,
  appendQuestion,
  updateQuestion,
  removeQuestion,
} = questionSlice.actions

export const initializeQuestions = (quizId) => {
  return async (dispatch) => {
    const questions = await questionService.getByQuizId(quizId)
    dispatch(setQuestions(questions))
  }
}

export const createQuestion = (quizId, content) => {
  return async (dispatch) => {
    const newQuestion = await questionService.create(quizId, content)
    dispatch(appendQuestion(newQuestion))
  }
}

export const updateQuestionAction = (id, updatedContent) => {
  return async (dispatch) => {
    const updatedQuestion = await questionService.update(id, updatedContent)
    dispatch(updateQuestion(updatedQuestion))
  }
}

export const removeQuestionAction = (id, quizId) => {
  return async (dispatch) => {
    await questionService.removeFromOne(id, quizId)
    dispatch(removeQuestion({ id }))
  }
}

export default questionSlice.reducer