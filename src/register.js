import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import Header from './Header/header';
import './Style/register.scss'

class Register extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      username: '',
      password: '',
      confirmPassword: '',
      registeredUsers: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
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

  handleRegister(event) {

    const {username, password, confirmPassword} = this.state

    if(username.length < 3){
      event.preventDefault()
      document.getElementById('errorMsg').innerHTML = "Name must be at least 3 symbols!"
      console.log(username.length)
    }
    else if(password.length < 3){
      event.preventDefault()
      document.getElementById('errorMsg').innerHTML = "Password must be at least 3 symbols!"
    }
     else if(password !== confirmPassword && password !== ""){
      event.preventDefault()
      document.getElementById('errorMsg').innerHTML = "Passwords don't match!"
    }
    else{
      localStorage.setItem('username', username);

      let registeredUsers= localStorage.getItem('registeredUsers');

      let local = localStorage.getItem('registeredUsers').split(',')
      let ifExistUser = false;
      for(let i = 0; i < local.length; i++){
        if(local[i] === username){
          ifExistUser = true;
          break;
        }
      }

      if(ifExistUser){
        event.preventDefault()
        document.getElementById('errorMsg').innerHTML = "The user already exists!"
       
      }
      else{
        registeredUsers += `${username},`;

        localStorage.setItem('registeredUsers', registeredUsers);
      
        this.setState({
          registeredUsers: localStorage.getItem('registeredUsers').split(',')
        })
      
        this.props.history.push('/bulls');
      }
    }
  }

  render() {
    const {username, password, confirmPassword} = this.state
    
    return (
        <Fragment>
            <Header/>
            <form onSubmit={this.handleRegister} className="register">
              <h1>Register</h1>

              <label>Username:  <br/>
              <input  id='username' type="text" value={username} onChange={this.handleChange} required />
              </label><br/>

              <label>Password:  <br/>
              <input  id='password' type="password" value={password} onChange={this.handleChange}/>
              </label><br/>

              <label>ConfirmPass:  <br></br>
              <input  id='confirmPassword' type="password" value={confirmPassword} onChange={this.handleChange}/>
              </label><br/>
              <div id="errorMsg"></div>
              <br/>
              <button id="regBtn" type="submit">Register</button>
                
              <br/>
            </form>

            <br/>
        </Fragment>
    );
  }
}

export default withRouter(Register);
