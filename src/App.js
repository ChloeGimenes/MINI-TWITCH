import React from 'react';
import './App.css';

import Header from './components/Header/Header';
import SideBar from './components/SideBar/SideBar';
import Games from './components/Games/Games';
import TopStreams from './components/TopStreams/TopStreams';
import Live from './components/Live/Live';
import GameStreams from './components/GameStreams/GameStreams';
import Results from './components/Results/Results';
import Erreur from './components/Erreur/Erreur';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';


function App() {
  return (
    
    <Router
    forceRefresh={true}>

      <div className="App">
        <Header />
        <SideBar />

          <Switch>
              <Route exact path="/" component={Games} />
              <Route exact path="/top-streams" component={TopStreams} />
              <Route exact path="/live/:slug" component={Live} />
              <Route exact path="/game/:slug" component={GameStreams} />
              <Route exact path="/results/:slug" component={Results} />
              <Route exact path="/results" component={Erreur} />
          </Switch>

      </div>
  </Router>
  );
}

export default App;
