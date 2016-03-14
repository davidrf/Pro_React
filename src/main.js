import './main.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import App from './components/App';
import KanbanBoard from'./components/KanbanBoard';
import NewCard from'./components/NewCard';
import EditCard from'./components/EditCard';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route component={App}>
      <Route path="/" component={KanbanBoard}>
        <Route path="new" component={NewCard} />
        <Route path="edit/:cardId" component={EditCard} />
      </Route>
    </Route>
  </Router>,
  document.getElementById('app')
);
