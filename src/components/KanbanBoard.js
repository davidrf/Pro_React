import React, { Component, PropTypes } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import List from './List';

class KanbanBoard extends Component {
  render() {
    let { cards, taskCallbacks, cardCallbacks } = this.props;
    return (
      <div className="kanban-board">
        <List
          id="todo"
          title="To Do"
          taskCallbacks={taskCallbacks}
          cardCallbacks={cardCallbacks}
          cards={cards.filter(card => card.status === "todo")}
        />
        <List
          id="in-progress"
          title="In Progress"
          taskCallbacks={taskCallbacks}
          cardCallbacks={cardCallbacks}
          cards={cards.filter(card => card.status === "in-progress")}
        />
        <List
          id="done"
          title="Done"
          taskCallbacks={taskCallbacks}
          cardCallbacks={cardCallbacks}
          cards={cards.filter(card => card.status === "done")}
        />
      </div>
    );
  }
}
KanbanBoard.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.object),
  taskCallbacks: PropTypes.object,
  cardCallbacks: PropTypes.object
};

export default DragDropContext(HTML5Backend)(KanbanBoard);



