import React, { Component, PropTypes } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { Link } from 'react-router';
import List from './List';

class KanbanBoard extends Component {
  render() {
    const { cards, taskCallbacks, cardCallbacks, children } = this.props;
    let cardModal = children && React.cloneElement(children, {
      cards,
      cardCallbacks
    });

    return (
      <div className="kanban-board">
        <Link to="/new" className="float-button">+</Link>

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
        {cardModal}
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



