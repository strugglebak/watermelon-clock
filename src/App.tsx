import React from 'react';
import './App.css';
import Index from './components/index/index'
import Login from './components/login/login'
import SignUp from './components/signUp/signUp'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Route path="/" exact={true} component={Index} />
        <Route path="/login" component={Login} />
        <Route path="/signUp" component={SignUp} />
      </div>
    </Router>
  );
}

export default App;
