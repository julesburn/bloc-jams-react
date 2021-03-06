import React, { Component } from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';

class Album extends Component {
  constructor(props) {
    super(props);

    const album = albumData.find( album => {
      return album.slug === this.props.match.params.slug
    });

    this.state = {
      album: album,
      currentSong: album.songs[0],
      currentTime: 0,
      duration: album.songs[0].duration,
      currentVolume: 0.5,
      isPlaying: false,
      hovered: false
    };

    this.audioElement = document.createElement('audio');
    this.audioElement.src = album.songs[0].audioSrc;
  }

  componentDidMount() {
    this.eventListeners = {
      timeupdate: e => {
        this.setState({ duration: this.audioElement.currentTime });
      },
      durationchange: e => {
        this.setState({ duration: this.audioElement.duration});
      },
      volumechange: e => {
        this.setState({ currentVolume: this.audioElement.volume})
      }
    };
    this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
    this.audioElement.addEventListener('volumechange', this.eventListeners.volumechange);
  }

  componentWillUnmount() {
    this.audioElement.src = null;
    this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
    this.audioElement.removeEventListener('volumechange', this.eventListeners.volumechange);
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
  }


  mouseLeave(song) {
    this.setState({hovered: false});
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

  handlePrevClick() {
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const newIndex = Math.max(0, currentIndex - 1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play();
  }

  handleNextClick() {
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const newIndex = Math.min((this.state.album.songs.length-1), currentIndex + 1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play();
  }

  handleVolumeChange(e) {
    const newVolume = e.target.value;
    this.audioElement.volume = newVolume;
    this.setState({ currentVolume: newVolume});
  }

  handleTimeChange(e) {
    const newTime = this.audioElement.duration * e.target.value;
    this.audioElement.currentTime = newTime;
    this.setState({ currentTime: newTime});
  }

  formatTime(totalSeconds) {
    let displayTime = "";
    if(isNaN(totalSeconds)){
      return "-:--";
    }
    else{
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
      const roundedSeconds = Math.round(seconds)
      if (roundedSeconds < 10) {
        return (minutes + ":0" + roundedSeconds);
      }
      else {
        return (minutes + ":" + roundedSeconds);
      }
    }
    };


  displayIcon(song, index) {
    if (this.state.isPlaying && song === this.state.currentSong){
      return <ion-icon name="pause" />;
    }
    else if (song === this.state.hovered && this.state.isPlaying && song === this.state.currentSong) {
      return <ion-icon name="pause"/>;
    }
    else if (song === this.state.hovered){
      return <ion-icon name="play" />;
    }
    else{
      return index+1;
    }
  }

  render() {
    return (
      <section className="album">
        <section id="album-info">
          <div className="album-cover">
            <img id="album-cover-art" src={this.state.album.albumCover} alt={this.state.album.title}/>
          </div>
          <div className="album-details">
            <h1 id="album-title">{this.state.album.title}</h1>
            <h2 className="artist">{this.state.album.artist}</h2>
            <div id="release-info">{this.state.album.releaseInfo}</div>
          </div>
        </section>
        <table id="song-list">
          <tbody>
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
          {this.state.album.songs.map( (song, index) =>
            <tr className="song" key={index}
            onClick={() => this.handleSongClick(song)}
            onMouseEnter={() => this.mouseEnter(song)}
            onMouseLeave={() => this.mouseLeave(song)} >
              <td>
                <button>
                <span>{this.displayIcon(song, index)}</span>
                </button>
              </td>
              <td>{song.title}</td>
              <td>{this.formatTime(song.duration)}</td>
            </tr>
          )
        }
          </tbody>
        </table>
        <PlayerBar
          isPlaying={this.state.isPlaying}
          currentSong={this.state.currentSong}
          currentTime={this.audioElement.currentTime}
          duration={this.audioElement.duration}
          handleSongClick={() => this.handleSongClick(this.state.currentSong)}
          handlePrevClick={() => this.handlePrevClick()}
          handleNextClick={() => this.handleNextClick()}
          handleTimeChange={(e) => this.handleTimeChange(e)}
          handleVolumeChange={(e) => this.handleVolumeChange(e)}
          formatTime={(e)=> this.formatTime(e)}
        />
      </section>
    );
  }
}

export default Album;
