import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import LandingPage from './screens/LandingPage';
import Local from './screens/Local';

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
    </BrowserRouter>
  );
}

export default App;
