import React, {Fragment} from 'react';
import {random4Digit} from './random';

class BullsForm extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      inputValue: "",
      magicNum: localStorage.getItem('magicNumber'),
      bulls: 0,
      cows: 0,
      jocker:'',
      jockerCounter: 1,
      choosenNumLength: 4,
      checkbox: false,
      all: [],
      highScoreResults: [],
      topScores: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNewGame = this.handleNewGame.bind(this);
    this.handleJocker = this.handleJocker.bind(this);
    this.handleGiveUp = this.handleGiveUp.bind(this);
    this.displayResults = this.displayResults.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.setAllResults = this.setAllResults.bind(this);
  }

  componentDidMount() {

    localStorage.setItem('magicNumber', this.state.magicNum);
    
    this.setState({
        all: localStorage.getItem('all').split(','),
        highScoreResults: localStorage.getItem('highScoreResults').split(',')
    })

    if(localStorage.getItem('disableJockerBtn') === "true"){
        document.getElementById('jockerBtn').disabled = true;
    }
    else{
        document.getElementById('jockerBtn').disabled = false;
    }
  }

  countingBullsAndCows(magicNum, myNumber){

    let bullsCounter = 0;
    let cowCownter = 0;

    for(let i = 0; i < magicNum.length; i++){   
        for(let j = 0; j < myNumber.length; j++){
            if(i=== j){
                if(magicNum[i] === myNumber[i]){
    
                    bullsCounter++;
                    localStorage.setItem('bulls', bullsCounter)
    
                    this.setState({
                        bulls: bullsCounter
                    });
                }
            }
            else if(i!== j){
                if(magicNum[i] === myNumber[j]){
    
                    cowCownter++;
                    localStorage.setItem('cows', cowCownter);
                    this.setState({
                        cows: cowCownter
                    });
                }
            }
        } 
    }
  }

  displayResults(){
    setTimeout(() => {

        let currentResult = `${this.state.inputValue}: ${ this.state.bulls} bulls and ${ this.state.cows } cows,`;
        this.setAllResults(currentResult);
    }, 100);
  }

  setAllResults(currentResult){
    let str = localStorage.getItem('all');
    str += currentResult;

    setTimeout(() => {
        localStorage.setItem('all', str);
        document.getElementsByClassName('error')[0].innerHTML = "";
        
        this.setState({
            all: localStorage.getItem('all').split(',')
        })
        
    }, 10);
  }

  handleSubmit(event) {

    event.preventDefault();
    let magicNum = this.state.magicNum;
    let myNumber = this.state.inputValue;

    this.setState({
        bulls: 0,
        cows: 0,
        myNumber: this.state.inputValue
    })

    let a = this.state.inputValue;
    let result = {};
    let isRepeat = false;

    //CHECK FOR REPEAT NUMBERS
    for (let str of a) {
      result[str] = result.hasOwnProperty(str) ? result[str] + 1 : 1;

      if(result[str] > 1){
        document.getElementsByClassName('error')[0].innerHTML = "No repeat numbers";
        isRepeat = true;
      }
    }
     
    //CHECK FOR NUMBER'S LENGTH
    if(a.length !== magicNum.length){
        document.getElementsByClassName('error')[0].innerHTML = `Enter ${this.state.choosenNumLength} digit number` ;
    }
    else if(isRepeat){
        document.getElementsByClassName('error')[0].innerHTML = "No repeat numbers";
    }
    else{
        document.getElementsByClassName('error')[0].innerHTML = "" ;
    
        if(this.state.inputValue === this.state.magicNum){
            document.getElementById('celebrate').style.display = "inline-block";

            let user = localStorage.getItem('username')
            let len = this.state.all.length;

            setTimeout(() => {     

                let currentScore = `${len + 1} - ${user},`;  
                let scores = localStorage.getItem('scores');
                scores += currentScore;
                localStorage.setItem('scores', scores);

                // console.log( localStorage.getItem('scores'));

                 // let map = new Map();
               
                // this.state.highScoreResults.map((item) =>{
                //     map.set(len, user)
                // })
                
                // for (let [k, v] of map) {
                //     console.log("Key: " + k);
                //     console.log("Value: " + v);
                // }
        }, 100);
    } 

    //COUNTING BULLS AND COWS
    this.countingBullsAndCows(magicNum, myNumber);

    localStorage.setItem('myNumber', this.state.inputValue);

    //DISPLAY RESULTS
    this.displayResults();
    }
}

handleNewGame() {
    
    let desireLenght = this.state.choosenNumLength;
    let checkbox = document.getElementById("checkZero").checked;

    document.getElementById("my").value = "";

      this.setState({ 
      inputValue: "",
      magicNum: random4Digit(desireLenght, checkbox),
      bulls: 0,
      cows: 0,
      jocker: '',
      jockerCounter: 1,
      checkbox: checkbox,
      all: []
   });

    setTimeout(() => {
        this.setState({
           magicNum: this.state.magicNum,
        });

        localStorage.setItem('magicNumber', this.state.magicNum)
        localStorage.setItem('all', "");
        localStorage.setItem('disableJockerBtn', "false")
        document.getElementById('celebrate').style.display = "none";
        document.getElementById("jockerBtn").disabled = false;
        document.getElementById("ok").disabled = false;
    }, 100);
}

  handleChange(event) {
    this.setState({ 
        inputValue: event.target.value 
    });
  }

  handleJocker(){

    this.setState({
        jockerCounter: this.state.jockerCounter + 1
    })
    
    let magicNum = `${this.state.magicNum}`;
    let len = this.state.magicNum.length;

    for(let i=1; i < len-1; i++){
        let firstNumbers = "";

        for(let j = 0; j <= this.state.jockerCounter-1; j++){

            firstNumbers += magicNum[j];

            if(len-j-2 <=0){
                document.getElementById('jockerBtn').disabled = true;
                localStorage.setItem('disableJockerBtn', "true")
            }
            if(len-j-1 <=0){
                break;
            }
            else{
                let currentJocker = firstNumbers+ ('*'.repeat(len-j-1)).concat(",");
                let str="";
                str += `Jocker:  ${currentJocker}`

                this.setState({
                    inputValue: ""
                })

                this.setAllResults(str)
            } 
        }
    } 
  }

  handleGiveUp(){

    this.setState({
        inputValue: ""
    })

    let currentResult = `Answer:  ${this.state.magicNum},`;

    this.setAllResults(currentResult)

    document.getElementById("jockerBtn").disabled = true;
    document.getElementById("ok").disabled = true;
  }

  handleSelect(){

      let selectedValue = document.querySelector('input[name="numberLength"]:checked').value;
      localStorage.setItem('radioBtn', selectedValue);

      this.setState({
          choosenNumLength: selectedValue,
      })
  }

  render() {
        return (
        <Fragment>
            <form onSubmit={this.handleSubmit}>

                <img hidden id="celebrate" src="https://media.giphy.com/media/pBevuxpD4Tq4U/giphy.gif" alt="congrats"/>

                <h1>Bulls and Cows game</h1>

                <input type="radio" name="numberLength" value="3"/> 3<br/>
                <input type="radio" name="numberLength" value="4" defaultChecked/> 4<br/>
                <input type="radio" name="numberLength" value="5"/> 5<br/>
                <button id="selectBtn" onClick={this.handleSelect}>Select</button>
                <br/>
                <button id="playBtn" onClick={this.handleNewGame}>Play</button>
                <br/>
                <br/>
                <input hidden id="checkZero" type="checkbox" name="zero" value=""/>
                <label hidden htmlFor="zero">Include zero</label>
                <br hidden />
                <br hidden />
         
                <label>
                <input  id='my' type="text" value={this.state.inputValue} onChange={this.handleChange}/>
                </label>
                <button id="ok" type="submit" >Submit</button>
                <br className="newLine"/>
                <br className="newLine"/>
                <button onClick={this.handleNewGame}>New Game</button>
                <button id="jockerBtn" onClick={this.handleJocker}>Jocker</button>
                <button id="giveUpBtn" onClick={this.handleGiveUp}>Give Up</button>
                <div className="error"></div>
    
                <br></br>
                <ul id="ul-li" >
                {
                 this.state.all.map((item, index) => <li key={index+1}>{index+1}.  {item}</li>).reverse()
                }
                </ul>
                
            </form>

            <br/>
            <div id="magicNumber"> {this.state.magicNum}</div>
            <br/><br/>
        </Fragment>
    );
  }
}

export default BullsForm;
