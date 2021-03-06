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
import { handleLoadData } from '../actions/shared'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleLoadData());
  }

  isLoggedIn = () => this.props.authedUser

  handleQuestionAnswered = async (questionId, optionType) => {
    this.props.dispatch(showLoading());
    const updateCommand = { authedUser: this.props.authedUser, qid: questionId, answer: optionType }
    await _saveQuestionAnswer(updateCommand)
    this.props.dispatch(hideLoading());
  }

  render() {
    if (!this.isLoggedIn()) {

      if (this.props.isLoading || this.props.isLoading === undefined) {
        return (<div className="App">
          <div className="container">
            <Loading />
          </div>
        </div>)
      }

      return (<div className="App">
        <div className="container">
          <Switch>
            <Route path="/signup" render={props => <Signup history={props.history} />} />
            <Route path="/*" exact render={() => <LoginPanel users={this.props.users} />} />
          </Switch>
        </div>
      </div>)
    }

    let content = (
      <div>
        <Route path="/" exact render={() => <QuestionList users={this.props.users} questions={this.props.questions} authedUser={this.props.authedUser} onQuestionAnswered={this.handleQuestionAnswered} />} />
        <Route path="/new" exact render={() => <CreateQuestion userId={this.props.authedUser} />} />
        <Route path="/leaders" exact render={() => <Leaders users={this.props.users} />} />
        <Route path="/question/:id" exact render={() => <PollResult questions={this.props.questions} author={this.props.users[this.props.authedUser]} authedUser={this.props.authedUser} />} />
      </div>
    )

    if (this.props.isLoading) {
      content = <Loading />
    }

    return (
      <div className="App">
        <Navigation userName={this.isLoggedIn() ? this.props.users[this.props.authedUser].name : null} />
        <div className="container">
          {content}
        </div >
      </div>
    );
  }
}

function mapStateToProps({ loading, users, questions }) {
  return { isLoading: loading.isLoading, authedUser: users.authedUser, users: users.users, questions: questions.questions }
}

export default connect(mapStateToProps)(App);
