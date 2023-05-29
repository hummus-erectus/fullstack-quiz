import React, { useState } from 'react'

const PlayQuiz = ({ questions }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState([])
  const [showResults, setShowResults] = useState(false)

  const currentQuestion = questions[currentQuestionIndex]

  const handleAnswerClick = (selectedAnswerIndex) => {
    const answerIsCorrect = selectedAnswerIndex === currentQuestion.correctAnswer
    setUserAnswers([...userAnswers, { question: currentQuestion, isCorrect: answerIsCorrect }])
  }

  const handleNextQuestionClick = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      setShowResults(true)
    }
  }

  const handleRetryClick = () => {
    setCurrentQuestionIndex(0)
    setUserAnswers([])
    setShowResults(false)
  }

  const renderQuestion = () => {
    // Randomize answer options
    const randomizedOptions = shuffleArray(currentQuestion.options)

    const options = randomizedOptions.map((option, index) => {
      const optionLetter = String.fromCharCode(65 + index) // A, B, C, D
      return (
        <button key={index} onClick={() => handleAnswerClick(index)}>
          {optionLetter}. {option}
        </button>
      )
    })

    const shuffleArray = (array) => {
      const shuffledArray = [...array]
      for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]
      }
      return shuffledArray
    }

    return (
      <div>
        <h2>{currentQuestion.content}</h2>
        {options}
      </div>
    )
  }

  const renderFeedback = () => {
    const lastAnswer = userAnswers[userAnswers.length - 1]
    const isCorrect = lastAnswer.isCorrect
    const correctAnswer = lastAnswer.question.options[lastAnswer.question.correctAnswer]

    return (
      <div>
        <p>{isCorrect ? 'Correct!' : 'Incorrect!'}</p>
        {!isCorrect && <p>The correct answer is: {correctAnswer}</p>}
        <button onClick={handleNextQuestionClick}>Next Question</button>
      </div>
    )
  }

  const renderResults = () => {
    const totalQuestions = questions.length
    const totalCorrectAnswers = userAnswers.filter(answer => answer.isCorrect).length
    const score = (totalCorrectAnswers / totalQuestions) * 100

    const incorrectQuestions = userAnswers.filter(answer => !answer.isCorrect).map(answer => answer.question)

    const incorrectQuestionsList = incorrectQuestions.map((question, index) => (
      <li key={index}>{question.content}</li>
    ))

    return (
      <div>
        <h2>Results</h2>
        <p>Your score: {score}%</p>
        <button onClick={handleRetryClick}>Retry Quiz</button>
        <button>Go Back to QuizView</button>
        <h3>Incorrect Questions</h3>
        <ul>{incorrectQuestionsList}</ul>
      </div>
    )
  }

  return (
    <div>
      {!showResults && renderQuestion()}
      {showResults && renderResults()}
      {userAnswers.length > 0 && !showResults && renderFeedback()}
    </div>
  )
}

export default PlayQuiz
