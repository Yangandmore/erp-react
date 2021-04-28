import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Main, Login, Sign } from './container';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Main} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/sign" component={Sign} />
    </Switch>
  </BrowserRouter>
);
export default App;
