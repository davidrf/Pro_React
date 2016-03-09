import React, { Component, PropTypes } from 'react';
import List from './List';

class App extends Component {
  render() {
    let { cards } = this.props;
    return (
      <div className="app">
        <List
          id="todo"
          title="To Do"
          cards={cards.filter(card => card.status === "todo")}
        />
        <List
          id="in-progress"
          title="In Progress"
          cards={cards.filter(card => card.status === "in-progress")}
        />
        <List
          id="done"
          title="Done"
          cards={cards.filter(card => card.status === "done")}
        />
      </div>
    );
  }
}
App.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.object)
};

export default App;

