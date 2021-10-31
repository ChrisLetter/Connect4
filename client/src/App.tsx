import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Header from './components/Header';
import LandingPage from './screens/LandingPage';
import Local from './screens/Local';
import Online from './screens/Online';
import SelectPlayersNameLocal from './screens/SelectPlayersNameLocal'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/landing">
          <LandingPage />
        </Route>
      </Switch>
      <Switch>
        <Route path="/local">
          <Local />
        </Route>
      </Switch>
      <Switch>
        <Route path="/select-players-local">
          <SelectPlayersNameLocal />
        </Route>
      </Switch>
      <Switch>
        <Route path="/online">
          <Online />
        </Route>
      </Switch>
      <Redirect from="/" to="/landing"></Redirect>
    </BrowserRouter>
  );
}

export default App;
