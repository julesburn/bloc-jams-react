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
            <section className='library'>
              {
                this.state.albums.map( (album, index) =>
                  <Link to={`/album/${album.slug}`} key={index}>
                    <span><img className="cover-pic" src={album.albumCover} alt={album.title} /></span>
                    <p className="album-info">{album.title}</p>
                    <p className="album-info">{album.artist}</p>
                    <p className="album-info">{album.songs.length} songs</p>
                  </Link>
                )
              }
            </section>
        );
    }
}

export default Library;
