import React, {Component} from 'react';
import './App.css'

    const DrumPad = ({ drumKey, song,handleClick,url, back }) => {
      return (
          <button className="drum-pad" id={song} onClick={handleClick(drumKey,song,back)} style={{background: back}}>
              {drumKey}
              <audio className="clip" src={url} id={drumKey}/>
          </button>
      );
    };
    class App extends Component{
      constructor(props) {
        super(props);
        this.state = {
            drumPads: [
                {
                    "key": "Q",
                    "song": "Heater-1",
                    "url": "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
                    "back" : "red"
                },
                {
                    "key": "W",
                    "song": "Heater-2",
                    "url": "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
                    "back" : "grey"
                },
                {
                    "key": "E",
                    "song": "Heater-3",
                    "url": "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
                    "back" : "orange"
                },
                {
                    "key": "A",
                    "song": "Heater-4",
                    "url": "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
                    "back" : "green"
                },
                {
                    "key": "S",
                    "song": "Heater-6",
                    "url": "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
                    "back" : "blue"
                },
                {
                    "key": "D",
                    "song": "Dsc_Oh",
                    "url": "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
                    "back" : "teal"
                },
                {
                    "key": "Z",
                    "song": "Kick_n_Hat",
                    "url": "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
                    "back" : "purple"
                },
                {
                    "key": "X",
                    "song": "RP4_KICK_1",
                    "url": "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
                    "back" : "cyan"
                },
                {
                    "key": "C",
                    "song": "Cev_H2",
                    "url": "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
                    "back" : "indigo"
                }
            ],
          
            currentSongText: '',
            currentScheme: ''
        };
        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        }
        componentDidMount() {
            // will click  the button when the corresponding key pressed
            window.addEventListener('keypress', this.handleKeyPress);
        }
        // handler for the click button on the DrumPad Component

        handleButtonClick(key, song, back) {
            return () => {
                document.getElementById(key).play();
                this.setState({
                    currentSongText: song,
                    currentScheme: back
                });
            };
        }
        render() {
            return (
                <div id="drum-machine" className="container">
                  <div className="row text-center my-5">
                    <div className="col-md-12">
                        <div className="app_title">
                            <h1>Drum Machine App</h1>
                        </div>
                    </div>
                  </div>
                  <div className="row bg-secondary my-3 custom-row" style={{borderColor: this.state.currentScheme}}>
                    <div className="col-md-6 text-center">
                        <div id="display-pads" className="justify-content-center p-5">
                            {this.state.drumPads.map(item => (
                                <DrumPad
                                    song={item.song}
                                    key={item.key}
                                    back={item.back}
                                    drumKey={item.key}
                                    handleClick={this.handleButtonClick}
                                    url={item.url}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="col-md-6" style={{background: this.state.currentScheme, borderTopRightRadius: '17px', borderBottomRightRadius:'17px'}}>
                      <div className="custom-text mt-5 p-5">
                          {this.state.currentSongText ? 
                              <p id="display" className="current-text text-white">{this.state.currentSongText}</p>:
                              <p id="display" className="current-text text-white">Push a Key first</p> 
                          }
                      </div>

                    </div>
                  </div>
                </div>
            );
        }
        componentWillUnmount() {
            window.removeEventListener('keypress', this.handleKeyPress);
        }

        handleKeyPress(e) {
            const pad = this.state.drumPads.find(
                item => item.key === e.key.toUpperCase(),
            );
            // click the button
            if (pad) document.getElementById(pad.song).click();
        }
    }

    // Exporting the component
export default App;