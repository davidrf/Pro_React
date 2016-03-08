import React, { Component } from 'react';
import CheckList from './CheckList';

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDetails: false
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    let showDetails = !this.state.showDetails;
    this.setState({ showDetails });
  }

  render() {
    let { title, description, id, tasks } = this.props,
        cardDetails;

    if (this.state.showDetails) {
      cardDetails = (
        <div className="card__details">
          {description}
          <CheckList cardId={id} tasks={tasks}/>
        </div>
      );
    }

    return (
      <div className="card" onClick={this.handleClick}>
        <div className="card__title">{title}</div>
        {cardDetails}
      </div>
    );
  }
}

export default Card;

