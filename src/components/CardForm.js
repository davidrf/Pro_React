import React, { Component, PropTypes } from 'react';

class CardForm extends Component {
  constructor(props) {
    super(props);
    const { handleSubmit } = this.props;
    this.handleSubmit = handleSubmit.bind(this);
    this.handleChangeForTitle = this.handleChange.bind(this, 'title');
    this.handleChangeForDescription = this.handleChange.bind(this, 'description');
    this.handleChangeForStatus = this.handleChange.bind(this, 'status');
    this.handleChangeForColor = this.handleChange.bind(this, 'color');
    this.handleClose = this.handleClose.bind(this);
  }

  handleChange(field, event) {
    const { handleChange } = this.props;
    handleChange(field, event.target.value);
  }

  handleClose(event) {
    const { handleClose } = this.props;
    event.preventDefault();
    handleClose();
  }

  render() {
    const { draftCard, buttonLabel } = this.props;

    return (
      <div>
        <div className="card big">
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              value={draftCard.title}
              onChange={this.handleChangeForTitle}
              placeholder="Title"
              required
              autoFocus
            />
            <br />
            <textarea
              value={draftCard.description}
              onChange={this.handleChangeForDescription}
              placeholder="Description"
              required
            />
            <br />
            <label htmlFor="status">Status</label>
            <select
              id="status"
              value={draftCard.status}
              onChange={this.handleChangeForStatus}
            >
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
            <br />
            <label htmlFor="color">Color</label>
            <input
              id="color"
              value={draftCard.color}
              onChange={this.handleChangeForColor}
              type="color"
              defaultValue="#FF0000"
            />
            <div className="actions">
              <button type="submit">{buttonLabel}</button>
            </div>
          </form>
        </div>
        <div className="overlay" onClick={this.handleClose} />
      </div>
    );
  }
}

CardForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  draftCard: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    status: PropTypes.string,
    color: PropTypes.string,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired
};

export default CardForm;

