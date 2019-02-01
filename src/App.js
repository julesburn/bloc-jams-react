import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import Landing from './components/Landing';
import Library from './components/Library';
import Album from './components/Album';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <nav>
            <div class = "btn-group-justified btn-group-lg">
              <button type="button" class="btn btn-lg btn-round my-primary"><Link to='/'className='landing-link'>Home</Link></button>
              <button type="button" class="btn btn-lg btn-round my-primary"><Link to='/library'className="landing-link">Library</Link></button>
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
