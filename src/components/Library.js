import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import albumData from './../data/albums';

class Library extends Component {
  constructor(props) {
    super(props);
    this.state = { albums: albumData };
  }
    render() {
        return(
          <div class="container">
            <section className='library'>
              {
                this.state.albums.map( (album, index) =>
                  <Link to={`/album/${album.slug}`} key={index}>
                    <div><img className="cover-pic bg-success" src={album.albumCover} alt={album.title} /></div>
                    <p className="album-info d-block">{album.title}</p>
                    <p className="album-info d-block">{album.artist}</p>
                    <p className="album-info d-block">{album.songs.length} songs</p>
                  </Link>
                )
              }
            </section>
          </div>
        );
    }
}

export default Library;
