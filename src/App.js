import './App.css';
import Home from './containers/Home'
import Game from './containers/Game'
import { Route, Switch } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/game" component={Game} />
        <Route path="/" exact component={Home} />
      </Switch>
    </div>
  );
}

export default App;