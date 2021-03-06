import { Router, Route, Switch, HashRouter } from 'react-router-dom';
import StreamCreate from './streams/StreamCreate';
import StreamEdit from './streams/StreamEdit';
import StreamDelete from './streams/StreamDelete';
import StreamList from './streams/StreamList';
import StreamShow from './streams/StreamShow';
import Header from './Header';
import history from '../history';

const App = () => {
  return (
    <div className="ui container">
      <Router history={history}>
        <HashRouter>
          <div>
            <Header />
            <Switch>
              <Route path="/" exact component={StreamList} />
              <Route path="/streams/new" component={StreamCreate} />
              <Route path="/streams/edit/:id" component={StreamEdit} />
              <Route path="/streams/delete/:id" component={StreamDelete} />
              <Route path="/streams/show/:id" component={StreamShow} />
            </Switch>
          </div>
        </HashRouter>
      </Router>
    </div>
  );
};

export default App;
