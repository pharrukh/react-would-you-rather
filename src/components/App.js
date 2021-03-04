import './App.css';
import PollResult from './PollResult'
import CreateQuestion from './CreateQuestion'
import LoginPanel from './LoginPanel'
import QuestionList from './QuestionList'
import Navigation from './Navigation'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Leaders from './Leaders'
import { Component } from 'react';
import { _getQuestions, _getUsers, _saveQuestion, _saveQuestionAnswer } from '../_DATA'

class App extends Component {
  state = { authedUser: null, questions: [], users: [] }

  isLoggedIn = () => this.state.authedUser !== null
  login = (userId) => { this.setState({ authedUser: userId }) }
  logout = () => { this.setState({ authedUser: null }) }

  syncData = async () => {
    this.setState({
      users: await _getUsers(),
      questions: await _getQuestions()
    })
  }

  addQuestion = async (optionOneText, optionTwoText, authorId) => {
    const question = { optionOneText, optionTwoText, author: authorId }
    await _saveQuestion(question)
    await this.syncData()
  }

  handleQuestionAnswered = async (questionId, optionType) => {
    console.log(questionId, optionType)
    const updateCommand = { authedUser: this.authedUser, qid: questionId, answer: optionType }
    console.log(updateCommand)
    await _saveQuestionAnswer(updateCommand)
    await this.syncData()
  }

  async componentDidMount() {
    await this.syncData()
  }

  render() {

    if (!this.isLoggedIn()) {
      return (<div className="App">
        <div className="container">
          <LoginPanel users={this.state.users} handleLogin={this.login} />
        </div>
      </div>)
    }

    return (
      <div className="App">
        <Router>
          <Navigation userName={this.isLoggedIn() ? this.state.users[this.state.authedUser].name : null} handleLogout={this.logout} />
          <div className="container">
            <Route path="/" exact >
              <QuestionList users={this.state.users} questions={this.state.questions} authedUser={this.state.authedUser} onQuestionAnswered={this.handleQuestionAnswered} />
            </Route>
            <Route path="/new" exact  ><CreateQuestion handleAddQuestion={this.addQuestion} userId={this.state.authedUser} /></Route>
            <Route path="/leaders" exact > <Leaders users={this.state.users} /></Route>
            <Route path="/question/:id" exact>
              <PollResult questions={this.state.questions} author={this.state.users[this.state.authedUser]} authedUser={this.state.authedUser} />
            </Route>
          </div >
        </Router>
      </div>
    );
  }
}


export default App;
