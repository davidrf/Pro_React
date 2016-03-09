import React, { Component, PropTypes } from 'react';

class CheckList extends Component {
  render() {
    let tasks = this.props.tasks.map(task => {
      let { id, done, name } = task;

      return(
        <li key={id} className="checklist__task">
          <input type="checkbox" checked={done} />
          {name}
          <a href="#" className="checklist__task--remove" />
        </li>
      );
    });

    return (
      <div className="checklist">
        <ul>{tasks}</ul>
        <input
          type="text"
          className="checklist--add-task"
          placeholder="Type then hit Enter to add a task"
        />
      </div>
    );
  }
}
CheckList.propTypes = {
  cardId: PropTypes.number,
  tasks: PropTypes.arrayOf(PropTypes.object)
};

export default CheckList;

