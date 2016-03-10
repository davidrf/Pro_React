import React, { Component } from 'react';
import KanbanBoard from './KanbanBoard';
import 'whatwg-fetch';

const API_URL = 'http://kanbanapi.pro-react.com';
const API_HEADERS = {
  'Content-Type': 'application/json',
  Authorization: 'meowmeowbeanz'
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: []
    };

    this.addTask = this.addTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.toggleTask = this.toggleTask.bind(this);
  }

  addTask(cardId, taskName) {
    let previousState = this.state,
        { cards } = this.state,
        cardIndex,
        card,
        tasks,
        nextTask,
        nextTasks,
        nextCard,
        nextCards;

    cardIndex = cards.findIndex(card => card.id === cardId);
    card = cards[cardIndex];
    tasks = card.tasks;
    nextTask = { id: Date.now(), name: taskName, done: false };
    nextTasks = [
      ...tasks,
      nextTask
    ];
    nextCard = Object.assign({}, card, {
      tasks: nextTasks
    });
    nextCards = [
      ...cards.slice(0, cardIndex),
      nextCard,
      ...cards.slice(cardIndex + 1)
    ];
    this.setState({ cards: nextCards })

    fetch(`${API_URL}/cards/${cardId}/tasks`, {
      headers: API_HEADERS,
      method: 'post',
      body: JSON.stringify(nextTask)
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Server response wasn't OK");
      }
    })
    .then(responseData => {
      nextTask.id = responseData.id;
      this.setState({ cards: nextCards })
    })
    .catch(error => {
      this.setState(previousState);
    });
  }

  deleteTask(cardId, taskId, taskIndex) {
    let previousState = this.state,
        { cards } = this.state,
        cardIndex,
        card,
        tasks,
        nextTasks,
        nextCard,
        nextCards;

    cardIndex = cards.findIndex(card => card.id === cardId);
    card = cards[cardIndex];
    tasks = card.tasks;
    nextTasks = [
      ...tasks.slice(0, taskIndex),
      ...tasks.slice(taskIndex + 1),
    ];
    nextCard = Object.assign({}, card, {
      tasks: nextTasks
    });
    nextCards = [
      ...cards.slice(0, cardIndex),
      nextCard,
      ...cards.slice(cardIndex + 1)
    ];
    this.setState({ cards: nextCards })

    fetch(`${API_URL}/cards/${cardId}/tasks/${taskId}`, {
      headers: API_HEADERS,
      method: 'delete'
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("Server response wasn't OK");
      }
    })
    .catch(error => {
      console.error('Fetch error:', error);
      this.setState(previousState);
    });
  }

  toggleTask(cardId, taskId, taskIndex) {
    let previousState = this.state,
        { cards } = this.state,
        cardIndex,
        card,
        tasks,
        task,
        nextDone,
        nextTask,
        nextTasks,
        nextCard,
        nextCards;

    cardIndex = cards.findIndex(card => card.id === cardId);
    card = cards[cardIndex];
    tasks = card.tasks;
    task = tasks.find(task => task.id === taskId);
    nextDone = !task.done;
    nextTask = Object.assign({}, task, {
      done: nextDone
    });
    nextTasks = [
      ...tasks.slice(0, taskIndex),
      nextTask,
      ...tasks.slice(taskIndex + 1),
    ];
    nextCard = Object.assign({}, card, {
      tasks: nextTasks
    });
    nextCards = [
      ...cards.slice(0, cardIndex),
      nextCard,
      ...cards.slice(cardIndex + 1)
    ];
    this.setState({ cards: nextCards })

    fetch(`${API_URL}/cards/${cardId}/tasks/${taskId}`, {
      headers: API_HEADERS,
      method: 'put',
      body: JSON.stringify({ done: nextDone })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("Server response wasn't OK");
      }
    })
    .catch(error => {
      console.error('Fetch error:', error);
      this.setState(previousState);
    });
  }

  componentDidMount() {
    fetch(`${API_URL}/cards`, { headers: API_HEADERS })
      .then(response => response.json())
      .then(responseData => {
        this.setState({ cards: responseData })
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
  }

  render() {
    let { cards } = this.state;
    let taskCallbacks = {
      toggle: this.toggleTask,
      remove: this.deleteTask,
      add: this.addTask
    };
    return (
      <KanbanBoard
        cards={cards}
        taskCallbacks={taskCallbacks}
      />
    );
  }
}

export default App;
