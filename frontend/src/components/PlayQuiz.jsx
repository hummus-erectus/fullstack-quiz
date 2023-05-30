import React, { useState, useEffect } from 'react'
import Togglable from './Togglable'
import { Button } from './styles/Button.styled'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

const PlayQuiz = ({ questions }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [showFeedback, setShowFeedback] = useState(false)
  const [userAnswers, setUserAnswers] = useState([])
  const [shuffledOptions, setShuffledOptions] = useState([])

  SpeechRecognition.startListening({ continuous: true })

  const optionLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

  const commands = [
    {
      command: 'Next question',
      callback: () => {
        if (showFeedback && !isLastQuestion) {
          handleNextQuestion()
        }
      },
      isFuzzyMatch: true,
      fuzzyMatchingThreshold: 0.5
    },
    {
      command: 'See results',
      callback: () => {
        if (showFeedback && isLastQuestion) {
          handleNextQuestion()
        }
      },
      isFuzzyMatch: true,
      fuzzyMatchingThreshold: 0.5
    },
    {
      command: 'Retry Quiz',
      callback: () => {
        if (currentQuestionIndex === -1) {
          handleRetryQuiz()
        }
      },
      isFuzzyMatch: true,
      fuzzyMatchingThreshold: 0.5
    },
    {
      command: 'hey',
      callback: () => {
        if (!showFeedback && currentQuestion) {
          const optionLettersArray = optionLetters.split('') // Convert optionLetters to an array
          const optionIndex = optionLettersArray.findIndex((letter) => letter.toLowerCase() === 'a')
          if (optionIndex !== -1) {
            const optionId = shuffledOptions[optionIndex].optionId
            handleAnswerClick(optionId)
          }
        }
      },
      isFuzzyMatch: true,
      fuzzyMatchingThreshold: 0.5
    },
    {
      command: 'see',
      callback: () => {
        if (!showFeedback && currentQuestion) {
          const optionLettersArray = optionLetters.split('') // Convert optionLetters to an array
          const optionIndex = optionLettersArray.findIndex((letter) => letter.toLowerCase() === 'c')
          if (optionIndex !== -1) {
            const optionId = shuffledOptions[optionIndex].optionId
            handleAnswerClick(optionId)
          }
        }
      },
      isFuzzyMatch: true,
      fuzzyMatchingThreshold: 0.5
    },
    ...shuffledOptions.map((option, index) => ({
      command: optionLetters[index].toLowerCase(),
      callback: () => {
        if (!showFeedback) {
          handleAnswerClick(option.optionId)
        }
      },
      isFuzzyMatch: true,
      fuzzyMatchingThreshold: 0.2
    }))
  ]

  const { transcript } = useSpeechRecognition({ commands })

  useEffect(() => {
    console.log(transcript)
  }, [transcript])

  useEffect(() => {
    if(currentQuestionIndex !== -1){
      shuffleOptions()
    }
  }, [currentQuestionIndex])

  const currentQuestion = questions[currentQuestionIndex]
  const isLastQuestion = currentQuestionIndex === questions.length - 1

  const shuffleOptions = () => {
    const options = [...currentQuestion.options]
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]]
    }
    setShuffledOptions(options)
  }

  const handleAnswerClick = (optionId) => {
    const isCorrect = optionId === currentQuestion.correctAnswer
    setUserAnswers((prevAnswers) => [
      ...prevAnswers,
      { questionId: currentQuestion._id, optionId, isCorrect },
    ])
    setScore((prevScore) => (isCorrect ? prevScore + 1 : prevScore))
    setShowFeedback(true)
  }

  const handleNextQuestion = () => {
    setShowFeedback(false)
    if (isLastQuestion) {
      setCurrentQuestionIndex(-1) // Set to -1 to indicate showing result screen
    } else {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1)
      shuffleOptions()
    }
  }

  const handleRetryQuiz = () => {
    setCurrentQuestionIndex(0)
    setScore(0)
    setUserAnswers([])
    setShowFeedback(false)
    setUserAnswers([])
  }

  const renderOptions = () => {
    return shuffledOptions.map((option, index) => (
      <button
        key={option._id}
        onClick={() => handleAnswerClick(option.optionId)}
        disabled={showFeedback}
      >
        {optionLetters[index]}. {option.content}
      </button>
    ))
  }


  const renderFeedback = () => {
    const { options, correctAnswer } = currentQuestion
    const selectedAnswer = userAnswers[userAnswers.length - 1]
    const isCorrect = selectedAnswer.isCorrect

    return (
      <div>
        <p>{isCorrect ? 'Correct!' : 'Incorrect!'}</p>
        {!isCorrect && (
          <p>
            The correct answer is:{' '}
            {options.find((option) => option.optionId === correctAnswer).content}
          </p>
        )}
        {isLastQuestion ? (
          <button onClick={handleNextQuestion}>See Results</button>
        ) : (
          <button onClick={handleNextQuestion}>Next Question</button>
        )}
      </div>
    )
  }

  const renderResult = () => {
    const totalQuestions = questions.length
    const incorrectAnswers = userAnswers.filter((answer) => !answer.isCorrect)

    return (
      <div>
        <p>Your score: {score}/{totalQuestions}</p>

        <Button onClick={handleRetryQuiz}>Retry Quiz</Button>
        {incorrectAnswers.length > 0 && (
          <div>
            <Togglable buttonLabel="See Incorrect Answers">
              {incorrectAnswers.map((answer) => {
                const question = questions.find((q) => q._id === answer.questionId)
                const selectedOption = question.options.find(
                  (option) => option.optionId === answer.optionId
                )
                const correctOption = question.options.find(
                  (option) => option.optionId === question.correctAnswer
                )

                return (
                  <div key={question._id}>
                    <h3>Question: {question.content}</h3>
                    <p>Your answer: {selectedOption.content}</p>
                    <p>Correct answer: {correctOption.content}</p>
                  </div>
                )
              })}
            </Togglable>

          </div>
        )}
      </div>
    )
  }


  return (
    <div>
      {currentQuestionIndex === -1 ? (
        renderResult()
      ) : (
        <>
          <h2>Question {currentQuestionIndex + 1}</h2>
          <p>{currentQuestion.content}</p>
          {renderOptions()}
          {showFeedback && renderFeedback()}
        </>
      )}
    </div>
  )
}

export default PlayQuiz
