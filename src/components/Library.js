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
          <div className="container">
            <div className="row">
              <section className='library'>
              <table>
                <tbody>
                    {
                      this.state.albums.map( (album, index) =>
                        <tr className="album-item d-inline">
                          <Link to={`/album/${album.slug}`} key={index}>
                            <td><p><img className="cover-pic" src={album.albumCover} alt={album.title} /></p>
                              <p className="album-info">{album.title}</p>
                              <p className="album-info">{album.artist}</p>
                              <p className="album-info">{album.songs.length} songs</p></td>
                          </Link>
                        </tr>
                    )
                  }
                </tbody>
              </table>
            </section>
            </div>
          </div>
        );
    }
}

export default Library;
