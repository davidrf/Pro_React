import React, { Component, PropTypes } from 'react';
import List from './List';

class KanbanBoard extends Component {
  render() {
    let { cards, taskCallbacks } = this.props;
    return (
      <div className="app">
        <List
          id="todo"
          title="To Do"
          taskCallbacks={taskCallbacks}
          cards={cards.filter(card => card.status === "todo")}
        />
        <List
          id="in-progress"
          title="In Progress"
          taskCallbacks={taskCallbacks}
          cards={cards.filter(card => card.status === "in-progress")}
        />
        <List
          id="done"
          title="Done"
          taskCallbacks={taskCallbacks}
          cards={cards.filter(card => card.status === "done")}
        />
      </div>
    );
  }
}
KanbanBoard.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.object),
  taskCallbacks: PropTypes.object
};

export default KanbanBoard;



