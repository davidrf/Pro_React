import React, { Component } from 'react';
import 'whatwg-fetch';
import { throttle } from '../utils';
import KanbanBoard from './KanbanBoard';

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
    this.updateCardStatus = throttle(this.updateCardStatus.bind(this));
    this.updateCardPosition = throttle(this.updateCardPosition.bind(this), 500);
    this.persistCardDrag = this.persistCardDrag.bind(this);
  }

  componentDidMount() {
    fetch(`${API_URL}/cards`, { headers: API_HEADERS })
      .then(response => response.json())
      .then(responseData => {
        this.setState({ cards: responseData })
      })
      .catch(error => {
        console.error('Error fetching and parsing data', error);
      });
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

  updateCardStatus(cardId, listId) {
    let previousState = this.state,
        { cards } = this.state,
        cardIndex,
        card,
        nextCard,
        nextCards;

    cardIndex = cards.findIndex(card => card.id === cardId);
    card = cards[cardIndex];

    if (card.status !== listId) {
      nextCard = Object.assign({}, card, {
        status: listId
      });
      nextCards = [
        ...cards.slice(0, cardIndex),
        nextCard,
        ...cards.slice(cardIndex + 1)
      ];
      this.setState({
        cards: nextCards
      });
    }
  }

  updateCardPosition(cardId, afterId) {
    let previousState = this.state,
        { cards } = this.state,
        cardIndex,
        card,
        afterIndex,
        nextCard,
        nextCards;

    if (cardId !== afterId) {
      cardIndex = cards.findIndex(card => card.id === cardId);
      card = cards[cardIndex];
      nextCards = [
        ...cards.slice(0, cardIndex),
        ...cards.slice(cardIndex + 1)
      ];

      afterIndex = cards.findIndex(card => card.id === afterId);
      nextCards.splice(afterIndex, 0, card);

      this.setState({
        cards: nextCards
      });
    }
  }

  persistCardDrag(cardId, status) {
    const { cards } = this.state;
    let cardIndex,
        previousCards,
        previousCard;

    cardIndex = cards.findIndex(card => card.id === cardId);
    const card = cards[cardIndex];

    fetch(`${API_URL}/cards/${cardId}`, {
      method: 'put',
      headers: API_HEADERS,
      body: JSON.stringify({ status: card.status, row_order_position: cardIndex })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("Server response wasn't OK");
      }
    })
    .catch(error => {
      console.error('Fetch error:', error);
      previousCard = Object.assign({}, card, { status });
      previousCards = [
        ...cards.slice(0, cardIndex),
        previousCard,
        ...cards.slice(cardIndex + 1),
      ];
      this.setState({ cards: previousCards });
    })
  }

  render() {
    let { cards } = this.state,
        taskCallbacks = {
          toggle: this.toggleTask,
          remove: this.deleteTask,
          add: this.addTask
        },
        cardCallbacks = {
          updateStatus: this.updateCardStatus,
          updatePosition: this.updateCardPosition,
          persistCardDrag: this.persistCardDrag
        };

    return (
      <KanbanBoard
        cards={cards}
        taskCallbacks={taskCallbacks}
        cardCallbacks={cardCallbacks}
      />
    );
  }
}

export default App;
