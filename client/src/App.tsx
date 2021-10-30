import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import LandingPage from './screens/LandingPage';
import Local from './screens/Local';
import Online from './screens/Online';

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
        <Route path="/online">
          <Online />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
