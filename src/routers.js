import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Main, Login, Sign, Page } from './container';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/sign" component={Sign} />
          {/* <Route exact path="/error" component={} /> */}
          <Route
            path="/erp"
            render={() => (
              <Main>
                <Route path="/erp/me" component={Page.Me} />
                <Route path="/erp/user" component={Page.User} />
                <Route path="/erp/dir" component={Page.Dir} />
                <Route path="/erp/permission" component={Page.Permission} />
                <Route path="/erp/role" component={Page.Role} />
                <Route exact path="/" component={Main} />
              </Main>
            )}
          />
          <Redirect to="/erp" />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
