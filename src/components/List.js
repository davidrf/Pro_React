import React, { Component, PropTypes } from 'react';
import Card from './Card';

class List extends Component {
  render() {
    let cards = this.props.cards.map(card => {
      let { id, title, description, tasks, color } = card;
      return (
        <Card
          key={id}
          id={id}
          title={title}
          description={description}
          color={color}
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
List.propTypes = {
  title: PropTypes.string.isRequired,
  cards: PropTypes.arrayOf(PropTypes.object)
};

export default List;
