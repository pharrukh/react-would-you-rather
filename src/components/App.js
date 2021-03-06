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
  state = { questions: [], users: [] }

  isLoggedIn = () => this.props.authedUser

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
    const updateCommand = { authedUser: this.props.authedUser, qid: questionId, answer: optionType }
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
            <Route path="/*" exact render={() => <LoginPanel users={this.state.users} />} />
          </Switch>
        </div>
      </div>)
    }

    let content = (
      <div>
        <Route path="/" exact render={() => <QuestionList users={this.state.users} questions={this.state.questions} authedUser={this.props.authedUser} onQuestionAnswered={this.handleQuestionAnswered} />} />
        <Route path="/new" exact render={() => <CreateQuestion handleAddQuestion={this.addQuestion} userId={this.props.authedUser} />} />
        <Route path="/leaders" exact render={() => <Leaders users={this.state.users} />} />
        <Route path="/question/:id" exact render={() => <PollResult questions={this.state.questions} author={this.state.users[this.props.authedUser]} authedUser={this.props.authedUser} />} />
      </div>
    )

    if (this.props.isLoading) {
      content = <Loading />
    }

    return (
      <div className="App">
        <Navigation userName={this.isLoggedIn() ? this.state.users[this.props.authedUser].name : null}/>
        <div className="container">
          {content}
        </div >
      </div>
    );
  }
}

function mapStateToProps({ loading, users }) {
  return { isLoading: loading.isLoading, authedUser: users.authedUser }
}

export default connect(mapStateToProps)(App);
