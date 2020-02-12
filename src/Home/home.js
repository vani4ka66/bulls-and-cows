import React, {Fragment} from 'react';
import Header from '../Header/header';
import './home.scss';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      highScoreResults: []
    };
  }

  componentDidMount(){

    let str = localStorage.getItem('scores').split(',')

    str.sort((a,b) => parseInt(a) - parseInt(b)); 

    this.setState({
      highScoreResults: str
    })
  }

  render() {
    return (
      <Fragment>
        <Header/>
          <div className="flex-container">
            <div>
              <h1>Bulls and cows game</h1>

              <p>Discover the hidden code!<br/>
              Click to change your guess in each box.<br/><br/>
              Bulls = correct code, correct position.<br/>
              Cows = correct code, wrong position.
              Try different codes and use your brain to figure it out.</p>

              {localStorage.getItem('username') !== "" &&
      					<button className="playBtn"><a href="../bulls">Play</a></button>
              }

               {localStorage.getItem('username') === "" &&
      					<button className="playBtn"><a href="../login">Play</a></button>
      				}
            </div>

            <div >
              <h1>Top high score players</h1>
                <ul id="top">
                {
                  this.state.highScoreResults.map((item, index) => <li key={index+1}>{index+1}.  {item}</li>).splice(0,26)
                }
             </ul>
            </div>
          </div>
        </Fragment>
    );
  }
}

export default Home;
