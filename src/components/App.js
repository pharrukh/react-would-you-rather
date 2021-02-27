import './App.css';
import PollResult from './PollResult'
import Question from './Question'
import CreateQuestion from './CreateQuestion'

let users = {
  timurshukhratov: {
    id: 'timurshukhratov',
    name: 'Timur Shukhratov',
    avatarURL: 'https://www.normuradov.com/assets/timur_shukhratov.jpeg',
    answers: {
      "8xf0y6ziyjabvozdd253nd": 'optionOne',
      "6ni6ok3ym7mf1p33lnez": 'optionTwo',
      "am8ehyc8byjqgar0jgpub9": 'optionTwo',
      "loxhs1bqm25b708cmbf3g": 'optionTwo'
    },
    questions: ['8xf0y6ziyjabvozdd253nd', 'am8ehyc8byjqgar0jgpub9']
  },
  malikatimurova: {
    id: 'malikatimurova',
    name: 'Malika Timurova',
    avatarURL: 'https://www.normuradov.com/assets/malika_timurova.jpg',
    answers: {
      "vthrdm985a262al8qx3do": 'optionOne',
      "xj352vofupe1dqz9emx13r": 'optionTwo',
    },
    questions: ['loxhs1bqm25b708cmbf3g', 'vthrdm985a262al8qx3do'],
  },
  khasanmukhamedov: {
    id: 'khasanmukhamedov',
    name: 'Khasan Mukhamedov',
    avatarURL: 'https://www.normuradov.com/assets/khasan_mukhamedov.jpg',
    answers: {
      "xj352vofupe1dqz9emx13r": 'optionOne',
      "vthrdm985a262al8qx3do": 'optionTwo',
      "6ni6ok3ym7mf1p33lnez": 'optionTwo'
    },
    questions: ['6ni6ok3ym7mf1p33lnez', 'xj352vofupe1dqz9emx13r'],
  }
}

let questions = {
  "8xf0y6ziyjabvozdd253nd": {
    id: '8xf0y6ziyjabvozdd253nd',
    author: 'timurshukhratov',
    timestamp: 1467166872634,
    optionOne: {
      votes: ['timurshukhratov'],
      text: 'go to Korzinka',
    },
    optionTwo: {
      votes: [],
      text: 'go to Marko'
    }
  },
  "6ni6ok3ym7mf1p33lnez": {
    id: '6ni6ok3ym7mf1p33lnez',
    author: 'khasanmukhamedov',
    timestamp: 1468479767190,
    optionOne: {
      votes: [],
      text: 'study in Great Britain',
    },
    optionTwo: {
      votes: ['khasanmukhamedov', 'timurshukhratov'],
      text: 'study in Uzbekistan'
    }
  },
  "am8ehyc8byjqgar0jgpub9": {
    id: 'am8ehyc8byjqgar0jgpub9',
    author: 'timurshukhratov',
    timestamp: 1488579767190,
    optionOne: {
      votes: [],
      text: '',
    },
    optionTwo: {
      votes: ['timurshukhratov'],
      text: 'pay higher salary'
    }
  },
  "loxhs1bqm25b708cmbf3g": {
    id: 'loxhs1bqm25b708cmbf3g',
    author: 'malikatimurova',
    timestamp: 1482579767190,
    optionOne: {
      votes: [],
      text: 'work for government',
    },
    optionTwo: {
      votes: ['timurshukhratov'],
      text: 'build own company'
    }
  },
  "vthrdm985a262al8qx3do": {
    id: 'vthrdm985a262al8qx3do',
    author: 'malikatimurova',
    timestamp: 1489579767190,
    optionOne: {
      votes: ['malikatimurova'],
      text: 'focus on technology',
    },
    optionTwo: {
      votes: ['khasanmukhamedov'],
      text: 'focus on social processes'
    }
  },
  "xj352vofupe1dqz9emx13r": {
    id: 'xj352vofupe1dqz9emx13r',
    author: 'khasanmukhamedov',
    timestamp: 1493579767190,
    optionOne: {
      votes: ['khasanmukhamedov'],
      text: 'write in Russian',
    },
    optionTwo: {
      votes: ['malikatimurova'],
      text: 'write in Uzbek'
    }
  },
}

function App() {
  return (
    <div className="App">
      <CreateQuestion />
      <Question question={questions['8xf0y6ziyjabvozdd253nd']} author={users['timurshukhratov']} />
      <PollResult question={questions['8xf0y6ziyjabvozdd253nd']} author={users['timurshukhratov']} authedUser={'timurshukhratov'} />
    </div >
  );
}

export default App;
