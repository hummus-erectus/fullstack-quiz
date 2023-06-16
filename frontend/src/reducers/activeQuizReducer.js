import { createSlice } from '@reduxjs/toolkit'
import quizService from '../services/quizzes'
import questionService from '../services/questions'

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
    addQuestion(state, action) {
      const question = action.payload[0]
      state.questions.push(question)
    },
    updateQuestion(state, action) {
      const { questionId, updatedQuestion } = action.payload
      return {
        ...state,
        questions: state.questions.map(question =>
          question._id === questionId ? { ...question, ...updatedQuestion } : question
        )
      }
    },
    removeQuestion(state, action) {
      const questionId = action.payload
      return {
        ...state,
        questions: state.questions.filter(question => question._id !== questionId)
      }
    },
  },
})

export const {
  setQuiz,
  update,
  addQuestion,
  updateQuestion,
  removeQuestion
} = activeQuizSlice.actions

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

export const createQuestion = (quizId, questionObject) => {
  return async (dispatch) => {
    const createdQuestion = await questionService.create(quizId, questionObject)
    dispatch(addQuestion(createdQuestion))
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
    dispatch(removeQuestion(id))
  }
}


export default activeQuizSlice.reducer