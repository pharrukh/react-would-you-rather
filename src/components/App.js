import './App.css';
import PollResult from './PollResult'
import CreateQuestion from './CreateQuestion'
import LoginPanel from './LoginPanel'
import QuestionList from './QuestionList'
import Navigation from './Navigation'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import Leaders from './Leaders'
import { Component } from 'react';
import { _getQuestions, _getUsers, _saveQuestion, _saveQuestionAnswer, _signup } from '../_DATA'
import ReactLoading from 'react-loading';
import Signup from './Signup'
class App extends Component {
  state = { authedUser: null, questions: [], users: [], isLoading: false }

  isLoggedIn = () => this.state.authedUser !== null
  login = (userId) => { this.setState({ ...this.state, authedUser: userId }) }
  logout = () => { this.setState({ authedUser: null }) }

  syncData = async () => {
    this.setState({ ...this.state, isLoading: true })
    this.setState({
      ...this.state,
      users: await _getUsers(),
      questions: await _getQuestions()
    })
    this.setState({ ...this.state, isLoading: false })
  }

  addQuestion = async (optionOneText, optionTwoText, authorId) => {
    this.setState({ ...this.state, isLoading: true })
    const question = { optionOneText, optionTwoText, author: authorId }
    await _saveQuestion(question)
    await this.syncData()
    this.setState({ ...this.state, isLoading: false })
  }

  handleQuestionAnswered = async (questionId, optionType) => {
    this.setState({ ...this.state, isLoading: true })
    const updateCommand = { authedUser: this.state.authedUser, qid: questionId, answer: optionType }
    await _saveQuestionAnswer(updateCommand)
    await this.syncData()
    this.setState({ ...this.state, isLoading: false })
  }

  addUser = async (name, avatarURL) => {
    this.setState({ ...this.state, isLoading: true })
    await _signup(name, avatarURL)
    await this.syncData()
    this.setState({ ...this.state, isLoading: false })
  }

  async componentDidMount() {
    await this.syncData()
  }

  render() {

    if (!this.isLoggedIn()) {

      if (this.state.isLoading) {
        return (<div className="App">
          <div className="container">
            <div className="loading-sign">
              <ReactLoading type='bars' color='#fee715ff' height='3em' width='6em' />
            </div>
          </div>
        </div>)
      }

      return (<div className="App">
        <div className="container">
          <Router>
            <Route path="/" exact><LoginPanel users={this.state.users} handleLogin={this.login} /></Route>
            <Route path="/signup" exact render={props => <Signup handleAddUser={this.addUser} history={props.history} />}></Route>
          </Router>
        </div>
      </div>)
    }

    let content = (<div><Route path="/" exact >
      <QuestionList users={this.state.users} questions={this.state.questions} authedUser={this.state.authedUser} onQuestionAnswered={this.handleQuestionAnswered} />
    </Route>
      <Route path="/new" exact  ><CreateQuestion handleAddQuestion={this.addQuestion} userId={this.state.authedUser} /></Route>
      <Route path="/leaders" exact > <Leaders users={this.state.users} /></Route>
      <Route path="/question/:id" exact>
        <PollResult questions={this.state.questions} author={this.state.users[this.state.authedUser]} authedUser={this.state.authedUser} />
      </Route></div>)

    if (this.state.isLoading) {
      content = <ReactLoading type='bars' color='#fee715ff' height='2em' width='2em' />
    }

    return (
      <div className="App">
        <Router>
          <Navigation userName={this.isLoggedIn() ? this.state.users[this.state.authedUser].name : null} handleLogout={this.logout} />
          <div className="container">
            {content}
          </div >
        </Router>
      </div>
    );
  }
}


export default App;
