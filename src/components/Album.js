import React, { Component } from 'react';
import albumData from './../data/albums';

class Album extends Component {
  constructor(props) {
    super(props);

    const album = albumData.find( album => {
      return album.slug === this.props.match.params.slug
    });

    this.state = {
      album: album,
      currentSong: album.songs[0],
      isPlaying: false,
      hovered: "null"
    };

    this.audioElement = document.createElement('audio');
    this.audioElement.src = album.songs[0].audioSrc;
  }

  play() {
    this.audioElement.play();
    this.setState({ isPlaying: true });
  }

  pause() {
    this.audioElement.pause();
    this.setState({ isPlaying: false });
  }

  mouseEnter(song) {
    this.setState({hovered: song});
    if (this.state.isPlaying === true) {
      if (song === this.state.currentSong) {
        return<span><i className="icon ion-md-pause"></i></span>
      }
    }
    return<span><i className="icon ion-md-play"></i></span>
  }

  mouseLeave(song) {
    this.setState({hovered: song});
    if (this.state.isPlaying === false) {
      if (song === this.state.currentSong) {
        return<span><i className="icon ion-md-play"></i></span>
      }
    }
    return<span><i className="icon ion-md-pause"></i></span>
}

  setSong(song) {
    this.audioElement.src = song.audioSrc;
    this.setState({ currentSong: song });
  }

  handleSongClick(song) {
    const isSameSong = this.state.currentSong === song;
    if (this.state.isPlaying && isSameSong) {
      this.pause();
    } else {
      if (!isSameSong) { this.setSong(song); }
      this.play();
    }
  }

  render() {
    const songs = this.state.album.songs.map( (song, index) =>
      <tr className="song" key={index} onClick={() => this.handleSongClick(song)} onMouseEnter={() => this.mouseEnter.bind(this)} onMouseLeave={() => this.mouseLeave.bind(this)} >
        <td className={this.state.hovered}></td>
        <td>{song.title}</td>
        <td>{Math.round(song.duration)} seconds</td>
      </tr>
    );
    return (
      <section className="album">
        <section id="album-info">
          <img id="album-cover-art" src={this.state.album.albumCover} alt={this.state.album.title}/>
          <div className="album-details">
            <h1 id="album-title">{this.state.album.title}</h1>
            <h2 className="artist">{this.state.album.artist}</h2>
            <div id="release-info">{this.state.album.releaseInfo}</div>
          </div>
        </section>
        <table id="song-list">
          <tr>
            <th>Track</th>
            <th>Title</th>
            <th>Length</th>
          </tr>
          <colgroup>
            <col id="song-number-column" />
            <col id="song-title-column" />
            <col id="song-duration-column" />
          </colgroup>
          <tbody>
            {songs}
          </tbody>
        </table>
      </section>
    );
  }
}

export default Album;
