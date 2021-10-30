import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LandingPage from './screens/LandingPage';
import Header from './components/Header';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/">
          <LandingPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
