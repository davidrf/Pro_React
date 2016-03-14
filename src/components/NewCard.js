import React, { Component, PropTypes } from 'react';
import CardForm from './CardForm';

class NewCard extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentWillMount() {
    this.setState({
      id: Date.now(),
      title: '',
      description: '',
      status: 'todo',
      color: '#C9C9C9',
      tasks: []
    });
  }

  handleChange(field, value) {
    this.setState({ [field]: value });
  }

  handleSubmit(event) {
    const { cardCallbacks } = this.props;
    const { router } = this.context;
    event.preventDefault();
    cardCallbacks.addCard(this.state);
    router.push('/');
  }

  handleClose(event) {
    const { router } = this.context;
    router.push('/');
  }

  render() {
    return (
      <CardForm
        draftCard={this.state}
        buttonLabel="Create Card"
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        handleClose={this.handleClose}
      />
    );
  }
}
NewCard.propTypes = {
  cardCallbacks: PropTypes.object
};
NewCard.contextTypes = {
  router: PropTypes.object.isRequired
};

export default NewCard;

