import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Main, Login } from './container';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Main} />
      <Route exact path="/login" component={Login} />
    </Switch>
  </BrowserRouter>
);
export default App;
