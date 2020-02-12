import React, {Fragment} from 'react';
import { withRouter } from 'react-router-dom';
import Header from './Header/header';
import './Style/register.scss'

class Login extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      username: '',
      password: '',
      registeredUsers: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  componentDidMount(){
    this.setState({
      registeredUsers: localStorage.getItem('registeredUsers').split(',')
    })
  }

  handleChange(event) {
    const {value, id} = event.target;
    
      this.setState({ 
        [id] : value
      });
  }

  handleLogin(event) {
    
    const {username} = this.state
    
    let local = localStorage.getItem('registeredUsers').split(',')
    let ifExistUser = false;

    for(let i = 0; i < local.length; i++){
      if(local[i] === username){
        ifExistUser = true;
          break;
        }
      }
    
      if(!ifExistUser){
        event.preventDefault()
          document.getElementById('errorMsg').innerHTML = "The user does not exists!"
        }
        else{
          localStorage.setItem('username', username);
          
          this.props.history.push('/bulls');
        }
      }

      render() {
        const {username, password} = this.state
          return (
            <Fragment>
            <Header />
            <form onSubmit={this.handleLogin}>
            <h1>Log in</h1>

            <div id="errorLogin"></div>

            <label>Username:  <br/>
              <input  id='username' type="text" value={username} onChange={this.handleChange}/>
            </label><br/>

            <label>Password:  <br/>
              <input  id='password' type="text" value={password} onChange={this.handleChange}/>
            </label><br/>
            <div id="errorMsg"></div><br/>
              <button id="logBtn" type="submit">Log in</button><br/>
            </form>
            <br/>
            </Fragment>
        );
      }
    }

export default withRouter(Login);
