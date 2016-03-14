import React, { Component, PropTypes } from 'react';
import CardForm from './CardForm';

class EditCard extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentWillMount() {
    const { cards, params } = this.props;
    let cardId,
        newCard;
    cardId = parseInt(params.cardId, 10);
    const card = cards.find(card => card.id === cardId);
    newCard = Object.assign({}, card);
    this.setState(newCard);
  }

  handleChange(field, value) {
    this.setState({ [field]: value });
  }

  handleSubmit(event) {
    const { cardCallbacks } = this.props;
    const { router } = this.context;
    event.preventDefault();
    cardCallbacks.updateCard(this.state);
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
        buttonLabel="Edit Card"
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        handleClose={this.handleClose}
      />
    );
  }
}
EditCard.propTypes = {
  cardCallbacks: PropTypes.object
};
EditCard.contextTypes = {
  router: PropTypes.object.isRequired
};

export default EditCard;

