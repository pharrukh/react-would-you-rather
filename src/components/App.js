import './App.css';
import PollResult from './PollResult'
import CreateQuestion from './CreateQuestion'
import LoginPanel from './LoginPanel'
import QuestionList from './QuestionList'
import Navigation from './Navigation'
import { Route, Switch } from 'react-router-dom'
import Leaders from './Leaders'
import { Component } from 'react';
import { _getQuestions, _getUsers, _saveQuestion, _saveQuestionAnswer, _signup } from '../_DATA'
import Signup from './Signup'
import Loading from './Loading'
import { connect } from 'react-redux'
import { hideLoading, showLoading } from '../actions/loading';

class App extends Component {
  state = { authedUser: null, questions: [], users: [] }

  isLoggedIn = () => this.state.authedUser !== null
  login = (userId) => { this.setState({ ...this.state, authedUser: userId }) }
  logout = () => { this.setState({ authedUser: null }) }

  syncData = async () => {
    this.props.dispatch(showLoading());
    this.setState({
      ...this.state,
      users: await _getUsers(),
      questions: await _getQuestions()
    })
    this.props.dispatch(hideLoading());
  }

  addQuestion = async (optionOneText, optionTwoText, authorId) => {
    this.props.dispatch(showLoading());
    const question = { optionOneText, optionTwoText, author: authorId }
    await _saveQuestion(question)
    await this.syncData()
    this.props.dispatch(hideLoading());
  }

  handleQuestionAnswered = async (questionId, optionType) => {
    this.props.dispatch(showLoading());
    const updateCommand = { authedUser: this.state.authedUser, qid: questionId, answer: optionType }
    await _saveQuestionAnswer(updateCommand)
    await this.syncData()
    this.props.dispatch(hideLoading());
  }

  addUser = async (name, avatarURL) => {
    this.props.dispatch(showLoading());
    await _signup(name, avatarURL)
    await this.syncData()
    this.props.dispatch(hideLoading());
  }

  async componentDidMount() {
    await this.syncData()
  }

  render() {
    if (!this.isLoggedIn()) {

      if (this.props.isLoading) {
        return (<div className="App">
          <div className="container">
            <Loading />
          </div>
        </div>)
      }

      return (<div className="App">
        <div className="container">
          <Switch>
            <Route path="/signup" render={props => <Signup handleAddUser={this.addUser} history={props.history} />} />
            <Route path="/*" exact render={() => <LoginPanel users={this.state.users} handleLogin={this.login} />} />
          </Switch>
        </div>
      </div>)
    }

    let content = (
      <div>
        <Route path="/" exact render={() => <QuestionList users={this.state.users} questions={this.state.questions} authedUser={this.state.authedUser} onQuestionAnswered={this.handleQuestionAnswered} />} />
        <Route path="/new" exact render={() => <CreateQuestion handleAddQuestion={this.addQuestion} userId={this.state.authedUser} />} />
        <Route path="/leaders" exact render={() => <Leaders users={this.state.users} />} />
        <Route path="/question/:id" exact render={() => <PollResult questions={this.state.questions} author={this.state.users[this.state.authedUser]} authedUser={this.state.authedUser} />} />
      </div>
    )

    if (this.props.isLoading) {
      content = <Loading />
    }

    return (
      <div className="App">
        <Navigation userName={this.isLoggedIn() ? this.state.users[this.state.authedUser].name : null} handleLogout={this.logout} />
        <div className="container">
          {content}
        </div >
      </div>
    );
  }
}

function mapStateToProps({ loading }) {
  return { isLoading: loading.isLoading }
}

export default connect(mapStateToProps)(App);
