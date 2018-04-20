import React from 'react'
import {HashRouter as Router, Route} from 'react-router-dom'

import {getQuestion as apiGetQuestion, submitAnswer as apiSubmitAnswer} from '../apiClient'
import Home from './Home'
import QuestionResult from './QuestionResult'
import MakeQuestion from './MakeQuestion'
import AnswerQuestion from './AnswerQuestion'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      currentAnswer: false,
      streak: 0,
      question: {
        id: -1,
        question: '',
        contributor: '',
        percentage: 0
      },
      isCorrect: false,
      error: null
    }
    this.changeName = this.changeName.bind(this)
    this.getQuestion = this.getQuestion.bind(this)
    this.submitAnswer = this.submitAnswer.bind(this)
    this.setAnswer = this.setAnswer.bind(this)
  }

  changeName (e) {
    this.setState({
      name: e.target.value
    })
  }

  getQuestion () {
    apiGetQuestion()
      .then(question => {
        this.setState({
          question
        })
      })
  }

  setAnswer (answer) {
    this.setState({
      currentAnswer: answer
    })
  }

  submitAnswer (id, userAnswer) {
    apiSubmitAnswer(id, userAnswer)
      .then(wasCorrect => {
        this.setState({
          isCorrect: wasCorrect
        })
      })
  }

  render () {
    return (
      <Router>
        <div className='app'>
          <Route exact path='/' render={() => {
            return <Home changeName={this.changeName} />
          }} />
          <Route path='/question/play' render={() => {
            return <AnswerQuestion
              question={this.state.question}
              getQuestion={this.getQuestion}
              setAnswer={this.setAnswer}
            />
          }} />
          <Route path='/question/play/result' render={() => {
            return <QuestionResult
              submitAnswer={this.submitAnswer}
              isCorrect={this.state.isCorrect} />
          }} />
          <Route path='/question/make' render={() => {
            return <MakeQuestion />
          }} />
        </div>
      </Router>
    )
  }
}

export default App
