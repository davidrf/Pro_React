import React, { Component, PropTypes } from 'react';

class CheckList extends Component {
  constructor(props) {
    super(props);
    this.checkInputKeyPress = this.checkInputKeyPress.bind(this);
  }

  checkInputKeyPress(event) {
    if(event.key === 'Enter') {
      let { cardId, taskCallbacks } = this.props,
          { add } = taskCallbacks
      add(cardId, event.target.value);
      event.target.value = '';
    }
  }

  render() {
    let { tasks, taskCallbacks, cardId } = this.props;
    let { toggle, remove } = taskCallbacks;
    tasks = tasks.map((task, taskIndex ) => {
      let { id, done, name } = task,
          removeClick = remove.bind(null, cardId, id, taskIndex),
          toggleClick = toggle.bind(null, cardId, id, taskIndex);

      return(
        <li key={id} className="checklist__task">
          <input
            type="checkbox"
            checked={done}
            onChange={toggleClick}
          />
          {name}
          <a href="#" className="checklist__task--remove" onClick={removeClick} />
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
          onKeyPress={this.checkInputKeyPress}
        />
      </div>
    );
  }
}
CheckList.propTypes = {
  cardId: PropTypes.number,
  tasks: PropTypes.arrayOf(PropTypes.object),
  taskCallbacks: PropTypes.object
};

export default CheckList;

