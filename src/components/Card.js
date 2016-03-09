import React, { Component, PropTypes } from 'react';
import CheckList from './CheckList';
import marked from 'marked';

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
    let { title, description, id, tasks } = this.props,
        className = 'card__title',
        cardDetails;

    if (this.state.showDetails) {
      cardDetails = (
        <div className="card__details">
          <span dangerouslySetInnerHTML={{ __html: marked(description)}} />
          <CheckList cardId={id} tasks={tasks} />
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

    return (
      <div className="card">
        <div style={sideColor} />
        <div className={className} onClick={this.toggleDetails}>{title}</div>
        {cardDetails}
      </div>
    );
  }
}
Card.propTypes = {
  id: PropTypes.number,
  title: titlePropType,
  description: PropTypes.string,
  color: PropTypes.string,
  tasks: PropTypes.arrayOf(PropTypes.object),
};

export default Card;

