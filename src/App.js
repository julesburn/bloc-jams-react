import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import './Album.css';
import './Library.css';
import './PlayerBar.css';
import Landing from './components/Landing';
import Library from './components/Library';
import Album from './components/Album';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <nav className="navbar fixed-top navbar-expand-sm navbar-light bg-my-primary">
            <div className="container">
            <button className="navbar-toggler" data-toggle="collapse" data-target="#navbarNav">
              <span class="navbar-toggler-icon"></span>
            </button>
              <div class="collapse navbar-collapse align-center" id="navbarNav">
                <ul className="navbar-nav">
                  <li className="nav-item m-3"><Link to='/'className="nav-link my-primary">Home</Link></li>
                  <li className="nav-item m-3"><Link to='/library'className="nav-link my-primary">Library</Link></li>
                </ul>
              </div>
           </div>
          </nav>
          <h1>Bloc Jams</h1>
        </header>
        <main>
          <Route exact path="/" component={Landing} />
          <Route path="/library" component={Library} />
          <Route path="/album/:slug" component={Album} />
        </main>
      </div>
    );
  }
}

export default App;
