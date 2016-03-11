import React, { Component, PropTypes } from 'react';
import { DropTarget } from 'react-dnd';
import Card from './Card';
import constants from '../constants';

const listTargetSpec = {
  hover(props, monitor) {
    const draggedId = monitor.getItem().id;
    props.cardCallbacks.updateStatus(draggedId, props.id);
  }
};

let collect = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget()
  };
};

class List extends Component {
  render() {
    const { cards, taskCallbacks, cardCallbacks, connectDropTarget } = this.props;
    let cardComponents = cards.map(card => {
      let { id, title, description, tasks, color, status } = card;
      return (
        <Card
          key={id}
          id={id}
          title={title}
          description={description}
          color={color}
          tasks={tasks}
          status={status}
          cardCallbacks={cardCallbacks}
          taskCallbacks={taskCallbacks}
        />
      );
    });

    return connectDropTarget(
      <div className="list">
        <h1>{this.props.title}</h1>
        {cardComponents}
      </div>
    );
  }
}
List.propTypes = {
  title: PropTypes.string.isRequired,
  cards: PropTypes.arrayOf(PropTypes.object),
  taskCallbacks: PropTypes.object,
  cardCallbacks: PropTypes.object,
  connectDropTarget: PropTypes.func.isRequired
};

export default DropTarget(constants.CARD, listTargetSpec, collect)(List);
