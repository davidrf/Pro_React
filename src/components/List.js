import React, { Component } from 'react';
import Card from './Card';

class List extends Component {
  render() {
    let cards = this.props.cards.map(card => {
      let { id, title, description, tasks } = card;

      return (
        <Card
          id={id}
          title={title}
          description={description}
          tasks={tasks}
        />
      );
    });

    return (
      <div className="list">
        <h1>{this.props.title}</h1>
        {cards}
      </div>
    );
  }
}

export default List;
