import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LandingPage from './screens/LandingPage';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/">
          <LandingPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
