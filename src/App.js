import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Games from './components/Games/Games';
import TopStreams from './components/TopStreams/TopStreams';
import Live from './components/Live/Live';
import GameStreams from './components/GameStreams/GameStreams';
import Results from './components/Results/Results';
import Erreur from './components/Erreur/Erreur'
import Ressources from './redux/components/Ressources/ressources';
import requireAuthentication from './redux/helper/require-auth'
import Signin from './redux/components/signin';
import Signout from './redux/components/signout';
import Signup from './redux/components/signup';
import Errors from '../src/redux/components/errors';
import Contact from './components/Contact/Contact';


function App(props) {


  return (
    
    <Router >
    {/* forceRefresh={true}> */}

      <div className="App">
        <Header />
        <Errors />

          <Switch>
              <Route exact path="/" component={Games} />
              <Route exact path="/top-streams" component={TopStreams} />
              <Route exact path="/live/:slug" component={Live} />
              <Route exact path="/game/:slug" component={GameStreams} />
              <Route exact path="/results/:slug" component={Results} />
              <Route exact path="/results" component={Erreur} />
              <Route exact path="/ressources" component={requireAuthentication(Ressources)} />
              <Route exact path="/signin" component={Signin} />
              <Route exact path="/signout" component={Signout} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/contact" component={Contact} />
          </Switch>

      </div>
  </Router>
  );
}

export default App;

