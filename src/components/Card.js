import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import marked from 'marked';
import { DragSource, DropTarget } from 'react-dnd';
import CheckList from './CheckList';
import constants from '../constants';

let titlePropType = (props, propName, componentName) => {
  if (props[propName]) {
    let value = props[propName];
    if (typeof value !== 'string' || value.length > 80) {
      return new Error(
        `${propName} in ${componentName} is longer than 80 characters`
      );
    }
  }
};

const cardDragSpec = {
  beginDrag(props) {
    return {
      id: props.id,
      status: props.status
    };
  },
  endDrag(props) {
    const { id, status, cardCallbacks } = props;
    cardCallbacks.persistCardDrag(id, status);
  }
};

const cardDropSpec = {
  hover(props, monitor) {
    const draggedId = monitor.getItem().id;
    props.cardCallbacks.updatePosition(draggedId, props.id);
  }
};

let collectDrag = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource()
  };
};

let collectDrop = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget()
  };
};

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDetails: false
    };

    this.toggleDetails = this.toggleDetails.bind(this);
  }

  toggleDetails(event) {
    let showDetails = !this.state.showDetails;
    this.setState({ showDetails });
  }

  render() {
    const { title, description, id, tasks, taskCallbacks } = this.props,
          { connectDragSource, connectDropTarget } = this.props;

    let className = 'card__title',
        cardDetails;

    if (this.state.showDetails) {
      cardDetails = (
        <div className="card__details">
          <span dangerouslySetInnerHTML={{ __html: marked(description)}} />
          <CheckList cardId={id} tasks={tasks} taskCallbacks={taskCallbacks} />
        </div>
      );
      className += ' card__title--is-open';
    }

    let sideColor = {
      position: 'absolute',
      zIndex: -1,
      top: 0,
      bottom: 0,
      left: 0,
      width: 7,
      backgroundColor: this.props.color
    };

    return connectDropTarget(
      connectDragSource(
        <div className="card">
          <div style={sideColor} />
          <div className={className} onClick={this.toggleDetails}>{title}</div>
          <ReactCSSTransitionGroup
            transitionName="toggle"
            transitionEnterTimeout={250}
            transitionLeaveTimeout={250}
          >
            {cardDetails}
          </ReactCSSTransitionGroup>
        </div>
      )
    );
  }
}
Card.propTypes = {
  id: PropTypes.number,
  title: titlePropType,
  description: PropTypes.string,
  color: PropTypes.string,
  tasks: PropTypes.arrayOf(PropTypes.object),
  taskCallbacks: PropTypes.object,
  cardCallbacks: PropTypes.object,
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired
};

const dragHighOrderCard = DragSource(constants.CARD, cardDragSpec, collectDrag)(Card);
const dragDropHighOrderCard = DropTarget(constants.CARD, cardDropSpec, collectDrop)(dragHighOrderCard);
export default dragDropHighOrderCard;

